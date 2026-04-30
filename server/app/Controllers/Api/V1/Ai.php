<?php

namespace App\Controllers\Api\V1;

use App\Services\AiService;

/**
 * AI Chat API — handles chat messages and SSE streaming.
 */
class Ai extends BaseApi
{
    protected AiService $aiService;

    public function __construct()
    {
        parent::__construct();
        $this->aiService = new AiService();
    }

    /**
     * POST /api/v1/ai/chat
     */
    public function chat(): ResponseInterface
    {
        $data = $this->request->getJSON(true);
        $message = $data['message'] ?? '';
        $sessionId = $data['session_id'] ?? null;

        if (empty(trim($message))) {
            return $this->respondError('VALIDATION_ERROR', 'Message is required', 422);
        }

        $response = $this->aiService->chat($message, $sessionId);

        return $this->respond([
            'success' => true,
            'data' => $response,
        ]);
    }

    /**
     * GET /api/v1/ai/stream/:session
     * SSE streaming for real-time chat responses.
     */
    public function stream(string $sessionId): ResponseInterface
    {
        $message = $this->request->getGet('message') ?? '';

        if (empty(trim($message))) {
            return $this->respondError('VALIDATION_ERROR', 'Message is required', 422);
        }

        $this->response->setContentType('text/event-stream');
        $this->response->setHeader('Cache-Control', 'no-cache');
        $this->response->setHeader('X-Accel-Buffering', 'no');

        $this->aiService->stream($message, $sessionId, function (string $chunk) {
            if ($chunk === '') {
                echo "data: " . json_encode(['done' => true]) . "\n\n";
            } else {
                echo "data: " . json_encode(['content' => $chunk]) . "\n\n";
            }
            flush();
            if (ob_get_level() > 0) {
                ob_flush();
            }
        });

        return $this->response;
    }
}
