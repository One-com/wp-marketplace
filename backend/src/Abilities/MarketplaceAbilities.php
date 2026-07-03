<?php
namespace Groupone\Marketplace\Abilities;

use Groupone\Marketplace\Services\PluginService;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the marketplace's MCP abilities into WordPress's global Abilities
 * registry (WP Abilities API). The host plugin's MCP server selects these by slug
 * to expose them over MCP — this class never creates an MCP server itself.
 *
 * Two kinds of ability, namespaced by the *resource they act on*:
 *
 *   - Shared, brand-agnostic ACTIONS — install/activate/deactivate/delete operate
 *     on the one shared site. Registered ONCE under canonical slugs
 *     (`marketplace/...`), deduplicated via wp_get_ability() so that when the
 *     module is embedded in multiple host plugins (one.com + RankMath) on the same
 *     site, only the first copy registers. This is what lets a second host "just
 *     inject" the same abilities without re-implementing them.
 *
 *   - Per-brand CATALOG — `list-plugins` returns brand-specific data (different API
 *     / curated list per brand), so it is registered under a brand-prefixed slug
 *     (`{brand}-marketplace/list-plugins`). Each host registers its own; no
 *     collision, no shared state.
 *
 * @see MCP_ABILITIES_DESIGN.md
 */
class MarketplaceAbilities {

	/** Ability category slug (required by the Abilities API). */
	const CATEGORY = 'marketplace';

	/** Brand that gets the single-subscription-detail ability by default. */
	const RANKMATH_BRAND = 'rankmath';

	/**
	 * Hook ability + category registration. Safe to call from every embedded copy
	 * and on every request — registration itself is deduplicated.
	 *
	 * @param array $config Host boot config. Uses 'brand' (for the catalog slug) and
	 *                      optional 'catalog_provider' (callable returning array|WP_Error
	 *                      — the raw catalog payload; see MarketplaceController::fetch_catalog()).
	 */
	public static function register( array $config ): void {
		// Abilities API may be absent (older host, lib not loaded). Degrade silently —
		// the web UI keeps working; only MCP exposure is unavailable.
		if ( ! function_exists( 'wp_register_ability' ) ) {
			return;
		}

		$brand = isset( $config['brand'] ) ? (string) $config['brand'] : '';
		$catalog_provider = isset( $config['catalog_provider'] ) && is_callable( $config['catalog_provider'] )
			? $config['catalog_provider']
			: null;
		$subscriptions_provider = isset( $config['subscriptions_provider'] ) && is_callable( $config['subscriptions_provider'] )
			? $config['subscriptions_provider']
			: null;
		$refresh_provider = isset( $config['refresh_provider'] ) && is_callable( $config['refresh_provider'] )
			? $config['refresh_provider']
			: null;

		if ( function_exists( 'wp_register_ability_category' ) ) {
			add_action( 'wp_abilities_api_categories_init', [ self::class, 'register_category' ] );
		}

		add_action( 'wp_abilities_api_init', static function () use ( $brand, $catalog_provider, $subscriptions_provider, $refresh_provider ) {
			self::register_actions();
			if ( '' !== $brand ) {
				self::register_reads( $brand, $catalog_provider, $subscriptions_provider, $refresh_provider );
			}
		} );
	}

	/**
	 * The ability slugs a host should expose on its MCP server: the shared actions
	 * plus (when a brand is given) that brand's catalog ability.
	 *
	 * @param string $brand Optional brand; omit/empty to get only the shared actions.
	 * @return string[]
	 */
	public static function ability_ids( string $brand = '' ): array {
		$ids = [
			'marketplace/install-plugin',
			'marketplace/activate-plugin',
			'marketplace/deactivate-plugin',
			'marketplace/delete-plugin',
		];
		if ( '' !== $brand ) {
			$ids[] = "{$brand}-marketplace/list-plugins";
			$ids[] = "{$brand}-marketplace/get-product";
			$ids[] = "{$brand}-marketplace/list-installed";
			$ids[] = "{$brand}-marketplace/list-subscriptions";
			$ids[] = "{$brand}-marketplace/refresh-products";
			if ( self::RANKMATH_BRAND === $brand ) {
				$ids[] = "{$brand}-marketplace/get-subscription";
			}
		}
		return $ids;
	}

