<?php
namespace Groupone\Marketplace\Tests\Controllers;

use PHPUnit\Framework\TestCase;
use Groupone\Marketplace\Controllers\MarketplaceController;
use Groupone\Marketplace\Models\MarketplaceModel;
use Groupone\Marketplace\Tests\MockDataProvider;
use Brain\Monkey;
use Brain\Monkey\Functions;
use Mockery;

/**
 * Test cases for MarketplaceController class
 */
class MarketplaceControllerTest extends TestCase {

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
        if (!defined('WP_CONTENT_DIR')) {
            define('WP_CONTENT_DIR', ABSPATH . 'wp-content');
        }
        if (!defined('HOUR_IN_SECONDS')) {
            define('HOUR_IN_SECONDS', 3600);
        }

        // Mock WP_REST_Response class if not exists
        if (!class_exists('WP_REST_Response')) {
            eval('
                class WP_REST_Response {
                    private $data;
                    private $status;
                    public function __construct($data = null, $status = 200) {
                        $this->data = $data;
                        $this->status = $status;
                    }
                    public function get_data() {
                        return $this->data;
                    }
                    public function get_status() {
                        return $this->status;
                    }
                }
            ');
        }

        // Mock WP_Error class if not exists
        if (!class_exists('WP_Error')) {
            eval('
                class WP_Error {
                    private $message;
                    public function __construct($code = "", $message = "") {
                        $this->message = $message;
                    }
                    public function get_error_message() {
                        return $this->message;
                    }
                }
            ');
        }

        // Mock common WordPress functions
        Functions\when('is_admin')->justReturn(false);
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
     * Test boot method creates instance and initializes
     */
    public function testBootCreatesInstanceAndInitializes() {
        $config = ['api_url' => 'https://api.example.com'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        $instance = MarketplaceController::boot($config);

        $this->assertInstanceOf(MarketplaceController::class, $instance);
    }

    /**
     * Test constructor sets default config values
     */
    public function testConstructorSetsDefaultConfig() {
        $config = [];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        $controller = new MarketplaceController($config);

        $this->assertInstanceOf(MarketplaceController::class, $controller);
    }

    /**
     * Test init registers admin hooks
     */
    public function testInitRegistersAdminHooks() {
        $config = ['api_url' => 'https://api.example.com'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });
        Functions\expect('is_admin')->once()->andReturn(true);

        Functions\expect('add_action')->atLeast()->once();

        $controller = new MarketplaceController($config);
        $controller->init();

        $this->assertTrue(true);
    }

    /**
     * Test register_menu adds submenu page
     */
    public function testRegisterMenuAddsSubmenuPage() {
        $config = [
            'parent_menu_slug' => 'options-general.php',
            'page_title' => 'Test Marketplace',
            'menu_title' => 'Test Menu',
            'menu_slug' => 'test-marketplace',
        ];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        Functions\expect('add_submenu_page')
            ->once()
            ->with(
                'options-general.php',
                'Test Marketplace',
                'Test Menu',
                'manage_options',
                'test-marketplace',
                Mockery::type('array')
            );

        $controller = new MarketplaceController($config);
        $controller->register_menu();

        $this->assertTrue(true);
    }

    /**
     * Test register_rest_routes registers route
     */
    public function testRegisterRestRoutesRegistersRoute() {
        $config = ['api_url' => 'https://api.example.com'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        Functions\expect('register_rest_route')
            ->once()
            ->with(
                'marketplace/v1',
                '/plugins',
                Mockery::type('array')
            );

        $controller = new MarketplaceController($config);
        $controller->register_rest_routes();

        $this->assertTrue(true);
    }

    /**
     * Test ajax_install_plugin validates nonce
     */
    public function testAjaxInstallPluginValidatesNonce() {
        $config = ['api_url' => 'https://api.example.com'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });
        Functions\expect('check_ajax_referer')
            ->once()
            ->with('marketplace_nonce', 'nonce');

        Functions\expect('current_user_can')
            ->once()
            ->with('install_plugins')
            ->andReturn(false);

        Functions\expect('wp_send_json_error')
            ->once()
            ->with(['message' => 'Permission denied']);

        $controller = new MarketplaceController($config);
        $controller->ajax_install_plugin();

        $this->assertTrue(true);
    }

    /**
     * Test ajax_activate_plugin requires capability
     */
    public function testAjaxActivatePluginRequiresCapability() {
        $config = ['api_url' => 'https://api.example.com'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        Functions\expect('current_user_can')
            ->once()
            ->with('activate_plugins')
            ->andReturn(false);

        Functions\expect('wp_send_json_error')
            ->once()
            ->with(['message' => Mockery::type('string')]);

        // Mock check_ajax_referer
        Functions\when('check_ajax_referer')->justReturn(true);

        $controller = new MarketplaceController($config);
        $controller->ajax_activate_plugin();

        $this->assertTrue(true);
    }

    /**
     * Test ajax_deactivate_plugin validates nonce
     */
    public function testAjaxDeactivatePluginValidatesNonce() {
        $config = ['api_url' => 'https://api.example.com'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });
        Functions\expect('check_ajax_referer')
            ->once()
            ->with('marketplace_nonce', 'nonce');

        Functions\expect('current_user_can')
            ->once()
            ->with('activate_plugins')
            ->andReturn(false);

        Functions\expect('wp_send_json_error')
            ->once()
            ->with(['message' => 'Permission denied']);

        $controller = new MarketplaceController($config);
        $controller->ajax_deactivate_plugin();

        $this->assertTrue(true);
    }

    /**
     * Test reset_marketplace_catalog_transient deletes transient
     */
    public function testResetMarketplaceCatalogTransientDeletesTransient() {
        $config = ['brand' => 'test-brand'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });
        Functions\expect('delete_site_transient')
            ->once()
            ->with('test-brand_marketplace_catalog')
            ->andReturn(true);

        Functions\when('error_log')->justReturn(true);

        $controller = new MarketplaceController($config);
        $controller->reset_marketplace_catalog_transient();

        $this->assertTrue(true);
    }

    /**
     * Test get_plugins returns cached data when transient exists
     */
    public function testGetPluginsReturnsCachedData() {
        $config = ['brand' => 'test-brand', 'api_url' => 'https://api.example.com'];

        // Use mock data from MockDataProvider
        $cachedData = MockDataProvider::getMockTransientData();

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        // Mock get_site_transient to return cached data
        Functions\expect('get_site_transient')
            ->once()
            ->with('test-brand_marketplace_catalog')
            ->andReturn($cachedData);

        // Mock WordPress functions needed for plugin state checking
        Functions\expect('file_exists')->andReturn(true);
        Functions\expect('is_dir')->andReturn(true);
        Functions\expect('get_plugins')->andReturn(MockDataProvider::getInstalledPlugins());
        Functions\expect('is_plugin_active')->andReturn(false);
        Functions\when('trailingslashit')->returnArg();
        Functions\when('rest_url')->justReturn('https://example.com/wp-json/');

        $controller = new MarketplaceController($config);

        // Create mock REST request
        $request = new \stdClass();
        $response = $controller->get_plugins($request);

        // Verify response structure
        $this->assertInstanceOf(\WP_REST_Response::class, $response);
        $data = $response->get_data();

        $this->assertTrue($data['success']);
        $this->assertTrue($data['is_cached']);
        $this->assertArrayHasKey('catalog', $data['data']);
    }

    /**
     * Test get_plugins fetches from API when transient is empty/false
     */
    public function testGetPluginsFetchesFromApiWhenCacheEmpty() {
        $config = ['brand' => 'test-brand', 'api_url' => 'https://api.example.com', 'payload' => []];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        // Mock get_site_transient returning false (no cache)
        Functions\expect('get_site_transient')
            ->once()
            ->with('test-brand_marketplace_catalog')
            ->andReturn(false);

        // Get fresh API data
        $apiData = MockDataProvider::getCompletePluginsCatalog();

        // Mock model to return API data
        $mockModel = Mockery::mock(MarketplaceModel::class);
        $mockModel->shouldReceive('fetch_plugins')
            ->once()
            ->with([])
            ->andReturn($apiData);

        // Mock set_site_transient to cache the data
        Functions\expect('set_site_transient')
            ->once()
            ->with('test-brand_marketplace_catalog', $apiData, 12 * 3600)
            ->andReturn(true);

        // Mock WordPress functions for plugin state checking
        Functions\expect('file_exists')->andReturn(true);
        Functions\expect('is_dir')->andReturn(true);
        Functions\expect('get_plugins')->andReturn(MockDataProvider::getInstalledPlugins());
        Functions\expect('is_plugin_active')->andReturn(false);
        Functions\when('trailingslashit')->returnArg();
        Functions\when('rest_url')->justReturn('https://example.com/wp-json/');

        $controller = new MarketplaceController($config);

        // Inject mock model using reflection
        $reflection = new \ReflectionClass($controller);
        $modelProperty = $reflection->getProperty('model');
        $modelProperty->setAccessible(true);
        $modelProperty->setValue($controller, $mockModel);

        // Call get_plugins
        $request = new \stdClass();
        $response = $controller->get_plugins($request);

        // Verify response
        $this->assertInstanceOf(\WP_REST_Response::class, $response);
        $data = $response->get_data();

        $this->assertTrue($data['success']);
        $this->assertFalse($data['is_cached']); // Should not be cached on first fetch
        $this->assertArrayHasKey('catalog', $data['data']);
    }

    /**
     * Test set_site_transient is called when API returns valid data
     */
    public function testTransientIsSetAfterSuccessfulApiFetch() {
        $config = ['brand' => 'test-brand', 'api_url' => 'https://api.example.com', 'payload' => []];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        // Mock get_site_transient returning false (no cache)
        Functions\expect('get_site_transient')
            ->once()
            ->with('test-brand_marketplace_catalog')
            ->andReturn(false);

        $apiData = MockDataProvider::getCompletePluginsCatalog();

        // Mock model to return API data
        $mockModel = Mockery::mock(MarketplaceModel::class);
        $mockModel->shouldReceive('fetch_plugins')
            ->once()
            ->andReturn($apiData);

        // Mock set_site_transient being called to cache new data with 12 hour expiration
        Functions\expect('set_site_transient')
            ->once()
            ->with(
                'test-brand_marketplace_catalog',
                $apiData,
                43200  // 12 * HOUR_IN_SECONDS = 12 * 3600 = 43200
            )
            ->andReturn(true);

        // Mock WordPress functions
        Functions\expect('file_exists')->andReturn(true);
        Functions\expect('is_dir')->andReturn(true);
        Functions\expect('get_plugins')->andReturn(MockDataProvider::getInstalledPlugins());
        Functions\expect('is_plugin_active')->andReturn(false);
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

        $this->assertInstanceOf(\WP_REST_Response::class, $response);
    }

    /**
     * Test constructor with custom config
     */
    public function testConstructorWithCustomConfig() {
        $config = [
            'parent_menu_slug' => 'tools.php',
            'page_title' => 'Custom Marketplace',
            'api_url' => 'https://custom-api.example.com',
            'brand' => 'custom-brand',
        ];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        $controller = new MarketplaceController($config);

        $this->assertInstanceOf(MarketplaceController::class, $controller);
    }

    /**
     * Test get_plugins handles WP_Error from API
     */
    public function testGetPluginsHandlesWpError() {
        $config = ['brand' => 'test-brand', 'api_url' => 'https://api.example.com', 'payload' => []];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        // Mock get_site_transient returning false (no cache)
        Functions\expect('get_site_transient')
            ->once()
            ->andReturn(false);

        // Create actual WP_Error instance
        $wpError = new \WP_Error('api_error', 'API connection failed');

        // Mock model - note: We need to bypass the type hint
        // Use Mockery to create a partial mock that returns WP_Error despite type hint
        $mockModel = Mockery::mock('Groupone\Marketplace\Models\MarketplaceModel')->makePartial();
        $mockModel->shouldReceive('fetch_plugins')
            ->once()
            ->andReturn($wpError);

        Functions\expect('is_wp_error')
            ->once()
            ->andReturn(true);

        $controller = new MarketplaceController($config);

        // Inject mock model
        $reflection = new \ReflectionClass($controller);
        $modelProperty = $reflection->getProperty('model');
        $modelProperty->setAccessible(true);
        $modelProperty->setValue($controller, $mockModel);

        $request = new \stdClass();
        $response = $controller->get_plugins($request);

        // Verify error response
        $this->assertInstanceOf(\WP_REST_Response::class, $response);
        $this->assertEquals(500, $response->get_status());
        $data = $response->get_data();
        $this->assertArrayHasKey('error', $data);
    }

    /**
     * Test get_plugins returns error when API returns invalid structure
     */
    public function testGetPluginsHandlesInvalidCatalogStructure() {
        $config = ['brand' => 'test-brand', 'api_url' => 'https://api.example.com', 'payload' => []];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        Functions\expect('get_site_transient')
            ->once()
            ->andReturn(false);

        // Mock model to return invalid structure
        $mockModel = Mockery::mock(MarketplaceModel::class);
        $invalidData = [
            'success' => true,
            'data' => 'invalid_structure', // Should be array with 'catalog' key
        ];

        $mockModel->shouldReceive('fetch_plugins')
            ->once()
            ->andReturn($invalidData);

        Functions\expect('is_wp_error')->andReturn(false);

        $controller = new MarketplaceController($config);

        // Inject mock model
        $reflection = new \ReflectionClass($controller);
        $modelProperty = $reflection->getProperty('model');
        $modelProperty->setAccessible(true);
        $modelProperty->setValue($controller, $mockModel);

        $request = new \stdClass();
        $response = $controller->get_plugins($request);

        // Verify error response
        $this->assertInstanceOf(\WP_REST_Response::class, $response);
        $this->assertEquals(500, $response->get_status());
    }

    /**
     * Test get_plugins with sections structure
     */
    public function testGetPluginsWithSectionsStructure() {
        $config = ['brand' => 'test-brand', 'api_url' => 'https://api.example.com', 'payload' => []];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        Functions\expect('get_site_transient')
            ->once()
            ->andReturn(false);

        $sectionsData = MockDataProvider::getCatalogWithSections();

        $mockModel = Mockery::mock(MarketplaceModel::class);
        $mockModel->shouldReceive('fetch_plugins')
            ->once()
            ->andReturn($sectionsData);

        Functions\expect('is_wp_error')->andReturn(false);
        Functions\expect('set_site_transient')->andReturn(true);
        Functions\expect('file_exists')->andReturn(true);
        Functions\expect('is_dir')->andReturn(true);
        Functions\expect('get_plugins')->andReturn(MockDataProvider::getInstalledPlugins());
        Functions\expect('is_plugin_active')->andReturn(false);
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
        $this->assertTrue($data['success']);
        $this->assertArrayHasKey('sections', $data['data']);
    }

    /**
     * Test ajax_install_plugin requires missing slug
     */
    public function testAjaxInstallPluginValidatesMissingSlug() {
        $config = ['api_url' => 'https://api.example.com'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        // Don't set slug - it's missing
        $_REQUEST['download_url'] = 'https://example.com/test-plugin.zip';
        $_REQUEST['nonce'] = 'test-nonce';

        Functions\when('check_ajax_referer')->justReturn(true);
        Functions\expect('current_user_can')
            ->with('install_plugins')
            ->andReturn(true);

        Functions\when('sanitize_text_field')->justReturn('');
        Functions\when('esc_url_raw')->returnArg();

        Functions\expect('wp_send_json_error')
            ->once()
            ->with(Mockery::on(function($data) {
                return isset($data['message']);
            }));

        $controller = new MarketplaceController($config);
        $controller->ajax_install_plugin();

        unset($_REQUEST['download_url'], $_REQUEST['nonce']);
        $this->assertTrue(true);
    }

    /**
     * Test ajax_activate_plugin validates missing slug
     */
    public function testAjaxActivatePluginValidatesMissingSlug() {
        $config = ['api_url' => 'https://api.example.com'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        // Don't set slug in REQUEST
        $_REQUEST['_wpnonce'] = 'test-nonce';

        Functions\expect('current_user_can')
            ->with('activate_plugins')
            ->andReturn(true);

        Functions\when('check_ajax_referer')->justReturn(true);
        Functions\when('sanitize_key')->justReturn('');
        Functions\when('wp_unslash')->returnArg();

        Functions\expect('wp_send_json_error')
            ->once()
            ->with(Mockery::on(function($data) {
                return isset($data['message']);
            }));

        $controller = new MarketplaceController($config);
        $controller->ajax_activate_plugin();

        unset($_REQUEST['_wpnonce']);
        $this->assertTrue(true);
    }

    /**
     * Test ajax_deactivate_plugin validates missing slug
     */
    public function testAjaxDeactivatePluginValidatesMissingSlug() {
        $config = ['api_url' => 'https://api.example.com'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        $_REQUEST['nonce'] = 'test-nonce';
        // Don't set slug

        Functions\when('check_ajax_referer')->justReturn(true);
        Functions\expect('current_user_can')
            ->with('activate_plugins')
            ->andReturn(true);

        Functions\when('sanitize_text_field')->justReturn('');

        Functions\expect('wp_send_json_error')
            ->once()
            ->with(Mockery::on(function($data) {
                return isset($data['message']);
            }));

        $controller = new MarketplaceController($config);
        $controller->ajax_deactivate_plugin();

        unset($_REQUEST['nonce']);
        $this->assertTrue(true);
    }

    /**
     * Test plugin state is correctly attached to catalog items
     */
    public function testPluginStateIsAttachedToCatalogItems() {
        $config = ['brand' => 'test-brand', 'api_url' => 'https://api.example.com'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        $catalogData = MockDataProvider::getCompletePluginsCatalog();

        Functions\expect('get_site_transient')
            ->once()
            ->andReturn($catalogData);

        Functions\expect('file_exists')->andReturn(true);
        Functions\expect('is_dir')->andReturn(true);
        Functions\expect('get_plugins')->andReturn(MockDataProvider::getInstalledPlugins());
        Functions\expect('is_plugin_active')->andReturnUsing(function($plugin) {
            return in_array($plugin, ['woocommerce/woocommerce.php', 'wordpress-seo/wp-seo.php']);
        });
        Functions\when('trailingslashit')->returnArg();
        Functions\when('rest_url')->justReturn('https://example.com/wp-json/');

        $controller = new MarketplaceController($config);
        $request = new \stdClass();
        $response = $controller->get_plugins($request);

        $data = $response->get_data();
        $catalog = $data['data']['catalog'];

        // Verify plugin state is attached
        foreach ($catalog as $plugin) {
            $this->assertArrayHasKey('installed', $plugin);
            $this->assertArrayHasKey('activated', $plugin);
        }
    }

    /**
     * Test transient reset hooks are registered when admin
     */
    public function testTransientResetHooksRegistered() {
        $config = ['brand' => 'test-brand'];

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        Functions\expect('is_admin')->once()->andReturn(true);

        // Use separate expects for each hook we care about
        Functions\expect('add_action')
            ->with('deactivated_plugin', Mockery::type('array'), 10, 2)
            ->once();

        Functions\expect('add_action')
            ->with('activated_plugin', Mockery::type('array'), 10, 2)
            ->once();

        Functions\expect('add_action')
            ->with('upgrader_process_complete', Mockery::type('array'), 10, 2)
            ->once();

        Functions\expect('add_action')
            ->with('update_option_WPLANG', Mockery::type('array'), 999, 0)
            ->once();

        Functions\expect('add_action')
            ->with('switch_theme', Mockery::type('array'), 99)
            ->once();

        // Allow other add_action calls
        Functions\when('add_action')->justReturn(true);

        $controller = new MarketplaceController($config);
        $controller->init();

        $this->assertTrue(true);
    }

    /**
     * Test render_admin_page enqueues assets correctly
     */
    public function testRenderAdminPageEnqueuesAssets() {
        $config = MockDataProvider::getMockConfig();

        Functions\expect('wp_parse_args')->andReturnUsing(function($args, $defaults) {
            return array_merge($defaults, $args);
        });

        // Mock asset path functions
        Functions\expect('wp_normalize_path')->andReturnUsing(function($path) {
            return $path;
        });
        Functions\expect('trailingslashit')->andReturnUsing(function($path) {
            return rtrim($path, '/') . '/';
        });
        Functions\expect('dirname')->andReturnUsing(function($path) {
            return dirname($path);
        });
        Functions\expect('file_exists')->andReturn(true);
        Functions\expect('filemtime')->andReturn(123456789);
        Functions\expect('plugins_url')->andReturn('https://example.com/wp-content/plugins/');
        Functions\expect('content_url')->andReturn('https://example.com/wp-content/');

        // Mock WordPress functions for enqueuing
        Functions\expect('wp_enqueue_script')
            ->once()
            ->with('marketplace-frontend', Mockery::type('string'), ['wp-element'], Mockery::any(), true);

        Functions\expect('wp_enqueue_style')->atLeast()->once();

        Functions\expect('wp_localize_script')
            ->once()
            ->with('marketplace-frontend', 'marketplaceConfig', Mockery::type('array'));

        Functions\expect('get_option')->andReturn(['woocommerce/woocommerce.php']);
        Functions\expect('wp_get_theme')->andReturn(Mockery::mock('WP_Theme', ['get' => 'Test Author']));
        Functions\expect('wp_get_current_user')->andReturn(MockDataProvider::getMockUser());
        Functions\expect('hash')->andReturn('hashed_value');
        Functions\expect('get_bloginfo')->andReturn('6.4.2');
        Functions\expect('phpversion')->andReturn('8.1.0');
        Functions\expect('get_locale')->andReturn('en_US');
        Functions\expect('admin_url')->andReturn('https://example.com/wp-admin/');
        Functions\expect('rest_url')->andReturn('https://example.com/wp-json/');
        Functions\expect('wp_create_nonce')->andReturn('test-nonce');
        Functions\expect('__')->andReturnUsing(function($text) { return $text; });

        $controller = new MarketplaceController($config);

        ob_start();
        $controller->render_admin_page();
        $output = ob_get_clean();

        // Verify root div is rendered
        $this->assertStringContainsString('id="marketplace-root"', $output);
    }
}

