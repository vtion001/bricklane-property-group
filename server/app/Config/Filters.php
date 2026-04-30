<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Filters extends BaseConfig
{
    public array $aliases = [
        'csrf'      => \CodeIgniter\Filters\CSRF::class,
        'toolbar'   => \CodeIgniter\Filters\DebugToolbar::class,
        'ratelimit' => \App\Filters\RateLimitFilter::class,
        'cors'      => \App\Filters\CorsFilter::class,
    ];
}
