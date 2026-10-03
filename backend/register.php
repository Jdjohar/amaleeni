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
$fullName = trim($data['fullName'] ?? '');
$orgName = trim($data['orgName'] ?? '');
$designation = trim($data['designation'] ?? 'Founder / Leader');
$phone = trim($data['phone'] ?? '');
$cleanPhone = preg_replace('/[^0-9]/', '', $phone);
$city = trim($data['cityPin'] ?? ($data['city'] ?? ''));
$email = trim(strtolower($data['email'] ?? ''));
if (empty($email) && !empty($cleanPhone)) {
    $email = $cleanPhone . '@amaleeni.member';
}
$password = $data['password'] ?? '';
$category = trim($data['profileCategory'] ?? 'Entrepreneurs & Founders');
$sector = trim($data['sector'] ?? 'Technology & Digital');
$stateCountry = trim($data['stateCountry'] ?? 'India');
$websiteUrl = trim($data['websiteUrl'] ?? '');
$seeking = is_array($data['seeking'] ?? null) ? implode(', ', $data['seeking']) : trim($data['seeking'] ?? 'Market & Buyer Access, Capital & Investment');
$businessDescription = trim($data['businessDescription'] ?? '');

if (empty($fullName) || empty($phone) || empty($orgName) || empty($email)) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Please fill all required fields: Name, Organisation, Email, WhatsApp Number.']);
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

// Auto-heal pink_pages_profiles table if missing (Must run BEFORE transaction to prevent implicit commit)
if ($pdo) {
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `pink_pages_profiles` (
              `id` INT AUTO_INCREMENT PRIMARY KEY,
              `user_id` INT NOT NULL UNIQUE,
              `ref_id` VARCHAR(50) NOT NULL UNIQUE,
              `org_name` VARCHAR(200) NOT NULL,
              `designation` VARCHAR(150) NULL DEFAULT 'Founder / Leader',
              `category` VARCHAR(100) NOT NULL DEFAULT 'Entrepreneurs & Founders',
              `sector` VARCHAR(120) NOT NULL,
              `city` VARCHAR(100) NOT NULL,
              `state_country` VARCHAR(100) NOT NULL,
              `website_url` VARCHAR(255) NULL,
              `seeking` TEXT NULL,
              `business_description` TEXT NULL,
              `payment_status` VARCHAR(20) DEFAULT 'PENDING',
              `payment_amount` DECIMAL(10,2) DEFAULT 5000.00,
              `razorpay_payment_id` VARCHAR(191) NULL,
              `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ");
    } catch (Throwable $e) {}

    try {
        $pdo->exec("ALTER TABLE `pink_pages_profiles` ADD COLUMN `designation` VARCHAR(150) NULL DEFAULT 'Founder / Leader' AFTER `org_name`");
    } catch (Throwable $e) {}
}

// ==========================================
// 3. CHECK FOR DUPLICATE EMAIL OR PHONE (PDO Prepared Statement)
// ==========================================
if ($pdo) {
    $stmt = $pdo->prepare("SELECT id, email, phone FROM users WHERE email = :email OR (phone = :phone AND phone != '') LIMIT 1");
    $stmt->execute([':email' => $email, ':phone' => $phone]);
    $existingUser = $stmt->fetch();
    if ($existingUser) {
        http_response_code(409);
        $errMsg = (strtolower($existingUser['email']) === $email) 
            ? 'An account with this email address already exists. Please log into your account.' 
            : 'An account with this WhatsApp number already exists. Please log into your account.';
        echo json_encode(['status' => 'error', 'message' => $errMsg]);
        exit;
    }
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
        (user_id, ref_id, org_name, designation, category, sector, city, state_country, website_url, seeking, business_description, payment_status, payment_amount, created_at)
        VALUES 
        (:user_id, :ref_id, :org_name, :designation, :category, :sector, :city, :state_country, :website_url, :seeking, :business_description, 'PENDING', 5000.00, NOW())
    ");
    $profileStmt->execute([
        ':user_id' => $userId,
        ':ref_id' => $refId,
        ':org_name' => $orgName,
        ':designation' => $designation,
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
        'designation' => $designation,
        'sector' => $sector,
        'category' => $category,
        'city' => $city,
        'state_country' => $stateCountry,
        'payment_status' => 'PENDING',
        'payment_amount' => 5000.00
    ];

    // Send Registration Email Notification
    try {
        sendRegistrationEmail($userPayload, [
            'ref_id' => $refId,
            'org_name' => $orgName,
            'sector' => $sector,
            'category' => $category
        ]);
    } catch (Throwable $mailErr) {
        error_log('Registration email notification note: ' . $mailErr->getMessage());
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Registration successful! Registration confirmation email sent.',
        'token' => $token,
        'user' => $userPayload
    ]);

} catch (Throwable $e) {
    if ($pdo && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Registration failed: ' . $e->getMessage()
    ]);
}
