<?php
require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=UTF-8');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (empty($origin) && !empty($_SERVER['HTTP_REFERER'])) {
    $refParts = parse_url($_SERVER['HTTP_REFERER']);
    if (!empty($refParts['scheme']) && !empty($refParts['host'])) {
        $origin = $refParts['scheme'] . '://' . $refParts['host'] . (isset($refParts['port']) ? ':' . $refParts['port'] : '');
    }
}

// Check if origin matches allowed domains, vercel.app, amaleeni domain variants, or localhost
$isAllowed = false;
if (!empty($origin)) {
    if (
        (isset($allowed_origins) && in_array($origin, $allowed_origins, true)) ||
        preg_match('/^https:\/\/[a-z0-9-]+\.vercel\.app$/i', $origin) ||
        preg_match('/^http:\/\/localhost(:\d+)?$/i', $origin) ||
        preg_match('/^https?:\/\/(www\.)?amaleeni\.(com|org)$/i', $origin) ||
        preg_match('/^https?:\/\/[a-z0-9-]+\.hostingersite\.com$/i', $origin)
    ) {
        $isAllowed = true;
    }
}

if ($isAllowed) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Credentials: true');
} else {
    // Permissive fallback so testing tools and curl do not get blocked
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Origin, Accept");
header('Access-Control-Max-Age: 86400'); // Cache preflight for 1 day

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}
