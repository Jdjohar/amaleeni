<?php
require_once __DIR__ . '/cors.php';

echo json_encode([
    'status' => 'active',
    'service' => 'Amaleeni Pink Pages API Backend',
    'version' => '1.0.0',
    'timestamp' => date('Y-m-d H:i:s'),
    'endpoints' => [
        'POST /register.php' => 'User registration & profile creation',
        'POST /login.php' => 'User login & authentication',
        'POST /razorpay-order.php' => 'Create Razorpay order for Rs 5000 fee',
        'POST /verify-payment.php' => 'Verify signature & unlock membership',
        'POST /razorpay-webhook.php' => 'Automated server-to-server Razorpay webhook listener',
        'GET /me.php' => 'Fetch current user session & payment status'
    ]
], JSON_PRETTY_PRINT);
