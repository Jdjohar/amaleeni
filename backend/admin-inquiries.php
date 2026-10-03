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

// Auto-heal contact_submissions table if missing
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

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $search = trim($_GET['search'] ?? '');
    $formType = trim($_GET['form_type'] ?? '');
    $status = trim($_GET['status'] ?? '');

    $sql = "SELECT * FROM contact_submissions WHERE 1=1";
    $params = [];

    if (!empty($search)) {
        $sql .= " AND (full_name LIKE :s OR email LIKE :s OR phone LIKE :s OR organization LIKE :s OR message LIKE :s)";
        $params[':s'] = "%$search%";
    }
    if (!empty($formType)) {
        $sql .= " AND form_type = :ft";
        $params[':ft'] = $formType;
    }
    if (!empty($status)) {
        $sql .= " AND status = :st";
        $params[':st'] = $status;
    }

    $sql .= " ORDER BY id DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $inquiries = $stmt->fetchAll();

    echo json_encode([
        'status' => 'success',
        'count' => count($inquiries),
        'inquiries' => $inquiries
    ]);
    exit;
}

if ($method === 'POST' || $method === 'PUT') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true) ?? $_POST;

    $id = intval($data['id'] ?? 0);
    $newStatus = trim($data['status'] ?? 'NEW');
    $adminNotes = trim($data['admin_notes'] ?? $data['adminNotes'] ?? '');

    if (!$id) {
        http_response_code(422);
        echo json_encode(['status' => 'error', 'message' => 'Inquiry ID is required.']);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE contact_submissions SET status = :st, admin_notes = :notes WHERE id = :id");
    $stmt->execute([':st' => $newStatus, ':notes' => $adminNotes, ':id' => $id]);

    echo json_encode(['status' => 'success', 'message' => 'Inquiry status updated.']);
    exit;
}

if ($method === 'DELETE') {
    $id = intval($_GET['id'] ?? 0);
    if ($id) {
        $stmt = $pdo->prepare("DELETE FROM contact_submissions WHERE id = :id");
        $stmt->execute([':id' => $id]);
        echo json_encode(['status' => 'success', 'message' => 'Inquiry deleted.']);
        exit;
    }
}

http_response_code(405);
echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
