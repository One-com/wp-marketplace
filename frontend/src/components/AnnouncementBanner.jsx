import React, { useState, useEffect } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';

/**
 * Maps plugin page slugs to their canonical banner slug.
 * Used in two ways:
 *  1. To derive the banner slug to query the API with.
 *  2. To validate the API response — a banner is shown only when the
 *     response plugin_slug matches the page slug directly OR via this map.
 */
const BANNER_SLUG_MAP = {
    'rank-math':             'rank-math',
    'seo-by-rank-math':      'rank-math',
    'seo-by-rank-math-pro':  'rank-math',
    'wp-rocket':             'wp-rocket',
};

/**
 * Returns the banners endpoint URL.
 * The /banners route is brand-agnostic and lives under the fixed
 * 'marketplace/v1' namespace, so it is read directly from
 * window.marketplaceConfig.bannersApiUrl (injected by PHP).
 *
 * @returns {string}
 */
const getBannersUrl = () =>
    (typeof window !== 'undefined' &&
        window.marketplaceConfig?.bannersApiUrl) || '';

/**
 * AnnouncementBanner
 *
 * Expandable, dismissible release announcement banner shown on the product
 * detail page.  Uses a Gravity notice (gv-notice gv-notice-info) as the
 * outer shell and a Gravity accordion (gv-accordion / gv-acc-*) for the
 * expand/collapse behaviour.
 *
 * Renders only when ALL of the following are true:
 *
 *  1. The plugin page slug maps to a supported banner slug (rank-math / wp-rocket)
 *     via BANNER_SLUG_MAP.
 *  2. The plugin is NOT already installed on the site.
 *  3. The API returns a banner with is_active === true, and the response
 *     plugin_slug either matches the page slug directly OR maps to it via
 *     BANNER_SLUG_MAP.
 *  4. The current user has not previously dismissed the banner (checked
 *     against dismissedBanners injected into window.marketplaceConfig by PHP).
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

    // Canonical banner slug for this plugin page (null if not supported)
    const bannerSlug = BANNER_SLUG_MAP[plugin?.slug] || null;

    // Initial dismissed state is injected by PHP into window.marketplaceConfig
    // so no extra round-trip is needed on component mount.
    const [dismissed, setDismissed] = useState(() => {
        if (!bannerSlug) return false;
        const dismissedBanners =
            (typeof window !== 'undefined' &&
                window.marketplaceConfig?.dismissedBanners) || [];
        return Array.isArray(dismissedBanners) &&
            dismissedBanners.includes(bannerSlug);
    });

    const [banner, setBanner]   = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading]  = useState(true);

    useEffect(() => {
        // Skip fetch when there's no matching slug, already dismissed, or plugin installed
        if (!bannerSlug || dismissed || plugin?.installed) {
            setLoading(false);
            return;
        }

        const url = `${getBannersUrl()}?plugin_slug=${bannerSlug}`;

        fetch(url)
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (!data || !data.is_active) return;

                // Validate: show the banner only when the response plugin_slug
                // either matches the page slug directly, or resolves to the same
                // canonical slug via BANNER_SLUG_MAP.
                const directMatch = data.plugin_slug === plugin?.slug;
                const mappedMatch = BANNER_SLUG_MAP[plugin?.slug] === data.plugin_slug;

                if (directMatch || mappedMatch) {
                    setBanner(data);
                }
            })
            .catch(() => { /* banner is non-critical — fail silently */ })
            .finally(() => setLoading(false));
    }, [bannerSlug]); // eslint-disable-line react-hooks/exhaustive-deps

    /**
     * Persist dismiss to WP user meta via wp-admin AJAX, then hide the banner.
     * Uses optimistic UI — banner disappears immediately without waiting for
     * the server response.
     */
    const handleDismiss = () => {
        setDismissed(true);

        try {
            const ajaxUrl = wpConfig?.ajaxUrl ||
                window?.marketplaceConfig?.wpConfig?.ajaxUrl;
            const nonce   = wpConfig?.nonce ||
                window?.marketplaceConfig?.wpConfig?.nonce;
            const prefix  = wpConfig?.ajaxActionPrefix ||
                window?.marketplaceConfig?.wpConfig?.ajaxActionPrefix ||
                'marketplace';

            if (ajaxUrl) {
                const body = new URLSearchParams({
                    action:      `${prefix}_dismiss_banner`,
                    nonce,
                    banner_slug: bannerSlug,
                });
                fetch(ajaxUrl, { method: 'POST', body }).catch(() => {});
            }
        } catch { /* silently ignore */ }
    };

    const handleToggle = () => setExpanded((prev) => !prev);

    // Nothing to render
    if (!bannerSlug || dismissed || loading || !banner || plugin?.installed) {
        return null;
    }

    return (
        <div
            className="gv-notice gv-notice-upgrade gv-w-full mp-announcement-banner"
            role="region"
            aria-label={`Release announcement: ${banner.title}`}
            style={{
                gap: 'var(--size-sm)',
                alignItems: 'flex-start',
            }}
        >
            {/* Scoped overrides — desktop only; mobile restores Gravity default padding */}
            <style>{`
                .mp-announcement-banner { padding: var(--size-sm) !important; }
                .mp-announcement-banner .gv-notice-close { padding: var(--size-xs) !important; }
                .mp-announcement-banner .gv-notice-icon { width: var(--size-icon-md); height: var(--size-icon-md); flex-shrink: 0; }
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
                            style={{ fontSize: 'calc(var(--font-size-text-sm) * 1rem - 2px)' }}
                        >
                            {banner.title}
                        </span>
                    </button>
                </div>

                {expanded && (
                    <div className="gv-acc-content gv-pb-0 gv-mb-sm">
                        <p>{banner.body}</p>
                        <a
                            href={banner.cta_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gv-button gv-button-neutral gv-button-sm gv-mt-sm"
                            style={{ height: 'var(--form-element-height)' }}
                        >
                            {banner.cta_label}
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
