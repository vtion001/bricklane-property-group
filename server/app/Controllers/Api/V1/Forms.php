<?php

namespace App\Controllers\Api\V1;

use App\Models\LeadModel;
use App\Services\CrmWebhookService;

/**
 * Forms API — dedicated endpoints for each form type.
 */
class Forms extends BaseApi
{
    protected LeadModel $leadModel;
    protected CrmWebhookService $crmService;

    public function __construct()
    {
        parent::__construct();
        $this->leadModel = new LeadModel();
        $this->crmService = new CrmWebhookService();
    }

    /**
     * POST /api/v1/forms/partner
     */
    public function partner()
    {
        $rules = [
            'full_name' => 'required|min_length[2]|max_length[100]',
            'email' => 'required|valid_email|max_length[255]',
            'contact_number' => 'required|max_length[20]',
            'business_name' => 'required|min_length[2]|max_length[200]',
            'partner_type' => 'required|in_list[Sales Agent,Buyers Agent,Mortgage Broker,Aggregator,Other]',
        ];

        if (!$this->validate($rules)) {
            return $this->respondError('VALIDATION_ERROR', 'Validation failed', 422, $this->validator->getErrors());
        }

        if (!empty($this->request->getVar('website_url'))) {
            return $this->respond(['success' => true], 200);
        }

        $leadId = $this->leadModel->insert([
            'full_name' => $this->request->getVar('full_name'),
            'email' => $this->request->getVar('email'),
            'contact_number' => $this->request->getVar('contact_number'),
            'form_type' => 'partner',
            'business_name' => $this->request->getVar('business_name'),
            'partner_type' => $this->request->getVar('partner_type'),
            'message' => $this->request->getVar('message'),
            'source_page' => $this->request->getVar('source_page') ?? '/for-partners',
            'created_at' => date('Y-m-d H:i:s'),
        ]);

        if (!$leadId) {
            return $this->respondError('SERVER_ERROR', 'Failed to save', 500);
        }

        $this->crmService->dispatch($leadId);

        return $this->respondCreated(['lead_id' => $leadId]);
    }

    /**
     * POST /api/v1/forms/landlord
     */
    public function landlord()
    {
        $rules = [
            'full_name' => 'required|min_length[2]|max_length[100]',
            'email' => 'required|valid_email|max_length[255]',
            'contact_number' => 'required|max_length[20]',
            'property_address' => 'required|min_length[5]|max_length[500]',
        ];

        if (!$this->validate($rules)) {
            return $this->respondError('VALIDATION_ERROR', 'Validation failed', 422, $this->validator->getErrors());
        }

        if (!empty($this->request->getVar('website_url'))) {
            return $this->respond(['success' => true], 200);
        }

        $leadId = $this->leadModel->insert([
            'full_name' => $this->request->getVar('full_name'),
            'email' => $this->request->getVar('email'),
            'contact_number' => $this->request->getVar('contact_number'),
            'form_type' => 'landlord',
            'property_address' => $this->request->getVar('property_address'),
            'tenancy_status' => $this->request->getVar('tenancy_status'),
            'message' => $this->request->getVar('message'),
            'source_page' => $this->request->getVar('source_page') ?? '/for-landlords',
            'created_at' => date('Y-m-d H:i:s'),
        ]);

        if (!$leadId) {
            return $this->respondError('SERVER_ERROR', 'Failed to save', 500);
        }

        $this->crmService->dispatch($leadId);

        return $this->respondCreated(['lead_id' => $leadId]);
    }

    /**
     * POST /api/v1/forms/contact
     */
    public function contact()
    {
        $rules = [
            'full_name' => 'required|min_length[2]|max_length[100]',
            'email' => 'required|valid_email|max_length[255]',
            'contact_number' => 'required|max_length[20]',
        ];

        if (!$this->validate($rules)) {
            return $this->respondError('VALIDATION_ERROR', 'Validation failed', 422, $this->validator->getErrors());
        }

        if (!empty($this->request->getVar('website_url'))) {
            return $this->respond(['success' => true], 200);
        }

        $leadId = $this->leadModel->insert([
            'full_name' => $this->request->getVar('full_name'),
            'email' => $this->request->getVar('email'),
            'contact_number' => $this->request->getVar('contact_number'),
            'form_type' => 'contact',
            'message' => $this->request->getVar('message'),
            'source_page' => $this->request->getVar('source_page') ?? '/contact',
            'created_at' => date('Y-m-d H:i:s'),
        ]);

        if (!$leadId) {
            return $this->respondError('SERVER_ERROR', 'Failed to save', 500);
        }

        return $this->respondCreated(['lead_id' => $leadId]);
    }
}
