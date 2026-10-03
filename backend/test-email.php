<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/email-helper.php';

header('Content-Type: text/html; charset=utf-8');

$to = isset($_GET['to']) ? trim($_GET['to']) : 'hello@amaleeni.com';

echo "<div style='font-family:-apple-system,sans-serif; max-width:800px; margin:20px auto; padding:20px; background:#FAF5EB; border:1px solid #E5D7C3; border-radius:16px;'>";
echo "<h2 style='color:#1B3629; margin-top:0;'>Amaleeni Foundation - Email Dispatch Diagnostics</h2>";
echo "<table style='width:100%; border-collapse:collapse; margin-bottom:20px;'>";
echo "<tr><td><strong>Target Email:</strong></td><td>" . htmlspecialchars($to) . "</td></tr>";
echo "<tr><td><strong>SMTP Host:</strong></td><td>" . (defined('SMTP_HOST') ? SMTP_HOST : 'Not set') . "</td></tr>";
echo "<tr><td><strong>SMTP Port:</strong></td><td>" . (defined('SMTP_PORT') ? SMTP_PORT : 'Not set') . " (" . (defined('SMTP_SECURE') ? SMTP_SECURE : '') . ")</td></tr>";
echo "<tr><td><strong>SMTP User:</strong></td><td>" . (defined('SMTP_USER') ? SMTP_USER : 'Not set') . "</td></tr>";
echo "</table>";

echo "<hr style='border:none; border-top:1px solid #E5D7C3;'><p><strong>Testing Outbound Connection to Zoho SMTP...</strong></p>";

// Debug Socket Connection
$debugLog = [];
$primaryHost = defined('SMTP_HOST') ? SMTP_HOST : 'smtp.zoho.in';
$primaryPort = defined('SMTP_PORT') ? SMTP_PORT : 465;
$primarySecure = defined('SMTP_SECURE') ? SMTP_SECURE : 'ssl';

$hostStr = ($primarySecure === 'ssl' ? 'ssl://' : '') . $primaryHost;
$debugLog[] = "Connecting to {$hostStr}:{$primaryPort}...";

$socket = @fsockopen($hostStr, $primaryPort, $errno, $errstr, 5);
if (!$socket) {
    $debugLog[] = "FAILED: Could not open socket to {$hostStr}:{$primaryPort} - Error: {$errstr} ({$errno})";
} else {
    stream_set_timeout($socket, 5);
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
    $debugLog[] = "Server Banner: " . trim($banner);

    $write($socket, "EHLO amaleeni.com");
    $ehlo = $read($socket);
    $debugLog[] = "EHLO Response: " . trim($ehlo);

    $write($socket, "AUTH LOGIN");
    $authReq = $read($socket);
    $debugLog[] = "AUTH LOGIN Prompt: " . trim($authReq);

    $write($socket, base64_encode(SMTP_USER));
    $userReq = $read($socket);

    $write($socket, base64_encode(SMTP_PASS));
    $authRes = $read($socket);
    $debugLog[] = "AUTH Response: " . trim($authRes);

    @fclose($socket);
}

echo "<pre style='background:#1B3629; color:#D49B4B; padding:15px; border-radius:10px; font-size:13px; overflow-x:auto;'>";
echo implode("\n", array_map('htmlspecialchars', $debugLog));
echo "</pre>";

$subject = "Test Email Verification - Amaleeni Diagnostics " . date('Y-m-d H:i:s');
$body = "
<!DOCTYPE html>
<html>
<body style='font-family:sans-serif; background:#F8F3EA; padding:20px;'>
  <div style='background:white; padding:20px; border-radius:10px; max-width:500px;'>
    <h3 style='color:#1B3629;'>Test Email from Amaleeni Foundation</h3>
    <p>If you receive this email, your Hostinger server and Zoho SMTP settings are working correctly!</p>
    <p style='font-size:12px; color:#666;'>Sent at: " . date('Y-m-d H:i:s') . "</p>
  </div>
</body>
</html>";

echo "<p><strong>Attempting full sendEmailNotification() dispatch to " . htmlspecialchars($to) . "...</strong></p>";
$result = sendEmailNotification($to, 'Test User', $subject, $body);

if ($result) {
    echo "<h3 style='color:green;'>SUCCESS: Email successfully dispatched to " . htmlspecialchars($to) . "!</h3>";
    echo "<p>Please check the Inbox and Spam/Junk folder of <code>" . htmlspecialchars($to) . "</code>.</p>";
} else {
    echo "<h3 style='color:red;'>FAILURE: Could not deliver email.</h3>";
}

echo "<hr style='border:none; border-top:1px solid #E5D7C3;'>";
echo "<h4>Diagnostic Troubleshooting Guide:</h4>";
echo "<ol style='font-size:14px; line-height:1.6;'>";
echo "<li><strong>If AUTH Response says '535 Authentication Failed':</strong><br>2-Factor Authentication (2FA) is enabled on <code>hello@amaleeni.com</code> in Zoho Mail, or the password changed. Generate an <strong>App Password</strong> in Zoho Account -> Security -> App Passwords, and update <code>SMTP_PASS</code> in <code>backend/config.php</code>.</li>";
echo "<li><strong>If Zoho Region is different:</strong><br>If your Zoho account is hosted on Zoho US (zoho.com) instead of Zoho India (zoho.in), set <code>SMTP_HOST</code> to <code>smtp.zoho.com</code> in <code>backend/config.php</code>.</li>";
echo "<li><strong>If Self-Sending to hello@amaleeni.com:</strong><br>Emails sent from <code>hello@amaleeni.com</code> to <code>hello@amaleeni.com</code> appear in the <strong>Sent</strong> folder in Zoho Mail webmail. Check the <em>Sent</em> folder or test sending to an external address like <code>?to=yourname@gmail.com</code>.</li>";
echo "</ol>";
echo "</div>";

