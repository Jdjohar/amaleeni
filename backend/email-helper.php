<?php
require_once __DIR__ . '/config.php';

/**
 * Core SMTP / Mail Dispatcher
 * Sends email via Zoho SMTP socket if USE_SMTP is true, or falls back to PHP mail()
 */
function sendEmailNotification($toEmail, $toName, $subject, $htmlContent) {
    $mailSent = false;

    // 1. Try sending via Zoho SMTP socket if configured
    if (defined('USE_SMTP') && USE_SMTP === true && defined('SMTP_USER') && !empty(SMTP_USER)) {
        try {
            $mailSent = sendViaSmtpSocket($toEmail, $toName, $subject, $htmlContent);
        } catch (Throwable $e) {
            error_log('SMTP socket error: ' . $e->getMessage());
            $mailSent = false;
        }
    }

    // 2. If SMTP socket was not used or failed, fall back to native Hostinger PHP mail()
    if (!$mailSent) {
        try {
            $fromMail = defined('MAIL_FROM_EMAIL') ? MAIL_FROM_EMAIL : 'hello@amaleeni.com';
            $fromName = defined('MAIL_FROM_NAME') ? MAIL_FROM_NAME : 'Amaleeni Foundation';
            $replyTo = defined('SECRETARIAT_EMAIL') ? SECRETARIAT_EMAIL : 'hello@amaleeni.com';

            $headers = [
                'MIME-Version: 1.0',
                'Content-type: text/html; charset=UTF-8',
                'From: ' . $fromName . ' <' . $fromMail . '>',
                'Reply-To: ' . $replyTo,
                'X-Mailer: PHP/' . phpversion()
            ];

            $headersStr = implode("\r\n", $headers);
            $mailSent = @mail($toEmail, $subject, $htmlContent, $headersStr);
            if (!$mailSent) {
                $mailSent = @mail($toEmail, $subject, $htmlContent, $headersStr, "-f " . $fromMail);
            }
        } catch (Throwable $e) {
            error_log('PHP mail() error: ' . $e->getMessage());
            $mailSent = false;
        }
    }

    return $mailSent;
}

/**
 * Direct Lightweight Socket Connection to Zoho SMTP (SSL/TLS)
 */
