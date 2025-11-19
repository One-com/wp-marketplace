import React, { useState, useEffect } from "react";
import { useMarketplace } from "../context/MarketplaceContext";

export default function PluginActions({ plugin }) {
    const {
        pluginInAction,
        subscriptionStatus,
        isCheckingSubscription,
        isOnecomBrand,
        handlePluginAction
    } = useMarketplace();

    const isSpecialPlugin = plugin.slug === "wp-rocket" || plugin.slug === "rank-math-pro";
    
    // Get subscription status for this plugin from context
    const pluginSubscriptionStatus = subscriptionStatus[plugin.slug];
    const pluginIsCheckingSubscription = isCheckingSubscription[plugin.slug];

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
                        className="gv-button gv-button-secondary"
                        disabled={pluginInAction[plugin.slug]}
                        onClick={() => handleClick("deactivate")}
                    >
                        {pluginInAction[plugin.slug]
                            ? (marketplaceConfig?.labels?.deactivating || 'Deactivating...')
                            : (marketplaceConfig?.labels?.deactivate || 'Deactivate')}
                    </button>
                ) : (
                    <button
                        className="gv-button gv-button-primary"
                        disabled={pluginInAction[plugin.slug]}
                        onClick={() => handleClick("activate")}
                    >
                        {pluginInAction[plugin.slug]
                            ? (marketplaceConfig?.labels?.activating || 'Activating...')
                            : (marketplaceConfig?.labels?.activate || 'Activate')}
                    </button>
                )
            ) : (
                <button
                    className="gv-button gv-button-secondary"
                    disabled={pluginInAction[plugin.slug]}
                    onClick={() => handleClick("install")}
                >
                    {pluginInAction[plugin.slug]
                        ? (marketplaceConfig?.labels?.installing || 'Installing...')
                        : (marketplaceConfig?.labels?.install || 'Install')}
                </button>
            )}
        </div>
    );
}