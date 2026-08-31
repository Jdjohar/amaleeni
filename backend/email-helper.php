<?php
require_once __DIR__ . '/config.php';

/**
 * Send HTML Email using PHP mail()
 */
function sendEmailNotification($toEmail, $toName, $subject, $htmlContent) {
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . MAIL_FROM_NAME . ' <' . MAIL_FROM_EMAIL . '>',
        'Reply-To: ' . SECRETARIAT_EMAIL,
        'X-Mailer: PHP/' . phpversion()
    ];

    $headersStr = implode("\r\n", $headers);
    return @mail($toEmail, $subject, $htmlContent, $headersStr);
}

/**
 * Registration Welcome & Confirmation Email
 */
function sendRegistrationEmail($user, $profile) {
    $subject = "Welcome to Pink Pages - Registration Confirmed ({$profile['ref_id']})";
    
    $dashboardUrl = "https://amaleeni.org/pink-pages/dashboard"; // or Vercel URL

    $body = "
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset='utf-8'>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F3EA; color: #1B3629; margin: 0; padding: 20px; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E5D7C3; overflow: hidden; }
        .header { background: #1B3629; color: #FAF5EB; padding: 30px; text-align: center; }
        .content { padding: 30px; line-height: 1.6; }
        .ref-box { background: #FAF5EB; border-left: 4px solid #C83B46; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .btn { display: inline-block; background: #C83B46; color: #ffffff !important; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; margin-top: 20px; }
        .footer { background: #FAF5EB; border-top: 1px solid #E5D7C3; padding: 20px; text-align: center; font-size: 12px; color: #7A6750; }
      </style>
    </head>
    <body>
      <div class='card'>
        <div class='header'>
          <h1 style='margin:0; font-size:24px; color:#FAF5EB;'>Amaleeni Pink Pages</h1>
          <p style='margin:5px 0 0; color:#D49B4B; font-size:14px;'>Women's Business &amp; Opportunity Directory</p>
        </div>
        <div class='content'>
          <h2>Welcome, " . htmlspecialchars($user['full_name']) . "!</h2>
          <p>Your registration profile for <strong>" . htmlspecialchars($profile['org_name']) . "</strong> has been created on Amaleeni Pink Pages.</p>
          
          <div class='ref-box'>
            <p style='margin:0 0 5px;'><strong>Registration Reference ID:</strong> <span style='color:#C83B46; font-size:18px; font-weight:bold;'>" . htmlspecialchars($profile['ref_id']) . "</span></p>
            <p style='margin:0;'><strong>Primary Sector:</strong> " . htmlspecialchars($profile['sector']) . "</p>
            <p style='margin:0;'><strong>Category:</strong> " . htmlspecialchars($profile['category']) . "</p>
          </div>

          <p><strong>Next Step: Complete Your Membership Activation</strong></p>
          <p>To activate your verified directory profile, unlock curated investor and buyer connections, and confirm your complimentary <strong>Early Bird Delegate Pass for Amaleeni Womenpreneurs 2027</strong>, please complete your ₹5,000 annual payment from your member dashboard.</p>

          <center>
            <a href='" . $dashboardUrl . "' class='btn'>Go to Member Dashboard &amp; Activate</a>
          </center>

          <p style='margin-top:30px; font-size:13px; color:#5A7B68;'>
            If you have any questions, reply directly to this email or reach us on WhatsApp at +91 98100 55241.
          </p>
        </div>
        <div class='footer'>
          &copy; 2027 Amaleeni Foundation. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    ";

    return sendEmailNotification($user['email'], $user['full_name'], $subject, $body);
}

/**
 * Payment Receipt & Summit Pass Confirmation Email
 */
function sendPaymentSuccessEmail($user, $profile, $paymentId) {
    $subject = "Payment Receipt & Verified Membership Confirmed - Amaleeni Pink Pages";

    $body = "
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset='utf-8'>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F3EA; color: #1B3629; margin: 0; padding: 20px; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E5D7C3; overflow: hidden; }
        .header { background: #1B3629; color: #FAF5EB; padding: 30px; text-align: center; }
        .content { padding: 30px; line-height: 1.6; }
        .receipt-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .receipt-table th, .receipt-table td { padding: 10px; border-bottom: 1px solid #E5D7C3; text-align: left; font-size: 14px; }
        .badge { display: inline-block; background: #2E7D32; color: #fff; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; }
        .footer { background: #FAF5EB; border-top: 1px solid #E5D7C3; padding: 20px; text-align: center; font-size: 12px; color: #7A6750; }
      </style>
    </head>
    <body>
      <div class='card'>
        <div class='header'>
          <h1 style='margin:0; font-size:24px; color:#FAF5EB;'>Payment Successful!</h1>
          <p style='margin:5px 0 0; color:#D49B4B; font-size:14px;'>Amaleeni Pink Pages Official Receipt</p>
        </div>
        <div class='content'>
          <h2>Dear " . htmlspecialchars($user['full_name']) . ",</h2>
          <p>We have successfully received your annual membership fee of <strong>₹5,000</strong>. Your Pink Pages profile is now <span class='badge'>VERIFIED &amp; ACTIVE</span>.</p>

          <table class='receipt-table'>
            <tr><td><strong>Transaction / Payment ID:</strong></td><td>" . htmlspecialchars($paymentId) . "</td></tr>
            <tr><td><strong>Registration Reference ID:</strong></td><td>" . htmlspecialchars($profile['ref_id']) . "</td></tr>
            <tr><td><strong>Enterprise:</strong></td><td>" . htmlspecialchars($profile['org_name']) . "</td></tr>
            <tr><td><strong>Amount Paid:</strong></td><td>₹5,000.00 (Annual)</td></tr>
            <tr><td><strong>Summit Pass:</strong></td><td>Amaleeni Womenpreneurs 2027 Early Bird Pass (Included)</td></tr>
            <tr><td><strong>Status:</strong></td><td style='color:#2E7D32; font-weight:bold;'>PAID / CONFIRMED</td></tr>
          </table>

          <p>All member features in your dashboard have been unlocked. You can now access curated buyer matchmaking, browse the directory, and download your official membership pass.</p>

          <p style='margin-top:25px;'>Best regards,<br><strong>Amaleeni Secretariat Team</strong></p>
        </div>
        <div class='footer'>
          &copy; 2027 Amaleeni Foundation. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    ";

    return sendEmailNotification($user['email'], $user['full_name'], $subject, $body);
}
