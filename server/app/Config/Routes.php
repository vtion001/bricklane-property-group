<?php

/**
 * @see https://codeigniter4.github.io/userguide/incoming/routing.html
 */

use Config\Filters;

// API v1 Routes
$routes->group('api', ['filter' => 'cors'], function ($routes) {
    $routes->group('v1', function ($routes) {
        $routes->get('leads', 'Api\V1\Leads::index');
        $routes->post('leads', 'Api\V1\Leads::create');
        $routes->get('leads/(:num)', 'Api\V1\Leads::show/$1');
        $routes->patch('leads/(:num)', 'Api\V1\Leads::update/$1');
        $routes->delete('leads/(:num)', 'Api\V1\Leads::delete/$1');

        $routes->post('forms/partner', 'Api\V1\Forms::partner');
        $routes->post('forms/landlord', 'Api\V1\Forms::landlord');
        $routes->post('forms/contact', 'Api\V1\Forms::contact');

        $routes->post('ai/chat', 'Api\V1\Ai::chat');
        $routes->get('ai/stream/(:alphanum)', 'Api\V1\Ai::stream/$1');

        $routes->post('analytics/event', 'Api\V1\Analytics::event');

        $routes->get('settings', 'Api\V1\Settings::index');
        $routes->put('settings', 'Api\V1\Settings::update');

        $routes->post('appraisal/route', 'Api\V1\Appraisal::route');
    });
});

// SPA fallback
$routes->get('/', 'Home::index');
$routes->get('/for-partners', 'Home::index');
$routes->get('/for-landlords', 'Home::index');
$routes->get('/about', 'Home::index');
$routes->get('/contact', 'Home::index');
$routes->get('/admin', 'Home::index');
$routes->get('/admin/(:any)', 'Home::index');
