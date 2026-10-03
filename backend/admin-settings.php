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

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
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

    $stmt = $pdo->prepare("
        INSERT INTO site_settings (setting_key, setting_value) 
        VALUES (:k, :v) 
        ON DUPLICATE KEY UPDATE setting_value = :v
    ");

    foreach ($newSettings as $key => $val) {
        if ($key === 'action') continue;
        $stmt->execute([':k' => $key, ':v' => is_array($val) ? json_encode($val) : strval($val)]);
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Site settings updated successfully.'
    ]);
    exit;
}

http_response_code(405);
echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