	/**
	 * Meta for an ability exposed as an MCP tool. `mcp.public => true` makes it
	 * discoverable + executable through any MCP server's generic discover/execute
	 * tools (including the adapter's default server) with zero host wiring — the
	 * ability's own permission_callback remains the security gate.
	 *
	 * @param array $annotations Optional ability annotations (e.g. ['readonly' => true]).
	 * @return array
	 */
	private static function tool_meta( array $annotations = [] ): array {
		$meta = [
			'mcp'          => [ 'public' => true, 'type' => 'tool' ],
			'show_in_rest' => true,
		];
		if ( ! empty( $annotations ) ) {
			$meta['annotations'] = $annotations;
		}
		return $meta;
	}

	/**
	 * Register the ability category. Deduplicated across embedded copies.
	 */
	public static function register_category(): void {
		if ( function_exists( 'wp_get_ability_category' ) && wp_get_ability_category( self::CATEGORY ) ) {
			return;
		}
		wp_register_ability_category( self::CATEGORY, [
			'label'       => __( 'Plugin Marketplace', 'onecom-wp' ),
			'description' => __( 'Discover, install, and manage WordPress plugins via the marketplace.', 'onecom-wp' ),
		] );
	}

	/**
	 * Register the shared, brand-agnostic action abilities. First embedded copy to
	 * run wins; later copies short-circuit on the wp_get_ability() guard.
	 */
	private static function register_actions(): void {
		if ( wp_get_ability( 'marketplace/install-plugin' ) ) {
			return; // Already registered by another embedded copy this request.
		}

		wp_register_ability( 'marketplace/install-plugin', [
			'label'               => __( 'Install a plugin', 'onecom-wp' ),
			'description'         => __( 'Install a WordPress plugin from a download URL obtained from the marketplace catalog. Does not activate it.', 'onecom-wp' ),
			'category'            => self::CATEGORY,
			'input_schema'        => [
				'type'       => 'object',
				'properties' => [
					'slug'         => [ 'type' => 'string', 'description' => __( 'Plugin slug (used for idempotency).', 'onecom-wp' ) ],
					'download_url' => [ 'type' => 'string', 'description' => __( 'Package URL from the marketplace catalog (list-plugins).', 'onecom-wp' ) ],
				],
				'required'   => [ 'slug', 'download_url' ],
			],
			'output_schema'       => self::action_output_schema(),
			'permission_callback' => static fn() => current_user_can( 'install_plugins' ),
			'execute_callback'    => static function ( $input ) {
				return PluginService::install( (string) ( $input['slug'] ?? '' ), (string) ( $input['download_url'] ?? '' ) );
			},
			// Destructive: installs and will run third-party code (high blast radius),
			// so MCP clients should treat it cautiously / confirm. Idempotent: a repeat
			// install is a no-op (PluginService returns already_installed).
			'meta'                => self::tool_meta( [ 'readonly' => false, 'destructive' => true, 'idempotent' => true ] ),
		] );

		wp_register_ability( 'marketplace/activate-plugin', [
			'label'               => __( 'Activate a plugin', 'onecom-wp' ),
			'description'         => __( 'Activate an installed plugin by slug.', 'onecom-wp' ),
			'category'            => self::CATEGORY,
			'input_schema'        => self::slug_input_schema(),
			'output_schema'       => self::action_output_schema(),
			'permission_callback' => static fn() => current_user_can( 'activate_plugins' ),
			'execute_callback'    => static fn( $input ) => PluginService::activate( (string) ( $input['slug'] ?? '' ) ),
			// Reversible state change (deactivate undoes it), not destructive. Idempotent:
			// activating an already-active plugin has no additional effect.
			'meta'                => self::tool_meta( [ 'readonly' => false, 'destructive' => false, 'idempotent' => true ] ),
		] );

		wp_register_ability( 'marketplace/deactivate-plugin', [
			'label'               => __( 'Deactivate a plugin', 'onecom-wp' ),
			'description'         => __( 'Deactivate an active plugin by slug.', 'onecom-wp' ),
			'category'            => self::CATEGORY,
			'input_schema'        => self::slug_input_schema(),
			'output_schema'       => self::action_output_schema(),
			'permission_callback' => static fn() => current_user_can( 'activate_plugins' ),
			'execute_callback'    => static fn( $input ) => PluginService::deactivate( (string) ( $input['slug'] ?? '' ) ),
			// Reversible state change (activate undoes it), not destructive. Idempotent:
			// deactivating an already-inactive plugin has no additional effect.
			'meta'                => self::tool_meta( [ 'readonly' => false, 'destructive' => false, 'idempotent' => true ] ),
		] );

		wp_register_ability( 'marketplace/delete-plugin', [
			'label'               => __( 'Delete a plugin', 'onecom-wp' ),
			'description'         => __( 'Delete an installed, inactive plugin by slug. Deactivate it first if active.', 'onecom-wp' ),
			'category'            => self::CATEGORY,
			'input_schema'        => self::slug_input_schema(),
			'output_schema'       => self::action_output_schema(),
			'permission_callback' => static fn() => current_user_can( 'delete_plugins' ),
			'execute_callback'    => static fn( $input ) => PluginService::delete( (string) ( $input['slug'] ?? '' ) ),
			// Destructive: permanently removes plugin files. Idempotent: deleting an
			// already-absent plugin has no additional effect (returns not_installed).
			'meta'                => self::tool_meta( [ 'readonly' => false, 'destructive' => true, 'idempotent' => true ] ),
		] );
	}

