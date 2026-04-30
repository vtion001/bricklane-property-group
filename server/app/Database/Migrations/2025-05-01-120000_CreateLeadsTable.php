<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateLeadsTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'          => ['type' => 'INT', 'unsigned' => true, 'auto_increment' => true],
            'full_name'   => ['type' => 'VARCHAR', 'constraint' => 100],
            'email'       => ['type' => 'VARCHAR', 'constraint' => 255],
            'contact_number' => ['type' => 'VARCHAR', 'constraint' => 20],
            'form_type'   => ['type' => 'ENUM', 'constraint' => ['partner', 'landlord', 'contact']],
            'property_address' => ['type' => 'VARCHAR', 'constraint' => 500, 'null' => true],
            'tenancy_status'  => ['type' => 'ENUM', 'constraint' => ['tenanted', 'untenanted'], 'null' => true],
            'business_name'  => ['type' => 'VARCHAR', 'constraint' => 200, 'null' => true],
            'partner_type'   => ['type' => 'VARCHAR', 'constraint' => 100, 'null' => true],
            'message'    => ['type' => 'TEXT', 'null' => true],
            'source_page' => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'utm_source'  => ['type' => 'VARCHAR', 'constraint' => 100, 'null' => true],
            'utm_medium'  => ['type' => 'VARCHAR', 'constraint' => 100, 'null' => true],
            'utm_campaign' => ['type' => 'VARCHAR', 'constraint' => 100, 'null' => true],
            'created_at'  => ['type' => 'DATETIME', 'null' => true],
            'updated_at'  => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey('email');
        $this->forge->addKey('created_at');
        $this->forge->createTable('leads');
    }

    public function down()
    {
        $this->forge->dropTable('leads');
    }
}
