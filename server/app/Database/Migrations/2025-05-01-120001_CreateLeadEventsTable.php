<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateLeadEventsTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'          => ['type' => 'INT', 'unsigned' => true, 'auto_increment' => true],
            'lead_id'     => ['type' => 'INT', 'unsigned' => true],
            'event_type'  => ['type' => 'VARCHAR', 'constraint' => 50],
            'event_data'  => ['type' => 'TEXT', 'null' => true],
            'created_at'  => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey('lead_id');
        $this->forge->addForeignKey('lead_id', 'leads', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('lead_events');
    }

    public function down()
    {
        $this->forge->dropTable('lead_events');
    }
}
