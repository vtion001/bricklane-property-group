<?php

namespace App\Controllers\Api\V1;

use App\Services\GaAnalyticsService;

/**
 * Analytics API — logs GA4 events.
 */
class Analytics extends BaseApi
{
    protected GaAnalyticsService $gaService;

    public function __construct()
    {
        parent::__construct();
        $this->gaService = new GaAnalyticsService();
    }

    /**
     * POST /api/v1/analytics/event
     */
    public function event(): ResponseInterface
    {
        $data = $this->request->getJSON(true);
        $this->gaService->trackEvent($data);

        return $this->respond(['success' => true]);
    }
}
