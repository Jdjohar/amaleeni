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

// Auto-heal site_settings table if missing
try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `site_settings` (
          `setting_key` VARCHAR(191) PRIMARY KEY,
          `setting_value` LONGTEXT NULL,
          `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
} catch (Throwable $e) {}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT setting_key, setting_value FROM site_settings");
        $rows = $stmt->fetchAll();

        $settings = [];
        foreach ($rows as $r) {
            $settings[$r['setting_key']] = $r['setting_value'];
        }

        echo json_encode([
            'status' => 'success',
            'settings' => $settings
        ]);
    } catch (Throwable $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
    exit;
}

if ($method === 'POST' || $method === 'PUT') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true) ?? $_POST;
    $newSettings = $data['settings'] ?? $data;

    if (!is_array($newSettings)) {
        http_response_code(422);
        echo json_encode(['status' => 'error', 'message' => 'Invalid settings payload.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("REPLACE INTO site_settings (setting_key, setting_value) VALUES (:k, :v)");

        foreach ($newSettings as $key => $val) {
            if ($key === 'action') continue;
            $stmt->execute([':k' => $key, ':v' => is_array($val) ? json_encode($val) : strval($val)]);
        }

        echo json_encode([
            'status' => 'success',
            'message' => 'Site settings updated successfully.'
        ]);
    } catch (Throwable $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Failed to save settings: ' . $e->getMessage()]);
    }
    exit;
}

http_response_code(405);
echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);

