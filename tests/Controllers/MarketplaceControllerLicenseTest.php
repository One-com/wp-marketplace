<?php
/**
 * Tests for the data-driven license provisioning in MarketplaceController.
 *
 * Matches the PHPUnit_Coverage harness (Brain Monkey + PHPUnit\Framework\TestCase);
 * requires that harness's tests/bootstrap.php + composer dev-deps to run.
 *
 * Covers the private writer methods (invoked via reflection):
 *   - apply_license_data()   iterates response licenseData entries
 *   - set_option_by_path()   writes top-level / nested option values
 *   - is_writable_option()   denylist + filter guard
 */

namespace Groupone\Marketplace\Tests\Controllers;

use PHPUnit\Framework\TestCase;
use Groupone\Marketplace\Controllers\MarketplaceController;
use Brain\Monkey;
use Brain\Monkey\Functions;
use Mockery;

class MarketplaceControllerLicenseTest extends TestCase {

	protected function setUp(): void {
		parent::setUp();
		Monkey\setUp();

		if ( ! defined( 'ABSPATH' ) ) {
			define( 'ABSPATH', '/tmp/wordpress/' );
		}

		// is_writable_option() reads $wpdb->prefix.
		$GLOBALS['wpdb'] = (object) [ 'prefix' => 'wp_' ];

		// Constructor helpers.
		Functions\when( '__' )->returnArg( 1 );
		Functions\when( 'wp_parse_args' )->alias(
			static function ( $args, $defaults ) {
				return array_merge( (array) $defaults, (array) $args );
			}
		);
	}

	protected function tearDown(): void {
		Monkey\tearDown();
		Mockery::close();
		unset( $GLOBALS['wpdb'] );
		parent::tearDown();
	}

	private function controller(): MarketplaceController {
		return new MarketplaceController( [ 'brand' => 'test' ] );
	}

	/** Invoke a private controller method by reflection. */
	private function invoke( MarketplaceController $controller, string $method, array $args ) {
		$ref = new \ReflectionMethod( MarketplaceController::class, $method );
		$ref->setAccessible( true );
		return $ref->invoke( $controller, ...$args );
	}

	public function test_writes_top_level_option(): void {
		Functions\when( 'apply_filters' )->returnArg( 2 ); // is_writable_option passthrough
		Functions\expect( 'update_option' )->once()->with( 'my_plugin_license', 'ABC-123' )->andReturn( true );

		$result = $this->invoke( $this->controller(), 'set_option_by_path', [ [ 'my_plugin_license' ], 'ABC-123' ] );
		$this->assertTrue( $result );
	}

	public function test_writes_nested_option_and_preserves_existing_keys(): void {
		// Mirrors the SocialPilot response: key ["socialpilot_options","api_key"].
		Functions\when( 'apply_filters' )->returnArg( 2 );
		Functions\when( 'get_option' )->justReturn( [ 'existing' => 'keep' ] );
		Functions\expect( 'update_option' )
			->once()
			->with( 'socialpilot_options', [ 'existing' => 'keep', 'api_key' => 'enc' ] )
			->andReturn( true );

		$this->invoke( $this->controller(), 'set_option_by_path', [ [ 'socialpilot_options', 'api_key' ], 'enc' ] );
	}

	public function test_stores_value_verbatim(): void {
		// Value is stored as-is; the module never mutates/decrypts it.
		Functions\when( 'apply_filters' )->returnArg( 2 );
		Functions\when( 'get_option' )->justReturn( [] );
		Functions\expect( 'update_option' )
			->once()
			->with( 'json_opt', [ 'nested' => [ 'x' => 1 ] ] )
			->andReturn( true );

		$this->invoke( $this->controller(), 'set_option_by_path', [ [ 'json_opt', 'nested' ], [ 'x' => 1 ] ] );
	}

	public function test_blocks_core_option(): void {
		Functions\when( 'apply_filters' )->returnArg( 2 );
		Functions\when( 'error_log' )->justReturn( true );
		Functions\expect( 'update_option' )->never();

		$result = $this->invoke( $this->controller(), 'set_option_by_path', [ [ 'active_plugins' ], 'malicious' ] );
		$this->assertFalse( $result );
	}

	public function test_is_writable_option_allows_plugin_blocks_core(): void {
		Functions\when( 'apply_filters' )->returnArg( 2 );
		$controller = $this->controller();

		$this->assertTrue( $this->invoke( $controller, 'is_writable_option', [ 'socialpilot_options' ] ) );
		$this->assertFalse( $this->invoke( $controller, 'is_writable_option', [ 'siteurl' ] ) );
		$this->assertFalse( $this->invoke( $controller, 'is_writable_option', [ 'user_roles' ] ) );
	}

	public function test_filter_can_block_option(): void {
		Functions\when( 'apply_filters' )->alias(
			static function ( $tag, $allowed, $name ) {
				return 'blocked_by_filter' === $name ? false : $allowed;
			}
		);
		$this->assertFalse( $this->invoke( $this->controller(), 'is_writable_option', [ 'blocked_by_filter' ] ) );
	}

	public function test_apply_license_data_writes_all_entries(): void {
		Functions\when( 'apply_filters' )->returnArg( 2 );
		Functions\when( 'get_option' )->justReturn( [] );
		Functions\expect( 'update_option' )->once()->with( 'socialpilot_options', [ 'api_key' => 'e1' ] )->andReturn( true );
		Functions\expect( 'update_option' )->once()->with( 'another_plugin_license', 'e2' )->andReturn( true );

		$license_data = [
			'option_1' => [ 'key' => [ 'socialpilot_options', 'api_key' ], 'value' => 'e1' ],
			'option_2' => [ 'key' => [ 'another_plugin_license' ], 'value' => 'e2' ],
		];
		$this->invoke( $this->controller(), 'apply_license_data', [ $license_data ] );
	}

	public function test_apply_license_data_skips_malformed_entries(): void {
		Functions\when( 'apply_filters' )->returnArg( 2 );
		Functions\when( 'get_option' )->justReturn( [] );
		// Only the single well-formed entry should be written.
		Functions\expect( 'update_option' )->once()->with( 'good_option', 'ok' )->andReturn( true );

		$license_data = [
			[ 'key' => 'not-an-array', 'value' => 'x' ], // key not an array
			[ 'value' => 'no-key' ],                     // missing key
			[ 'key' => [ 'skipme_option' ] ],            // missing value
			[ 'key' => [ 'good_option' ], 'value' => 'ok' ], // valid
		];
		$this->invoke( $this->controller(), 'apply_license_data', [ $license_data ] );
	}
}
