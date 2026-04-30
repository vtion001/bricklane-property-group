<?php

namespace App\Controllers\Api\V1;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

/**
 * Base API controller — shared response helpers.
 */
class BaseApi extends BaseController
{
    /**
     * Send a JSON success response.
     */
    protected function respond(mixed $data, int $code = 200): ResponseInterface
    {
        return $this->response->setJSON($data)->setStatusCode($code);
    }

    /**
     * Send a JSON created response (201).
     */
    protected function respondCreated(mixed $data): ResponseInterface
    {
        return $this->response
            ->setJSON(['success' => true, 'data' => $data])
            ->setStatusCode(201);
    }

    /**
     * Send a JSON error response.
     */
    protected function respondError(
        string $code,
        string $message,
        int $httpCode = 400,
        ?array $details = null
    ): ResponseInterface {
        $body = [
            'success' => false,
            'error' => [
                'code' => $code,
                'message' => $message,
            ],
        ];

        if ($details !== null) {
            $body['error']['details'] = $details;
        }

        return $this->response->setJSON($body)->setStatusCode($httpCode);
    }
}
