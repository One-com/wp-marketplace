<?php
namespace Groupone\Marketplace\Abilities;

use Groupone\Marketplace\Utils\MixpanelClient;

/**
 * MCP ability-execution telemetry for Marketplace.
 *
 * Emits one analytics "event" hit per ability run that originates over MCP,
 * using an independent Mixpanel client.
 */
class MarketplaceAbilitiesTracking {

	/** Constant item_source for every MCP ability event. */
	const ITEM_SOURCE = 'MCP';

	/** @var array<int,array<string,mixed>> Queued events, flushed on shutdown. */
	private static $queue = [];

	/** @var bool Whether the shutdown flush has been registered. */
	private static $flush_registered = false;

	/** @var array Marketplace configuration. */
	private static $config = [];

	/**
	 * Hook the tracker. Called during Marketplace boot.
	 *
	 * @param array $config Marketplace configuration.
	 */
	public static function boot( array $config = [] ): void {
		self::$config = $config;
		add_action( 'wp_after_execute_ability', [ self::class, 'record' ], 10, 3 );
	}

	/**
	 * Ability slug prefix/slug => [ event_action, item_category ].
	 *
	 * @return array<string,array{0:string,1:string}>
	 */
	public static function events(): array {
		return [
			'marketplace/install-plugin'    => [ 'plugin_installed', 'marketplace' ],
			'marketplace/activate-plugin'   => [ 'plugin_activated', 'marketplace' ],
			'marketplace/deactivate-plugin' => [ 'plugin_deactivated', 'marketplace' ],
			'marketplace/delete-plugin'     => [ 'plugin_deleted', 'marketplace' ],
			'list-plugins'                  => [ 'plugins_listed', 'marketplace' ],
			'get-product'                   => [ 'product_fetched', 'marketplace' ],
			'list-installed'                => [ 'installed_plugins_listed', 'marketplace' ],
			'refresh-products'              => [ 'products_refreshed', 'marketplace' ],
			'list-subscriptions'            => [ 'subscriptions_listed', 'marketplace' ],
			'get-subscription'              => [ 'subscription_fetched', 'marketplace' ],
		];
	}

	/**
	 * `wp_after_execute_ability` listener. Queues a tracked ability run.
	 *
	 * @param string $name   Ability slug.
	 * @param mixed  $input  Input the ability was called with.
	 * @param mixed  $result Ability return value.
	 */
	public static function record( $name, $input, $result ): void {
		if ( ! self::is_mcp_request() ) {
			return;
		}

		$event = self::describe( $name, is_array( $input ) ? $input : [], $result );
		if ( null === $event ) {
			return;
		}

		self::$queue[] = $event;
		self::ensure_flush();
	}

	/**
	 * Build the tracking payload for one ability run.
	 *
	 * @param string $name   Ability slug.
	 * @param array  $input  Ability input.
	 * @param mixed  $result Ability return value.
	 * @return array{event_action:string,item_category:string,item_name:string,additional:array}|null
	 */
	public static function describe( string $name, array $input, $result ): ?array {
		$events = self::events();
		$event_config = null;

		if ( isset( $events[ $name ] ) ) {
			$event_config = $events[ $name ];
		} else {
			// Check for brand-prefixed slugs: {brand}-marketplace/list-plugins
			foreach ( $events as $suffix => $config ) {
				if ( strpos( $name, "-marketplace/{$suffix}" ) !== false ) {
					$event_config = $config;
					break;
				}
			}
		}

		if ( null === $event_config ) {
			return null;
		}

		$status     = self::status_of( $result );
		$additional = [ 'status' => $status ];
		if ( 'error' === $status ) {
			$code = self::error_code_of( $result );
			if ( '' !== $code ) {
				$additional['error_code'] = $code;
			}
		}

		return [
			'event_action'  => $event_config[0],
			'item_category' => $event_config[1],
			'item_name'     => self::item_name( $name, $input, $result ),
			'additional'    => $additional,
		];
	}

	/**
	 * Is the current request an MCP call?
	 */
	public static function is_mcp_request(): bool {
		$is_mcp = ( ! empty( $_SERVER['HTTP_MCP_SESSION_ID'] ) || ! empty( $_SERVER['HTTP_MCP_PROTOCOL_VERSION'] ) );
		return (bool) apply_filters( 'onecom_abilities_is_mcp_request', $is_mcp );
	}

