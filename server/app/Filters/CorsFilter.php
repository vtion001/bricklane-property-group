<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Cors as CorsConfig;

class CorsFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $config = new CorsConfig();
        $origin = $request->getHeaderLine('Origin');

        if (in_array($origin, $config->allowedOrigins)) {
            $response = service('response');
            $response->setHeader('Access-Control-Allow-Origin', $origin);
            $response->setHeader('Access-Control-Allow-Methods', implode(', ', $config->allowedMethods));
            $response->setHeader('Access-Control-Allow-Headers', implode(', ', $config->allowedHeaders));
            $response->setHeader('Access-Control-Max-Age', (string) $config->maxAge);

            if ($config->allowCredentials) {
                $response->setHeader('Access-Control-Allow-Credentials', 'true');
            }
        }

        if ($request->getMethod() === 'options') {
            return service('response')
                ->setStatusCode(200)
                ->setHeader('Access-Control-Allow-Origin', in_array($origin, $config->allowedOrigins) ? $origin : '*')
                ->setHeader('Access-Control-Allow-Methods', implode(', ', $config->allowedMethods))
                ->setHeader('Access-Control-Allow-Headers', implode(', ', $config->allowedHeaders))
                ->setHeader('Access-Control-Max-Age', (string) $config->maxAge);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        return $response;
    }
}
