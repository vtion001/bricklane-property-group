<?php

namespace App\Services;

/**
 * GaAnalyticsService — logs analytics events.
 * In production, this would send to Google Analytics 4 Measurement Protocol.
 * Currently logs to file for development.
 */
class GaAnalyticsService
{
    /**
     * Track a GA4 event.
     */
    public function trackEvent(array $data): void
    {
        $eventName = $data['event'] ?? 'unknown';
        $properties = $data['properties'] ?? [];

        log_message('info', 'GA4 Event: ' . $eventName . ' — ' . json_encode($properties));
    }
}