function sendViaSmtpSocket($toEmail, $toName, $subject, $htmlContent) {
    if (!defined('SMTP_USER') || !defined('SMTP_PASS') || empty(SMTP_USER) || empty(SMTP_PASS)) {
        return false;
    }

    $primaryHost = defined('SMTP_HOST') ? SMTP_HOST : 'smtp.zoho.in';
    $primaryPort = defined('SMTP_PORT') ? SMTP_PORT : 465;
    $primarySecure = defined('SMTP_SECURE') ? SMTP_SECURE : 'ssl';

    // Host & Port candidate combinations for Zoho Mail / Hostinger
    $candidates = [
        ['host' => $primaryHost, 'port' => $primaryPort, 'secure' => $primarySecure],
        ['host' => 'smtp.zoho.in', 'port' => 465, 'secure' => 'ssl'],
        ['host' => 'smtp.zoho.in', 'port' => 587, 'secure' => 'tls'],
        ['host' => 'smtp.zoho.com', 'port' => 465, 'secure' => 'ssl'],
        ['host' => 'smtppro.zoho.in', 'port' => 465, 'secure' => 'ssl'],
    ];

    $seen = [];
    $uniqueCandidates = [];
    foreach ($candidates as $c) {
        $key = $c['host'] . ':' . $c['port'] . ':' . $c['secure'];
        if (!isset($seen[$key])) {
            $seen[$key] = true;
            $uniqueCandidates[] = $c;
        }
    }

    foreach ($uniqueCandidates as $config) {
        try {
            $hostStr = ($config['secure'] === 'ssl' ? 'ssl://' : '') . $config['host'];
            $socket = @fsockopen($hostStr, $config['port'], $errno, $errstr, 4);
            if (!$socket) {
                continue;
            }

            stream_set_timeout($socket, 4);

            $read = function($s) {
                $res = '';
                while ($str = fgets($s, 512)) {
                    $res .= $str;
                    if (substr($str, 3, 1) === ' ') break;
                }
                return $res;
            };

            $write = function($s, $cmd) {
                fputs($s, $cmd . "\r\n");
            };

            $banner = $read($socket);
            if (empty($banner)) {
                @fclose($socket);
                continue;
            }

            $write($socket, "EHLO " . (gethostname() ?: 'amaleeni.com'));
            $read($socket);

            if ($config['secure'] === 'tls') {
                $write($socket, "STARTTLS");
                $tlsRes = $read($socket);
                if (strpos($tlsRes, '220') === false) {
                    @fclose($socket);
                    continue;
                }
                @stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
                $write($socket, "EHLO " . (gethostname() ?: 'amaleeni.com'));
                $read($socket);
            }

            $write($socket, "AUTH LOGIN");
            $read($socket);

            $write($socket, base64_encode(SMTP_USER));
            $read($socket);

            $write($socket, base64_encode(SMTP_PASS));
            $authRes = $read($socket);

            if (strpos($authRes, '235') === false) {
                error_log("SMTP Auth failed for " . $config['host'] . ": " . trim($authRes));
                @fclose($socket);
                continue;
            }

            $write($socket, "MAIL FROM: <" . SMTP_USER . ">");
            $read($socket);

            $write($socket, "RCPT TO: <" . $toEmail . ">");
            $read($socket);

            $write($socket, "DATA");
            $read($socket);

            $fromName = defined('MAIL_FROM_NAME') ? MAIL_FROM_NAME : 'Amaleeni Foundation';
            $replyTo = defined('SECRETARIAT_EMAIL') ? SECRETARIAT_EMAIL : SMTP_USER;

            $headers  = "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
            $headers .= "From: " . $fromName . " <" . SMTP_USER . ">\r\n";
            $headers .= "To: " . ($toName ? "$toName <$toEmail>" : $toEmail) . "\r\n";
            $headers .= "Reply-To: " . $replyTo . "\r\n";
            $headers .= "Subject: " . $subject . "\r\n";
            $headers .= "Date: " . date('r') . "\r\n";

            $write($socket, $headers . "\r\n" . $htmlContent . "\r\n.");
            $dataRes = $read($socket);

            $write($socket, "QUIT");
            @fclose($socket);

            if (strpos($dataRes, '250') !== false || strpos($dataRes, '235') !== false || strpos($dataRes, 'OK') !== false) {
                return true;
            }
        } catch (Throwable $t) {
            error_log("SMTP Exception on " . $config['host'] . ": " . $t->getMessage());
        }
    }

    return false;
}

/**
 * Task 1: OTP Email Verification
 */
