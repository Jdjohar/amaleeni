<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/email-helper.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?? $_POST;

// ==========================================
// 1. BOT PROTECTION CHECKS
// ==========================================
// Honeypot field (bots fill invisible fields, humans leave them blank)
if (!empty($data['website_bot_trap']) || !empty($data['company_fax_trap'])) {
    // Silently reject or simulate delay to waste bot resources
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Spam verification triggered.']);
    exit;
}

// Timestamp check (humans take at least 3-5 seconds to fill form)
if (!empty($data['form_loaded_at'])) {
    $timeTaken = time() - intval($data['form_loaded_at']);
    if ($timeTaken < 2) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Form submitted too quickly. Please try again.']);
        exit;
    }
}

// ==========================================
// 2. INPUT SANITIZATION & VALIDATION
// ==========================================
$fullName = trim($data['fullName'] ?? '');
$email = trim(strtolower($data['email'] ?? ''));
$phone = trim($data['phone'] ?? '');
$password = $data['password'] ?? '';
$orgName = trim($data['orgName'] ?? '');
$category = trim($data['profileCategory'] ?? 'Entrepreneurs & Founders');
$sector = trim($data['sector'] ?? 'Technology & Digital');
$city = trim($data['city'] ?? '');
$stateCountry = trim($data['stateCountry'] ?? 'India');
$websiteUrl = trim($data['websiteUrl'] ?? '');
$seeking = is_array($data['seeking'] ?? null) ? implode(', ', $data['seeking']) : trim($data['seeking'] ?? '');
$businessDescription = trim($data['businessDescription'] ?? '');

if (empty($fullName) || empty($email) || empty($phone) || empty($orgName)) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Please fill all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address format.']);
    exit;
}

if (empty($password) || strlen($password) < 6) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Password must be at least 6 characters long.']);
    exit;
}

$pdo = getDbConnection();

// ==========================================
// 3. CHECK FOR DUPLICATE EMAIL (PDO Prepared Statement)
// ==========================================
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email LIMIT 1");
$stmt->execute([':email' => $email]);
if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(['status' => 'error', 'message' => 'An account with this email already exists. Please log in.']);
    exit;
}

// ==========================================
// 4. HASH PASSWORD & GENERATE REF ID
// ==========================================
$passwordHash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
$refId = 'PP-' . strtoupper(substr(uniqid(), -6));

// ==========================================
// 5. DATABASE TRANSACTION
// ==========================================
try {
    $pdo->beginTransaction();

    // Insert user
    $userStmt = $pdo->prepare("
        INSERT INTO users (full_name, email, password_hash, phone, role, status, created_at, last_login)
        VALUES (:full_name, :email, :password_hash, :phone, 'member', 'active', NOW(), NOW())
    ");
    $userStmt->execute([
        ':full_name' => $fullName,
        ':email' => $email,
        ':password_hash' => $passwordHash,
        ':phone' => $phone
    ]);
    $userId = $pdo->lastInsertId();

    // Insert Pink Pages profile with payment_status = 'PENDING'
    $profileStmt = $pdo->prepare("
        INSERT INTO pink_pages_profiles 
        (user_id, ref_id, org_name, category, sector, city, state_country, website_url, seeking, business_description, payment_status, payment_amount, created_at)
        VALUES 
        (:user_id, :ref_id, :org_name, :category, :sector, :city, :state_country, :website_url, :seeking, :business_description, 'PENDING', 5000.00, NOW())
    ");
    $profileStmt->execute([
        ':user_id' => $userId,
        ':ref_id' => $refId,
        ':org_name' => $orgName,
        ':category' => $category,
        ':sector' => $sector,
        ':city' => $city,
        ':state_country' => $stateCountry,
        ':website_url' => $websiteUrl,
        ':seeking' => $seeking,
        ':business_description' => $businessDescription
    ]);

    $pdo->commit();

    // Generate secure auth token
    $token = bin2hex(random_bytes(32));

    $userPayload = [
        'id' => $userId,
        'full_name' => $fullName,
        'email' => $email,
        'phone' => $phone,
        'role' => 'member',
        'ref_id' => $refId,
        'org_name' => $orgName,
        'sector' => $sector,
        'category' => $category,
        'city' => $city,
        'state_country' => $stateCountry,
        'payment_status' => 'PENDING',
        'payment_amount' => 5000.00
    ];

    // Send Registration Email Notification
    sendRegistrationEmail($userPayload, [
        'ref_id' => $refId,
        'org_name' => $orgName,
        'sector' => $sector,
        'category' => $category
    ]);

    echo json_encode([
        'status' => 'success',
        'message' => 'Registration successful! Registration confirmation email sent.',
        'token' => $token,
        'user' => $userPayload
    ]);

} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Registration failed due to a server error. Please try again.'
    ]);
}
