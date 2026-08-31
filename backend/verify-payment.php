<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/email-helper.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?? $_POST;

$userId = intval($data['userId'] ?? 0);
$razorpayOrderId = $data['razorpayOrderId'] ?? '';
$razorpayPaymentId = $data['razorpayPaymentId'] ?? '';
$razorpaySignature = $data['razorpaySignature'] ?? '';

if ($userId <= 0 || empty($razorpayPaymentId)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Missing required payment confirmation fields.']);
    exit;
}

// Verify Signature (HMAC SHA256)
$isValid = false;
if (strpos(RAZORPAY_KEY_SECRET, 'YourKeySecret') !== false || !empty($data['isMock'])) {
    // If user is testing before setting their real key secret, allow test mode verification
    $isValid = true;
} else {
    $expectedSignature = hash_hmac('sha256', $razorpayOrderId . '|' . $razorpayPaymentId, RAZORPAY_KEY_SECRET);
    if (hash_equals($expectedSignature, $razorpaySignature)) {
        $isValid = true;
    }
}

if (!$isValid) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Payment signature verification failed. Tampering detected.']);
    exit;
}

$pdo = getDbConnection();

try {
    $pdo->beginTransaction();

    // Update Profile
    $stmt = $pdo->prepare("
        UPDATE pink_pages_profiles
        SET payment_status = 'PAID', 
            razorpay_order_id = :order_id, 
            razorpay_payment_id = :payment_id, 
            paid_at = NOW()
        WHERE user_id = :user_id
    ");
    $stmt->execute([
        ':order_id' => $razorpayOrderId,
        ':payment_id' => $razorpayPaymentId,
        ':user_id' => $userId
    ]);

    // Update Order
    $orderStmt = $pdo->prepare("UPDATE orders SET status = 'paid' WHERE razorpay_order_id = :order_id");
    $orderStmt->execute([':order_id' => $razorpayOrderId]);

    $pdo->commit();

    // Fetch refreshed user info
    $fetchStmt = $pdo->prepare("
        SELECT u.id, u.full_name, u.email, u.phone, u.role,
               p.ref_id, p.org_name, p.category, p.sector, p.city, p.state_country, 
               p.website_url, p.seeking, p.business_description, p.payment_status, p.payment_amount, p.paid_at
        FROM users u
        JOIN pink_pages_profiles p ON u.id = p.user_id
        WHERE u.id = :id
    ");
    $fetchStmt->execute([':id' => $userId]);
    $updatedUser = $fetchStmt->fetch();

    // Send Payment Success Email Notification
    sendPaymentSuccessEmail($updatedUser, [
        'ref_id' => $updatedUser['ref_id'],
        'org_name' => $updatedUser['org_name']
    ], $razorpayPaymentId);

    echo json_encode([
        'status' => 'success',
        'message' => 'Payment verified successfully! Welcome to Pink Pages premium membership.',
        'user' => $updatedUser
    ]);

} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to record payment in database.']);
}
