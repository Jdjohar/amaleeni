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

// Auto-heal team_members table if missing
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

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM team_members ORDER BY sort_order ASC, id ASC");
    $team = $stmt->fetchAll();

    echo json_encode([
        'status' => 'success',
        'count' => count($team),
        'team' => $team
    ]);
    exit;
}

if ($method === 'POST' || $method === 'PUT') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true) ?? $_POST;

    $id = intval($data['id'] ?? 0);
    $name = trim($data['name'] ?? '');
    $role = trim($data['role'] ?? '');
    $category = trim($data['category'] ?? 'Secretariat');
    $bio = trim($data['bio'] ?? '');
    $status = trim($data['status'] ?? 'Confirmed');
    $image = trim($data['image'] ?? '');
    $sortOrder = intval($data['sort_order'] ?? $data['sortOrder'] ?? 0);

    if (empty($name) || empty($role)) {
        http_response_code(422);
        echo json_encode(['status' => 'error', 'message' => 'Name and Role are required fields.']);
        exit;
    }

    if ($id > 0) {
        // Update
        $stmt = $pdo->prepare("
            UPDATE team_members SET
                name = :name,
                role = :role,
                category = :category,
                bio = :bio,
                status = :status,
                image = :image,
                sort_order = :sort_order
            WHERE id = :id
        ");
        $stmt->execute([
            ':name' => $name,
            ':role' => $role,
            ':category' => $category,
            ':bio' => $bio,
            ':status' => $status,
            ':image' => $image,
            ':sort_order' => $sortOrder,
            ':id' => $id,
        ]);
        echo json_encode(['status' => 'success', 'message' => 'Team member updated successfully.']);
    } else {
        // Insert
        $stmt = $pdo->prepare("
            INSERT INTO team_members (name, role, category, bio, status, image, sort_order)
            VALUES (:name, :role, :category, :bio, :status, :image, :sort_order)
        ");
        $stmt->execute([
            ':name' => $name,
            ':role' => $role,
            ':category' => $category,
            ':bio' => $bio,
            ':status' => $status,
            ':image' => $image,
            ':sort_order' => $sortOrder,
        ]);
        echo json_encode(['status' => 'success', 'message' => 'Team member added successfully.']);
    }
    exit;
}

if ($method === 'DELETE') {
    $id = intval($_GET['id'] ?? 0);
    if ($id) {
        $stmt = $pdo->prepare("DELETE FROM team_members WHERE id = :id");
        $stmt->execute([':id' => $id]);
        echo json_encode(['status' => 'success', 'message' => 'Team member deleted.']);
        exit;
    }
}

http_response_code(405);
echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
