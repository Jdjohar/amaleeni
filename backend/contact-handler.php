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

// Honeypot & bot detection check
verifyHoneypot($data);

// Sanitize all inputs to protect against XSS injection
$fullName = sanitizeTextInput($data['fullName'] ?? ($data['name'] ?? ''), 150);
$email = trim(strtolower(filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL)));
$phone = sanitizeTextInput($data['phone'] ?? ($data['phoneNumber'] ?? ''), 30);
$formType = sanitizeTextInput($data['form_type'] ?? ($data['subject'] ?? ($data['formName'] ?? 'Secretariat Inquiry')), 100);
$message = sanitizeTextInput($data['message'] ?? ($data['bio'] ?? ($data['comments'] ?? '')), 3000);

$orgName = sanitizeTextInput($data['orgName'] ?? ($data['organization'] ?? ''), 200);
$sector = sanitizeTextInput($data['sector'] ?? '', 100);
$district = sanitizeTextInput($data['district'] ?? '', 100);
$investmentRange = sanitizeTextInput($data['investmentRange'] ?? '', 100);
$partnerTier = sanitizeTextInput($data['partnerTier'] ?? '', 100);
$pincode = sanitizeTextInput($data['pincode'] ?? '', 20);
$category = sanitizeTextInput($data['category'] ?? '', 100);

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Please provide a valid email address.']);
    exit;
}

// 1. Record submission into MySQL database (isolated try-catch so DB issues do not break email sending)
try {
    $pdo = getDbConnection();
    if ($pdo) {
        $ipAddress = $_SERVER['REMOTE_ADDR'] ?? '';

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
              `ip_address` VARCHAR(45) NULL,
              `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ");

        $stmt = $pdo->prepare("
            INSERT INTO `contact_submissions` 
            (`form_type`, `full_name`, `email`, `phone`, `organization`, `sector`, `message`, `details_json`, `ip_address`, `created_at`) 
            VALUES (:form_type, :full_name, :email, :phone, :organization, :sector, :message, :details_json, :ip_address, NOW())
        ");

        $stmt->execute([
            ':form_type' => $formType,
            ':full_name' => $fullName,
            ':email' => $email,
            ':phone' => $phone,
            ':organization' => $orgName,
            ':sector' => $sector,
            ':message' => $message,
            ':details_json' => json_encode($data, JSON_UNESCAPED_UNICODE),
            ':ip_address' => $ipAddress,
        ]);
    }
} catch (Throwable $dbErr) {
    error_log('DB Log Error (non-blocking): ' . $dbErr->getMessage());
}

// 2. Build email notification data dictionary
$formDataDict = [
    'Form Type' => $formType,
    'Full Name' => $fullName,
    'Email Address' => $email,
    'Phone Number' => $phone,
];

if (!empty($orgName)) $formDataDict['Organization'] = $orgName;
if (!empty($sector)) $formDataDict['Sector'] = $sector;
if (!empty($district)) $formDataDict['District / State'] = $district;
if (!empty($pincode)) $formDataDict['Pincode'] = $pincode;
if (!empty($investmentRange)) $formDataDict['Investment Range'] = $investmentRange;
if (!empty($partnerTier)) $formDataDict['Partnership Tier'] = $partnerTier;
if (!empty($category)) $formDataDict['Category / Desk'] = $category;
if (!empty($message)) $formDataDict['Message / Details'] = $message;
$formDataDict['Submitted At'] = date('Y-m-d H:i:s T');

// 3. Send dual email notification (User Confirmation + Admin Alert)
try {
    $mailResult = sendFormNotificationEmail($email, $fullName, $formType, $formDataDict);

    echo json_encode([
        'status' => 'success',
        'message' => 'Your inquiry has been submitted successfully! Confirmation email dispatched.',
        'mail_sent' => $mailResult
    ]);
} catch (Throwable $mailErr) {
    error_log('Mail Send Error: ' . $mailErr->getMessage());
    echo json_encode([
        'status' => 'success',
        'message' => 'Your inquiry has been submitted successfully.'
    ]);
}

