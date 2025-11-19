import React, { useState, useEffect, useRef } from "react";
import {normalizePlugins} from "./normalised-plugins";
import "@group.one/gravity";
import { useTranslation } from "react-i18next";
import ProductDetail from "./ProductDetail";
import ProductDetailRankMath from "./ProductDetailRankMath";
import { useMarketplace } from "../context/MarketplaceContext";

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
        handlePluginAction
    } = useMarketplace();

    const [loading, setLoading] = useState(true);
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
        }
    }, [pluginFromQuery, plugins]);
    
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
                const normalized = normalizePlugins(json);
                setPlugins(normalized);

                // Fetch subscription status for special plugins (wp-rocket, rank-math-pro)
                if (isOnecomBrand) {
                    const specialPlugins = normalized.filter(p => 
                        p.slug === "wp-rocket" || p.slug === "rank-math-pro"
                    );
                    
                    // Fetch subscription status for each special plugin
                    specialPlugins.forEach(plugin => {
                        fetchSubscriptionStatus(plugin.slug);
                    });
                }
            } catch (e) {
                console.error("Failed to fetch plugins", e);
            } finally {
                setLoading(false);
            }
        }

        fetchPlugins();
    }, [apiBaseUrl, isOnecomBrand, fetchSubscriptionStatus, setPlugins]);

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
        const isRankMathPlugin = plugin.slug === "rank-math-pro" || plugin.slug === "seo-by-rank-math";
        return isOnecomBrand && isRankMathPlugin;
    };

    if (loading) return <p>Loading plugins...</p>;

    // Early return: show full page detail instead of list
    if (selectedPlugin && pluginFromQuery) {
        const DetailComponent = shouldUseRankMathDetail(selectedPlugin) ? ProductDetailRankMath : ProductDetail;
        return (
            <DetailComponent
                plugin={selectedPlugin}
                onClose={() => {
                    // Return to listing (clear selection and URL)
                    setSelectedPlugin(null);
                    window.location.href = getBaseUrl();
                }}
                usePortal={false}
            />
        );
    }

    // Group plugins by a single, specific category (first category), avoid duplicates across headings
    const categoryMap = new Map();

    // Deduplicate plugins by slug first (in case backend/normalizer still returns duplicates)
    const bySlug = new Map();
    plugins.forEach((p) => {
        if (!bySlug.has(p.slug)) bySlug.set(p.slug, p);
    });

    Array.from(bySlug.values()).forEach((p) => {
        const primary = Array.isArray(p.categories) && p.categories.length ? String(p.categories[0]) : "Others";
        if (!categoryMap.has(primary)) categoryMap.set(primary, []);
        categoryMap.get(primary).push(p);
    });

    const categories = Array.from(categoryMap.entries());

    return (
        <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg gv-mt-fluid">
            {categories.map(([cat, list]) => (
                <section key={cat} className="category-section">
                    <h2 className="gv-heading-md gv-mb-sm">{cat}</h2>
                    <p>A range of versatile plugins to enhance your WordPress experience and add new functionality with ease.</p>
                     { /* description && <p>{description}</p> */ } 
                    <div className="product-grid gv-grid gv-gap-lg gv-tab-grid-cols-1 gv-desk-grid-cols-3 gv-mt-lg gv-max-mob-mb-lg gv-max-mob-pb-lg">
                        {list.map((plugin) => (
                            <div key={plugin.slug} className="gv-card gv-gap-md gv-content-container gv-p-lg gv-grid gv-grid-cols-12">
                                <div className="gv-span-2">
                                    <img className="gv-tile" src={`${iconBase}add_box.svg`}
                                        alt={plugin.name} />
                                </div>
                                <div className="gv-span-9">
                                    <p className="gv-text-lg">{plugin.name}</p>
                                    <p className="oc-card-content"> {plugin.description ? plugin.description : plugin.shortDescription} </p>
                                    <span className="gv-text-sm">{plugin.priceCurrency} {plugin.priceAmount}</span>
                                </div>
                                <div className="gv-span-1">
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
                        ))}
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