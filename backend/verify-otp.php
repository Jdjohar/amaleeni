<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

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
$otpCode = trim($data['otp_code'] ?? ($data['otp'] ?? ''));

if (empty($email) || empty($otpCode)) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Email and OTP code are required.']);
    exit;
}

$isVerified = false;

// 1. Check Session Fallback
$sessionKey = 'otp_' . md5($email);
if (isset($_SESSION[$sessionKey])) {
    $sessOtp = $_SESSION[$sessionKey];
    if ($sessOtp['code'] === $otpCode && time() <= $sessOtp['expires']) {
        $_SESSION[$sessionKey]['verified'] = true;
        $isVerified = true;
    }
}

// 2. Check Database if not verified via session
if (!$isVerified) {
    try {
        $pdo = getDbConnection();
        if ($pdo) {
            $stmt = $pdo->prepare("
                SELECT id FROM email_otps 
                WHERE email = :email AND otp_code = :otp_code AND verified = 0 AND expires_at >= NOW()
                ORDER BY id DESC LIMIT 1
            ");
            $stmt->execute([
                ':email' => $email,
                ':otp_code' => $otpCode
            ]);

            $otpRecord = $stmt->fetch();

            if ($otpRecord) {
                $markStmt = $pdo->prepare("UPDATE email_otps SET verified = 1 WHERE id = :id");
                $markStmt->execute([':id' => $otpRecord['id']]);
                $isVerified = true;
            }
        }
    } catch (Exception $e) {
        // Log DB exception silently
    }
}

if ($isVerified) {
    echo json_encode([
        'status' => 'success',
        'success' => true,
        'verified' => true,
        'message' => 'Email verified successfully!'
    ]);
} else {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'success' => false,
        'verified' => false,
        'message' => 'Invalid or expired OTP code. Please request a new code.'
    ]);
}
