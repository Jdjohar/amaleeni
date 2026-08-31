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

try {
    $pdo = getDbConnection();

    // ==========================================
    // 1. SAFE BRUTE-FORCE RATE LIMITING
    // ==========================================
    try {
        $pdo->exec("CREATE TABLE IF NOT EXISTS `login_attempts` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `ip_address` VARCHAR(45) NOT NULL,
          `email` VARCHAR(191) NOT NULL,
          `attempt_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_ip_time (`ip_address`, `attempt_time`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

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
    } catch (Throwable $limitErr) {
        // Rate limiting table issue should never prevent legit logins
        error_log('Rate limiting check warning: ' . $limitErr->getMessage());
    }

    // Ensure designation column exists if possible
    try {
        $pdo->exec("ALTER TABLE `pink_pages_profiles` ADD COLUMN `designation` VARCHAR(150) NULL DEFAULT 'Founder / Leader' AFTER `org_name`");
    } catch (Throwable $colErr) {
        // Column may already exist or table locked, ignore safely
    }

    // ==========================================
    // 2. FETCH USER (SAFE COLUMN SELECTION)
    // ==========================================
    // Clean identifier for phone matching
    $cleanPhone = preg_replace('/[^0-9]/', '', $email);

    $stmt = $pdo->prepare("
        SELECT u.id, u.full_name, u.email, u.password_hash, u.phone, u.role, u.status,
               p.ref_id, p.org_name, p.category, p.sector, p.city, p.state_country, 
               p.website_url, p.seeking, p.business_description, p.payment_status, p.payment_amount, p.paid_at,
               COALESCE(p.designation, 'Founder / Leader') AS designation
        FROM users u
        LEFT JOIN pink_pages_profiles p ON u.id = p.user_id
        WHERE u.email = :identifier 
           OR u.phone = :identifier 
           OR (u.phone != '' AND :clean_phone != '' AND REPLACE(REPLACE(REPLACE(u.phone, ' ', ''), '-', ''), '+', '') LIKE CONCAT('%', :clean_phone))
        LIMIT 1
    ");
    
    // If the above query fails due to missing designation, fallback to query without it
    try {
        $stmt->execute([
            ':identifier' => $email,
            ':clean_phone' => $cleanPhone
        ]);
        $user = $stmt->fetch();
    } catch (Throwable $queryErr) {
        // Fallback query without designation column
        $fallbackStmt = $pdo->prepare("
            SELECT u.id, u.full_name, u.email, u.password_hash, u.phone, u.role, u.status,
                   p.ref_id, p.org_name, p.category, p.sector, p.city, p.state_country, 
                   p.website_url, p.seeking, p.business_description, p.payment_status, p.payment_amount, p.paid_at
            FROM users u
            LEFT JOIN pink_pages_profiles p ON u.id = p.user_id
            WHERE u.email = :identifier OR u.phone = :identifier
            LIMIT 1
        ");
        $fallbackStmt->execute([':identifier' => $email]);
        $user = $fallbackStmt->fetch();
        if ($user) {
            $user['designation'] = 'Founder / Leader';
        }
    }

    // ==========================================
    // 3. VERIFY PASSWORD
    // ==========================================
    if (!$user || !password_verify($password, $user['password_hash'])) {
        try {
            $logStmt = $pdo->prepare("INSERT INTO login_attempts (ip_address, email, attempt_time) VALUES (:ip, :email, NOW())");
            $logStmt->execute([':ip' => $clientIp, ':email' => $email]);
        } catch (Throwable $logErr) {
            // ignore
        }

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
    try {
        $clearStmt = $pdo->prepare("DELETE FROM login_attempts WHERE ip_address = :ip");
        $clearStmt->execute([':ip' => $clientIp]);
    } catch (Throwable $clearErr) {
        // ignore
    }

    // Update last login
    try {
        $updateStmt = $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = :id");
        $updateStmt->execute([':id' => $user['id']]);
    } catch (Throwable $updateErr) {
        // ignore
    }

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
        'designation' => $user['designation'] ?? 'Founder / Leader',
        'sector' => $user['sector'] ?? '',
        'category' => $user['category'] ?? '',
        'city' => $user['city'] ?? '',
        'state_country' => $user['state_country'] ?? '',
        'website_url' => $user['website_url'] ?? '',
        'seeking' => $user['seeking'] ?? '',
        'business_description' => $user['business_description'] ?? '',
        'payment_status' => $user['payment_status'] ?? 'PENDING',
        'payment_amount' => $user['payment_amount'] ?? 5000.00,
        'paid_at' => $user['paid_at'] ?? null
    ];

    echo json_encode([
        'status' => 'success',
        'message' => 'Login successful',
        'token' => $token,
        'user' => $userData
    ]);

} catch (Throwable $fatalErr) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Server error: ' . $fatalErr->getMessage()
    ]);
    exit;
}
