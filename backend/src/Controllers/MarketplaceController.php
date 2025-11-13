<?php
namespace Groupone\Marketplace\Controllers;

use Groupone\Marketplace\Models\MarketplaceModel;

use WP_REST_Response;
class MarketplaceController {
	protected $config;
	protected $model;
	protected $assets_base_path;
	protected $assets_base_url;

	/**
	 * Create + initialize controller instance.
	 *
	 * @param array $config
	 * @return self
	 */
	public static function boot( array $config = [] ): self {
		$instance = new self( $config );
		$instance->init();
		return $instance;
	}

	public function __construct( array $config ) {
		$this->config = wp_parse_args( $config, [
			'parent_menu_slug' => 'options-general.php',
			'page_title'       => __( 'Plugin Marketplace', 'text-domain' ),
			'menu_title'       => __( 'Marketplace', 'text-domain' ),
			'menu_slug'        => 'plugin-marketplace',
			'api_url'          => '', // default to empty, React can decide
			'brand'            => '', // optional brand identifier for marketplace API
			'css_url'          => '', //  optional
			'css_handle'       => 'marketplace-frontend-style',
			'assets_path'      => '', //  Optional: explicit path to package root containing frontend/ directory
			'payload'          => [], //  Optional: key-value array passed as headers for API authentication
		] );

		// Defer model and asset initialization until needed (optimization for multi-plugin installs)
		$this->model = null;
		$this->assets_base_path = null;
		$this->assets_base_url = null;
	}

	/**
	 * Lazy-load model instance (optimization for multi-plugin installs).
	 * Only instantiated when actually needed (REST endpoint or page render).
	 */
	protected function get_model() {
		if ( $this->model === null ) {
			$this->model = new MarketplaceModel( $this->config['api_url'] );
		}
		return $this->model;
	}

	/**
	 * Lazy-load asset paths (optimization for multi-plugin installs).
	 * Only resolved when the marketplace page is being rendered.
	 */
	protected function ensure_assets_resolved() {
		if ( $this->assets_base_path === null || $this->assets_base_url === null ) {
			$this->resolve_assets_paths();
		}
	}

	/**
	 * Resolve and validate assets paths.
	 * Priority: 1) Explicit config, 2) Auto-detect via composer.json
	 */
	protected function resolve_assets_paths() {
		$package_root = '';

		// Option 1: Use explicitly provided assets_path
		if ( ! empty( $this->config['assets_path'] ) ) {
			$package_root = wp_normalize_path( $this->config['assets_path'] );
		}

		// Option 2: Auto-detect using composer.json as anchor
		if ( empty( $package_root ) ) {
			$package_root = $this->find_package_root_via_composer();
		}

		// Validate that frontend assets actually exist
		$package_root = trailingslashit( $package_root );
		$frontend_js = $package_root . 'frontend/build/index.js';

		if ( ! file_exists( $frontend_js ) ) {
			// Last resort: use current directory (will likely fail but won't crash)
			$package_root = trailingslashit( dirname( __DIR__ ) );
		}

		$this->assets_base_path = $package_root;
		$this->assets_base_url  = $this->convert_path_to_url( $package_root );
	}

	/**
	 * Find package root by looking for composer.json
	 * Works for both Mozart-prefixed and regular vendor installations
	 *
	 * @return string Package root path or empty string
	 */
	protected function find_package_root_via_composer() {
		$current_dir = wp_normalize_path( __DIR__ );
		$max_depth = 10; // Safety limit

		for ( $i = 0; $i < $max_depth; $i++ ) {
			$composer_path = trailingslashit( $current_dir ) . 'composer.json';

			if ( file_exists( $composer_path ) ) {
				// Verify this is our package by checking the name
				$composer_data = json_decode( file_get_contents( $composer_path ), true );

				if ( isset( $composer_data['name'] ) && $composer_data['name'] === 'groupone/marketplace' ) {
					return $current_dir;
				}
			}

			// Move up one directory
			$parent_dir = dirname( $current_dir );

			// Stop if we've reached the filesystem root
			if ( $parent_dir === $current_dir ) {
				break;
			}

			$current_dir = $parent_dir;
		}

		return '';
	}

