import React, { useState, useEffect, useRef } from "react";
import {normalizePlugins} from "./normalised-plugins";
import "@group.one/gravity";
import { useTranslation } from "react-i18next";
import ProductDetail from "./ProductDetail";
import ProductDetailRankMath from "./ProductDetailRankMath";
import ErrorState from "./ErrorState";
import { useMarketplace } from "../context/MarketplaceContext";
import { formatPluginPrice } from "../utils/priceFormatter";

export default function Marketplace() {
    const {
        apiBaseUrl,
        useWPHandlers,
        wpConfig,
        enableDefaultStyles,
        assetsBaseUrl,
        pluginInAction,
        setPluginInAction,
        fetchSubscriptionStatus,
        isOnecomBrand,
        plugins,
        setPlugins,
        uiI18n,
        setUiI18n,
        handlePluginAction,
        allPluginsActivated,
        setAllPluginsActivated
    } = useMarketplace();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [downloadingPlugins, setDownloadingPlugins] = useState({});
    const [selectedPlugin, setSelectedPlugin] = useState(null);

    // Use ref to track if plugins have already been fetched
    const hasFetchedPlugins = useRef(false);

    // Construct icon base URL with fallback logic
    const assetBase = assetsBaseUrl || (typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl) || "";
    const iconBase = assetBase ? `${assetBase}assets/icons/` : "";

    // Determine if a plugin slug is in the URL
    const pluginFromQuery = typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("plugin")
        : null;

    // Get base page URL (without plugin parameter)
    const getBaseUrl = () => {
        if (typeof window === "undefined") return "";
        const url = new URL(window.location.href);
        url.searchParams.delete("plugin");
        return url.toString();
    };

    // After plugins load, select plugin from query if present
    useEffect(() => {
        if (pluginFromQuery && plugins.length) {
            const match = plugins.find(p => p.slug === pluginFromQuery);
            if (match) setSelectedPlugin(match);
        } else if (!pluginFromQuery) {
            // Clear selectedPlugin when no plugin parameter in URL
            setSelectedPlugin(null);
        }
    }, [pluginFromQuery, plugins]);

    // Listen for browser back/forward navigation
    useEffect(() => {
        const handlePopState = () => {
            const currentPluginParam = new URLSearchParams(window.location.search).get("plugin");
            if (!currentPluginParam) {
                // URL no longer has plugin parameter, clear selection
                setSelectedPlugin(null);
            } else if (plugins.length) {
                // URL has plugin parameter, update selection
                const match = plugins.find(p => p.slug === currentPluginParam);
                if (match) setSelectedPlugin(match);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [plugins]);

    const {t} = useTranslation();

    useEffect(() => {
        // Only fetch once
        if (hasFetchedPlugins.current) {
            return;
        }

        async function fetchPlugins() {
            try {
                hasFetchedPlugins.current = true;
                const res = await fetch(`${apiBaseUrl}`);
                const json = await res.json();

                // Check for API error response (success: false)
                if (json && json.success === false) {
                    console.error("API returned error:", json.error);
                    setError(true);
                    setLoading(false);
                    return;
                }

                // Check for blank/empty response
                if (!json || !json.data || !json.data.catalog || (Array.isArray(json.data.catalog) && json.data.catalog.length === 0)) {
                    console.error("API returned empty or blank response");
                    setError(true);
                    setLoading(false);
                    return;
                }

                const { plugins: normalizedPlugins, uiI18n: apiUiI18n } = normalizePlugins(json);
                setPlugins(normalizedPlugins);
                setUiI18n(apiUiI18n);

                // Fetch subscription status for special plugins (wp-rocket, rank-math-pro)
                if (isOnecomBrand) {
                    const specialPlugins = normalizedPlugins.filter(p =>
                        p.slug === "wp-rocket" || p.slug === "seo-by-rank-math-pro"
                    );

                    // Fetch subscription status for each special plugin
                    specialPlugins.forEach(plugin => {
                        fetchSubscriptionStatus(plugin.slug);
                    });
                }
            } catch (e) {
                console.error("Failed to fetch plugins", e);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchPlugins();
    }, [apiBaseUrl, isOnecomBrand, fetchSubscriptionStatus, setPlugins]);

    // Update allPluginsActivated in context whenever plugins change
    useEffect(() => {
        if (plugins.length > 0) {
            // Filter out activated plugins
            const nonActivatedPlugins = plugins.filter(p => p.activated !== true);
            const allActivated = nonActivatedPlugins.length === 0;
            setAllPluginsActivated(allActivated);
        }
    }, [plugins, setAllPluginsActivated]);

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
        console.log("Opening detail for plugin:", plugin.slug);
        setSelectedPlugin(plugin);
    };

    // Debug: log whenever selectedPlugin changes
    useEffect(() => {
        if (selectedPlugin) {
            console.log("Selected plugin state now:", selectedPlugin.slug);
        }
    }, [selectedPlugin]);

    // Helper function to determine if we should use ProductDetailRankMath
    const shouldUseRankMathDetail = (plugin) => {
        if (!plugin) return false;
        const brand = typeof window !== "undefined" && window.marketplaceConfig?.brand;
        const isOnecomBrand = brand === "onecom";
        const isRankMathPlugin = plugin.slug === "seo-by-rank-math-pro" || plugin.slug === "seo-by-rank-math";
        return isOnecomBrand && isRankMathPlugin;
    };

    if (loading) return <p>Loading plugins...</p>;

    // Show error state if API failed or returned error
    if (error) {
        return <ErrorState />;
    }

    // Early return: show full page detail instead of list
    if (selectedPlugin && pluginFromQuery) {
        const DetailComponent = shouldUseRankMathDetail(selectedPlugin) ? ProductDetailRankMath : ProductDetail;
        return (
            <DetailComponent
                plugin={selectedPlugin}
                onClose={() => {
                    // Return to listing (clear selection and URL)
                    setSelectedPlugin(null);
                    window.history.back();
                }}
                usePortal={false}
            />
        );
    }

    // Group plugins by a single, specific category (first category), avoid duplicates across headings
    const categoryMap = new Map();

    // Deduplicate plugins by slug first (in case backend/normalizer still returns duplicates)
    // Also filter out activated plugins and seo-by-rank-math from marketplace listing
    const bySlug = new Map();
    plugins.forEach((p) => {
        if (!bySlug.has(p.slug) && p.activated !== true && p.slug !== "seo-by-rank-math") {
            bySlug.set(p.slug, p);
        }
    });

    Array.from(bySlug.values()).forEach((p) => {
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

    // If all plugins are activated, show the "You've got all our plugins!" message
    if (allPluginsActivated) {
        return (
            <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg gv-items-center gv-justify-center gv-p-fluid">
                <div className="gv-text-center">
                    <h5 className="gv-header-md gv-mb-sm">You've got all our plugins!</h5>
                    <p className="gv-text-md gv-mb-lg">You can view and manage them in the My products page.</p>
                    <button
                        type="button"
                        className="gv-button gv-button-primary  buttons-min-width"
                        onClick={() => {
                            // Navigate to plugins page
                            window.location.href = '/wp-admin/plugins.php';
                        }}
                    >
                        <span>View products</span>
                        <gv-icon aria-hidden="true" src={`${iconBase}/arrow_right.svg`}></gv-icon>
                    </button>
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
                    {!info.description && <p className="gv-text-sm">A range of versatile plugins to enhance your WordPress experience and add new functionality with ease.</p>}
                    <div className="product-grid gv-grid gv-gap-lg  gv-mob-grid-cols-1 gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3 gv-mt-md">
                        {list.map((plugin) => {
                            const freeLabel = uiI18n?.labels?.free || 'Free';
                            const price = formatPluginPrice(plugin, freeLabel);
                            return (
                                <div key={plugin.slug} className="gv-card gv-gap-md gv-content-container gv-p-lg gv-grid gv-grid-cols-12 gv-radius">
                                    <div className="gv-desk-span-2 gv-span-3 gv-tab-span-3">
                                        <img className="gv-icon-tile" src={plugin.iconUrl || `${iconBase}add_box.svg`}
                                            alt={plugin.name} />
                                    </div>
                                    <div className="gv-desk-span-8 gv-tab-span-7 gv-span-7">
                                        <p className="gv-text-sm gv-text-bold gv-mb-xs">{plugin.name}</p>
                                        <p className="oc-card-content gv-mb-sm gv-text-sm"> {plugin.i18n.listingDescription || plugin.i18n.subtitle} </p>
                                      <span className="gv-caption-lg gv-text-bold">
                                        {price}
                                        {plugin.licenseType !== "free" && price && price !== freeLabel && <span className="gv-period">/mo</span>}
                                      </span>
                                    </div>
                                    <div className="gv-span-2 gv-content-center gv-text-right">
                                        <a
                                            href={`${getBaseUrl()}&plugin=${plugin.slug}`}
                                            className="gv-reset-button"
                                            style={{ display: "inline-block" }}
                                            aria-label={`View details for ${plugin.name}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedPlugin(plugin);
                                                const url = new URL(window.location.href);
                                                url.searchParams.set("plugin", plugin.slug);
                                                window.history.pushState({}, '', url.toString());
                                            }}
                                        >
                                            <img
                                                className="gv-tile"
                                                src={`${iconBase}arrow_forward.svg`}
                                                alt={`View ${plugin.name} details`}
                                                style={{ minWidth: "24px" }}
                                            />
                                        </a>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            ))}
            {/* Remove overlay render (keep for non-query usage) */}
            {selectedPlugin && !pluginFromQuery && (() => {
                const DetailComponent = shouldUseRankMathDetail(selectedPlugin) ? ProductDetailRankMath : ProductDetail;
                return (
                    <DetailComponent
                        plugin={selectedPlugin}
                        onClose={() => setSelectedPlugin(null)}
                    />
                );
            })()}
        </div>
    );
}
