<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth-helper.php';

// Require valid authentication
$auth = requireAuth(['member', 'admin', 'team_member']);

$authUserId = intval($auth['user_id'] ?? ($auth['id'] ?? 0));
$authRole = $auth['role'] ?? 'member';

// If userId is passed via query param, verify authorization
$requestedUserId = intval($_GET['userId'] ?? 0);
if ($requestedUserId === 0) {
    $requestedUserId = $authUserId;
}

// Security Check: Normal members can ONLY view their own profile (prevent IDOR attacks)
if ($authRole !== 'admin' && $authRole !== 'team_member' && $requestedUserId !== $authUserId && $authUserId > 0) {
    http_response_code(403);
    echo json_encode([
        'status' => 'error',
        'code' => 403,
        'message' => 'Access denied. You do not have permission to view other users\' profiles.'
    ]);
    exit;
}

if ($requestedUserId <= 0) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid user ID.']);
    exit;
}

$pdo = getDbConnection();
if (!$pdo) {
    http_response_code(503);
    echo json_encode(['status' => 'error', 'message' => 'Database service currently unavailable.']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT u.id, u.full_name, u.email, u.phone, u.role,
               p.ref_id, p.org_name, p.category, p.sector, p.city, p.state_country, 
               p.website_url, p.seeking, p.business_description, p.payment_status, p.payment_amount, p.paid_at
        FROM users u
        LEFT JOIN pink_pages_profiles p ON u.id = p.user_id
        WHERE u.id = :id AND u.status = 'active'
        LIMIT 1
    ");
    $stmt->execute([':id' => $requestedUserId]);
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'User profile not found.']);
        exit;
    }

    echo json_encode([
        'status' => 'success',
        'user' => $user
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'An error occurred while fetching user profile.']);
}
