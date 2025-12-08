import React, { useState, useEffect } from "react";
import { useMarketplace } from "../context/MarketplaceContext";

export default function PluginActions({ plugin }) {
    const {
        assetsBaseUrl,
        pluginInAction,
        subscriptionStatus,
        isCheckingSubscription,
        isOnecomBrand,
        handlePluginAction,
        uiI18n
    } = useMarketplace();

    const isSpecialPlugin = plugin.slug === "wp-rocket" || plugin.slug === "seo-by-rank-math-pro";

    // Get subscription status for this plugin from context
    const pluginSubscriptionStatus = subscriptionStatus[plugin.slug];
    const pluginIsCheckingSubscription = isCheckingSubscription[plugin.slug];
    const assetBase = assetsBaseUrl || (typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl) || "";
    const iconBase = assetBase ? `${assetBase}assets/` : "";
    const handleClick = (action) => {
        // Check if brand is onecom, plugin is not installed, and slug is wp-rocket or rank-math-pro
        const isNotInstalled = !plugin.installed;

        if (isOnecomBrand && isSpecialPlugin && isNotInstalled && action === "install") {
            // Dispatch custom event instead of calling handlePluginAction
            const event = new CustomEvent("onecom-plugin-provision", {
                detail: {
                    slug: plugin.slug,
                },
                bubbles: true,
                cancelable: true,
                composed: true
            });
            // Dispatch on document so listeners using document.addEventListener receive it
            document.dispatchEvent(event);
            return;
        }

        // Default behavior
        handlePluginAction(action, plugin);
    };

    const handleSelectClick = () => {
        // Dispatch custom event for provisioning
        const event = new CustomEvent("onecom-subscribe-addon", {
            detail: { slug: plugin.slug },
            bubbles: true,
            cancelable: true,
            composed: true
        });
        document.dispatchEvent(event);
    };

    const handleManage = () => {
        // Check if plugin has a redirectUrl from API response
        if (plugin.redirectUrl && plugin.redirectUrl.trim() !== '') {
            // Get the admin URL from config (provided by PHP)
            const adminUrl = typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.wpConfig?.adminUrl;

            if (adminUrl) {
                // Construct full URL using adminUrl from PHP config
                // adminUrl is like "https://example.com/wp-admin/"
                // redirectUrl comes as "wp-admin\/admin.php?page=termly" (JSON unescapes \/ to /)
                // Strip "wp-admin/" prefix from redirectUrl if present to avoid duplication
                let cleanPath = plugin.redirectUrl;
                if (cleanPath.startsWith('wp-admin/')) {
                    cleanPath = cleanPath.substring('wp-admin/'.length);
                }
                const fullUrl = `${adminUrl}${cleanPath}`;
                window.location.href = fullUrl;
            } else {
                // Fallback: use window.location.origin if adminUrl not available
                const siteUrl = window.location.origin;
                const fullUrl = `${siteUrl}/${plugin.redirectUrl}`;
                window.location.href = fullUrl;
            }
            return;
        }

        // Fallback to plugins page
        window.location.href = '/wp-admin/plugins.php';
    };

    // Check if we should show "Select" button instead of install/activate
    const shouldShowSelectButton = isOnecomBrand && isSpecialPlugin && !plugin.installed && pluginSubscriptionStatus === false;

    // Check if we should show skeleton loader (while checking subscription for special plugins)
    // Show skeleton if: checking OR status is undefined (not yet fetched)
    const shouldShowSkeleton = isOnecomBrand && isSpecialPlugin && !plugin.installed &&
        (pluginIsCheckingSubscription || pluginSubscriptionStatus === undefined);

    return (
        <div className="plugin-actions gv-mt-md">
            {shouldShowSkeleton ? (
                <div className="gv-skeleton gv-heading-md"></div>
            ) : shouldShowSelectButton ? (
                <button
                    type="button"
                    className="gv-button gv-button-primary"
                    onClick={handleSelectClick}
                    disabled={pluginIsCheckingSubscription}
                >
                    Select
                </button>
            ) : plugin.installed ? (
                plugin.activated ? (
                    <button
                        type="button"
                        className="gv-button gv-button-primary"
                        onClick={handleManage}
                    >
                       <span>{uiI18n?.labels?.manage || 'Manage'}</span>
                        <gv-icon aria-hidden="true" src={`${iconBase}icons/arrow_right.svg`}></gv-icon>
                    </button>
                ) : (
                    <button
                        className="gv-button gv-button-primary"
                        disabled={pluginInAction[plugin.slug]}
                        onClick={() => handleClick("activate")}
                    >
                        {pluginInAction[plugin.slug]
                            ? (marketplaceConfig?.labels?.activating || 'Activating...')
                            : (uiI18n?.activateButton || plugin.i18n?.activateButton || 'Activate')}
                    </button>
                )
            ) : (
                <button
                    className={`gv-button ${plugin.slug === "seo-by-rank-math" ? "gv-button-secondary" : "gv-button-primary"}`}
                    disabled={pluginInAction[plugin.slug]}
                    onClick={() => handleClick("install")}
                >
                    {pluginInAction[plugin.slug]
                        ? (marketplaceConfig?.labels?.installing || 'Installing...')
                        : (uiI18n?.installButton || plugin.i18n?.installButton || 'Install')}
                </button>
            )}
        </div>
    );
}
