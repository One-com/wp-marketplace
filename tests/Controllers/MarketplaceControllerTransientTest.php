<?php
namespace Groupone\Marketplace\Tests\Controllers;

use PHPUnit\Framework\TestCase;
use Groupone\Marketplace\Controllers\MarketplaceController;
use Groupone\Marketplace\Tests\MockDataProvider;
use Brain\Monkey;
use Brain\Monkey\Functions;
use Mockery;

/**
 * Advanced tests for transient caching in MarketplaceController
 */
class MarketplaceControllerTransientTest extends TestCase {

    protected function setUp(): void {
        parent::setUp();
        Monkey\setUp();

        // Define WordPress constants
        if (!defined('ABSPATH')) {
            define('ABSPATH', '/tmp/wordpress/');
        }
        if (!defined('WP_PLUGIN_DIR')) {
            define('WP_PLUGIN_DIR', ABSPATH . 'wp-content/plugins');
        }
        if (!defined('HOUR_IN_SECONDS')) {
            define('HOUR_IN_SECONDS', 3600);
        }

        // Mock common WordPress functions
        Functions\when('is_admin')->justReturn(true);
        Functions\when('add_action')->justReturn(true);
        Functions\when('add_submenu_page')->justReturn(true);
        Functions\when('register_rest_route')->justReturn(true);
        Functions\when('error_log')->justReturn(true);
    }

    protected function tearDown(): void {
        Monkey\tearDown();
        Mockery::close();
        parent::tearDown();
    }

