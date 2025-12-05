<?php
namespace Groupone\Marketplace;
use Groupone\Marketplace\Controllers\MarketplaceController;

/**
 * Market Place Embeddable Module
 * CI/CD Test
 */


if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Marketplace {
	/**
	 * Boots the Marketplace with given config.
	 *
	 * @param array $config Configuration options for the marketplace module.
	 */
	public static function run( array $config = [] ) {
		try {
			MarketplaceController::boot($config);
		} catch (\Exception $e) {
			error_log($e->getMessage());
		}
	}
}