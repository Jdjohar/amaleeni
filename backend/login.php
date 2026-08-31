<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?? $_POST;

// Honeypot bot protection
if (!empty($data['website_bot_trap'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Bot detection triggered.']);
    exit;
}

$email = trim(strtolower($data['email'] ?? ''));
$password = $data['password'] ?? '';
$clientIp = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';

if (empty($email) || empty($password)) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Please enter both email and password.']);
    exit;
}

$pdo = getDbConnection();

// ==========================================
// 1. BRUTE-FORCE / BOT RATE LIMITING
// ==========================================
// Max 5 failed attempts in the last 10 minutes per IP
$tenMinutesAgo = date('Y-m-d H:i:s', time() - 600);
$checkAttempts = $pdo->prepare("
    SELECT COUNT(*) as failed_count FROM login_attempts 
    WHERE ip_address = :ip AND attempt_time > :ten_mins
");
$checkAttempts->execute([':ip' => $clientIp, ':ten_mins' => $tenMinutesAgo]);
$attemptsRow = $checkAttempts->fetch();

if ($attemptsRow && intval($attemptsRow['failed_count']) >= 5) {
    http_response_code(429);
    echo json_encode([
        'status' => 'error',
        'message' => 'Too many failed login attempts. Please wait 10 minutes before trying again.'
    ]);
    exit;
}

// ==========================================
// 2. FETCH USER (PDO PREPARED STATEMENT - 100% SQLi SAFE)
// ==========================================
$stmt = $pdo->prepare("
    SELECT u.id, u.full_name, u.email, u.password_hash, u.phone, u.role, u.status,
           p.ref_id, p.org_name, p.category, p.sector, p.city, p.state_country, 
           p.website_url, p.seeking, p.business_description, p.payment_status, p.payment_amount, p.paid_at
    FROM users u
    LEFT JOIN pink_pages_profiles p ON u.id = p.user_id
    WHERE u.email = :email
    LIMIT 1
");
$stmt->execute([':email' => $email]);
$user = $stmt->fetch();

// ==========================================
// 3. VERIFY PASSWORD
// ==========================================
if (!$user || !password_verify($password, $user['password_hash'])) {
    // Record failed attempt
    $logStmt = $pdo->prepare("INSERT INTO login_attempts (ip_address, email, attempt_time) VALUES (:ip, :email, NOW())");
    $logStmt->execute([':ip' => $clientIp, ':email' => $email]);

    http_response_code(401);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid email or password. Please check your credentials.'
    ]);
    exit;
}

if ($user['status'] !== 'active') {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'Your account is currently inactive. Contact secretariat.']);
    exit;
}

// Successful login: clear old attempts for this IP
$clearStmt = $pdo->prepare("DELETE FROM login_attempts WHERE ip_address = :ip");
$clearStmt->execute([':ip' => $clientIp]);

// Update last login
$updateStmt = $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = :id");
$updateStmt->execute([':id' => $user['id']]);

// Generate session token
$token = bin2hex(random_bytes(32));

$userData = [
    'id' => $user['id'],
    'full_name' => $user['full_name'],
    'email' => $user['email'],
    'phone' => $user['phone'],
    'role' => $user['role'],
    'ref_id' => $user['ref_id'] ?? 'PP-' . $user['id'],
    'org_name' => $user['org_name'] ?? '',
    'sector' => $user['sector'] ?? '',
    'category' => $user['category'] ?? '',
    'city' => $user['city'] ?? '',
    'state_country' => $user['state_country'] ?? '',
    'website_url' => $user['website_url'] ?? '',
    'seeking' => $user['seeking'] ?? '',
    'business_description' => $user['business_description'] ?? '',
    'payment_status' => $user['payment_status'] ?? 'PENDING',
    'payment_amount' => $user['payment_amount'] ?? 5000.00,
    'paid_at' => $user['paid_at']
];

echo json_encode([
    'status' => 'success',
    'message' => 'Login successful',
    'token' => $token,
    'user' => $userData
]);
