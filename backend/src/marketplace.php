<?php
/**
 * Marketplace main file.
 *
 * @package Groupone\Marketplace
 */

namespace Groupone\Marketplace;

use Groupone\Marketplace\Controllers\MarketplaceController;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Market Place Embeddable Module
 */
final class Marketplace {
	/**
	 * Boots the Marketplace with given config.
	 *
	 * @var array $booted_locations
	 */
	private static $booted_locations = [];

	/**
	 * Run the marketplace module.
	 *
	 * @param array $config Configuration options for the marketplace module.
	 */
	public static function run( array $config = [] ) {

		// Prevent duplicate Marketplace boot for same menu location.
		$parent = $config['parent_menu_slug'] ?? '';
		$slug   = $config['menu_slug'] ?? '';
		$key = $parent . '::' . $slug;

		if ( isset( self::$booted_locations[ $key ] ) ) {
			return;
		}
		self::$booted_locations[ $key ] = true;

		try {
			MarketplaceController::boot( $config );
		} catch ( \Exception $e ) {
			error_log( $e->getMessage() );
		}
	}
}