	/**
	 * Convert filesystem path to URL
	 *
	 * @param string $path Absolute filesystem path
	 * @return string URL
	 */
	protected function convert_path_to_url( $path ) {
		$path = wp_normalize_path( $path );
		$plugins_dir = wp_normalize_path( WP_PLUGIN_DIR );

		// Check if path is within plugins directory
		if ( strpos( $path, $plugins_dir ) === 0 ) {
			$relative = ltrim( str_replace( $plugins_dir, '', $path ), '/' );
			return trailingslashit( plugins_url( $relative ) );
		}

		// Fallback: try content directory
		$content_dir = wp_normalize_path( WP_CONTENT_DIR );
		if ( strpos( $path, $content_dir ) === 0 ) {
			$relative = ltrim( str_replace( $content_dir, '', $path ), '/' );
			return trailingslashit( content_url( $relative ) );
		}

		// Last resort: return plugins URL with the full path (likely incorrect but won't crash)
		return trailingslashit( plugins_url() );
	}

	/**
	 * Initialize hooks.
	 */
	public function init() {
		if ( is_admin() ) {
			add_action( 'admin_menu', [ $this, 'register_menu' ] );
			add_action( 'wp_ajax_marketplace_install_plugin', [ $this, 'ajax_install_plugin' ] );
			add_action( 'wp_ajax_marketplace_activate_plugin', [ $this, 'ajax_activate_plugin' ] );
			add_action( 'wp_ajax_marketplace_deactivate_plugin', [ $this, 'ajax_deactivate_plugin' ] );
		}

		add_action( 'rest_api_init', [ $this, 'register_rest_routes' ] );
	}

	public function register_menu() {
		add_submenu_page(
			$this->config['parent_menu_slug'],
			$this->config['page_title'],
			$this->config['menu_title'],
			'manage_options',
			$this->config['menu_slug'],
			[ $this, 'render_admin_page' ]
		);
	}

	public function render_admin_page() {
		// Lazy-load assets only when this page is actually rendered (optimization)
		$this->ensure_assets_resolved();

		$base_path = $this->assets_base_path;
		$base_url  = $this->assets_base_url;

		// Enqueue JS dynamically
		$js_file   = 'frontend/build/index.js';
		$js_path   = $base_path . $js_file;
		$js_url    = $base_url . $js_file;

		wp_enqueue_script(
			'marketplace-frontend',
			$js_url,
			[ 'wp-element' ],
			file_exists( $js_path ) ? filemtime( $js_path ) : '1.0.0',
			true
		);

		// Enqueue CSS dynamically (custom or default)
		if ( ! empty( $this->config['custom_css'] ) ) {
			wp_enqueue_style( 'marketplace-css', esc_url( $this->config['custom_css'] ), [], '1.0.0' );
		} else {
			$css_file = 'assets/css/one.min.css';
			wp_enqueue_style( 'marketplace-css', $base_url . $css_file, [], '1.0.0' );
		}

		// Localize JS with config
		wp_localize_script( 'marketplace-frontend', 'marketplaceConfig', [
			'apiBaseUrl' => trailingslashit( rest_url( 'marketplace/v1/plugins' ) ),
			'apiUrl'     => $this->config['api_url'],
			'locale' => get_locale(),
			'brand' => $this->config['brand'],
			'useWPHandlers' => true,
			'wpConfig' => [
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce'    => wp_create_nonce( 'marketplace_nonce' ),
			],
			'enableDefaultStyles' => empty( $this->config['custom_css'] ),
			'assetsBaseUrl' => $base_url,
			'labels'=>array(
				'install' => __('Install', 'onecom-wp'),
				'installing' => __('Installing', 'onecom-wp'),
				'activate' => __('Activate', 'onecom-wp'),
				'deactivate' => __('Deactivate', 'onecom-wp'),
				'activating' => __('Activating', 'onecom-wp'),
				'deactivating' => __('Deactivating', 'onecom-wp'),
				'download' => __('Download', 'onecom-wp'),
				'downloading' => __('Downloading...', 'onecom-wp'),
				'learnMore' => __('Learn more', 'onecom-wp'),
				'all' => __('All', 'onecom-wp'),
				'recommendedPlugins' => __('Recommended plugins', 'onecom-wp'),
				'discouraged' => __('Discouraged plugins', 'onecom-wp'),
				'moreDetails' => __('More details', 'onecom-wp'),
			),
		] );

		echo '<div id="marketplace-root" class="gv-activated"></div>';
	}

