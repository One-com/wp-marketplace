import React, { useState, useEffect, useRef } from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import { formatPluginPrice, getRebatePrice, getFullPrice } from "../utils/priceFormatter";
import ProductDetail from "./ProductDetail";
import ProductDetailRankMath from "./ProductDetailRankMath";

export default function Addons() {
    const {
        apiBaseUrl,
        assetsBaseUrl,
        pluginInAction,
        setPluginInAction,
        plugins,
        setPlugins,
        uiI18n,
        setUiI18n,
        handlePluginAction,
        catalogError,
        setCatalogError,
        catalogLoading,
        setCatalogLoading
    } = useMarketplace();

    const [selectedPlugin, setSelectedPlugin] = useState(null);
    const [featuredPlugins, setFeaturedPlugins] = useState([]);

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

    // Fetch plugins from API
    useEffect(() => {
        if (hasFetchedPlugins.current) return;
        hasFetchedPlugins.current = true;

        setCatalogLoading(true);
        setCatalogError(null);

        fetch(apiBaseUrl)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                if (data.success && data.data && data.data.catalog) {
                    const allPlugins = data.data.catalog;
                    setPlugins(allPlugins);

                    // Filter featured plugins and get top 4
                    const featured = allPlugins
                        .filter(plugin => plugin.featured === true || plugin.featured === "true")
                        .slice(0, 4);

                    setFeaturedPlugins(featured);

                    // Set UI i18n if available
                    if (data.data.ui_i18n) {
                        setUiI18n(data.data.ui_i18n);
                    }
                } else {
                    throw new Error("Invalid API response structure");
                }
            })
            .catch((err) => {
                console.error("Failed to fetch plugins:", err);
                setCatalogError(err.message || "Failed to load plugins");
            })
            .finally(() => {
                setCatalogLoading(false);
            });
    }, [apiBaseUrl, setPlugins, setUiI18n, setCatalogError, setCatalogLoading]);

    // After plugins load, select plugin from query if present
    useEffect(() => {
        if (pluginFromQuery && plugins.length) {
            const match = plugins.find(p => p.slug === pluginFromQuery);
            if (match) setSelectedPlugin(match);
        } else if (!pluginFromQuery) {
            setSelectedPlugin(null);
        }
    }, [pluginFromQuery, plugins]);

    // Listen for browser back/forward navigation
    useEffect(() => {
        const handlePopState = () => {
            const currentPluginParam = new URLSearchParams(window.location.search).get("plugin");
            if (!currentPluginParam) {
                setSelectedPlugin(null);
            } else if (plugins.length) {
                const match = plugins.find(p => p.slug === currentPluginParam);
                if (match) setSelectedPlugin(match);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [plugins]);

    // Determine which detail component to use
    const shouldUseRankMathDetail = (plugin) => {
        return plugin && plugin.slug === 'seo-by-rank-math';
    };

    // Show loading state
    if (catalogLoading) {
        return (
            <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg gv-p-fluid">
                <div className="gv-text-center">
                    <p className="gv-text-md">{uiI18n?.text?.loading || 'Loading...'}</p>
                </div>
                <div className="product-grid gv-grid gv-gap-lg gv-mob-grid-cols-1 gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3">
                    {[0, 1, 2, 3].map((index) => (
                        <div key={index} className="gv-card gv-gap-md gv-content-container gv-p-lg gv-grid gv-grid-cols-12 gv-radius">
                            <div className="gv-desk-span-2 gv-span-3 gv-tab-span-3">
                                <div className="gv-skeleton gv-icon-tile"></div>
                            </div>
                            <div className="gv-desk-span-8 gv-tab-span-7 gv-span-7">
                                <div className="gv-skeleton gv-mb-xs" style={{ height: '20px', width: '70%' }}></div>
                                <div className="gv-skeleton gv-mb-sm" style={{ height: '16px', width: '100%' }}></div>
                                <div className="gv-skeleton" style={{ height: '16px', width: '40%' }}></div>
                            </div>
                            <div className="gv-span-2 gv-content-center gv-text-right">
                                <div className="gv-skeleton" style={{ height: '24px', width: '24px' }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Show error state
    if (catalogError) {
        return (
            <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg gv-items-center gv-justify-center gv-p-fluid">
                <div className="gv-text-center">
                    <h5 className="gv-header-md gv-mb-sm">{uiI18n?.notifications?.errorTitle || 'Error'}</h5>
                    <p className="gv-text-md gv-mb-lg">{catalogError}</p>
                </div>
            </div>
        );
    }

    // Show empty state if no featured plugins
    if (featuredPlugins.length === 0) {
        return (
            <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg gv-items-center gv-justify-center gv-p-fluid">
                <div className="gv-text-center">
                    <h5 className="gv-header-md gv-mb-sm">{uiI18n?.notifications?.noFeaturedPlugins || 'No Featured Plugins'}</h5>
                    <p className="gv-text-md">{uiI18n?.text?.noFeaturedPluginsDescription || 'There are no featured plugins available at the moment.'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg">
            <section className="addons-section">
                <h2 className="gv-text-bold gv-text-xl gv-mb-xs">Featured Plugins</h2>
                <p className="gv-text-sm gv-mb-md">Discover our top recommended plugins to enhance your website.</p>
                <div className="product-grid gv-grid gv-gap-lg gv-mob-grid-cols-1 gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3 gv-mt-md">
                    {featuredPlugins.map((plugin) => {
                        const freeLabel = (plugin.i18n.freeTrialPeriod && plugin.i18n.freeTrialPeriod.trim() !== '')
                            ? plugin.i18n.freeTrialPeriod
                            : (uiI18n?.labels?.free || 'Free');
                        const price = formatPluginPrice(plugin, freeLabel, uiI18n);
                        const fullPriceAmount = getFullPrice(plugin);
                        const rebatePriceAmount = getRebatePrice(plugin);

                        return (
                            <div key={plugin.slug} className="gv-card gv-gap-md gv-content-container gv-p-lg gv-grid gv-grid-cols-12 gv-radius">
                                <div className="gv-desk-span-2 gv-span-3 gv-tab-span-3">
                                    <img
                                        className="gv-icon-tile"
                                        src={plugin.iconUrl || `${iconBase}add_box.svg`}
                                        alt={plugin.name}
                                    />
                                </div>
                                <div className="gv-desk-span-8 gv-tab-span-7 gv-span-7">
                                    <p className="gv-text-sm gv-text-bold gv-mb-xs">{plugin.name}</p>
                                    <p className="oc-card-content gv-text-on-alternative gv-mb-sm gv-text-sm">
                                        {plugin.i18n.listingDescription || plugin.i18n.subtitle}
                                    </p>
                                    <span className="gv-caption-lg gv-text-bold">
                                        {plugin.licenseType === "premium" && (rebatePriceAmount > 0)
                                            ? (rebatePriceAmount !== null ? rebatePriceAmount : fullPriceAmount)
                                            : price}
                                        {plugin.licenseType !== "free" &&
                                         price &&
                                         price !== freeLabel &&
                                         price !== (uiI18n?.labels?.freeUntilRenewal || 'Free until renewal') &&
                                         <span className="gv-period">/{uiI18n?.labels?.timeMonth}</span>}
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

            {/* Render detail overlay when plugin is selected */}
            {selectedPlugin && !pluginFromQuery && (() => {
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
