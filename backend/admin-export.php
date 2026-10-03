<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

$type = $_GET['type'] ?? 'members';

$pdo = getDbConnection();
if (!$pdo) {
    http_response_code(500);
    echo "Database connection failed.";
    exit;
}

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=amaleeni_' . $type . '_' . date('Y-m-d') . '.csv');

$output = fopen('php://output', 'w');

if ($type === 'members') {
    fputcsv($output, ['Ref ID', 'Full Name', 'Email', 'Phone', 'Organization', 'Designation', 'Sector', 'Category', 'City', 'State', 'Website', 'Payment Status', 'Registered At']);
    $stmt = $pdo->query("
        SELECT p.ref_id, u.full_name, u.email, u.phone, p.org_name, p.designation, p.sector, p.category, p.city, p.state_country, p.website_url, p.payment_status, u.created_at
        FROM users u JOIN profiles p ON u.id = p.user_id ORDER BY u.id DESC
    ");
    while ($row = $stmt->fetch()) {
        fputcsv($output, $row);
    }
} else if ($type === 'inquiries') {
    fputcsv($output, ['ID', 'Form Type', 'Full Name', 'Email', 'Phone', 'Organization', 'Sector', 'Status', 'Message', 'Submitted At']);
    $stmt = $pdo->query("SELECT id, form_type, full_name, email, phone, organization, sector, status, message, created_at FROM contact_submissions ORDER BY id DESC");
    while ($row = $stmt->fetch()) {
        fputcsv($output, $row);
    }
} else if ($type === 'newsletter') {
    fputcsv($output, ['ID', 'Email Address', 'IP Address', 'Subscribed At']);
    $stmt = $pdo->query("SELECT id, email, ip_address, created_at FROM newsletter_subscribers ORDER BY id DESC");
    while ($row = $stmt->fetch()) {
        fputcsv($output, $row);
    }
}

fclose($output);
exit;