function sendOTPEmail($toEmail, $otpCode) {
    $subject = "Email Verification OTP Code - Amaleeni Foundation";
    $body = "
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset='utf-8'>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #F8F3EA; color: #1B3629; margin: 0; padding: 20px; }
        .card { max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E5D7C3; overflow: hidden; }
        .header { background: #1B3629; color: #FAF5EB; padding: 24px; text-align: center; }
        .content { padding: 24px; text-align: center; line-height: 1.6; }
        .otp-box { background: #FAF5EB; border: 2px dashed #C83B46; padding: 16px; border-radius: 12px; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #C83B46; margin: 20px 0; }
        .footer { background: #FAF5EB; border-top: 1px solid #E5D7C3; padding: 16px; text-align: center; font-size: 12px; color: #7A6750; }
      </style>
    </head>
    <body>
      <div class='card'>
        <div class='header'>
          <h2 style='margin:0; color:#FAF5EB;'>Amaleeni Email Verification</h2>
        </div>
        <div class='content'>
          <p>Please use the OTP code below to verify your email address and complete your Pink Pages registration:</p>
          <div class='otp-box'>" . htmlspecialchars($otpCode) . "</div>
          <p style='font-size:12px; color:#7A6750;'>This code is valid for 10 minutes. Do not share this code with anyone.</p>
        </div>
        <div class='footer'>
          &copy; 2027 Amaleeni Foundation. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    ";

    return sendEmailNotification($toEmail, '', $subject, $body);
}

/**
 * Task 9: Generic Dual Email Notification (User Confirmation + Admin Alert)
 */
function sendFormNotificationEmail($userEmail, $userName, $formName, $formData) {
    // 1. Send User Confirmation
    $userSubject = "Thank You for Contacting Amaleeni Foundation ({$formName})";
    $fieldsHtml = "";
    foreach ($formData as $k => $v) {
        $fieldsHtml .= "<tr><td style='padding:8px; border-bottom:1px solid #E5D7C3; font-weight:bold; color:#1B3629; width:35%;'>" . htmlspecialchars(ucwords(str_replace('_', ' ', $k))) . ":</td><td style='padding:8px; border-bottom:1px solid #E5D7C3; color:#3A5645;'>" . nl2br(htmlspecialchars(is_array($v) ? implode(', ', $v) : $v)) . "</td></tr>";
    }

    $userBody = "
    <!DOCTYPE html>
    <html>
    <head><meta charset='utf-8'></head>
    <body style='font-family:-apple-system,BlinkMacSystemFont,Roboto,sans-serif; background:#F8F3EA; color:#1B3629; padding:20px;'>
      <div style='max-width:600px; margin:0 auto; background:#fff; border-radius:16px; border:1px solid #E5D7C3; overflow:hidden;'>
        <div style='background:#1B3629; color:#FAF5EB; padding:24px; text-align:center;'>
          <h2 style='margin:0;'>Amaleeni Foundation</h2>
          <p style='margin:4px 0 0; color:#D49B4B; font-size:13px;'>Submission Received - {$formName}</p>
        </div>
        <div style='padding:24px; line-height:1.6;'>
          <p>Dear <strong>" . htmlspecialchars($userName ?: 'Valued User') . "</strong>,</p>
          <p>Thank you for reaching out to Amaleeni Foundation. We have received your submission for <strong>{$formName}</strong>. Our Secretariat team will review your details and respond shortly.</p>
          <table style='width:100%; border-collapse:collapse; margin:16px 0;'>{$fieldsHtml}</table>
          <p style='font-size:13px; color:#5A7B68;'>For urgent inquiries, reach us on WhatsApp at +91 98100 55241 or reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
    ";
    sendEmailNotification($userEmail, $userName, $userSubject, $userBody);

    // 2. Send Admin Notification Alert
    $adminEmail = defined('ADMIN_NOTIFICATION_EMAIL') ? ADMIN_NOTIFICATION_EMAIL : SECRETARIAT_EMAIL;
    $adminSubject = "[ADMIN ALERT] New Submission: {$formName} (" . ($userName ?: $userEmail) . ")";
    $adminBody = "
    <!DOCTYPE html>
    <html>
    <head><meta charset='utf-8'></head>
    <body style='font-family:sans-serif; background:#1B3629; color:#FAF5EB; padding:20px;'>
      <div style='max-width:650px; margin:0 auto; background:#ffffff; color:#1B3629; border-radius:16px; padding:24px; border:2px solid #C83B46;'>
        <h2 style='color:#C83B46; margin-top:0;'>New Lead Notification: {$formName}</h2>
        <p>A new submission was made on amaleeni.com:</p>
        <table style='width:100%; border-collapse:collapse; margin:16px 0;'>{$fieldsHtml}</table>
        <p style='font-size:12px; color:#8A755A;'>Timestamp: " . date('Y-m-d H:i:s T') . "</p>
      </div>
    </body>
    </html>
    ";
    sendEmailNotification($adminEmail, 'Amaleeni Admin', $adminSubject, $adminBody);
}

/**
 * Registration Welcome Email
 */
function sendRegistrationEmail($user, $profile) {
    $subject = "Welcome to Pink Pages - Registration Confirmed ({$profile['ref_id']})";
    $dashboardUrl = "https://amaleeni.com/pink-pages/dashboard";

    $body = "
    <!DOCTYPE html>
    <html>
    <head><meta charset='utf-8'></head>
    <body style='font-family:-apple-system,BlinkMacSystemFont,Roboto,sans-serif; background:#F8F3EA; color:#1B3629; padding:20px;'>
      <div style='max-width:600px; margin:0 auto; background:#ffffff; border-radius:16px; border:1px solid #E5D7C3; overflow:hidden;'>
        <div style='background:#1B3629; color:#FAF5EB; padding:24px; text-align:center;'>
          <h2 style='margin:0; color:#FAF5EB;'>Amaleeni Pink Pages</h2>
          <p style='margin:5px 0 0; color:#D49B4B; font-size:13px;'>Women's Business Directory</p>
        </div>
        <div style='padding:24px; line-height:1.6;'>
          <h3>Welcome, " . htmlspecialchars($user['full_name']) . "!</h3>
          <p>Your profile for <strong>" . htmlspecialchars($profile['org_name']) . "</strong> has been created on Amaleeni Pink Pages.</p>
          <div style='background:#FAF5EB; border-left:4px solid #C83B46; padding:15px; border-radius:8px; margin:16px 0;'>
            <p style='margin:0 0 5px;'><strong>Reference ID:</strong> <span style='color:#C83B46; font-size:18px; font-weight:bold;'>" . htmlspecialchars($profile['ref_id']) . "</span></p>
            <p style='margin:0;'><strong>Sector:</strong> " . htmlspecialchars($profile['sector']) . "</p>
          </div>
          <p>Complete your ₹5,000 annual membership payment from your member dashboard to activate your profile and unlock Early Bird summit passes.</p>
          <center><a href='{$dashboardUrl}' style='display:inline-block; background:#C83B46; color:#fff !important; padding:12px 24px; border-radius:50px; text-decoration:none; font-weight:bold;'>Go to Dashboard</a></center>
        </div>
      </div>
    </body>
    </html>
    ";

    sendEmailNotification($user['email'], $user['full_name'], $subject, $body);

    // Also trigger Admin Notification for Task 9
    sendFormNotificationEmail($user['email'], $user['full_name'], 'Pink Pages Registration', [
        'Full Name' => $user['full_name'],
        'Email' => $user['email'],
        'Phone' => $user['phone'],
        'Organisation' => $profile['org_name'],
        'Reference ID' => $profile['ref_id'],
        'Sector' => $profile['sector']
    ]);
}

/**
 * Payment Receipt Email
 */
function sendPaymentSuccessEmail($user, $profile, $paymentId) {
    $subject = "Payment Receipt & Verified Membership Confirmed - Amaleeni Pink Pages";
    $body = "
    <!DOCTYPE html>
    <html>
    <head><meta charset='utf-8'></head>
    <body style='font-family:-apple-system,BlinkMacSystemFont,Roboto,sans-serif; background:#F8F3EA; color:#1B3629; padding:20px;'>
      <div style='max-width:600px; margin:0 auto; background:#ffffff; border-radius:16px; border:1px solid #E5D7C3; overflow:hidden;'>
        <div style='background:#1B3629; color:#FAF5EB; padding:24px; text-align:center;'>
          <h2 style='margin:0;'>Payment Successful!</h2>
          <p style='margin:4px 0 0; color:#D49B4B; font-size:13px;'>Official Receipt</p>
        </div>
        <div style='padding:24px; line-height:1.6;'>
          <p>Dear " . htmlspecialchars($user['full_name']) . ",</p>
          <p>Your membership fee of <strong>₹5,000</strong> has been received. Your profile is now <strong>VERIFIED &amp; ACTIVE</strong>.</p>
          <p><strong>Payment ID:</strong> " . htmlspecialchars($paymentId) . "</p>
          <p><strong>Reference ID:</strong> " . htmlspecialchars($profile['ref_id']) . "</p>
        </div>
      </div>
    </body>
    </html>
    ";

    sendEmailNotification($user['email'], $user['full_name'], $subject, $body);

    // Also trigger Admin Alert for Task 9
    sendFormNotificationEmail($user['email'], $user['full_name'], 'Membership Payment Received', [
        'Full Name' => $user['full_name'],
        'Email' => $user['email'],
        'Amount' => '₹5,000.00',
        'Payment ID' => $paymentId,
        'Reference ID' => $profile['ref_id']
    ]);
}
