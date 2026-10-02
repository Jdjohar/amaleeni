<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/email-helper.php';

if (session_status() === PHP_SESSION_NONE) {
    @session_start();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?? $_POST;

$email = trim(strtolower($data['email'] ?? ''));

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Please provide a valid email address.']);
    exit;
}

// Check if this email is already registered before sending OTP
try {
    $pdo = getDbConnection();
    if ($pdo) {
        $checkStmt = $pdo->prepare("SELECT id FROM users WHERE email = :email LIMIT 1");
        $checkStmt->execute([':email' => $email]);
        if ($checkStmt->fetch()) {
            http_response_code(409);
            echo json_encode([
                'status' => 'error',
                'success' => false,
                'is_duplicate' => true,
                'message' => 'An account with this email address is already registered. Please log in instead.'
            ]);
            exit;
        }
    }
} catch (Throwable $dbCheckErr) {
    // Continue safely if db check fails
}

// Generate 6-digit OTP code
$otpCode = (string) rand(100000, 999999);
$expiresAt = date('Y-m-d H:i:s', strtotime('+10 minutes'));

// Store in Session for fallback verification
$_SESSION['otp_' . md5($email)] = [
    'code' => $otpCode,
    'expires' => time() + 600,
    'verified' => false
];

// 1. Save in Database if available (auto-creates table if missing)
try {
    $pdo = getDbConnection();
    if ($pdo) {
        // Auto-create email_otps table if it does not exist in MySQL
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `email_otps` (
              `id` INT AUTO_INCREMENT PRIMARY KEY,
              `email` VARCHAR(191) NOT NULL,
              `otp_code` VARCHAR(10) NOT NULL,
              `expires_at` DATETIME NOT NULL,
              `verified` TINYINT(1) DEFAULT 0,
              `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              INDEX idx_email_otp (`email`, `otp_code`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");

        // Invalidate previous OTPs for this email
        $updateStmt = $pdo->prepare("UPDATE email_otps SET verified = 1 WHERE email = :email");
        $updateStmt->execute([':email' => $email]);

        // Insert new OTP record
        $stmt = $pdo->prepare("INSERT INTO email_otps (email, otp_code, expires_at, created_at) VALUES (:email, :otp_code, :expires_at, NOW())");
        $stmt->execute([
            ':email' => $email,
            ':otp_code' => $otpCode,
            ':expires_at' => $expiresAt
        ]);
    }
} catch (Throwable $dbErr) {
    error_log("Database OTP storage warning: " . $dbErr->getMessage());
    // Session fallback is already populated above, so execution continues!
}

// 2. Dispatch OTP email
try {
    $mailSent = sendOTPEmail($email, $otpCode);

    if ($mailSent) {
        echo json_encode([
            'status' => 'success',
            'success' => true,
            'message' => 'Verification OTP sent to ' . $email . '. Please check your inbox or spam folder.',
            'expires_in' => 600
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'success' => false,
            'message' => 'Unable to send OTP email to ' . $email . '. Please check server mail settings or Zoho SMTP configuration in config.php.'
        ]);
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'success' => false,
        'message' => 'Failed to send OTP code: ' . $e->getMessage()
    ]);
}
