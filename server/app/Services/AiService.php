<?php

namespace App\Services;

/**
 * AiService — abstraction over AI chat providers.
 * Supports: mock, openai, anthropic, tidio, intercom.
 */
class AiService
{
    protected string $provider;
    protected string $apiKey;

    public function __construct()
    {
        $this->provider = getenv('AI_PROVIDER') ?: 'mock';
        $this->apiKey = getenv('OPENAI_API_KEY') ?: '';
    }

    /**
     * Get a chat response.
     *
     * @param string $message
     * @param string|null $sessionId
     * @return array{reply: string, session_id: string}
     */
    public function chat(string $message, ?string $sessionId = null): array
    {
        if ($this->provider === 'mock' || empty($this->apiKey)) {
            return $this->mockResponse($message, $sessionId);
        }

        if ($this->provider === 'openai') {
            return $this->openAiResponse($message, $sessionId);
        }

        return $this->mockResponse($message, $sessionId);
    }

    /**
     * Stream a chat response word-by-word via callback.
     *
     * @param string $message
     * @param string $sessionId
     * @param callable $callback Called with each word chunk
     */
    public function stream(string $message, string $sessionId, callable $callback): void
    {
        $response = $this->chat($message, $sessionId);
        $words = explode(' ', $response['reply']);

        foreach ($words as $i => $word) {
            if ($word !== '') {
                $callback($word . ($i < count($words) - 1 ? ' ' : ''));
                usleep(40000); // ~40ms per word for natural pacing
            }
        }

        $callback(''); // Signal completion
    }

    /**
     * Mock AI responses for development.
     */
    protected function mockResponse(string $message, ?string $sessionId): array
    {
        $lower = strtolower($message);
        $sessionId = $sessionId ?? bin2hex(random_bytes(8));

        if (str_contains($lower, 'landlord') || str_contains($lower, 'property') || str_contains($lower, 'tenant')) {
            $reply = "Great question about property management! At Brick Lane Property Group, we help landlords maximize their investment with our proven tenant screening, regular maintenance, and guaranteed rent scheme. Would you like to schedule a free consultation?";
        } elseif (str_contains($lower, 'partner') || str_contains($lower, 'agent') || str_contains($lower, 'broker')) {
            $reply = "BPG partners with Sales Agents, Buyers Agents, Mortgage Brokers, and more! Our partnership program offers competitive commission structures and dedicated support. Want to learn more?";
        } elseif (str_contains($lower, 'contact') || str_contains($lower, 'email') || str_contains($lower, 'phone') || str_contains($lower, 'call')) {
            $reply = "You can reach us at info@bricklanepropertygroup.com.au or call (02) 9123 4567. We're available Mon-Fri, 9am-5pm AEST.";
        } elseif (str_contains($lower, 'hello') || str_contains($lower, 'hi') || str_contains($lower, 'hey')) {
            $reply = "Hello! Welcome to Brick Lane Property Group. How can I help you today? Feel free to ask about our landlord services, partnership programs, or book a free consultation.";
        } else {
            $reply = "Thanks for reaching out to Brick Lane Property Group! How can I help you today? Feel free to ask about our landlord services, partnership programs, or book a free consultation.";
        }

        return [
            'reply' => $reply,
            'session_id' => $sessionId,
        ];
    }

    /**
     * OpenAI response (placeholder — implement when API key is set).
     */
    protected function openAiResponse(string $message, ?string $sessionId): array
    {
        // TODO: Implement OpenAI API call with $this->apiKey
        return $this->mockResponse($message, $sessionId);
    }
}
