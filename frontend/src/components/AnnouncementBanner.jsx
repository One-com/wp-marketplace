import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';

/**
 * AnnouncementBanner
 *
 * Expandable, dismissible release announcement banner shown on the product
 * detail page. The announcement data comes directly from the catalog response
 * via plugin.announcement — no separate API call is made.
 *
 * Renders only when ALL of the following are true:
 *
 *  1. plugin.announcement exists with is_active === true and is not expired.
 *  2. The plugin is NOT already installed on the site.
 *  3. The current user has not previously dismissed the banner (checked
 *     against dismissedBanners injected into window.marketplaceConfig by PHP,
 *     keyed by plugin.productId).
 *
 * Dismiss is persisted to WP user meta ({brand}_marketplace_dismissed_banners)
 * via a wp-admin AJAX call so state survives across browsers and devices.
 *
 * @param {{ plugin: object }} props
 */
const AnnouncementBanner = ({ plugin }) => {
    const { wpConfig, assetsBaseUrl } = useMarketplace();
    const assetBase = assetsBaseUrl ||
        (typeof window !== 'undefined' && window.marketplaceConfig?.assetsBaseUrl) || '';
    const iconBase = assetBase ? `${assetBase}assets/` : '';

    const announcement = plugin?.announcement || null;

    // Stable identifier used as the dismiss key — keyed by plugin productId
    // since product_id will be removed from the announcement object.
    const bannerId = plugin?.productId || null;

    // Validate: must exist, be active, and not expired
    const isValid = (() => {
        if ( !announcement?.is_active ) return false;
        if ( announcement?.expires_at ) {
            return new Date( announcement.expires_at ) > new Date();
        }
        return true;
    })();

    // Dismissed state — seeded from PHP-injected dismissedBanners (keyed by announcement.product_id)
    const [dismissed, setDismissed] = useState(() => {
        if ( !bannerId ) return false;
        const dismissedBanners =
            (typeof window !== 'undefined' &&
                window.marketplaceConfig?.dismissedBanners) || [];
        return Array.isArray( dismissedBanners ) && dismissedBanners.includes( bannerId );
    });

    const [expanded, setExpanded] = useState(false);

    /**
     * Persist dismiss to WP user meta via wp-admin AJAX, then hide the banner.
     * Uses optimistic UI — banner disappears immediately without waiting for
     * the server response.
     */
    const handleDismiss = () => {
        setDismissed(true);

        // Keep the in-memory config in sync so SPA re-renders (no full page reload)
        // also treat this banner as dismissed on component remount.
        if ( typeof window !== 'undefined' && window.marketplaceConfig ) {
            const current = window.marketplaceConfig.dismissedBanners || [];
            if ( !current.includes( bannerId ) ) {
                window.marketplaceConfig.dismissedBanners = [ ...current, bannerId ];
            }
        }

        try {
            const ajaxUrl = wpConfig?.ajaxUrl ||
                window?.marketplaceConfig?.wpConfig?.ajaxUrl;
            const nonce   = wpConfig?.nonce ||
                window?.marketplaceConfig?.wpConfig?.nonce;
            const prefix  = wpConfig?.ajaxActionPrefix ||
                window?.marketplaceConfig?.wpConfig?.ajaxActionPrefix ||
                'marketplace';

            if ( ajaxUrl ) {
                const body = new URLSearchParams({
                    action:      `${prefix}_dismiss_banner`,
                    nonce,
                    banner_slug: bannerId,
                });
                fetch( ajaxUrl, { method: 'POST', body } ).catch(() => {});
            }
        } catch { /* silently ignore */ }
    };

    const handleToggle = () => setExpanded((prev) => !prev);

    // Nothing to render
    if ( !bannerId || !isValid || dismissed || plugin?.installed ) {
        return null;
    }

    return (
        <div
            className="gv-notice gv-notice-upgrade gv-w-full mp-announcement-banner"
            role="region"
            aria-label={`Release announcement: ${announcement.title}`}
            style={{ gap: 'var(--size-sm)', alignItems: 'flex-start' }}
        >
            {/* Scoped overrides — desktop only; mobile restores Gravity default padding */}
            <style>{`
                .mp-announcement-banner { padding: var(--size-md) !important; padding-bottom: 10px !important; }
                .mp-announcement-banner .gv-notice-close { padding: var(--size-xs) !important; }
                .mp-announcement-banner .gv-notice-icon { width: var(--size-icon-md); height: var(--size-icon-md); flex-shrink: 0; }
                .mp-announcement-banner .banner-cta { height: 32px !important; font-size: 13px !important; }
                @media (max-width: 599px) {
                    .mp-announcement-banner { padding: var(--size-lg) !important; }
                    .mp-announcement-banner .gv-notice-close { padding: var(--size-sm) !important; }
                }
            `}</style>

            {/* Left icon — campaign/megaphone */}
            <gv-icon
                className="gv-notice-icon"
                aria-hidden="true"
                src={`${iconBase}icons/campaign.svg`}
            ></gv-icon>

            {/* Accordion: title row (trigger) + collapsible body */}
            <div className="gv-notice-content gv-accordion">
                <div className="gv-acc-header">
                    <button
                        type="button"
                        className={`gv-acc-trigger${expanded ? ' gv-expanded' : ''}`}
                        onClick={handleToggle}
                        aria-expanded={expanded}
                        style={{ padding: 'var(--size-sm) 0 var(--size-sm) 0' }}
                    >
                        <span
                            className="gv-acc-title"
                            style={{ fontSize: '13px' }}
                        >
                            {announcement.title}
                        </span>
                    </button>
                </div>

                {expanded && (
                    <div className="gv-acc-content gv-pb-0 gv-mb-sm">
                        <p>{announcement.body}</p>
                        <a
                            href={announcement.cta_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gv-button gv-button-neutral gv-button-sm gv-mt-md banner-cta"
                            style={{ height: 'var(--form-element-height)' }}
                        >
                            {announcement.cta_label}
                            <gv-icon
                                aria-hidden="true"
                                src={`${iconBase}icons/open_in_new.svg`}
                            ></gv-icon>
                        </a>
                    </div>
                )}
            </div>

            {/* Dismiss — persists to WP user meta */}
            <button
                type="button"
                className="gv-notice-close"
                onClick={handleDismiss}
                aria-label="Dismiss release announcement"
            >
                <gv-icon
                    aria-hidden="true"
                    src={`${iconBase}icons/close.svg`}
                    style={{ width: 'var(--size-icon-sm)', height: 'var(--size-icon-sm)' }}
                ></gv-icon>
            </button>
        </div>
    );
};

export default AnnouncementBanner;
