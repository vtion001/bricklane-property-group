<?php

namespace App\Models;

use CodeIgniter\Model;

/**
 * SettingsModel — key-value store for site settings.
 */
class SettingsModel extends Model
{
    protected $table = 'settings';
    protected $primaryKey = 'key';
    protected $useAutoIncrement = false;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $allowedFields = ['key', 'value', 'updated_at'];
    protected $useTimestamps = true;
    protected $updatedField = 'updated_at';
    protected $dateFormat = 'datetime';

    /**
     * Get a single setting with a default fallback.
     */
    public function getSetting(string $key, mixed $default = null): mixed
    {
        $row = $this->find($key);
        return $row !== null ? $row['value'] : $default;
    }

    /**
     * Set a single setting.
     */
    public function setSetting(string $key, mixed $value): bool
    {
        return $this->save(['key' => $key, 'value' => $value]) !== false;
    }

    /**
     * Get all public (frontend-facing) settings.
     *
     * @return array
     */
    public function getPublicSettings(): array
    {
        $publicKeys = ['calendly_url', 'ai_provider', 'recaptcha_site_key'];
        $rows = $this->findAll();

        $result = [];
        foreach ($rows as $row) {
            if (in_array($row['key'], $publicKeys)) {
                $result[$row['key']] = $row['value'];
            }
        }

        return $result;
    }
}
