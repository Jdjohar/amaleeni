<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

// Token verification / me endpoint
$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

$token = '';
if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    $token = $matches[1];
}

$userId = intval($_GET['userId'] ?? 0);

if ($userId <= 0) {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

$pdo = getDbConnection();
$stmt = $pdo->prepare("
    SELECT u.id, u.full_name, u.email, u.phone, u.role,
           p.ref_id, p.org_name, p.category, p.sector, p.city, p.state_country, 
           p.website_url, p.seeking, p.business_description, p.payment_status, p.payment_amount, p.paid_at
    FROM users u
    LEFT JOIN pink_pages_profiles p ON u.id = p.user_id
    WHERE u.id = :id AND u.status = 'active'
    LIMIT 1
");
$stmt->execute([':id' => $userId]);
$user = $stmt->fetch();

if (!$user) {
    http_response_code(404);
    echo json_encode(['status' => 'error', 'message' => 'User profile not found']);
    exit;
}

echo json_encode([
    'status' => 'success',
    'user' => $user
]);