	public function register_rest_routes() {
		register_rest_route( 'marketplace/v1', '/plugins', [
			'methods'             => 'GET',
			'callback'            => [ $this, 'get_plugins' ],
			'permission_callback' => '__return_true',
		] );
	}

	public function get_plugins( $request ) {
		// Lazy-load model only when REST endpoint is called (optimization)
		$plugins = $this->get_model()->fetch_plugins( $this->config['payload'] );

		if ( is_wp_error( $plugins ) ) {
			return new WP_REST_Response( [ 'error' => $plugins->get_error_message() ], 500 );
		}

		// Attach WP state (installed/activated) for both legacy and new shapes
		$add_state = function( $plugin ) {
			if ( empty( $plugin['slug'] ) ) {
				return $plugin;
			}
			// Resolve actual plugin main file for cases like 'seo-by-rank-math/rank-math.php'
			$plugin_file = $this->resolve_plugin_file_by_slug( $plugin['slug'] );
			$plugin['installed'] = ! empty( $plugin_file );
			$plugin['activated'] = ( ! empty( $plugin_file ) && function_exists( 'is_plugin_active' ) ) ? is_plugin_active( $plugin_file ) : false;
			return $plugin;
		};

		if ( isset( $plugins['data'] ) && is_array( $plugins['data'] ) && ( array_values( $plugins['data'] ) === $plugins['data'] ) ) {
			// data is a numerically-indexed list of plugins
			$plugins['data'] = array_map( $add_state, $plugins['data'] );
		} elseif ( ! empty( $plugins['data']['sections'] ) && is_array( $plugins['data']['sections'] ) ) {
			foreach ( $plugins['data']['sections'] as $si => $section ) {
				if ( empty( $section['items'] ) || ! is_array( $section['items'] ) ) {
					continue;
				}
				$plugins['data']['sections'][$si]['items'] = array_map( $add_state, $section['items'] );
			}
		} elseif ( ! empty( $plugins['sections'] ) && is_array( $plugins['sections'] ) ) {
			foreach ( $plugins['sections'] as $si => $section ) {
				if ( empty( $section['items'] ) || ! is_array( $section['items'] ) ) {
					continue;
				}
				$plugins['sections'][$si]['items'] = array_map( $add_state, $section['items'] );
			}
		} elseif ( ! empty( $plugins['data']['ui_json'] ) && is_array( $plugins['data']['ui_json'] ) ) {
			$plugins['data']['ui_json'] = array_map( $add_state, $plugins['data']['ui_json'] );
		}

		return new WP_REST_Response( $plugins, 200 );
	}

	/**
	 * Install plugin via WP_Upgrader
	 */
	public function ajax_install_plugin() {
		check_ajax_referer( 'marketplace_nonce', 'nonce' );

		if ( ! current_user_can( 'install_plugins' ) ) {
			wp_send_json_error([ 'message' => __( 'Permission denied', 'onecom-wp' ) ]);
		}


		$slug        = sanitize_text_field( $_REQUEST['slug'] ?? '' );
		$download_url = esc_url_raw( $_REQUEST['download_url'] ?? '' );

		if ( empty( $slug ) || empty( $download_url ) ) {
			wp_send_json_error( [ 'message' => __( 'Invalid plugin data.', 'text-domain' ) ] );
		}

		require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';

		$upgrader = new \Plugin_Upgrader( new \Automatic_Upgrader_Skin() );
		$result   = $upgrader->install( $download_url ); //  use URL from React

		if ( is_wp_error( $result ) ) {
			wp_send_json_error( [ 'message' => $result->get_error_message() ] );
		}

		wp_send_json_success([
			'message'   => __( 'Plugin installed successfully', 'onecom-wp' ),
			'installed' => true,
			'activated' => false,
		]);
	}

	/**
	 * Check if plugin is installed.
	 *
	 * @param string $slug Plugin slug if found.
	 * @return boolean
	 */
	private function is_installed( $slug = '' ): bool {
		return file_exists( WP_PLUGIN_DIR . '/' .  $slug  );
	}

