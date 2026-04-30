<?php

namespace App\Models;

use CodeIgniter\Model;

/**
 * AuditLogModel — records all admin actions for compliance.
 */
class AuditLogModel extends Model
{
    protected $table = 'audit_logs';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $allowedFields = [
        'user_id',
        'action',
        'resource',
        'resource_id',
        'ip_address',
        'user_agent',
        'created_at',
    ];
    protected $useTimestamps = false;
    protected $dateFormat = 'datetime';

    /**
     * Log an admin action.
     */
    public function log(int $userId, string $action, ?string $resource = null, ?int $resourceId = null): void
    {
        $request = service('request');

        $this->insert([
            'user_id' => $userId,
            'action' => $action,
            'resource' => $resource,
            'resource_id' => $resourceId,
            'ip_address' => $request->getIPAddress(),
            'user_agent' => $request->getUserAgent()->getAgentString() ?? 'unknown',
            'created_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
