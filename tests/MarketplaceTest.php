<?php
namespace Groupone\Marketplace\Tests;

use PHPUnit\Framework\TestCase;
use Groupone\Marketplace\Marketplace;
use Brain\Monkey;
use Brain\Monkey\Functions;
use Mockery;

/**
 * Test cases for Marketplace class
 */
class MarketplaceTest extends TestCase {

    protected function setUp(): void {
        parent::setUp();
        Monkey\setUp();

        // Mock ABSPATH constant
        if (!defined('ABSPATH')) {
            define('ABSPATH', '/tmp/wordpress/');
        }
    }

    protected function tearDown(): void {
        Monkey\tearDown();
        Mockery::close();
        parent::tearDown();
    }

    /**
     * Test that Marketplace class exists
     */
    public function testMarketplaceClassExists() {
        $this->assertTrue(class_exists('Groupone\Marketplace\Marketplace'));
    }

    /**
     * Test run method exists and is callable
     */
    public function testRunMethodExists() {
        $this->assertTrue(method_exists(Marketplace::class, 'run'));
    }

    /**
     * Test run method is static
     */
    public function testRunMethodIsStatic() {
        $reflection = new \ReflectionMethod(Marketplace::class, 'run');
        $this->assertTrue($reflection->isStatic());
    }

    /**
     * Test run method accepts array parameter
     */
    public function testRunMethodAcceptsArrayParameter() {
        $reflection = new \ReflectionMethod(Marketplace::class, 'run');
        $parameters = $reflection->getParameters();

        $this->assertCount(1, $parameters);
        $this->assertEquals('config', $parameters[0]->getName());
        $this->assertTrue($parameters[0]->isDefaultValueAvailable());
    }

    /**
     * Test run method with valid config doesn't throw exceptions
     */
    public function testRunWithValidConfigDoesNotThrowException() {
        // Mock all WordPress functions that might be called
        Functions\when('add_action')->justReturn(true);
        Functions\when('add_submenu_page')->justReturn(true);
        Functions\when('wp_parse_args')->returnArg(1);
        Functions\when('is_admin')->justReturn(true);
        Functions\when('register_rest_route')->justReturn(true);

        $config = [
            'api_url' => 'https://api.example.com',
            'brand' => 'test-brand',
        ];

        try {
            Marketplace::run($config);
            $this->assertTrue(true);
        } catch (\Exception $e) {
            $this->fail('Marketplace::run() should not throw exception: ' . $e->getMessage());
        }
    }

    /**
     * Test run method with empty config
     */
    public function testRunWithEmptyConfig() {
        // Mock WordPress functions
        Functions\when('add_action')->justReturn(true);
        Functions\when('add_submenu_page')->justReturn(true);
        Functions\when('wp_parse_args')->returnArg(1);
        Functions\when('is_admin')->justReturn(true);
        Functions\when('register_rest_route')->justReturn(true);

        try {
            Marketplace::run([]);
            $this->assertTrue(true);
        } catch (\Exception $e) {
            $this->fail('Marketplace::run() with empty config should not throw exception');
        }
    }

    /**
     * Test run method handles exceptions and logs them
     */
    public function testRunHandlesExceptionsGracefully() {
        // Mock error_log
        Functions\when('error_log')->justReturn(true);

        // Mock wp_parse_args to throw an exception
        Functions\expect('wp_parse_args')
            ->andThrow(new \Exception('Test exception'));

        // This should not throw, should catch and log instead
        try {
            Marketplace::run(['api_url' => 'test']);
            $this->assertTrue(true, 'Exception was caught and logged');
        } catch (\Exception $e) {
            $this->fail('Exception should have been caught: ' . $e->getMessage());
        }
    }

    /**
     * Test Marketplace class is final
     */
    public function testMarketplaceClassIsFinal() {
        $reflection = new \ReflectionClass(Marketplace::class);
        $this->assertTrue($reflection->isFinal());
    }

    /**
     * Test Marketplace class namespace
     */
    public function testMarketplaceClassNamespace() {
        $reflection = new \ReflectionClass(Marketplace::class);
        $this->assertEquals('Groupone\Marketplace', $reflection->getNamespaceName());
    }
}
