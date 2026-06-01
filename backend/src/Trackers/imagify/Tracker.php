<?php
namespace Groupone\Marketplace\Trackers\Imagify;

use Groupone\Marketplace\Trackers\AbstractPluginTracker;

// Must be loaded here at file scope so PartnerBridge can extend \Imagify_Partner.
// PHP resolves parent classes at compile time (when this file is required),
// not at the point where PartnerBridge is instantiated.
if ( ! class_exists( 'Imagify_Partner' ) ) {
	require_once __DIR__ . '/class-imagify-partner.php';
}

/**
 * Marketplace tracker for the Imagify plugin.
 *
 * Auto-discovered by MarketplaceController via convention:
 *   Trackers/imagify/Tracker.php
 *
 * Stores the brand identifier in the WordPress options table so Imagify knows
 * which brand the install originated from (e.g. 'onecom', 'rankmath', 'wp-media').
 */
class Tracker extends AbstractPluginTracker {

	/**
	 * {@inheritdoc}
	 */
	public function onInstall( string $slug, string $brand ): void {
		if ( empty( $brand ) ) {
			error_log( '[Marketplace] Imagify tracker: brand is empty, skipping install tracking for "' . $slug . '".' );
			return;
		}

		// Skip if the user already has an active Imagify API key —
		// existing customers don't need partner attribution.
		if ( \Imagify_Partner::has_imagify_api_key() ) {
			return;
		}

		$bridge = new PartnerBridge( $brand );
		$bridge->record_partner();
	}

	// onActivate() not needed for Imagify — inherits no-op from AbstractPluginTracker.
}

/**
 * Thin bridge that exposes Imagify_Partner::store_partner() as a public method.
 *
 * @internal — use Tracker, not this class directly.
 */
class PartnerBridge extends \Imagify_Partner {

	/**
	 * Persist the brand/partner identifier in the database.
	 */
	public function record_partner(): void {
		self::store_partner( $this->get_partner() );
	}
}