	/**
	 * Resolve the plugin's main file by slug by scanning installed plugins.
	 * Handles cases like 'seo-by-rank-math/rank-math.php' where the main file
	 * does not match slug/slug.php.
	 *
	 * @param string $slug
	 * @return string Plugin file path relative to plugins dir, or empty string if not found.
	 */
	private function resolve_plugin_file_by_slug( $slug ): string {
		if ( empty( $slug ) ) {
			return '';
		}
		require_once ABSPATH . 'wp-admin/includes/plugin.php';
		$plugins = get_plugins();

		// If incoming "slug" already looks like a plugin file (contains a slash or ends with .php),
		// try an exact match first.
		if ( strpos( $slug, '/' ) !== false || substr( $slug, -4 ) === '.php' ) {
			if ( isset( $plugins[ $slug ] ) ) {
				return $slug;
			}
			// Also try trimming any leading slashes just in case
			$trimmed = ltrim( $slug, '/' );
			if ( isset( $plugins[ $trimmed ] ) ) {
				return $trimmed;
			}
		}

		// Otherwise, treat input as directory slug and try common patterns.
		foreach ( $plugins as $file => $data ) {
			if ( strpos( $file, $slug . '/' ) === 0 || $file === $slug . '.php' ) {
				return $file;
			}
		}
		return '';
	}

	public function ajax_activate_plugin() {
		if ( ! current_user_can( 'activate_plugins' ) ) {
			wp_send_json_error( [ 'message' => __( 'You do not have permission to activate plugins.', 'text-domain' ) ] );
		}

		check_ajax_referer( 'marketplace_nonce', '_wpnonce' );

		$slug = isset( $_REQUEST['slug'] ) ? sanitize_key( wp_unslash( $_REQUEST['slug'] ) ) : '';

		if ( empty( $slug ) ) {
			wp_send_json_error( [ 'message' => __( 'Missing plugin slug.', 'text-domain' ) ] );
		}

		// Load the list of installed plugins
		require_once ABSPATH . 'wp-admin/includes/plugin.php';
		$plugins = get_plugins();

		// Try to find the plugin main file by slug
		$plugin_file = '';
		foreach ( $plugins as $file => $data ) {
			if ( strpos( $file, $slug . '/' ) === 0 || $file === $slug . '.php' ) {
				$plugin_file = $file;
				break;
			}
		}

		if ( empty( $plugin_file ) ) {
			wp_send_json_error( [ 'message' => __( 'Plugin not installed.', 'text-domain' ) ] );
		}

		$result = activate_plugin( $plugin_file );

		if ( is_wp_error( $result ) ) {
			wp_send_json_error( [ 'message' => $result->get_error_message() ] );
		}

		wp_send_json_success( [
			'installed' => true,
			'activated' => true,
			'message'   => __( 'Plugin activated successfully.', 'text-domain' ),
		] );
	}

	public function ajax_deactivate_plugin() {
		check_ajax_referer( 'marketplace_nonce', 'nonce' );

		if ( ! current_user_can( 'activate_plugins' ) ) {
			wp_send_json_error([ 'message' => __( 'Permission denied', 'onecom-wp' ) ]);
		}

		$slug = sanitize_text_field( $_REQUEST['slug'] ?? '' );
		if ( empty( $slug ) ) {
			wp_send_json_error([ 'message' => __( 'Invalid plugin slug', 'onecom-wp' ) ]);
		}

		require_once ABSPATH . 'wp-admin/includes/plugin.php';
		$plugins = get_plugins();

		// Try to find the plugin main file by slug
		$plugin_file = '';
		foreach ( $plugins as $file => $data ) {
			if ( strpos( $file, $slug . '/' ) === 0 || $file === $slug . '.php' ) {
				$plugin_file = $file;
				break;
			}
		}

		deactivate_plugins( $plugin_file, false, is_multisite() );

		if ( is_plugin_active( $plugin_file ) ) {
			wp_send_json_error([ 'message' => __( 'Failed to deactivate plugin', 'onecom-wp' ) ]);
		}

		wp_send_json_success([
			'message'   => __( 'Plugin deactivated successfully', 'onecom-wp' ),
			'installed' => true,
			'activated' => false,
		]);
	}
}