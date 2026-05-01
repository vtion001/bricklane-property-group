<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Cors extends BaseConfig
{
    public array $allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:4173',
        'http://localhost:3002',
        'https://bricklanepropertygroup.com.au',
    ];

    public array $allowedMethods = [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        'OPTIONS',
    ];

    public array $allowedHeaders = [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'X-API-Key',
    ];

    public int $maxAge = 86400;

    public bool $allowCredentials = true;
}