	/**
	 * Map an ability return value to success|error.
	 */
	private static function status_of( $result ): string {
		if ( is_wp_error( $result ) ) {
			return 'error';
		}
		if ( is_array( $result ) && array_key_exists( 'success', $result ) ) {
			return $result['success'] ? 'success' : 'error';
		}
		return 'success';
	}

	/**
	 * Extract a machine-readable error code from a failed result.
	 */
	private static function error_code_of( $result ): string {
		if ( is_wp_error( $result ) ) {
			return (string) $result->get_error_code();
		}
		if ( is_array( $result ) && ! empty( $result['code'] ) ) {
			return (string) $result['code'];
		}
		return '';
	}

	/**
	 * Derive item_name (the target of the operation).
	 */
	private static function item_name( string $name, array $input, $result ): string {
		// Slugs: marketplace/install-plugin, {brand}-marketplace/list-plugins, etc.
		if ( strpos( $name, 'install-plugin' ) !== false || strpos( $name, 'activate-plugin' ) !== false ||
		     strpos( $name, 'deactivate-plugin' ) !== false || strpos( $name, 'delete-plugin' ) !== false ||
		     strpos( $name, 'get-product' ) !== false ) {
			return isset( $input['slug'] ) ? sanitize_key( (string) $input['slug'] ) : '';
		}

		if ( strpos( $name, 'get-subscription' ) !== false ) {
			if ( ! empty( $input['subscriptionId'] ) ) {
				return sanitize_key( (string) $input['subscriptionId'] );
			}
			return isset( $input['slug'] ) ? sanitize_key( (string) $input['slug'] ) : '';
		}

		return '';
	}

	/**
	 * Register the one-shot shutdown flush.
	 */
	private static function ensure_flush(): void {
		if ( self::$flush_registered ) {
			return;
		}
		self::$flush_registered = true;
		add_action( 'shutdown', [ self::class, 'flush' ], 100 );
	}

	/**
	 * Send all queued events.
	 */
	public static function flush(): void {
		if ( empty( self::$queue ) ) {
			return;
		}

		$queue        = self::$queue;
		self::$queue  = [];

		$token = self::get_mixpanel_token();
		if ( empty( $token ) ) {
			return;
		}

		$client_file = __DIR__ . '/../Utils/MixpanelClient.php';
		if ( ! class_exists( MixpanelClient::class, false ) ) {
			if ( is_readable( $client_file ) ) {
				require_once $client_file;
			}
		}

		if ( ! class_exists( MixpanelClient::class, false ) ) {
			return;
		}

		$client = new MixpanelClient( $token );
		$props  = self::get_common_properties();

		foreach ( $queue as $event ) {
			$event_props = array_merge( $props, [
				'event_action'  => $event['event_action'],
				'item_category' => $event['item_category'],
				'item_name'     => $event['item_name'],
				'item_source'   => self::ITEM_SOURCE,
			], $event['additional'] );

			$client->track( 'MCP Ability executed', $event_props );
		}

	}

	/**
	 * Get the Mixpanel token from config.
	 */
	private static function get_mixpanel_token(): string {
		if ( ! empty( self::$config['mixpanel']['token'] ) ) {
			return (string) self::$config['mixpanel']['token'];
		}

		// Fallback for onecom-themes-plugins — must match the frontend tokens
		$is_sandbox = ! empty( self::$config['mixp_props']['is_sandbox'] ) && self::$config['mixp_props']['is_sandbox'] === true;
		if ( $is_sandbox ) {
			return '4cdc36e9083c158244c3e26d280540f6';
		}

		return '517e881edc2636e99a2ecf013d8134d3';
	}

	/**
	 * Get common Mixpanel properties for all events.
	 */
	private static function get_common_properties(): array {
		$props = [
			'context' => 'wp_plugin_mcp',
			'$lib'    => 'php',
		];

		if ( ! empty( self::$config['brand'] ) ) {
			$props['brand'] = self::$config['brand'];
		}

		if ( ! empty( self::$config['mixp_distinct_id'] ) ) {
			$props['distinct_id'] = self::$config['mixp_distinct_id'];
		}

		// Only pick a few relevant properties from host-provided props to avoid
		// dependency on full ocpushstats payload.
		if ( ! empty( self::$config['mixp_props'] ) && is_array( self::$config['mixp_props'] ) ) {
			$relevant_keys = [ 'env', 'is_sandbox', 'domain', 'user_id' ];
			foreach ( $relevant_keys as $key ) {
				if ( isset( self::$config['mixp_props'][ $key ] ) ) {
					$props[ $key ] = self::$config['mixp_props'][ $key ];
				}
			}
		}

		return $props;
	}
}
