<?php

namespace Tests;

use CodeIgniter\Test\CIUnitTestCase;
use CodeIgniter\Test\FeatureTestTrait;

/**
 * Base test case for feature tests.
 */
class TestCase extends CIUnitTestCase
{
    use FeatureTestTrait;

    protected $refresh = true;
    protected $seed = false;
}
