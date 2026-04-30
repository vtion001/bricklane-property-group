<?php

namespace Tests\Support;

use CodeIgniter\Test\CIUnitTestCase;

/**
 * Base test case for feature tests.
 */
class TestCase extends CIUnitTestCase
{
    protected $refresh = true;
    protected $seed = false;
}
