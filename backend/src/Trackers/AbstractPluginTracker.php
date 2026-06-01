<?php
namespace Groupone\Marketplace\Trackers;

/**
 * Base class for all Marketplace plugin trackers.
 *
 * Convention-based auto-discovery: no manual registration required.
 * The MarketplaceController resolves a tracker by plugin slug at runtime:
 *
 *   Trackers/{slug}/Tracker.php  →  Groupone\Marketplace\Trackers\{Slug}\Tracker
 *
 * To add tracking for a new plugin, create one file:
 *   backend/src/Trackers/my-plugin/Tracker.php
 *   extend this class and override whichever events you need.
 *   Nothing else needs to change.
 *
 * Both methods default to no-op — override only the events relevant to your
 * plugin. This means adding a new event in the future (e.g. onDelete) is
 * non-breaking: existing trackers that don't override it continue to work.
 *
 * MUST NOT make outbound HTTP calls inline — both methods run synchronously
 * before wp_send_json_success(). Use wp_schedule_single_event() for any
 * external API calls to avoid delaying the browser response.
 */
abstract class AbstractPluginTracker {

	/**
	 * Called after the plugin is successfully installed via the Marketplace.
	 *
	 * @param string $slug   The installed plugin slug.
	 * @param string $brand  Brand identifier from MarketplaceController config
	 *                       (e.g. 'onecom', 'rankmath', 'wp-media').
	 * @return void
	 */
	public function onInstall( string $slug, string $brand ): void {
		// no-op by default
	}

	/**
	 * Called after the plugin is successfully activated via the Marketplace.
	 *
	 * @param string $slug   The activated plugin slug.
	 * @param string $brand  Brand identifier from MarketplaceController config
	 *                       (e.g. 'onecom', 'rankmath', 'wp-media').
	 * @return void
	 */
	public function onActivate( string $slug, string $brand ): void {
		// no-op by default
	}
}
