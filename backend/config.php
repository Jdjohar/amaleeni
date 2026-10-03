<?php
/**
 * Configuration for Amaleeni Pink Pages API & Zoho SMTP
 * Upload this directory to Hostinger (e.g. public_html/api/)
 */

// Error reporting (turn off display_errors in production)
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Timezone
date_default_timezone_set('Asia/Kolkata');

// ==========================================
// 1. DATABASE CONFIGURATION (Hostinger MySQL)
// ==========================================
define('DB_HOST', 'localhost'); // usually localhost on Hostinger
define('DB_NAME', 'u123456789_amaleeni'); // Replace with your Hostinger DB name
define('DB_USER', 'u123456789_user');     // Replace with your Hostinger DB user
define('DB_PASS', 'YourStrongPasswordHere'); // Replace with your Hostinger DB password
define('DB_CHARSET', 'utf8mb4');

// ==========================================
// 2. RAZORPAY CONFIGURATION
// ==========================================
// Replace these with your live/test Razorpay API keys from dashboard.razorpay.com
define('RAZORPAY_KEY_ID', 'rzp_test_YourKeyIdHere');
define('RAZORPAY_KEY_SECRET', 'YourKeySecretHere');
define('RAZORPAY_WEBHOOK_SECRET', 'amalEEni27$'); // Set this same secret in Razorpay Dashboard -> Webhooks
define('MEMBERSHIP_FEE_PAISE', 500000); // Rs 5,000 in paise (5000 * 100)

// ==========================================
// 3. SECURITY & TOKEN SECRET
// ==========================================
define('JWT_SECRET', 'ama_pink_pages_sec_key_9874523498234876234'); // Change to any random string

// ==========================================
// 4. EMAIL & ZOHO SMTP CONFIGURATION
// ==========================================
// Enable SMTP to send emails via Zoho (set false to fall back to PHP mail())
define('USE_SMTP', true);
define('SMTP_HOST', 'smtp.zoho.in'); // Zoho India SMTP: smtp.zoho.in (or smtppro.zoho.in / smtp.zoho.com)
define('SMTP_PORT', 465);               // 465 for SSL or 587 for TLS
define('SMTP_SECURE', 'ssl');           // 'ssl' or 'tls'
define('SMTP_USER', 'hello@amaleeni.com');  // <-- Zoho email address (.com)
define('SMTP_PASS', 'AmaEvent@2026');   // <-- Replace with your Zoho Password / App Password

define('MAIL_FROM_EMAIL', 'hello@amaleeni.com');
define('MAIL_FROM_NAME', 'Amaleeni Foundation');
define('SECRETARIAT_EMAIL', 'delegates@amaleeni.com');
define('ADMIN_NOTIFICATION_EMAIL', 'delegates@amaleeni.com, hello@amaleeni.com'); // Admin email recipients for form alerts

// ==========================================
// 5. ALLOWED CORS ORIGINS (Vercel + Localhost + Hostinger)
// ==========================================
$allowed_origins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://amaleeni.vercel.app',
    'https://amaleeni.com',
    'https://www.amaleeni.com',
    'https://amaleeni.org',
    'https://www.amaleeni.org',
    'https://linen-oryx-691439.hostingersite.com'
];
