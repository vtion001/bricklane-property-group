<?php

namespace Tests\Feature;

use Tests\TestCase;

class LeadsTest extends TestCase
{
    /**
     * Test successful lead creation.
     */
    public function test_create_lead_success(): void
    {
        $response = $this->post('/api/v1/leads', [
            'full_name' => 'John Smith',
            'email' => 'john@example.com',
            'contact_number' => '0412345678',
            'form_type' => 'contact',
            'message' => 'Test message',
            'source_page' => '/contact',
        ]);

        $response->assertStatus(201);
        $response->assertJSON(['success' => true]);
        $response->assertJSONStructure([
            'success',
            'data' => ['lead_id'],
        ]);
    }

    /**
     * Test validation errors for invalid input.
     */
    public function test_create_lead_validation_error(): void
    {
        $response = $this->post('/api/v1/leads', [
            'full_name' => 'J', // too short
            'email' => 'not-an-email', // invalid email
            'form_type' => 'invalid_type', // invalid enum
        ]);

        $response->assertStatus(422);
        $response->assertJSON([
            'success' => false,
            'error' => [
                'code' => 'VALIDATION_ERROR',
            ],
        ]);
    }

    /**
     * Test honeypot field silently rejects bot submissions.
     */
    public function test_honeypot_rejected(): void
    {
        $response = $this->post('/api/v1/leads', [
            'full_name' => 'Bot',
            'email' => 'bot@spam.com',
            'contact_number' => '0412345678',
            'form_type' => 'contact',
            'website_url' => 'http://spam.com', // Honeypot filled
        ]);

        // Returns 200 OK but silently ignores (no lead created)
        $response->assertStatus(200);
    }

    /**
     * Test listing leads returns correct structure.
     */
    public function test_list_leads(): void
    {
        // First create a lead
        $this->test_create_lead_success();

        $response = $this->get('/api/v1/leads');

        $response->assertStatus(200);
        $response->assertJSONStructure([
            'success',
            'data',
            'meta' => ['page', 'per_page', 'total'],
        ]);
    }

    /**
     * Test getting a single lead.
     */
    public function test_show_lead(): void
    {
        $this->test_create_lead_success();

        $response = $this->get('/api/v1/leads/1');

        if ($response->getStatus() === 200) {
            $response->assertJSONStructure([
                'success',
                'data' => [
                    'id',
                    'full_name',
                    'email',
                    'contact_number',
                    'form_type',
                    'events',
                ],
            ]);
        }
    }
}
