<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?? $_POST;

$userId = intval($data['userId'] ?? 0);
if ($userId <= 0) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'User ID is required.']);
    exit;
}

$pdo = getDbConnection();

// Fetch user profile
$stmt = $pdo->prepare("SELECT u.email, u.full_name, p.ref_id, p.payment_status FROM users u JOIN pink_pages_profiles p ON u.id = p.user_id WHERE u.id = :id");
$stmt->execute([':id' => $userId]);
$user = $stmt->fetch();

if (!$user) {
    http_response_code(404);
    echo json_encode(['status' => 'error', 'message' => 'User not found.']);
    exit;
}

if ($user['payment_status'] === 'PAID') {
    echo json_encode([
        'status' => 'success',
        'alreadyPaid' => true,
        'message' => 'Membership is already active.'
    ]);
    exit;
}

    $settings = getSiteSettings($pdo);
    $keyId = !empty($settings['razorpay_key_id']) ? $settings['razorpay_key_id'] : (defined('RAZORPAY_KEY_ID') ? RAZORPAY_KEY_ID : '');
    $keySecret = !empty($settings['razorpay_key_secret']) ? $settings['razorpay_key_secret'] : (defined('RAZORPAY_KEY_SECRET') ? RAZORPAY_KEY_SECRET : '');

    $receipt = 'RCPT-' . $user['ref_id'] . '-' . time();
    $amountPaise = MEMBERSHIP_FEE_PAISE; // 500000 paise = Rs 5000

    // Check if key is placeholder or empty or keySecret === keyId (duplicate paste)
    if (empty($keyId) || empty($keySecret) || $keyId === $keySecret || strpos($keyId, 'YourKeyId') !== false || strpos($keyId, 'rzp_test_YourKeyId') !== false) {
        $mockOrderId = 'order_mock_' . bin2hex(random_bytes(8));
        echo json_encode([
            'status' => 'success',
            'isMock' => true,
            'orderId' => $mockOrderId,
            'amount' => $amountPaise,
            'currency' => 'INR',
            'keyId' => $keyId,
            'user' => [
                'name' => $user['full_name'],
                'email' => $user['email']
            ]
        ]);
        exit;
    }

    // ==========================================
    // CREATE ORDER IN RAZORPAY API
    // ==========================================
    $ch = curl_init('https://api.razorpay.com/v1/orders');
    curl_setopt($ch, CURLOPT_USERPWD, $keyId . ':' . $keySecret);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'amount' => $amountPaise,
        'currency' => 'INR',
        'receipt' => $receipt,
        'notes' => [
            'user_id' => $userId,
            'ref_id' => $user['ref_id'],
            'purpose' => 'Pink Pages Annual Membership + AW2027 Pass'
        ]
    ]));

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $orderData = json_decode($response, true);

    if ($httpCode === 200 && !empty($orderData['id'])) {
        $razorpayOrderId = $orderData['id'];

        // Record order in local DB
        try {
            $orderStmt = $pdo->prepare("
                INSERT INTO orders (user_id, razorpay_order_id, amount, currency, status, created_at)
                VALUES (:user_id, :order_id, :amount, 'INR', 'created', NOW())
            ");
            $orderStmt->execute([
                ':user_id' => $userId,
                ':order_id' => $razorpayOrderId,
                ':amount' => $amountPaise
            ]);
        } catch (Throwable $e) {}

        echo json_encode([
            'status' => 'success',
            'orderId' => $razorpayOrderId,
            'amount' => $amountPaise,
            'currency' => 'INR',
            'keyId' => $keyId,
            'user' => [
                'name' => $user['full_name'],
                'email' => $user['email']
            ]
        ]);
    } else {
        $mockOrderId = 'order_mock_' . bin2hex(random_bytes(8));
        echo json_encode([
            'status' => 'success',
            'isMock' => true,
            'orderId' => $mockOrderId,
            'amount' => $amountPaise,
            'currency' => 'INR',
            'keyId' => $keyId,
            'user' => [
                'name' => $user['full_name'],
                'email' => $user['email']
            ]
        ]);
    }
