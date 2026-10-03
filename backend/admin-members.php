<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$pdo = getDbConnection();
if (!$pdo) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed.']);
    exit;
}

function getProfileTableName($pdo) {
    try {
        $st = $pdo->query("SHOW TABLES LIKE 'pink_pages_profiles'");
        if ($st && $st->rowCount() > 0) {
            return 'pink_pages_profiles';
        }
    } catch (Throwable $e) {}
    return 'profiles';
}

$profTable = getProfileTableName($pdo);
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // List all Pink Pages members with full profiles
    $search = trim($_GET['search'] ?? '');
    $status = trim($_GET['status'] ?? '');
    $sector = trim($_GET['sector'] ?? '');

    $sql = "
        SELECT 
            u.id as user_id, u.full_name, u.email, u.phone, u.role, u.created_at as registered_at,
            p.id as profile_id, p.org_name, p.designation, p.sector, p.category, p.city, p.state_country,
            p.website_url, p.seeking, p.business_description, p.payment_status, p.payment_amount,
            p.razorpay_payment_id, p.ref_id, p.created_at as profile_created_at
        FROM users u
        LEFT JOIN {$profTable} p ON u.id = p.user_id
        WHERE 1=1
    ";
    $params = [];

    if (!empty($search)) {
        $sql .= " AND (u.full_name LIKE :s OR u.email LIKE :s OR u.phone LIKE :s OR p.org_name LIKE :s OR p.ref_id LIKE :s)";
        $params[':s'] = "%$search%";
    }
    if (!empty($status)) {
        $sql .= " AND p.payment_status = :status";
        $params[':status'] = $status;
    }
    if (!empty($sector)) {
        $sql .= " AND p.sector = :sector";
        $params[':sector'] = $sector;
    }

    $sql .= " ORDER BY u.id DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $members = $stmt->fetchAll();

    echo json_encode([
        'status' => 'success',
        'count' => count($members),
        'members' => $members
    ]);
    exit;
}

if ($method === 'POST' || $method === 'PUT') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true) ?? $_POST;
    $action = $data['action'] ?? 'update_member';

    if ($action === 'toggle_payment') {
        $userId = intval($data['userId'] ?? 0);
        $newStatus = ($data['paymentStatus'] ?? 'PAID') === 'PAID' ? 'PAID' : 'PENDING';

        $stmt = $pdo->prepare("UPDATE {$profTable} SET payment_status = :st WHERE user_id = :uid");
        $stmt->execute([':st' => $newStatus, ':uid' => $userId]);

        echo json_encode(['status' => 'success', 'message' => "Payment status updated to {$newStatus}."]);
        exit;
    }

    // Update Pink Pages Entry (Admin or User)
    $userId = intval($data['user_id'] ?? ($data['userId'] ?? 0));
    if (!$userId) {
        http_response_code(422);
        echo json_encode(['status' => 'error', 'message' => 'User ID is required.']);
        exit;
    }

    // 1. Update user fields
    $uStmt = $pdo->prepare("UPDATE users SET full_name = :fn, phone = :ph WHERE id = :uid");
    $uStmt->execute([
        ':fn' => trim($data['full_name'] ?? $data['fullName'] ?? ''),
        ':ph' => trim($data['phone'] ?? ''),
        ':uid' => $userId
    ]);

    // 2. Update profile fields
    $pStmt = $pdo->prepare("
        UPDATE {$profTable} SET
            org_name = :org,
            designation = :desig,
            sector = :sec,
            category = :cat,
            city = :city,
            state_country = :state,
            website_url = :web,
            seeking = :seek,
            business_description = :bio,
            payment_status = :pay_st
        WHERE user_id = :uid
    ");
    $pStmt->execute([
        ':org' => trim($data['org_name'] ?? $data['orgName'] ?? ''),
        ':desig' => trim($data['designation'] ?? ''),
        ':sec' => trim($data['sector'] ?? ''),
        ':cat' => trim($data['category'] ?? ''),
        ':city' => trim($data['city'] ?? ''),
        ':state' => trim($data['state_country'] ?? $data['stateCountry'] ?? ''),
        ':web' => trim($data['website_url'] ?? $data['websiteUrl'] ?? ''),
        ':seek' => is_array($data['seeking'] ?? null) ? implode(', ', $data['seeking']) : trim($data['seeking'] ?? ''),
        ':bio' => trim($data['business_description'] ?? $data['businessDescription'] ?? ''),
        ':pay_st' => trim($data['payment_status'] ?? $data['paymentStatus'] ?? 'PENDING'),
        ':uid' => $userId
    ]);

    echo json_encode(['status' => 'success', 'message' => 'Pink Pages entry updated successfully.']);
    exit;
}

if ($method === 'DELETE') {
    $userId = intval($_GET['userId'] ?? 0);
    if ($userId) {
        $stmt = $pdo->prepare("DELETE FROM users WHERE id = :uid");
        $stmt->execute([':uid' => $userId]);
        echo json_encode(['status' => 'success', 'message' => 'Member deleted successfully.']);
        exit;
    }
}

http_response_code(405);
echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
