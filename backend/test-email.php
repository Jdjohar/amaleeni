<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/email-helper.php';

header('Content-Type: text/html; charset=utf-8');

$to = isset($_GET['to']) ? trim($_GET['to']) : (defined('ADMIN_NOTIFICATION_EMAIL') ? ADMIN_NOTIFICATION_EMAIL : 'hello@amaleeni.com');

echo "<h2>Amaleeni Foundation - Email Dispatch Diagnostics</h2>";
echo "<p><strong>Target Email:</strong> " . htmlspecialchars($to) . "</p>";
echo "<p><strong>SMTP Host Configured:</strong> " . (defined('SMTP_HOST') ? SMTP_HOST : 'Not set') . "</p>";
echo "<p><strong>SMTP User Configured:</strong> " . (defined('SMTP_USER') ? SMTP_USER : 'Not set') . "</p>";

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

echo "<hr><p>Attempting email dispatch...</p>";
$result = sendEmailNotification($to, 'Test User', $subject, $body);

if ($result) {
    echo "<h3 style='color:green;'>SUCCESS: Email successfully dispatched to " . htmlspecialchars($to) . "!</h3>";
    echo "<p>Please check your email inbox and Spam/Junk folder.</p>";
} else {
    echo "<h3 style='color:red;'>FAILURE: Could not deliver email.</h3>";
    echo "<p>Possible Reasons & Remedies:</p>";
    echo "<ul>";
    echo "<li><strong>Zoho Password / App Password:</strong> If 2FA is enabled on " . (defined('SMTP_USER') ? SMTP_USER : 'your email') . ", generate an App Password in Zoho Security settings and update <code>SMTP_PASS</code> in <code>config.php</code>.</li>";
    echo "<li><strong>Zoho Server Name:</strong> Ensure <code>SMTP_HOST</code> in <code>config.php</code> is <code>smtp.zoho.in</code> or <code>smtp.zoho.com</code>.</li>";
    echo "<li><strong>Hostinger Port Blocking:</strong> If outbound sockets are blocked on Hostinger, set <code>USE_SMTP = false</code> in <code>config.php</code> to use Hostinger native PHP mail().</li>";
    echo "</ul>";
}
