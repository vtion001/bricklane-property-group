<?php

declare(strict_types=1);

require __DIR__ . '/../vendor/codeigniter4/framework/system/Test/bootstrap.php';

if (ENVIRONMENT !== 'testing') {
    return;
}

$db = \Config\Database::connect();
$db->query('
    CREATE TABLE IF NOT EXISTS "leads" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "full_name" TEXT,
        "email" TEXT,
        "contact_number" TEXT,
        "form_type" TEXT,
        "property_address" TEXT,
        "tenancy_status" TEXT,
        "business_name" TEXT,
        "partner_type" TEXT,
        "message" TEXT,
        "source_page" TEXT,
        "utm_source" TEXT,
        "utm_medium" TEXT,
        "utm_campaign" TEXT,
        "created_at" TEXT,
        "updated_at" TEXT
    )
');

$db->query('
    CREATE TABLE IF NOT EXISTS "lead_events" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "lead_id" INTEGER,
        "event_type" TEXT,
        "event_data" TEXT,
        "created_at" TEXT
    )
');
