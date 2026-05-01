<?php

namespace App\Controllers\Api\V1;

use App\Models\SettingsModel;

/**
 * Settings API — read/write site settings.
 */
class Settings extends BaseApi
{
    protected SettingsModel $settingsModel;

    public function __construct()
    {
        parent::__construct();
        $this->settingsModel = new SettingsModel();
    }

    /**
     * GET /api/v1/settings
     * Returns public-facing settings only.
     */
    public function index()
    {
        $settings = $this->settingsModel->getPublicSettings();

        return $this->respond([
            'success' => true,
            'data' => $settings,
        ]);
    }

    /**
     * PUT /api/v1/settings
     * Update settings (admin auth TODO).
     */
    public function update()
    {
        $data = $this->request->getJSON(true);

        foreach ($data as $key => $value) {
            if (is_string($key) && $key !== '') {
                $this->settingsModel->setSetting($key, (string) $value);
            }
        }

        return $this->respond(['success' => true]);
    }
}
