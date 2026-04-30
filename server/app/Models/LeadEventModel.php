<?php

namespace App\Models;

use CodeIgniter\Model;

/**
 * LeadEventModel — audit trail for lead lifecycle events.
 */
class LeadEventModel extends Model
{
    protected $table = 'lead_events';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $allowedFields = ['lead_id', 'event_type', 'event_data', 'created_at'];
    protected $useTimestamps = false;
    protected $dateFormat = 'datetime';

    /**
     * Log a lead event.
     */
    public function logEvent(int $leadId, string $type, ?array $data = null): bool
    {
        return $this->insert([
            'lead_id' => $leadId,
            'event_type' => $type,
            'event_data' => $data !== null ? json_encode($data) : null,
            'created_at' => date('Y-m-d H:i:s'),
        ]) !== false;
    }

    /**
     * Get all events for a lead.
     *
     * @return array
     */
    public function getEventsForLead(int $leadId): array
    {
        return $this->where('lead_id', $leadId)
            ->orderBy('created_at', 'ASC')
            ->get()
            ->getResultArray();
    }
}
