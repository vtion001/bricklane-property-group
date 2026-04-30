<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

/**
 * RateLimitFilter — simple in-memory rate limiter.
 * Limits API calls per IP address per endpoint.
 */
class RateLimitFilter implements FilterInterface
{
    /** @var array<string, int> In-memory request timestamps */
    protected static array $hits = [];

    /**
     * Apply rate limiting: max 60 requests per minute per IP per endpoint.
     */
    public function before(RequestInterface $request, $arguments = null)
    {
        $ip = $request->getIPAddress();
        $path = $request->getPath();
        $key = $ip . ':' . $path;
        $now = time();

        // Clean up old entries (older than 2 minutes)
        foreach (self::$hits as $k => $timestamp) {
            if ($now - $timestamp > 120) {
                unset(self::$hits[$k]);
            }
        }

        if (isset(self::$hits[$key]) && ($now - self::$hits[$key]) < 60) {
            return service('response')
                ->setJSON([
                    'success' => false,
                    'error' => [
                        'code' => 'RATE_LIMITED',
                        'message' => 'Too many requests. Please wait before trying again.',
                    ],
                ])
                ->setStatusCode(429);
        }

        self::$hits[$key] = $now;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        return $response;
    }
}
