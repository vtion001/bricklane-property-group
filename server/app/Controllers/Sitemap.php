<?php

namespace App\Controllers;

class Sitemap extends BaseController
{
    public function index()
    {
        $urls = [
            ['loc' => base_url('/'), 'changefreq' => 'weekly', 'priority' => '1.0'],
            ['loc' => base_url('/for-partners'), 'changefreq' => 'monthly', 'priority' => '0.8'],
            ['loc' => base_url('/for-landlords'), 'changefreq' => 'weekly', 'priority' => '0.9'],
            ['loc' => base_url('/about'), 'changefreq' => 'monthly', 'priority' => '0.7'],
            ['loc' => base_url('/contact'), 'changefreq' => 'monthly', 'priority' => '0.6'],
        ];

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        foreach ($urls as $url) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars($url['loc']) . '</loc>';
            $xml .= '<changefreq>' . $url['changefreq'] . '</changefreq>';
            $xml .= '<priority>' . $url['priority'] . '</priority>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return $this->response
            ->setHeader('Content-Type', 'application/xml')
            ->setBody($xml);
    }
}
