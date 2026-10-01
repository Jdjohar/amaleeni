<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/email-helper.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?? $_POST;

$fullName = trim($data['fullName'] ?? ($data['name'] ?? ''));
$email = trim(strtolower($data['email'] ?? ''));
$phone = trim($data['phone'] ?? ($data['phoneNumber'] ?? ''));
$formSubject = trim($data['subject'] ?? ($data['formName'] ?? 'General Contact Inquiry'));
$message = trim($data['message'] ?? ($data['bio'] ?? ($data['comments'] ?? '')));

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Please provide a valid email address.']);
    exit;
}

try {
    // Send dual notification email (User Confirmation + Admin Alert)
    sendFormNotificationEmail($email, $fullName, $formSubject, [
        'Full Name' => $fullName,
        'Email Address' => $email,
        'Phone Number' => $phone,
        'Subject / Inquiry' => $formSubject,
        'Message / Details' => $message,
        'Submitted At' => date('Y-m-d H:i:s T')
    ]);

    echo json_encode([
        'status' => 'success',
        'message' => 'Your message has been sent successfully! A confirmation email has been dispatched.'
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to send message. Please try again.'
    ]);
}
