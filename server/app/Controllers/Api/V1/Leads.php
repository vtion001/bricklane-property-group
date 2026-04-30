<?php

namespace App\Controllers\Api\V1;

use App\Models\LeadModel;
use App\Models\LeadEventModel;

/**
 * Leads API — CRUD operations for leads.
 */
class Leads extends BaseApi
{
    protected LeadModel $leadModel;
    protected LeadEventModel $eventModel;

    public function __construct()
    {
        parent::__construct();
        $this->leadModel = new LeadModel();
        $this->eventModel = new LeadEventModel();
    }

    /**
     * GET /api/v1/leads
     * List leads with pagination and search.
     */
    public function index(): ResponseInterface
    {
        $page = (int) ($this->request->getGet('page') ?? 1);
        $perPage = (int) ($this->request->getGet('per_page') ?? 20);
        $search = $this->request->getGet('search') ?? null;

        $result = $this->leadModel->getLeads($page, $perPage, $search);

        return $this->respond([
            'success' => true,
            'data' => $result['data'],
            'meta' => [
                'page' => $result['page'],
                'per_page' => $result['perPage'],
                'total' => $result['total'],
            ],
        ]);
    }

    /**
     * POST /api/v1/leads
     * Create a new lead (generic endpoint).
     */
    public function create(): ResponseInterface
    {
        $rules = [
            'full_name' => 'required|min_length[2]|max_length[100]',
            'email' => 'required|valid_email|max_length[255]',
            'contact_number' => 'required|max_length[20]',
            'form_type' => 'required|in_list[partner,landlord,contact]',
        ];

        if (!$this->validate($rules)) {
            return $this->respondError(
                'VALIDATION_ERROR',
                'Validation failed',
                422,
                $this->validator->getErrors()
            );
        }

        if (!empty($this->request->getVar('website_url'))) {
            return $this->respond(['success' => true], 200);
        }

        $data = [
            'full_name' => $this->request->getVar('full_name'),
            'email' => $this->request->getVar('email'),
            'contact_number' => $this->request->getVar('contact_number'),
            'form_type' => $this->request->getVar('form_type'),
            'property_address' => $this->request->getVar('property_address'),
            'tenancy_status' => $this->request->getVar('tenancy_status'),
            'business_name' => $this->request->getVar('business_name'),
            'partner_type' => $this->request->getVar('partner_type'),
            'message' => $this->request->getVar('message'),
            'source_page' => $this->request->getVar('source_page') ?? '/',
            'created_at' => date('Y-m-d H:i:s'),
        ];

        $leadId = $this->leadModel->insert($data);

        if (!$leadId) {
            log_message('error', 'Lead insert failed: ' . json_encode($data));
            return $this->respondError('SERVER_ERROR', 'Failed to save lead', 500);
        }

        $this->eventModel->logEvent($leadId, 'created');

        return $this->respondCreated(['lead_id' => $leadId]);
    }

    /**
     * GET /api/v1/leads/:id
     */
    public function show(int $id): ResponseInterface
    {
        $lead = $this->leadModel->find($id);

        if (!$lead) {
            return $this->respondError('NOT_FOUND', 'Lead not found', 404);
        }

        $events = $this->eventModel->getEventsForLead($id);

        return $this->respond([
            'success' => true,
            'data' => array_merge($lead, ['events' => $events]),
        ]);
    }

    /**
     * PATCH /api/v1/leads/:id
     */
    public function update(int $id): ResponseInterface
    {
        $lead = $this->leadModel->find($id);

        if (!$lead) {
            return $this->respondError('NOT_FOUND', 'Lead not found', 404);
        }

        $data = $this->request->getJSON(true);
        unset($data['id'], $data['created_at'], $data['updated_at']);

        if (!empty($data)) {
            $this->leadModel->update($id, $data);
            $this->eventModel->logEvent($id, 'updated', $data);
        }

        return $this->respond([
            'success' => true,
            'data' => $this->leadModel->find($id),
        ]);
    }

    /**
     * DELETE /api/v1/leads/:id
     */
    public function delete(int $id): ResponseInterface
    {
        $lead = $this->leadModel->find($id);

        if (!$lead) {
            return $this->respondError('NOT_FOUND', 'Lead not found', 404);
        }

        $this->leadModel->delete($id);

        return $this->respond(['success' => true]);
    }
}
