import React, { useState, useEffect, useRef, useCallback } from "react";
import {normalizePlugins} from "./normalised-plugins";
import "@group.one/gravity";
import { useTranslation } from "react-i18next";
import ProductDetail from "./ProductDetail";
import ProductDetailRankMath from "./ProductDetailRankMath";
import ErrorState from "./ErrorState";
import MaintenanceState from "./MaintenanceState";
import WpVersionErrorState from "./WpVersionErrorState";
import { useMarketplace } from "../context/MarketplaceContext";
import { formatPluginPrice, getRebatePrice,getFullPrice } from "../utils/priceFormatter";
import { trackMarketplaceVisit, trackPluginDetailVisit, trackPageView } from "../utils/mixpanelTracking";

export default function Marketplace() {
    const {
        apiBaseUrl,
        useWPHandlers,
        wpConfig,
        enableDefaultStyles,
        assetsBaseUrl,
        pluginInAction,
        setPluginInAction,
        fetchPartnerSubscriptions,
        fetchSubscriptionStatus,
        isOnecomBrand,
        plugins,
        setPlugins,
        uiI18n,
        setUiI18n,
        handlePluginAction,
        allPluginsActivated,
        setAllPluginsActivated,
        catalogError,
        setCatalogError,
        catalogLoading,
        setCatalogLoading,
        maintenanceState,
        setMaintenanceState,
        currentPluginSlug,
        shouldShowProvision,
        isSpecialPlugin,
        shouldShowPlugin,
        isWpVersionSupported
    } = useMarketplace();

    // Get active plugin slugs from WordPress config
    const activePlugins = typeof window !== "undefined" && window.marketplaceConfig?.activePlugins
        ? window.marketplaceConfig.activePlugins
        : [];

    // Get active theme author from WordPress config
    const activeThemeAuthor = typeof window !== "undefined" && window.marketplaceConfig?.activeThemeAuthor
        ? window.marketplaceConfig.activeThemeAuthor
        : "";

    const [downloadingPlugins, setDownloadingPlugins] = useState({});
    const [selectedPlugin, setSelectedPlugin] = useState(null);

    // Use ref to track if plugins have already been fetched
    const hasFetchedPlugins = useRef(false);

    // Use ref to track if marketplace visit has been tracked (prevent duplicates)
    const hasTrackedMarketplaceVisit = useRef(false);

    // Use ref to track last tracked plugin detail to prevent duplicate tracking
    const lastTrackedPluginSlug = useRef(null);

    // Use ref to store timestamps for tracking
    const contentReceivedTimestamp = useRef(null);
    const contentRenderTimestamp = useRef(null);

    // Use ref to store is_cached flag from API response
    const isCachedRef = useRef(false);

    // Construct icon base URL with fallback logic
    const assetBase = assetsBaseUrl || (typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl) || "";
    const iconBase = assetBase ? `${assetBase}assets/icons/` : "";

    // After plugins load, select plugin from currentPluginSlug if present
    useEffect(() => {
        if (currentPluginSlug && plugins.length) {
            const match = plugins.find(p => p.slug === currentPluginSlug);
            if (match) setSelectedPlugin(match);
        } else if (!currentPluginSlug) {
            // Clear selectedPlugin when no plugin parameter in URL
            setSelectedPlugin(null);
        }
    }, [currentPluginSlug, plugins]);

    const {t} = useTranslation();

    // Wrapped in useCallback so Retry (from MaintenanceState) can re-invoke without
    // a page reload. The hasFetchedPlugins ref only guards the on-mount call.
    const fetchPlugins = useCallback(async () => {
        setCatalogLoading(true);
        setCatalogError(false);
        setMaintenanceState({ isOn: false, message: '', buttonLabel: '' });
        try {
            const res = await fetch(`${apiBaseUrl}`);
            const json = await res.json();

            // Capture timestamp when API content is received
            contentReceivedTimestamp.current = Date.now();

            // Extract is_cached flag from API response
            isCachedRef.current = json.is_cached || false;

            // Maintenance mode — planned downtime, surface a Retry UI without
            // tripping the catalogError auto-reload. Both message and button label
            // are server-supplied; falsy values cause the corresponding element to be hidden.
            if (json?.data?.maintenanceMode === true) {
                setMaintenanceState({
                    isOn: true,
                    message: json?.data?.message || '',
                    buttonLabel: json?.data?.buttonLabel || '',
                });
                setCatalogLoading(false);
                return;
            }

            // Check for API error response (success: false)
            if (json && json.success === false) {
                // Track page view with content render failure
                trackPageView({
                    category: 'marketplace_home',
                    isContentRendered: false,
                });
                setCatalogError(true);
                setCatalogLoading(false);
                return;
            }

            // Check for blank/empty response
            if (!json || !json.data || !json.data.catalog || (Array.isArray(json.data.catalog) && json.data.catalog.length === 0)) {
                console.error("API returned empty or blank response");
                // Track page view with content render failure
                trackPageView({
                    category: 'marketplace_home',
                    isContentRendered: false,
                });
                setCatalogError(true);
                setCatalogLoading(false);
                return;
            }

            const { plugins: normalizedPlugins, uiI18n: apiUiI18n } = normalizePlugins(json);
            setPlugins(normalizedPlugins);
            setUiI18n(apiUiI18n);

            // Fetch full subscriptions list so subscription data is available on the Marketplace page
            fetchPartnerSubscriptions();

            // Fetch subscription status for special plugins (wp-rocket, rank-math-pro)
            if (isOnecomBrand) {
                const specialPlugins = normalizedPlugins.filter(p => isSpecialPlugin(p.slug));

                // Fetch subscription status for each special plugin
                specialPlugins.forEach(plugin => {
                    fetchSubscriptionStatus(plugin.slug);
                });
            }
        } catch (e) {
            // Track page view with content render failure
            trackPageView({
                category: 'marketplace_home',
                isContentRendered: false,
                visibleConditionalProducts: [],
            });
            setCatalogError(true);
        } finally {
            setCatalogLoading(false);
        }
    }, [apiBaseUrl, isOnecomBrand, fetchPartnerSubscriptions, fetchSubscriptionStatus, isSpecialPlugin, setPlugins, setUiI18n, setCatalogError, setCatalogLoading, setMaintenanceState]);

    useEffect(() => {
        if (hasFetchedPlugins.current) return;
        hasFetchedPlugins.current = true;
        fetchPlugins();
    }, [fetchPlugins]);

    // Use useMemo to filter plugins based on rules and activation status
    const { visiblePlugins, visibleConditionalPlugins } = React.useMemo(() => {
        if (!plugins.length) return { visiblePlugins: [], visibleConditionalPlugins: [] };

        const bySlug = new Map();
        const conditionalSlugs = [];

        // Check activation status of Rank Math plugins
        const rankMathActivated = plugins.find(p => p.slug === "seo-by-rank-math")?.activated === true;
        const rankMathProActivated = plugins.find(p => p.slug === "seo-by-rank-math-pro")?.activated === true;

        plugins.forEach((p) => {
            // Skip if already in map or activated
            if (bySlug.has(p.slug) || p.activated === true) {
                return;
            }

            // Handle Rank Math plugin visibility for the Catalog display
            if (p.slug === "seo-by-rank-math") {
                // Show seo-by-rank-math only if BOTH plugins are NOT activated
                if (!rankMathActivated && !rankMathProActivated && shouldShowPlugin(p)) {
                    bySlug.set(p.slug, p);
                }
                return;
            }

            if (p.slug === "seo-by-rank-math-pro") {
                // Show seo-by-rank-math-pro only if seo-by-rank-math IS activated
                if (rankMathActivated && shouldShowPlugin(p)) {
                    bySlug.set(p.slug, p);
                }
                return;
            }

            // Apply filtering based on rules for other plugins
            if (shouldShowPlugin(p)) {
                bySlug.set(p.slug, p);
            }
        });

        // Identify plugins that are visible AND have rules (conditional)
        bySlug.forEach((plugin, slug) => {
            const hasRules = plugin.rules && Object.keys(plugin.rules).length > 0;

            if (hasRules && shouldShowPlugin(plugin)) {
                conditionalSlugs.push(slug);
            }
        });

        return {
            visiblePlugins: Array.from(bySlug.values()),
            visibleConditionalPlugins: conditionalSlugs
        };
    }, [plugins, shouldShowPlugin]);

    // Update allPluginsActivated in context whenever plugins change
    useEffect(() => {
        if (plugins.length > 0) {
            // If there are no plugins that should be visible (not activated and passing rules), then all are activated/hidden
            const allActivated = visiblePlugins.length === 0;
            setAllPluginsActivated(allActivated);
        }
    }, [plugins, visiblePlugins, setAllPluginsActivated]);

    // Track marketplace visit when plugins are loaded and no plugin detail is shown
    useEffect(() => {
        if (!catalogLoading && !catalogError && plugins.length > 0 && !currentPluginSlug && !hasTrackedMarketplaceVisit.current) {
            // Capture timestamp when content is rendered to the page
            contentRenderTimestamp.current = Date.now();

            // Check if this is a reload caused by plugin activation
            const skipPageView = sessionStorage.getItem('mp_skip_page_view');
            if (skipPageView === 'true') {
                // Clear the flag and skip tracking
                sessionStorage.removeItem('mp_skip_page_view');
            } else {
                // Normal page load, track the visit
                trackMarketplaceVisit(contentReceivedTimestamp.current, contentRenderTimestamp.current, isCachedRef.current, visibleConditionalPlugins);
            }
            hasTrackedMarketplaceVisit.current = true;
        }
    }, [catalogLoading, catalogError, plugins.length, currentPluginSlug, visibleConditionalPlugins]);

    // Auto-reload at most once per browser tab if the catalog fetch errors out —
    // works around transient API issues without trapping the user on the error
    // screen. The sessionStorage flag is set on the first attempt and never
    // cleared during the tab's lifetime; if the reload doesn't recover, the
    // user stays on the error screen instead of looping forever.
    useEffect(() => {
        if (!catalogError) return;
        if (sessionStorage.getItem('mp_catalog_error_reloaded')) return;
        sessionStorage.setItem('mp_catalog_error_reloaded', '1');
        const timer = setTimeout(() => window.location.reload(), 2000);
        return () => clearTimeout(timer);
    }, [catalogError]);

    // Track plugin detail page visit when selectedPlugin changes
    useEffect(() => {
        if (selectedPlugin && currentPluginSlug && lastTrackedPluginSlug.current !== selectedPlugin.slug) {
            // Capture timestamp when content is rendered to the page
            contentRenderTimestamp.current = Date.now();

            // Check if this is a reload caused by plugin activation
            const skipPageView = sessionStorage.getItem('mp_skip_page_view');
            if (skipPageView === 'true') {
                // Clear the flag and skip tracking
                sessionStorage.removeItem('mp_skip_page_view');
            } else {
                // Normal page load, track the visit
                trackPluginDetailVisit(selectedPlugin, contentReceivedTimestamp.current, contentRenderTimestamp.current, isCachedRef.current);
            }
            lastTrackedPluginSlug.current = selectedPlugin.slug;
        }
        // Reset when returning to marketplace list
        if (!currentPluginSlug) {
            lastTrackedPluginSlug.current = null;
        }
    }, [selectedPlugin, currentPluginSlug]);

    const handleDownloadClick = (e, plugin) => {
        e.stopPropagation();

        // Set downloading state
        setDownloadingPlugins(prev => ({ ...prev, [plugin.slug]: true }));

        // Reset after a short delay (download is triggered immediately)
        // The browser handles the actual download, so we simulate completion
        setTimeout(() => {
            setDownloadingPlugins(prev => ({ ...prev, [plugin.slug]: false }));
        }, 2000);
    };

    const openDetail = (plugin, e) => {
        // Debug to confirm click
        setSelectedPlugin(plugin);
    };



    // Helper function to determine if we should use ProductDetailRankMath
    const shouldUseRankMathDetail = (plugin) => {
        if (!plugin) return false;
        const brand = typeof window !== "undefined" && window.marketplaceConfig?.brand;
        const isOnecomBrand = brand === "onecom";
        const isRankMathPlugin = plugin.slug === "seo-by-rank-math-pro" || plugin.slug === "seo-by-rank-math";
        return isOnecomBrand && isRankMathPlugin;
    };



    if (catalogLoading) {
        // If there's a plugin parameter in the URL, show appropriate skeleton based on plugin type
        if (currentPluginSlug) {
            // Determine if we should use RankMath detail component based on slug
            const brand = typeof window !== "undefined" && window.marketplaceConfig?.brand;
            const isOnecomBrand = brand === "onecom";
            const isRankMathPlugin = currentPluginSlug === "seo-by-rank-math-pro" || currentPluginSlug === "seo-by-rank-math";
            const DetailComponent = (isOnecomBrand && isRankMathPlugin) ? ProductDetailRankMath : ProductDetail;
            return (
                <DetailComponent
                    plugin={null}
                    onClose={() => {}}
                    usePortal={false}
                    loading={true}
                />
            );
        }

        // Show catalog skeleton loaders while catalog is loading
        return (
            <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg">
                <section className="category-section">
                    <div className="gv-skeleton gv-mb-sm" style={{ width: '160px' }}></div>
                    <div className="gv-skeleton gv-text-sm gv-mb-sm" style={{ width: '400px' }}></div>
                    <div className="product-grid gv-grid gv-gap-lg gv-mob-grid-cols-1 gv-tab-grid-cols-2 gv-mb-md gv-desk-lg-grid-cols-3 gv-mt-md">
                        {/* Generate first 3 skeleton plugin cards */}
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="gv-card gv-gap-md gv-content-container gv-p-lg gv-grid gv-grid-cols-12 gv-radius">
                                <div className="gv-desk-span-2 gv-span-3 gv-tab-span-3">
                                  <div className="gv-skeleton" style={{ width: '48px',height:'48px' }}></div>
                                </div>
                                <div className="gv-desk-span-8 gv-tab-span-7 gv-span-7">
                                    <div className="gv-skeleton gv-text-sm gv-mb-sm"></div>
                                    <div className="gv-skeleton gv-text-sm gv-mb-sm"></div>
                                    <div className="gv-skeleton gv-text-sm" style={{ width: '80px' }}></div>
                                </div>
                                <div className="gv-span-2 gv-content-center gv-text-right">
                                    <div className="gv-skeleton" style={{ width: '24px' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>

                        {/* Additional skeleton loaders after 3 cards */}
                        <div className="gv-skeleton gv-mb-sm" style={{ width: '160px' }}></div>
                        <div className="gv-skeleton gv-text-sm gv-mb-sm" style={{ width: '400px' }}></div>
                  <div className="product-grid gv-grid gv-gap-lg gv-mob-grid-cols-1 gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3 gv-mt-md">


                        {/* Generate remaining 3 skeleton plugin cards */}
                        {[...Array(3)].map((_, index) => (
                            <div key={index + 3} className="gv-card gv-gap-md gv-content-container gv-p-lg gv-grid gv-grid-cols-12 gv-radius">
                                <div className="gv-desk-span-2 gv-span-3 gv-tab-span-3">
                                  <div className="gv-skeleton" style={{ width: '48px',height:'48px' }}></div>
                                </div>
                                <div className="gv-desk-span-8 gv-tab-span-7 gv-span-7">
                                    <div className="gv-skeleton gv-text-sm gv-mb-sm"></div>
                                    <div className="gv-skeleton gv-text-sm gv-mb-sm"></div>
                                    <div className="gv-skeleton gv-text-sm" style={{ width: '80px' }}></div>
                                </div>
                                <div className="gv-span-2 gv-content-center gv-text-right">
                                    <div className="gv-skeleton" style={{ width: '24px' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        );
    }

    // Maintenance mode takes priority over the generic error state — it's a
    // planned downtime signal from the API, not an unexpected failure.
    if (maintenanceState.isOn) {
        return (
            <MaintenanceState
                message={maintenanceState.message}
                buttonLabel={maintenanceState.buttonLabel}
                onRetry={fetchPlugins}
            />
        );
    }

    // Show error state if API failed or returned error
    if (catalogError) {
        return <ErrorState />;
    }

  // Show WP version error state
  if (!isWpVersionSupported('6.2')) {
    return <WpVersionErrorState />;
  }

    // Early return: show full page detail instead of list
    if (selectedPlugin && currentPluginSlug) {
        const DetailComponent = shouldUseRankMathDetail(selectedPlugin) ? ProductDetailRankMath : ProductDetail;
        return (
            <DetailComponent
                plugin={selectedPlugin}
                onClose={() => {
                    // Return to listing (clear selection and URL)
                    setSelectedPlugin(null);
                    // Check if history.back() will work (has navigable history)
                    if (typeof window !== "undefined" && window.history && window.history.length > 1) {
                        window.history.back();
                    } else {
                        // In new-tab scenario, manually remove plugin parameter from URL
                        const url = new URL(window.location.href);
                        url.searchParams.delete("plugin");
                        window.history.replaceState({}, '', url.toString());
                    }
                }}
                usePortal={false}
                loading={catalogLoading}
            />
        );
    }

    // Group plugins by a single, specific category (first category), avoid duplicates across headings
    const categoryMap = new Map();

    visiblePlugins.forEach((p) => {
        // Handle new category object structure: { id, slug, title, description }
        const categoryObj = Array.isArray(p.categories) && p.categories.length
            ? (typeof p.categories[0] === 'object' ? p.categories[0] : { slug: String(p.categories[0]), title: String(p.categories[0]), description: null })
            : { slug: "Others", title: "Others", description: null };

        const categoryKey = categoryObj.slug || categoryObj.title || "Others";

        if (!categoryMap.has(categoryKey)) {
            categoryMap.set(categoryKey, { info: categoryObj, plugins: [] });
        }
        categoryMap.get(categoryKey).plugins.push(p);
    });

    const categories = Array.from(categoryMap.entries()).filter(([catKey, { plugins: list }]) => list.length > 0);

    // If all plugins are activated, show the "You've got all our plugins!" message.
    // The "View products" CTA is only rendered when the consumer plugin has
    // configured `addonsMenuSlug` — without a target slug there's nowhere to send the user.
    if (allPluginsActivated) {
        const addonsMenuSlug = typeof window !== "undefined" && window.marketplaceConfig?.addonsMenuSlug;
        const adminUrl = (typeof window !== "undefined" && window.marketplaceConfig?.wpConfig?.adminUrl) || '/wp-admin/';
        return (
            <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg gv-items-center gv-justify-center gv-p-fluid">
                <div className="gv-text-center">
                    <h5 className="gv-header-md gv-mb-sm">{uiI18n?.notifications?.allPluginsOwned}</h5>
                    <p className="gv-text-md gv-mb-lg">{uiI18n?.text?.managePlugins}</p>
                    {addonsMenuSlug && (
                        <button
                            type="button"
                            className="gv-button gv-button-primary"
                            onClick={() => {
                                window.location.href = `${adminUrl}admin.php?page=${addonsMenuSlug}`;
                            }}
                        >
                            <span>{uiI18n.viewProductsButton}</span>
                            <gv-icon aria-hidden="true" src={`${iconBase}/arrow_right.svg`}></gv-icon>
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg">
            {categories.map(([catKey, { info, plugins: list }]) => (
                <section key={catKey} className="category-section">
                    <p className="gv-text-bold gv-text-lg gv-mb-xs">{info.title || catKey}</p>
                    {info.description && <p className="gv-text-sm">{info.description}</p>}
                    <div className="product-grid gv-grid gv-gap-lg  gv-mob-grid-cols-1 gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3 gv-mt-md">
                        {list.map((plugin) => {
                            const isProvisionable = shouldShowProvision(plugin);
                            const freeLabel = (plugin.i18n.freeTrialPeriod && plugin.i18n.freeTrialPeriod.trim() !== '')
                                ? plugin.i18n.freeTrialPeriod
                                : (uiI18n?.labels?.free || 'Free');
                            const price = formatPluginPrice(plugin, freeLabel, uiI18n);
                            const fullPriceAmount = getFullPrice(plugin);
                            const rebatePriceAmount = getRebatePrice(plugin);
                            return (
                                <div
                                    key={plugin.slug}
                                    className="gv-card gv-gap-sm gv-content-container gv-p-lg gv-grid gv-grid-cols-12 gv-radius ocmp-plugin-cards"
                                    onClick={(e) => {
                                        setSelectedPlugin(plugin);
                                        const url = new URL(window.location.href);
                                        url.searchParams.set("plugin", plugin.slug);
                                        window.history.pushState({}, '', url.toString());
                                    }}
                                >
                                    <div className="gv-desk-span-2 gv-span-2 gv-tab-span-2">
                                        <img className="gv-icon-tile" src={plugin.iconUrl || `${iconBase}add_box.svg`}
                                            alt={plugin.name} />
                                    </div>
                                  <div className="gv-desk-span-9 gv-tab-span-9 gv-span-9 gv-ml-sm">
                                    <div className="gv-flex gv-flex-col gv-justify-between gv-h-full">
                                    <p className="gv-text-sm gv-text-bold gv-mb-xs">{plugin.name}</p>
                                      <p className="oc-card-content gv-text-on-alternative gv-mb-sm gv-text-sm gv-flex-1"> {plugin.i18n.listingDescription || plugin.i18n.subtitle} </p>
                                      <span className="gv-caption-lg gv-text-bold">
                                            <>
                                                {plugin.licenseType === "premium" && (rebatePriceAmount > 0) ? (rebatePriceAmount !== null ? rebatePriceAmount : fullPriceAmount) : price}
                                              {plugin.licenseType !== "free" && price && price !== freeLabel && price !== (uiI18n?.labels?.freeUntilRenewal || 'Free until renewal') && <span className="gv-period">/{uiI18n?.labels?.timeMonth}</span>}
                                            </>
                                      </span>
                                    </div>
                                  </div>
                                    <div className="gv-span-1 gv-content-center gv-text-right">
                                        <div
                                            className="gv-reset-button"
                                            style={{ display: "inline-block" }}
                                            aria-label={`View details for ${plugin.name}`}
                                        >
                                            <img
                                                className="gv-tile"
                                                src={`${iconBase}arrow_forward.svg`}
                                                alt={`View ${plugin.name} details`}
                                                style={{ minWidth: "24px" }}
                                            />
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            ))}
            {/* Remove overlay render (keep for non-query usage) */}
            {selectedPlugin && !currentPluginSlug && (() => {
                const DetailComponent = shouldUseRankMathDetail(selectedPlugin) ? ProductDetailRankMath : ProductDetail;
                return (
                    <DetailComponent
                        plugin={selectedPlugin}
                        onClose={() => setSelectedPlugin(null)}
                        loading={catalogLoading}
                    />
                );
            })()}
        </div>
    );
}
