<?php

namespace App\Services;

use App\Models\LeadModel;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

/**
 * CrmWebhookService — dispatches lead data to CRM (HubSpot, etc.) asynchronously.
 */
class CrmWebhookService
{
    protected Client $client;
    protected string $webhookUrl;
    protected string $webhookSecret;

    public function __construct()
    {
        $this->client = new Client(['timeout' => 10, 'connect_timeout' => 5]);
        $this->webhookUrl = getenv('CRM_WEBHOOK_URL') ?: '';
        $this->webhookSecret = getenv('CRM_WEBHOOK_SECRET') ?: '';
    }

    /**
     * Dispatch a lead to the CRM webhook.
     */
    public function dispatch(int $leadId): void
    {
        if (empty($this->webhookUrl)) {
            log_message('info', "CRM webhook not configured, skipping lead {$leadId}");
            return;
        }

        $leadModel = new LeadModel();
        $lead = $leadModel->find($leadId);

        if (!$lead) {
            log_message('error', "CrmWebhookService: Lead {$leadId} not found");
            return;
        }

        $payload = [
            'lead_id' => $leadId,
            'full_name' => $lead['full_name'],
            'email' => $lead['email'],
            'contact_number' => $lead['contact_number'],
            'form_type' => $lead['form_type'],
            'property_address' => $lead['property_address'] ?? null,
            'business_name' => $lead['business_name'] ?? null,
            'partner_type' => $lead['partner_type'] ?? null,
            'source_page' => $lead['source_page'] ?? null,
            'created_at' => $lead['created_at'] ?? null,
        ];

        $headers = ['Content-Type' => 'application/json'];
        if (!empty($this->webhookSecret)) {
            $headers['X-Webhook-Secret'] = $this->webhookSecret;
        }

        try {
            $this->client->post($this->webhookUrl, [
                'json' => $payload,
                'headers' => $headers,
            ]);
            log_message('info', "CRM webhook dispatched for lead {$leadId}");
        } catch (GuzzleException $e) {
            log_message('error', "CRM webhook failed for lead {$leadId}: " . $e->getMessage());
        }
    }
}