	/**
	 * Register the brand-specific read abilities: catalog listing, single-product
	 * detail, installed products ("My Products"), and subscriptions ("My
	 * Subscriptions"). Brand-prefixed slugs, so no cross-copy dedup is needed — each
	 * closes over its own providers. Subscriptions are registered only when a
	 * subscriptions provider is available.
	 *
	 * @param string        $brand
	 * @param callable|null $catalog_provider       Returns array|WP_Error (raw catalog payload).
	 * @param callable|null $subscriptions_provider Returns array|WP_Error (list of subscriptions).
	 * @param callable|null $refresh_provider       Clears the caches + re-fetches; returns array|WP_Error.
	 */
	private static function register_reads( string $brand, ?callable $catalog_provider, ?callable $subscriptions_provider, ?callable $refresh_provider = null ): void {
		if ( null !== $catalog_provider ) {
			// List catalog plugins.
			$slug = "{$brand}-marketplace/list-plugins";
			if ( ! wp_get_ability( $slug ) ) {
				wp_register_ability( $slug, [
					'label'               => sprintf( __( 'List %s marketplace plugins', 'onecom-wp' ), $brand ),
					'description'         => __( 'List plugins available in the marketplace catalog. Each entry includes its categories, whether it is featured, install/activation state, and the download URL needed to install it.', 'onecom-wp' ),
					'category'            => self::CATEGORY,
					'output_schema'       => self::plugin_list_output_schema(),
					'permission_callback' => static fn() => current_user_can( 'install_plugins' ),
					'execute_callback'    => static function () use ( $catalog_provider ) {
						$payload = self::catalog_payload( $catalog_provider );
						return is_wp_error( $payload ) ? $payload : [ 'plugins' => self::catalog_summaries( $payload ) ];
					},
					'meta'                => self::tool_meta( [ 'readonly' => true ] ),
				] );
			}

			// Details about a single product.
			$slug = "{$brand}-marketplace/get-product";
			if ( ! wp_get_ability( $slug ) ) {
				wp_register_ability( $slug, [
					'label'               => sprintf( __( 'Get %s product details', 'onecom-wp' ), $brand ),
					'description'         => __( 'Get full catalog details for a single marketplace product by slug, including its install/activation state and download URL.', 'onecom-wp' ),
					'category'            => self::CATEGORY,
					'input_schema'        => [
						'type'       => 'object',
						'properties' => [
							'slug' => [ 'type' => 'string', 'description' => __( 'Product/plugin slug.', 'onecom-wp' ) ],
						],
						'required'   => [ 'slug' ],
					],
					'output_schema'       => [
						'type'       => 'object',
						'properties' => [ 'product' => [ 'type' => 'object' ] ],
					],
					'permission_callback' => static fn() => current_user_can( 'install_plugins' ),
					'execute_callback'    => static function ( $input ) use ( $catalog_provider ) {
						$slug = (string) ( $input['slug'] ?? '' );
						if ( '' === $slug ) {
							return new \WP_Error( 'invalid_slug', __( 'Missing product slug.', 'onecom-wp' ) );
						}
						$payload = self::catalog_payload( $catalog_provider );
						if ( is_wp_error( $payload ) ) {
							return $payload;
						}
						foreach ( self::extract_items( $payload ) as $item ) {
							if ( isset( $item['slug'] ) && (string) $item['slug'] === $slug ) {
								return [ 'product' => self::augment_item( $item ) ];
							}
						}
						return new \WP_Error( 'not_found', sprintf( __( 'Product "%s" was not found in the marketplace catalog.', 'onecom-wp' ), $slug ) );
					},
					'meta'                => self::tool_meta( [ 'readonly' => true ] ),
				] );
			}

			// Installed products ("My Products").
			$slug = "{$brand}-marketplace/list-installed";
			if ( ! wp_get_ability( $slug ) ) {
				wp_register_ability( $slug, [
					'label'               => sprintf( __( 'List installed %s products', 'onecom-wp' ), $brand ),
					'description'         => __( 'List the marketplace products that are already installed on this site ("My Products"), with their activation state.', 'onecom-wp' ),
					'category'            => self::CATEGORY,
					'output_schema'       => self::plugin_list_output_schema(),
					'permission_callback' => static fn() => current_user_can( 'install_plugins' ),
					'execute_callback'    => static function () use ( $catalog_provider ) {
						$payload = self::catalog_payload( $catalog_provider );
						if ( is_wp_error( $payload ) ) {
							return $payload;
						}
						$installed = array_values( array_filter(
							self::catalog_summaries( $payload ),
							static fn( $p ) => ! empty( $p['installed'] )
						) );
						return [ 'plugins' => $installed ];
					},
					'meta'                => self::tool_meta( [ 'readonly' => true ] ),
				] );
			}
		}

		// Subscriptions ("My Subscriptions").
		if ( null !== $subscriptions_provider ) {
			$slug = "{$brand}-marketplace/list-subscriptions";
			if ( ! wp_get_ability( $slug ) ) {
				wp_register_ability( $slug, [
					'label'               => sprintf( __( 'List %s subscriptions', 'onecom-wp' ), $brand ),
					'description'         => __( 'List the current marketplace product subscriptions for this site ("My Subscriptions").', 'onecom-wp' ),
					'category'            => self::CATEGORY,
					'output_schema'       => [
						'type'       => 'object',
						'properties' => [ 'subscriptions' => [ 'type' => 'array', 'items' => [ 'type' => 'object' ] ] ],
					],
					'permission_callback' => static fn() => current_user_can( 'install_plugins' ),
					'execute_callback'    => static function () use ( $subscriptions_provider ) {
						$subs = call_user_func( $subscriptions_provider );
						if ( is_wp_error( $subs ) ) {
							return $subs;
						}
						return [ 'subscriptions' => is_array( $subs ) ? array_values( $subs ) : [] ];
					},
					'meta'                => self::tool_meta( [ 'readonly' => true ] ),
				] );
			}

			// Single subscription detail (Rank Math only by default): status + renewal/
			// expiry for one subscription, looked up by subscription id or product slug.
			$detail_brands = apply_filters( 'marketplace_subscription_detail_brands', [ self::RANKMATH_BRAND ] );
			if ( in_array( $brand, (array) $detail_brands, true ) ) {
				$slug = "{$brand}-marketplace/get-subscription";
				if ( ! wp_get_ability( $slug ) ) {
					wp_register_ability( $slug, [
						'label'               => sprintf( __( 'Get a %s subscription', 'onecom-wp' ), $brand ),
						'description'         => __( 'Get details for a single subscription — including status and renewal/expiry date — by subscription id or product slug.', 'onecom-wp' ),
						'category'            => self::CATEGORY,
						'input_schema'        => [
							'type'       => 'object',
							'properties' => [
								'subscriptionId' => [ 'type' => 'string', 'description' => __( 'Subscription id (from list-subscriptions).', 'onecom-wp' ) ],
								'slug'           => [ 'type' => 'string', 'description' => __( 'Product slug, e.g. seo-by-rank-math-pro.', 'onecom-wp' ) ],
							],
						],
						'output_schema'       => [
							'type'       => 'object',
							'properties' => [ 'subscription' => [ 'type' => 'object' ] ],
						],
						'permission_callback' => static fn() => current_user_can( 'install_plugins' ),
						'execute_callback'    => static function ( $input ) use ( $subscriptions_provider, $catalog_provider ) {
							return self::find_subscription( is_array( $input ) ? $input : [], $subscriptions_provider, $catalog_provider );
						},
						'meta'                => self::tool_meta( [ 'readonly' => true ] ),
					] );
				}
			}
		}

		// Refresh products: clear the marketplace caches and re-fetch from the API.
		if ( null !== $refresh_provider ) {
			$slug = "{$brand}-marketplace/refresh-products";
			if ( ! wp_get_ability( $slug ) ) {
				wp_register_ability( $slug, [
					'label'               => sprintf( __( 'Refresh %s products', 'onecom-wp' ), $brand ),
					'description'         => __( 'Clear the marketplace cache (catalog + subscriptions transients) and re-fetch the catalog fresh from the API. Returns the refreshed plugin list.', 'onecom-wp' ),
					'category'            => self::CATEGORY,
					'output_schema'       => [
						'type'       => 'object',
						'properties' => [
							'refreshed' => [ 'type' => 'boolean' ],
							'plugins'   => self::plugin_list_output_schema()['properties']['plugins'],
						],
					],
					'permission_callback' => static fn() => current_user_can( 'install_plugins' ),
					'execute_callback'    => static function () use ( $refresh_provider ) {
						$payload = self::catalog_payload( $refresh_provider );
						if ( is_wp_error( $payload ) ) {
							return $payload;
						}
						return [ 'refreshed' => true, 'plugins' => self::catalog_summaries( $payload ) ];
					},
					// Not read-only (clears cache) but not destructive — just drops caches
					// and re-fetches. Idempotent: refreshing again yields the same state.
					'meta'                => self::tool_meta( [ 'readonly' => false, 'destructive' => false, 'idempotent' => true ] ),
				] );
			}
		}
	}

