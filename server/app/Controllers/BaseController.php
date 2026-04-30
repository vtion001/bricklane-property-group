<?php

namespace App\Controllers;

use CodeIgniter\Controller;

class BaseController extends Controller
{
    protected $request;

    public function __construct()
    {
        $this->request = service('request');
    }
}
