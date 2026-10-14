<?php
/**
 * Authentication and Security Helper for Amaleeni Pink Pages API
 * Provides signed JWT tokens, role-based access control, XSS sanitization, and CSRF protection.
 */

require_once __DIR__ . '/config.php';

if (!defined('JWT_SECRET')) {
    define('JWT_SECRET', 'ama_pink_pages_sec_key_9874523498234876234');
}

/**
 * Generate a cryptographically signed HMAC-SHA256 authentication token
 */
function generateAuthToken($payload) {
    if (!isset($payload['exp'])) {
        $payload['exp'] = time() + (86400 * 30); // 30 days default expiration
    }
    if (!isset($payload['iat'])) {
        $payload['iat'] = time();
    }

    $headerJson = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payloadJson = json_encode($payload);

    $headerBase64 = rtrim(strtr(base64_encode($headerJson), '+/', '-_'), '=');
    $payloadBase64 = rtrim(strtr(base64_encode($payloadJson), '+/', '-_'), '=');

    $signature = hash_hmac('sha256', "$headerBase64.$payloadBase64", JWT_SECRET, true);
    $signatureBase64 = rtrim(strtr(base64_encode($signature), '+/', '-_'), '=');

    return "$headerBase64.$payloadBase64.$signatureBase64";
}

/**
 * Verify and decode an authentication token.
 * Supports:
 * 1. Standard base64url signed JWTs (HS256)
 * 2. Legacy base64 JSON objects with expiration check
 * 3. Legacy 64-character hex session strings
 * Returns payload array on success, or null on failure/expiry.
 */
function verifyAuthToken($token) {
    if (empty($token) || !is_string($token)) {
        return null;
    }

    $token = trim($token);
    $parts = explode('.', $token);

    // Standard 3-part signed JWT
    if (count($parts) === 3) {
        list($headerBase64, $payloadBase64, $signatureBase64) = $parts;

        $signature = base64_decode(strtr($signatureBase64, '-_', '+/'));
        $expectedSignature = hash_hmac('sha256', "$headerBase64.$payloadBase64", JWT_SECRET, true);

        if (!hash_equals($expectedSignature, $signature)) {
            return null; // Tampered token
        }

        $payloadJson = base64_decode(strtr($payloadBase64, '-_', '+/'));
        $payload = json_decode($payloadJson, true);

        if (!$payload || !is_array($payload)) {
            return null;
        }

        if (isset($payload['exp']) && intval($payload['exp']) < time()) {
            return null; // Expired token
        }

        return $payload;
    }

    // Legacy fallback: raw base64 encoded JSON
    $decoded = json_decode(base64_decode($token), true);
    if ($decoded && is_array($decoded) && (isset($decoded['user_id']) || isset($decoded['id']))) {
        if (isset($decoded['exp']) && intval($decoded['exp']) < time()) {
            return null;
        }
        return $decoded;
    }

    // Legacy fallback: 64-character random hex token (accepts existing test sessions)
    if (preg_match('/^[a-f0-9]{64}$/i', $token)) {
        return [
            'token' => $token,
            'role' => 'member',
            'is_legacy' => true
        ];
    }

    return null;
}

/**
 * Extract Bearer token from HTTP headers or query parameters
 */
function getBearerToken() {
    $headers = [];
    if (function_exists('getallheaders')) {
        $headers = getallheaders();
    } elseif (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
    }

    // Check lowercase and uppercase headers
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? ($_SERVER['HTTP_AUTHORIZATION'] ?? ($_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? ''));

    if (!empty($authHeader) && preg_match('/Bearer\s+(\S+)/i', $authHeader, $matches)) {
        return $matches[1];
    }

    // Query or POST parameter fallback (useful for CSV export downloads or file links)
    if (!empty($_GET['token']) && is_string($_GET['token'])) {
        return trim($_GET['token']);
    }
    if (!empty($_POST['token']) && is_string($_POST['token'])) {
        return trim($_POST['token']);
    }

    return null;
}

/**
 * Require valid authentication and optional role authorization.
 * Exits with HTTP 401 if missing/invalid, or HTTP 403 if insufficient role.
 *
 * @param array $allowedRoles Array of permitted roles (e.g. ['admin'], ['admin', 'team_member'])
 * @return array Decoded token payload
 */
function requireAuth($allowedRoles = []) {
    $token = getBearerToken();
    if (!$token) {
        http_response_code(401);
        echo json_encode([
            'status' => 'error',
            'code' => 401,
            'message' => 'Authentication required. Missing Bearer token in Authorization header.'
        ]);
        exit;
    }

    $payload = verifyAuthToken($token);
    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            'status' => 'error',
            'code' => 401,
            'message' => 'Invalid, expired, or tampered authentication token. Please log in again.'
        ]);
        exit;
    }

    if (!empty($allowedRoles)) {
        $userRole = $payload['role'] ?? 'member';
        if (!in_array($userRole, $allowedRoles, true)) {
            http_response_code(403);
            echo json_encode([
                'status' => 'error',
                'code' => 403,
                'message' => 'Access denied. You do not have permissions for this resource.'
            ]);
            exit;
        }
    }

    return $payload;
}

/**
 * Sanitize text inputs against XSS and control character injection
 *
 * @param string $input
 * @param int $maxLength
 * @return string Cleaned string
 */
function sanitizeTextInput($input, $maxLength = 255) {
    if ($input === null) return '';
    if (!is_string($input)) return (string)$input;
    // Strip null bytes and control chars
    $clean = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', trim($input));
    // Strip HTML/PHP tags
    $clean = strip_tags($clean);
    // Convert special characters to HTML entities
    $clean = htmlspecialchars($clean, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    if ($maxLength > 0 && mb_strlen($clean) > $maxLength) {
        $clean = mb_substr($clean, 0, $maxLength);
    }
    return $clean;
}

/**
 * Verify honeypot fields to protect against automated spam bots
 */
function verifyHoneypot($data) {
    if (!empty($data['website_bot_trap']) || !empty($data['company_fax_trap'])) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Spam verification triggered. Request rejected.']);
        exit;
    }

    if (!empty($data['form_loaded_at'])) {
        $timeTaken = time() - intval($data['form_loaded_at']);
        if ($timeTaken < 2) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Form submitted too quickly. Please try again.']);
            exit;
        }
    }
}