	/**
	 * Find a single subscription by subscription id or product slug and return it
	 * (full object, including status and renewal/expiry date). A slug is resolved to
	 * its productId via the catalog, since subscriptions key on productId.
	 *
	 * @param array         $input                  { subscriptionId?, slug? }
	 * @param callable      $subscriptions_provider Returns array|WP_Error.
	 * @param callable|null $catalog_provider       Returns array|WP_Error (for slug -> productId).
	 * @return array|\WP_Error
	 */
	private static function find_subscription( array $input, callable $subscriptions_provider, ?callable $catalog_provider ) {
		$subscription_id = (string) ( $input['subscriptionId'] ?? '' );
		$slug            = (string) ( $input['slug'] ?? '' );
		if ( '' === $subscription_id && '' === $slug ) {
			return new \WP_Error( 'invalid_input', __( 'Provide a subscriptionId or a product slug.', 'onecom-wp' ) );
		}

		$subs = call_user_func( $subscriptions_provider );
		if ( is_wp_error( $subs ) ) {
			return $subs;
		}
		$subs = is_array( $subs ) ? $subs : [];

		// Resolve a product slug to its productId via the catalog (subscriptions key on productId).
		$product_id = '';
		if ( '' === $subscription_id && '' !== $slug && null !== $catalog_provider ) {
			$payload = self::catalog_payload( $catalog_provider );
			if ( ! is_wp_error( $payload ) ) {
				foreach ( self::extract_items( $payload ) as $item ) {
					if ( isset( $item['slug'] ) && (string) $item['slug'] === $slug ) {
						$product_id = (string) ( $item['productId'] ?? $item['product_id'] ?? '' );
						break;
					}
				}
			}
		}

		foreach ( $subs as $sub ) {
			if ( ! is_array( $sub ) ) {
				continue;
			}
			if ( '' !== $subscription_id && (string) ( $sub['subscriptionId'] ?? '' ) === $subscription_id ) {
				return [ 'subscription' => $sub ];
			}
			if ( '' !== $product_id && (string) ( $sub['productId'] ?? '' ) === $product_id ) {
				return [ 'subscription' => $sub ];
			}
		}

		return new \WP_Error( 'not_found', __( 'No matching subscription was found.', 'onecom-wp' ) );
	}

