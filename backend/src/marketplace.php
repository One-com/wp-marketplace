<?php
/**
 * Marketplace main file
 *
 * @package Groupone\Marketplace
 */

namespace Groupone\Marketplace;

use Groupone\Marketplace\Controllers\MarketplaceController;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Marketplace Class
 */
final class Marketplace {
	/**
	 * Boots the Marketplace with given config.
	 *
	 * @param array $config Configuration options for the marketplace module.
	 */
	public static function run( array $config = [] ) {
		try {
			MarketplaceController::boot( $config );
		} catch ( \Exception $e ) {
			error_log( $e->getMessage() );
		}
	}
}
