<?php

namespace App\Controllers\Api\V1;

/**
 * Appraisal API — routes appraisal requests.
 */
class Appraisal extends BaseApi
{
    /**
     * POST /api/v1/appraisal/route
     */
    public function route(): ResponseInterface
    {
        $data = $this->request->getJSON(true);
        $propertyAddress = $data['property_address'] ?? '';

        if (empty(trim($propertyAddress))) {
            return $this->respondError('VALIDATION_ERROR', 'Property address is required', 422);
        }

        return $this->respond([
            'success' => true,
            'data' => [
                'routed_to' => 'calendly',
                'scheduling_url' => 'https://calendly.com/bpg',
                'message' => 'Book your free appraisal consultation',
            ],
        ]);
    }
}