	/**
	 * Fetch the raw catalog payload and normalise error/maintenance cases into a
	 * WP_Error, so each read callback can bail with a single is_wp_error() check.
	 *
	 * @param callable $catalog_provider
	 * @return array|\WP_Error
	 */
	private static function catalog_payload( callable $catalog_provider ) {
		$payload = call_user_func( $catalog_provider );
		if ( is_wp_error( $payload ) ) {
			return $payload;
		}
		if ( is_array( $payload ) && ! empty( $payload['data']['maintenanceMode'] ) ) {
			return new \WP_Error( 'maintenance', __( 'The marketplace is temporarily unavailable.', 'onecom-wp' ) );
		}
		return $payload;
	}

	/**
	 * Flatten the various catalog payload shapes into the raw product item list.
	 * Mirrors the shapes handled by MarketplaceController::get_plugins() enrichment.
	 *
	 * @param mixed $payload
	 * @return array<int, array<string, mixed>>
	 */
	private static function extract_items( $payload ): array {
		if ( ! empty( $payload['data']['catalog'] ) && is_array( $payload['data']['catalog'] ) ) {
			return $payload['data']['catalog'];
		}
		if ( isset( $payload['data'] ) && is_array( $payload['data'] ) && array_values( $payload['data'] ) === $payload['data'] ) {
			return $payload['data'];
		}
		if ( ! empty( $payload['data']['ui_json'] ) && is_array( $payload['data']['ui_json'] ) ) {
			return $payload['data']['ui_json'];
		}
		$items    = [];
		$sections = $payload['data']['sections'] ?? $payload['sections'] ?? [];
		if ( is_array( $sections ) ) {
			foreach ( $sections as $section ) {
				if ( ! empty( $section['items'] ) && is_array( $section['items'] ) ) {
					$items = array_merge( $items, $section['items'] );
				}
			}
		}
		return $items;
	}

