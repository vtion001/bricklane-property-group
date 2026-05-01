<?php

namespace Tests\Feature;

use Tests\TestCase;

class FormsTest extends TestCase
{
    /**
     * Test partner form submission.
     */
    public function test_partner_form_success(): void
    {
        $response = $this->post('/api/v1/forms/partner', [
            'full_name' => 'Jane Agent',
            'email' => 'jane@realestate.com.au',
            'contact_number' => '0412345678',
            'business_name' => 'Jane Agent Realty',
            'partner_type' => 'Sales Agent',
            'source_page' => '/for-partners',
        ]);

        $response->assertStatus(201);
        $response->assertJSON(['success' => true]);
    }

    /**
     * Test partner form validation.
     */
    public function test_partner_form_validation(): void
    {
        $response = $this->post('/api/v1/forms/partner', [
            'full_name' => 'X', // too short
            'email' => 'not-an-email',
            'contact_number' => '123',
            'business_name' => '', // required
            'partner_type' => 'Invalid Type', // invalid enum
        ]);

        $response->assertStatus(422);
        $response->assertJSON(['success' => false]);
    }

    /**
     * Test landlord form submission.
     */
    public function test_landlord_form_success(): void
    {
        $response = $this->post('/api/v1/forms/landlord', [
            'full_name' => 'Bob Landlord',
            'email' => 'bob@example.com',
            'contact_number' => '0400000000',
            'property_address' => '123 Main St, Sydney NSW 2000',
            'source_page' => '/for-landlords',
        ]);

        $response->assertStatus(201);
        $response->assertJSON(['success' => true]);
    }

    /**
     * Test landlord form requires property address.
     */
    public function test_landlord_form_requires_address(): void
    {
        $response = $this->post('/api/v1/forms/landlord', [
            'full_name' => 'Bob Landlord',
            'email' => 'bob@example.com',
            'contact_number' => '0400000000',
            // Missing property_address
        ]);

        $response->assertStatus(422);
    }

    /**
     * Test contact form submission.
     */
    public function test_contact_form_success(): void
    {
        $response = $this->post('/api/v1/forms/contact', [
            'full_name' => 'Alice Visitor',
            'email' => 'alice@example.com',
            'contact_number' => '0411111111',
            'message' => 'Hello, I have a question.',
        ]);

        $response->assertStatus(201);
        $response->assertJSON(['success' => true]);
    }

    /**
     * Test honeypot on all forms.
     */
    public function test_all_forms_honeypot(): void
    {
        foreach (['partner', 'landlord', 'contact'] as $form) {
            $response = $this->post("/api/v1/forms/{$form}", [
                'full_name' => 'Bot',
                'email' => 'bot@spam.com',
                'contact_number' => '0412345678',
                'website_url' => 'http://spam.com',
                'business_name' => 'Bot Corp',
                'partner_type' => 'Sales Agent',
                'property_address' => '123 Bot St',
            ]);

            $response->assertStatus(200);
        }
    }
}
