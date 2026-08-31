<?php
/**
 * Razorpay Automated Webhook Handler
 * Endpoint URL to set in Razorpay Dashboard:
 * https://linen-oryx-691439.hostingersite.com/razorpay-webhook.php
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/email-helper.php';

header('Content-Type: application/json; charset=UTF-8');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
    exit;
}

$rawPayload = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_RAZORPAY_SIGNATURE'] ?? '';

if (empty($rawPayload) || empty($signature)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Missing payload or signature.']);
    exit;
}

// ==========================================
// 1. VERIFY WEBHOOK SIGNATURE (HMAC SHA256)
// ==========================================
$expectedSignature = hash_hmac('sha256', $rawPayload, RAZORPAY_WEBHOOK_SECRET);

// If user hasn't changed default secret yet, log warning or verify
$isVerified = false;
if (strpos(RAZORPAY_WEBHOOK_SECRET, 'YourWebhookSecret') !== false) {
    // Development/testing mode without custom secret
    $isVerified = true;
} else {
    $isVerified = hash_equals($expectedSignature, $signature);
}

if (!$isVerified) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid webhook signature.']);
    exit;
}

// ==========================================
// 2. PARSE EVENT DATA
// ==========================================
$event = json_decode($rawPayload, true);
$eventType = $event['event'] ?? '';

// We listen for payment.captured or order.paid
if ($eventType !== 'payment.captured' && $eventType !== 'order.paid') {
    // Acknowledge other events gracefully
    http_response_code(200);
    echo json_encode(['status' => 'ignored', 'message' => 'Event ignored: ' . $eventType]);
    exit;
}

$paymentEntity = $event['payload']['payment']['entity'] ?? [];
$orderEntity = $event['payload']['order']['entity'] ?? [];

$paymentId = $paymentEntity['id'] ?? '';
$orderId = $paymentEntity['order_id'] ?? ($orderEntity['id'] ?? '');
$notes = $paymentEntity['notes'] ?? ($orderEntity['notes'] ?? []);

$userId = intval($notes['user_id'] ?? 0);

$pdo = getDbConnection();

// If user_id wasn't in notes, lookup user from orders table using order_id
if ($userId <= 0 && !empty($orderId)) {
    $orderLookup = $pdo->prepare("SELECT user_id FROM orders WHERE razorpay_order_id = :order_id LIMIT 1");
    $orderLookup->execute([':order_id' => $orderId]);
    $orderRow = $orderLookup->fetch();
    if ($orderRow) {
        $userId = intval($orderRow['user_id']);
    }
}

if ($userId <= 0) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'User ID could not be resolved from event.']);
    exit;
}

// ==========================================
// 3. CHECK IF ALREADY MARKED PAID
// ==========================================
$checkStmt = $pdo->prepare("SELECT payment_status FROM pink_pages_profiles WHERE user_id = :user_id LIMIT 1");
$checkStmt->execute([':user_id' => $userId]);
$profileRow = $checkStmt->fetch();

if ($profileRow && $profileRow['payment_status'] === 'PAID') {
    // Already updated, simply return 200 OK so Razorpay doesn't retry
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Payment was already processed.']);
    exit;
}

// ==========================================
// 4. ATOMIC DATABASE UPDATE & RECEIPT EMAIL
// ==========================================
try {
    $pdo->beginTransaction();

    // Update Profile to PAID
    $updateStmt = $pdo->prepare("
        UPDATE pink_pages_profiles 
        SET payment_status = 'PAID', 
            razorpay_order_id = :order_id, 
            razorpay_payment_id = :payment_id, 
            paid_at = NOW()
        WHERE user_id = :user_id
    ");
    $updateStmt->execute([
        ':order_id' => $orderId,
        ':payment_id' => $paymentId,
        ':user_id' => $userId
    ]);

    // Update Orders table
    if (!empty($orderId)) {
        $orderUpdate = $pdo->prepare("UPDATE orders SET status = 'paid' WHERE razorpay_order_id = :order_id");
        $orderUpdate->execute([':order_id' => $orderId]);
    }

    $pdo->commit();

    // Fetch user details to send confirmation email
    $fetchUser = $pdo->prepare("
        SELECT u.id, u.full_name, u.email, p.ref_id, p.org_name 
        FROM users u 
        JOIN pink_pages_profiles p ON u.id = p.user_id 
        WHERE u.id = :id
    ");
    $fetchUser->execute([':id' => $userId]);
    $userData = $fetchUser->fetch();

    if ($userData) {
        sendPaymentSuccessEmail($userData, [
            'ref_id' => $userData['ref_id'],
            'org_name' => $userData['org_name']
        ], $paymentId);
    }

    // Return 200 OK to Razorpay
    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'message' => 'Webhook received and payment status automatically updated to PAID in database.'
    ]);

} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database update failed: ' . $e->getMessage()]);
}