	/**
	 * The raw catalog item with live install/activation state attached (full detail).
	 *
	 * @param array $item
	 * @return array
	 */
	private static function augment_item( array $item ): array {
		$slug              = (string) ( $item['slug'] ?? '' );
		$installed         = '' !== $slug && PluginService::is_installed( $slug );
		$item['installed'] = $installed;
		$item['activated'] = $installed ? PluginService::is_active( $slug ) : false;
		return $item;
	}

	/**
	 * Trimmed {slug,name,download_url,installed,activated} summaries for every catalog
	 * item that has a slug — the shape used by the list abilities.
	 *
	 * @param mixed $payload
	 * @return array<int, array<string, mixed>>
	 */
	private static function catalog_summaries( $payload ): array {
		$out = [];
		foreach ( self::extract_items( $payload ) as $item ) {
			if ( empty( $item['slug'] ) ) {
				continue;
			}
			$slug      = (string) $item['slug'];
			$installed = PluginService::is_installed( $slug );
			$out[]     = [
				'slug'         => $slug,
				'name'         => (string) ( $item['name'] ?? $item['title'] ?? $slug ),
				'download_url' => (string) ( $item['download_url'] ?? '' ),
				'categories'   => self::normalize_categories( $item ),
				'featured'     => (bool) ( $item['featured'] ?? false ),
				'installed'    => $installed,
				'activated'    => $installed ? PluginService::is_active( $slug ) : false,
			];
		}
		return $out;
	}

	/**
	 * Normalise a catalog item's `categories` (array of strings or {slug,title}
	 * objects) into a flat list of category slugs/titles.
	 *
	 * @param array $item
	 * @return string[]
	 */
	private static function normalize_categories( array $item ): array {
		$cats = $item['categories'] ?? [];
		if ( ! is_array( $cats ) ) {
			return [];
		}
		$out = [];
		foreach ( $cats as $c ) {
			$val = is_array( $c ) ? ( $c['slug'] ?? $c['title'] ?? '' ) : $c;
			$val = (string) $val;
			if ( '' !== $val ) {
				$out[] = $val;
			}
		}
		return $out;
	}

	/**
	 * Output schema shared by the plugin-list read abilities.
	 */
	private static function plugin_list_output_schema(): array {
		return [
			'type'       => 'object',
			'properties' => [
				'plugins' => [
					'type'  => 'array',
					'items' => [
						'type'       => 'object',
						'properties' => [
							'slug'         => [ 'type' => 'string' ],
							'name'         => [ 'type' => 'string' ],
							'download_url' => [ 'type' => 'string' ],
							'categories'   => [ 'type' => 'array', 'items' => [ 'type' => 'string' ] ],
							'featured'     => [ 'type' => 'boolean' ],
							'installed'    => [ 'type' => 'boolean' ],
							'activated'    => [ 'type' => 'boolean' ],
						],
					],
				],
			],
		];
	}

	/**
	 * Shared input schema for slug-only actions.
	 */
	private static function slug_input_schema(): array {
		return [
			'type'       => 'object',
			'properties' => [
				'slug' => [ 'type' => 'string', 'description' => __( 'Plugin slug.', 'onecom-wp' ) ],
			],
			'required'   => [ 'slug' ],
		];
	}

	/**
	 * Shared output schema for action abilities (matches PluginService result shape).
	 */
	private static function action_output_schema(): array {
		return [
			'type'       => 'object',
			'properties' => [
				'success'   => [ 'type' => 'boolean' ],
				'code'      => [ 'type' => 'string', 'description' => __( 'Machine-readable outcome code.', 'onecom-wp' ) ],
				'message'   => [ 'type' => 'string' ],
				'installed' => [ 'type' => 'boolean' ],
				'activated' => [ 'type' => 'boolean' ],
			],
		];
	}
}
