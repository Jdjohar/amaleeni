<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/email-helper.php';
require_once __DIR__ . '/auth-helper.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
    exit;
}

$rawInput = file_get_contents('php://input');
if (!empty($rawInput)) {
    $data = json_decode($rawInput, true);
    if (json_last_error() !== JSON_ERROR_NONE && empty($_POST)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Malformed JSON payload received.']);
        exit;
    }
}
if (empty($data)) {
    $data = $_POST;
}

verifyHoneypot($data);

$email = trim(strtolower(filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL)));

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Please enter a valid email address.']);
    exit;
}

$pdo = getDbConnection();
if (!$pdo) {
    http_response_code(503);
    echo json_encode(['status' => 'error', 'message' => 'Database service currently unavailable. Please try again.']);
    exit;
}
$ipAddress = $_SERVER['REMOTE_ADDR'] ?? '';

try {
    // Ensure table exists
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `email` VARCHAR(191) NOT NULL UNIQUE,
          `ip_address` VARCHAR(45) NULL,
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    // Insert subscriber (ignore if already exists)
    $stmt = $pdo->prepare("INSERT INTO newsletter_subscribers (email, ip_address, created_at) VALUES (:email, :ip, NOW()) ON DUPLICATE KEY UPDATE created_at = NOW()");
    $stmt->execute([':email' => $email, ':ip' => $ipAddress]);

    // Send notifications to User & Admin for Task 9
    sendFormNotificationEmail($email, 'Subscriber', 'Newsletter Subscription', [
        'Email Address' => $email,
        'IP Address' => $ipAddress,
        'Source' => 'Website Footer Newsletter Box'
    ]);

    echo json_encode([
        'status' => 'success',
        'message' => 'Thank you for subscribing to Amaleeni Secretariat Updates!'
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to save subscription. Please try again.'
    ]);
}
