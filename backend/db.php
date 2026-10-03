<?php
require_once __DIR__ . '/config.php';

function getDbConnection() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false, // Enforce real prepared statements for 100% SQL injection prevention
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        ensureTablesExist($pdo);
        return $pdo;
    } catch (PDOException $e) {
        error_log('Database connection note: ' . $e->getMessage());
        return null;
    }
}

function getSiteSettings($pdo = null) {
    if (!$pdo) {
        $pdo = getDbConnection();
    }
    static $cachedSettings = null;
    if ($cachedSettings !== null) return $cachedSettings;

    $cachedSettings = [];
    if (!$pdo) return $cachedSettings;

    try {
        $stmt = $pdo->query("SELECT setting_key, setting_value FROM site_settings");
        if ($stmt) {
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($rows as $r) {
                $cachedSettings[$r['setting_key']] = $r['setting_value'];
            }
        }
    } catch (Throwable $e) {}

    return $cachedSettings;
}

function ensureTablesExist($pdo) {
    if (!$pdo) return;

    // 1. Users Table
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `users` (
              `id` INT AUTO_INCREMENT PRIMARY KEY,
              `full_name` VARCHAR(191) NOT NULL,
              `email` VARCHAR(191) NOT NULL UNIQUE,
              `phone` VARCHAR(50) NULL,
              `password_hash` VARCHAR(255) NOT NULL,
              `role` VARCHAR(20) DEFAULT 'user',
              `permissions` TEXT NULL,
              `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ");
    } catch (Throwable $e) {}

    try { $pdo->exec("ALTER TABLE `users` ADD COLUMN `role` VARCHAR(20) DEFAULT 'user'"); } catch (Throwable $e) {}
    try { $pdo->exec("ALTER TABLE `users` ADD COLUMN `permissions` TEXT NULL"); } catch (Throwable $e) {}

    // 2. Pink Pages Profiles Table
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

    // Fallback/Legacy Profiles Table
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `profiles` (
              `id` INT AUTO_INCREMENT PRIMARY KEY,
              `user_id` INT NOT NULL UNIQUE,
              `org_name` VARCHAR(191) NOT NULL,
              `designation` VARCHAR(191) NULL,
              `sector` VARCHAR(191) NULL,
              `category` VARCHAR(191) NULL,
              `city` VARCHAR(191) NULL,
              `state_country` VARCHAR(191) NULL,
              `website_url` VARCHAR(255) NULL,
              `seeking` TEXT NULL,
              `business_description` TEXT NULL,
              `payment_status` VARCHAR(20) DEFAULT 'PENDING',
              `payment_amount` DECIMAL(10,2) DEFAULT 5000.00,
              `razorpay_payment_id` VARCHAR(191) NULL,
              `ref_id` VARCHAR(50) NOT NULL UNIQUE,
              `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ");
    } catch (Throwable $e) {}

    // 3. Team Members Table (/team roster)
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `team_members` (
              `id` INT AUTO_INCREMENT PRIMARY KEY,
              `name` VARCHAR(191) NOT NULL,
              `role` VARCHAR(191) NOT NULL,
              `category` VARCHAR(50) NOT NULL DEFAULT 'Secretariat',
              `bio` TEXT NULL,
              `status` VARCHAR(50) DEFAULT 'Confirmed',
              `image` VARCHAR(255) NULL,
              `sort_order` INT DEFAULT 0,
              `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ");
    } catch (Throwable $e) {}

    // 4. Site Settings Table (Razorpay Keys, Contact, Social, Map)
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `site_settings` (
              `setting_key` VARCHAR(191) PRIMARY KEY,
              `setting_value` LONGTEXT NULL,
              `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ");
    } catch (Throwable $e) {}

    // 5. Contact Submissions Table
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `contact_submissions` (
              `id` INT AUTO_INCREMENT PRIMARY KEY,
              `form_type` VARCHAR(191) NOT NULL,
              `full_name` VARCHAR(191) NULL,
              `email` VARCHAR(191) NOT NULL,
              `phone` VARCHAR(50) NULL,
              `organization` VARCHAR(191) NULL,
              `sector` VARCHAR(191) NULL,
              `message` TEXT NULL,
              `details_json` TEXT NULL,
              `status` VARCHAR(20) DEFAULT 'NEW',
              `admin_notes` TEXT NULL,
              `ip_address` VARCHAR(45) NULL,
              `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ");
    } catch (Throwable $e) {}

    // 6. Newsletter Subscribers Table
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
              `id` INT AUTO_INCREMENT PRIMARY KEY,
              `email` VARCHAR(191) NOT NULL UNIQUE,
              `ip_address` VARCHAR(45) NULL,
              `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ");
    } catch (Throwable $e) {}

    // Seed default super admin user if not exists
    try {
        $adminEmail = 'president@amaleeni.com';
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email");
        $stmt->execute([':email' => $adminEmail]);
        if (!$stmt->fetch()) {
            $passHash = password_hash('AmaleeniAdmin@2027', PASSWORD_DEFAULT);
            $ins = $pdo->prepare("INSERT INTO users (full_name, email, phone, password_hash, role) VALUES ('Dr. Akshaya Jain', :email, '+91 98100 55241', :hash, 'admin')");
            $ins->execute([':email' => $adminEmail, ':hash' => $passHash]);
        }
    } catch (Throwable $e) {}

    // Seed default site settings if empty
    try {
        $checkSt = $pdo->query("SELECT COUNT(*) FROM site_settings")->fetchColumn();
        if ($checkSt == 0) {
            $defaultSettings = [
                'razorpay_key_id' => 'rzp_test_YourKeyIdHere',
                'razorpay_key_secret' => 'YourKeySecretHere',
                'razorpay_webhook_secret' => 'amalEEni27$',
                'whatsapp_number' => '+91 98100 55241',
                'phone_number' => '+91 98100 55241',
                'contact_email' => 'hello@amaleeni.com',
                'secretariat_email' => 'delegates@amaleeni.com',
                'registered_address' => 'Krishna Co-op Society, Boat Club Road, Pune, Maharashtra 411003',
                'google_map_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.996173003254!2d73.8741!3d18.5284',
                'facebook_url' => 'https://facebook.com/amaleenifoundation',
                'instagram_url' => 'https://instagram.com/amaleenifoundation',
                'linkedin_url' => 'https://linkedin.com/company/amaleeni-foundation',
                'youtube_url' => 'https://youtube.com/@amaleenifoundation',
                'twitter_url' => 'https://twitter.com/amaleeni',
            ];
            $stIns = $pdo->prepare("REPLACE INTO site_settings (setting_key, setting_value) VALUES (:k, :v)");
            foreach ($defaultSettings as $k => $v) {
                $stIns->execute([':k' => $k, ':v' => $v]);
            }
        }
    } catch (Throwable $e) {}

    // Seed default Team Members if empty
    try {
        $checkTm = $pdo->query("SELECT COUNT(*) FROM team_members")->fetchColumn();
        if ($checkTm == 0) {
            $initialRoster = [
                ['Dr. Akshaya Jain', 'President, Amaleeni Foundation', 'Leadership', 'Aesthetic Physician, Founder of Skintillatingg & Chromocosmo Institute (CIATN). 10+ years dedicated to women’s economic self-reliance and community empowerment.', 'Confirmed', '/assets/Akshaya Jain.jpeg', 1],
                ['Nitinchandra Jain', 'Trustee & Strategic Advisor', 'Leadership', 'Advising on institutional governance, strategic alignment, and long-term organizational initiatives of Amaleeni Foundation.', 'Confirmed', '/assets/Nitinchandra Jain.png', 2],
                ['Amruta Jain', 'Trustee & Governing Member', 'Leadership', 'Guiding philanthropic outreach, community coordination, and empowerment programs across Western and Northern India.', 'Confirmed', '/assets/Amruta Jain.png', 3],
                ['Priya Pawar', 'Core Management & Operations', 'Leadership', 'Coordinating floor operations, institutional logistics, and delegate stakeholder engagement for the summit.', 'Confirmed', '/assets/Priya Pawar.jpeg', 4],
                ['Sahil Sharma', 'Strategy & Technology Outreach', 'Leadership', 'Managing digital architecture, portal operations, and ecosystem engagement for Amaleeni Womenpreneurs 2027.', 'Confirmed', '/assets/Sahil Sharma.png', 5],
                ['Ashwini Kumar', 'Design & Communications Lead', 'Secretariat', 'Directing summit visual identity, brand communications, creative digital media, and attendee storytelling.', 'Confirmed', '/assets/Aswini-Kumar.png', 6],
                ['Ramakrishna Padhy', 'Media & PR Lead', 'Secretariat', 'Steering national press relations, media alliances, broadcast channels, and global summit publicity.', 'Confirmed', '/assets/RAMAKRISHNA.png', 7],
            ];
            $tmIns = $pdo->prepare("INSERT INTO team_members (name, role, category, bio, status, image, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)");
            foreach ($initialRoster as $row) {
                $tmIns->execute($row);
            }
        }
    } catch (Throwable $e) {}
}
