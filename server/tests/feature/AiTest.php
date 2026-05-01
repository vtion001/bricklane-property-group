<?php

namespace Tests\Feature;

use Tests\TestCase;

class AiTest extends TestCase
{
    /**
     * Test AI chat endpoint.
     */
    public function test_chat_success(): void
    {
        $response = $this->withBodyFormat('json')->post('/api/v1/ai/chat', [
            'message' => 'Hello, I have a question about property management.',
        ]);

        $response->assertStatus(200);
        $response->assertJSONStructure([
            'success',
            'data' => ['reply', 'session_id'],
        ]);
    }

    /**
     * Test AI chat requires message.
     */
    public function test_chat_requires_message(): void
    {
        $response = $this->withBodyFormat('json')->post('/api/v1/ai/chat', [
            'message' => '',
        ]);

        $response->assertStatus(422);
    }

    /**
     * Test AI chat uses session ID.
     */
    public function test_chat_with_session(): void
    {
        $response = $this->withBodyFormat('json')->post('/api/v1/ai/chat', [
            'message' => 'Hello',
            'session_id' => 'test-session-123',
        ]);

        $response->assertStatus(200);
        $response->assertJSON([
            'success' => true,
            'data' => [
                'session_id' => 'test-session-123',
            ],
        ]);
    }
}
