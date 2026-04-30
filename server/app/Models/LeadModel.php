<?php

namespace App\Models;

use CodeIgniter\Model;

/**
 * LeadModel — manages lead/form submission records.
 */
class LeadModel extends Model
{
    protected $table = 'leads';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $allowedFields = [
        'full_name',
        'email',
        'contact_number',
        'form_type',
        'property_address',
        'tenancy_status',
        'business_name',
        'partner_type',
        'message',
        'source_page',
        'utm_source',
        'utm_medium',
        'utm_campaign',
    ];
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $dateFormat = 'datetime';

    /**
     * Get paginated leads with optional search.
     *
     * @param int $page
     * @param int $perPage
     * @param string|null $search
     * @return array{data: array, total: int, page: int, perPage: int}
     */
    public function getLeads(int $page = 1, int $perPage = 20, ?string $search = null): array
    {
        $builder = $this->builder();

        if ($search !== null && $search !== '') {
            $builder->groupStart()
                ->like('full_name', $search)
                ->orLike('email', $search)
                ->orLike('contact_number', $search)
                ->orLike('business_name', $search)
                ->groupEnd();
        }

        $total = $builder->countAllResults(false);

        $leads = $builder
            ->orderBy('created_at', 'DESC')
            ->limit($perPage, ($page - 1) * $perPage)
            ->get()
            ->getResultArray();

        return [
            'data' => $leads,
            'total' => $total,
            'page' => $page,
            'perPage' => $perPage,
        ];
    }
}