    /**
     * Test transient is checked before making API call
     */
    public function testTransientIsCheckedBeforeApiCall() {
        $config = ['brand' => 'test-brand', 'api_url' => 'https://api.example.com'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        // Mock get_site_transient being called with correct transient name
        Functions\expect('get_site_transient')
            ->once()
            ->with('test-brand_marketplace_catalog')
            ->andReturn(MockDataProvider::getMockTransientData());

        $controller = new MarketplaceController($config);

        // If transient exists, API should not be called
        $this->assertInstanceOf(MarketplaceController::class, $controller);
    }

    /**
     * Test transient is set with correct expiration time (12 hours)
     */
    public function testTransientExpirationTimeIsCorrect() {
        $config = ['brand' => 'test-brand', 'api_url' => 'https://api.example.com'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        // Mock get_site_transient returning false (no cache)
        Functions\expect('get_site_transient')
            ->once()
            ->andReturn(false);

        // Verify set_site_transient is called with 12 hour expiration
        Functions\expect('set_site_transient')
            ->once()
            ->with(
                'test-brand_marketplace_catalog',
                Mockery::type('array'),
                43200  // 12 * HOUR_IN_SECONDS = 12 * 3600 = 43200
            )
            ->andReturn(true);

        $controller = new MarketplaceController($config);

        $this->assertInstanceOf(MarketplaceController::class, $controller);
    }

    /**
     * Test transient uses brand name in transient key
     */
    public function testTransientKeyIncludesBrandName() {
        $config = ['brand' => 'custom-brand-xyz', 'api_url' => 'https://api.example.com'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        // Verify transient key includes custom brand name
        Functions\expect('get_site_transient')
            ->once()
            ->with('custom-brand-xyz_marketplace_catalog')
            ->andReturn(false);

        $controller = new MarketplaceController($config);

        $this->assertInstanceOf(MarketplaceController::class, $controller);
    }

    /**
     * Test transient is deleted when reset_marketplace_catalog_transient is called
     */
    public function testResetTransientDeletesCache() {
        $config = ['brand' => 'test-brand'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        // Verify delete_site_transient is called with correct key
        Functions\expect('delete_site_transient')
            ->once()
            ->with('test-brand_marketplace_catalog')
            ->andReturn(true);

        $controller = new MarketplaceController($config);
        $controller->reset_marketplace_catalog_transient();

        $this->assertTrue(true);
    }

    /**
     * Test transient is reset on plugin activation hook
     */
    public function testTransientIsResetOnPluginActivation() {
        $config = ['brand' => 'test-brand'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        // Mock is_admin to return true to register hooks
        Functions\expect('is_admin')->once()->andReturn(true);

        // Verify add_action is called for activated_plugin hook
        Functions\expect('add_action')
            ->with('activated_plugin', Mockery::type('array'))
            ->once();

        Functions\expect('add_action')->atLeast()->once();

        $controller = new MarketplaceController($config);
        $controller->init();

        $this->assertTrue(true);
    }

    /**
     * Test transient is reset on plugin deactivation hook
     */
    public function testTransientIsResetOnPluginDeactivation() {
        $config = ['brand' => 'test-brand'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        Functions\expect('is_admin')->once()->andReturn(true);

        // Verify add_action is called for deactivated_plugin hook
        Functions\expect('add_action')
            ->with('deactivated_plugin', Mockery::type('array'))
            ->once();

        Functions\expect('add_action')->atLeast()->once();

        $controller = new MarketplaceController($config);
        $controller->init();

        $this->assertTrue(true);
    }

    /**
     * Test transient returns valid structure
     */
    public function testTransientDataStructureIsValid() {
        $transientData = MockDataProvider::getMockTransientData();

        // Verify structure
        $this->assertIsArray($transientData);
        $this->assertArrayHasKey('success', $transientData);
        $this->assertArrayHasKey('data', $transientData);
        $this->assertArrayHasKey('catalog', $transientData['data']);
        $this->assertTrue($transientData['success']);
    }

    /**
     * Test transient data includes cached timestamp
     */
    public function testTransientIncludesCachedTimestamp() {
        $transientData = MockDataProvider::getMockTransientData();

        $this->assertArrayHasKey('cached_at', $transientData);
        $this->assertIsInt($transientData['cached_at']);
        $this->assertGreaterThan(0, $transientData['cached_at']);
    }

    /**
     * Test empty brand name defaults transient key
     */
    public function testEmptyBrandNameInTransientKey() {
        $config = ['brand' => '', 'api_url' => 'https://api.example.com'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        // With empty brand, transient key should be "_marketplace_catalog"
        Functions\expect('get_site_transient')
            ->once()
            ->with('_marketplace_catalog')
            ->andReturn(false);

        $controller = new MarketplaceController($config);

        $this->assertInstanceOf(MarketplaceController::class, $controller);
    }

    /**
     * Test transient is not set when API returns invalid data
     */
    public function testTransientNotSetOnInvalidApiResponse() {
        $config = ['brand' => 'test-brand', 'api_url' => 'https://api.example.com', 'payload' => []];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        Functions\expect('get_site_transient')
            ->once()
            ->with('test-brand_marketplace_catalog')
            ->andReturn(false);

        // Mock model to return invalid data
        $mockModel = Mockery::mock('Groupone\Marketplace\Models\MarketplaceModel');
        $invalidData = [
            'success' => true,
            'data' => 'invalid', // Not an array with 'catalog' key
        ];

        $mockModel->shouldReceive('fetch_plugins')
            ->once()
            ->andReturn($invalidData);

        Functions\expect('is_wp_error')->andReturn(false);

        // set_site_transient should NOT be called if API returns invalid data
        Functions\expect('set_site_transient')->never();

        $controller = new MarketplaceController($config);

        // Inject mock model
        $reflection = new \ReflectionClass($controller);
        $modelProperty = $reflection->getProperty('model');
        $modelProperty->setAccessible(true);
        $modelProperty->setValue($controller, $mockModel);

        $request = new \stdClass();
        $response = $controller->get_plugins($request);

        $this->assertEquals(500, $response->get_status());
    }

    /**
     * Test transient data is properly structured with all required fields
     */
    public function testTransientDataStructureComplete() {
        $config = ['brand' => 'test-brand', 'api_url' => 'https://api.example.com'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        $transientData = MockDataProvider::getCompletePluginsCatalog();

        Functions\expect('get_site_transient')
            ->once()
            ->andReturn($transientData);

        Functions\expect('file_exists')->andReturn(false);
        Functions\expect('get_plugins')->andReturn([]);
        Functions\when('trailingslashit')->returnArg();
        Functions\when('rest_url')->justReturn('https://example.com/wp-json/');

        $controller = new MarketplaceController($config);
        $request = new \stdClass();
        $response = $controller->get_plugins($request);

        $data = $response->get_data();

        // Verify complete structure
        $this->assertArrayHasKey('success', $data);
        $this->assertArrayHasKey('data', $data);
        $this->assertArrayHasKey('catalog', $data['data']);
        $this->assertArrayHasKey('is_cached', $data);
        $this->assertTrue($data['is_cached']);

        // Verify catalog items have required fields
        $plugin = $data['data']['catalog'][0];
        $this->assertArrayHasKey('id', $plugin);
        $this->assertArrayHasKey('slug', $plugin);
        $this->assertArrayHasKey('name', $plugin);
        $this->assertArrayHasKey('version', $plugin);
        $this->assertArrayHasKey('installed', $plugin);
        $this->assertArrayHasKey('activated', $plugin);
    }

    /**
     * Test transient reset logs properly
     */
    public function testTransientResetLogsMessage() {
        $config = ['brand' => 'test-brand'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        Functions\expect('delete_site_transient')
            ->once()
            ->with('test-brand_marketplace_catalog')
            ->andReturn(true);

        // Verify error_log is called when transient is deleted
        Functions\expect('error_log')
            ->once()
            ->with('Reset marketplace catalog transient');

        $controller = new MarketplaceController($config);
        $controller->reset_marketplace_catalog_transient();

        $this->assertTrue(true);
    }

    /**
     * Test transient is NOT deleted when delete fails
     */
    public function testTransientResetHandlesFailure() {
        $config = ['brand' => 'test-brand'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        Functions\expect('delete_site_transient')
            ->once()
            ->with('test-brand_marketplace_catalog')
            ->andReturn(false);

        // error_log should NOT be called when deletion fails
        Functions\expect('error_log')->never();

        $controller = new MarketplaceController($config);
        $controller->reset_marketplace_catalog_transient();

        $this->assertTrue(true);
    }

    /**
     * Test cached data contains is_cached flag set to true
     */
    public function testCachedDataHasIsCachedFlag() {
        $config = ['brand' => 'test-brand', 'api_url' => 'https://api.example.com'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        $cachedData = MockDataProvider::getMockTransientData();

        Functions\expect('get_site_transient')
            ->once()
            ->andReturn($cachedData);

        Functions\expect('file_exists')->andReturn(false);
        Functions\expect('get_plugins')->andReturn([]);
        Functions\when('trailingslashit')->returnArg();
        Functions\when('rest_url')->justReturn('https://example.com/wp-json/');

        $controller = new MarketplaceController($config);
        $request = new \stdClass();
        $response = $controller->get_plugins($request);

        $data = $response->get_data();

        $this->assertArrayHasKey('is_cached', $data);
        $this->assertTrue($data['is_cached']);
    }

    /**
     * Test fresh API data contains is_cached flag set to false
     */
    public function testFreshApiDataHasIsCachedFlagFalse() {
        $config = ['brand' => 'test-brand', 'api_url' => 'https://api.example.com', 'payload' => []];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        Functions\expect('get_site_transient')
            ->once()
            ->andReturn(false);

        $apiData = MockDataProvider::getCompletePluginsCatalog();

        $mockModel = Mockery::mock('Groupone\Marketplace\Models\MarketplaceModel');
        $mockModel->shouldReceive('fetch_plugins')
            ->once()
            ->andReturn($apiData);

        Functions\expect('is_wp_error')->andReturn(false);
        Functions\expect('set_site_transient')->andReturn(true);
        Functions\expect('file_exists')->andReturn(false);
        Functions\expect('get_plugins')->andReturn([]);
        Functions\when('trailingslashit')->returnArg();
        Functions\when('rest_url')->justReturn('https://example.com/wp-json/');

        $controller = new MarketplaceController($config);

        // Inject mock model
        $reflection = new \ReflectionClass($controller);
        $modelProperty = $reflection->getProperty('model');
        $modelProperty->setAccessible(true);
        $modelProperty->setValue($controller, $mockModel);

        $request = new \stdClass();
        $response = $controller->get_plugins($request);

        $data = $response->get_data();

        $this->assertArrayHasKey('is_cached', $data);
        $this->assertFalse($data['is_cached']);
    }

    /**
     * Test transient with multiple brands doesn't conflict
     */
    public function testMultipleBrandsUseDifferentTransients() {
        $brand1Config = ['brand' => 'brand-one', 'api_url' => 'https://api.example.com'];
        $brand2Config = ['brand' => 'brand-two', 'api_url' => 'https://api.example.com'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        // First brand transient check
        Functions\expect('get_site_transient')
            ->once()
            ->with('brand-one_marketplace_catalog')
            ->andReturn(MockDataProvider::getMockTransientData());

        Functions\expect('file_exists')->andReturn(false);
        Functions\expect('get_plugins')->andReturn([]);
        Functions\when('trailingslashit')->returnArg();
        Functions\when('rest_url')->justReturn('https://example.com/wp-json/');

        $controller1 = new MarketplaceController($brand1Config);
        $request = new \stdClass();
        $response1 = $controller1->get_plugins($request);

        $data1 = $response1->get_data();
        $this->assertTrue($data1['is_cached']);

        // Second brand should use different transient key
        Functions\expect('get_site_transient')
            ->once()
            ->with('brand-two_marketplace_catalog')
            ->andReturn(false);

        $controller2 = new MarketplaceController($brand2Config);

        // This would need API call since no cache exists for brand-two
        $this->assertInstanceOf(MarketplaceController::class, $controller2);
    }

    /**
     * Test transient expiration is set correctly (12 hours = 43200 seconds)
     */
    public function testTransientExpirationValue() {
        $config = ['brand' => 'test-brand', 'api_url' => 'https://api.example.com', 'payload' => []];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        Functions\expect('get_site_transient')
            ->once()
            ->andReturn(false);

        $apiData = MockDataProvider::getCompletePluginsCatalog();

        $mockModel = Mockery::mock('Groupone\Marketplace\Models\MarketplaceModel');
        $mockModel->shouldReceive('fetch_plugins')
            ->once()
            ->andReturn($apiData);

        Functions\expect('is_wp_error')->andReturn(false);

        // Verify exact expiration time
        Functions\expect('set_site_transient')
            ->once()
            ->with('test-brand_marketplace_catalog', $apiData, 43200)
            ->andReturn(true);

        Functions\expect('file_exists')->andReturn(false);
        Functions\expect('get_plugins')->andReturn([]);
        Functions\when('trailingslashit')->returnArg();
        Functions\when('rest_url')->justReturn('https://example.com/wp-json/');

        $controller = new MarketplaceController($config);

        // Inject mock model
        $reflection = new \ReflectionClass($controller);
        $modelProperty = $reflection->getProperty('model');
        $modelProperty->setAccessible(true);
        $modelProperty->setValue($controller, $mockModel);

        $request = new \stdClass();
        $controller->get_plugins($request);

        $this->assertTrue(true);
    }
}

