import React, { useState, useEffect } from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import { trackPluginAction, trackButtonClick } from "../utils/mixpanelTracking";

export default function PluginActions({ plugin }) {
    const {
        assetsBaseUrl,
        pluginInAction,
        subscriptionStatus,
        isCheckingSubscription,
        isOnecomBrand,
        handlePluginAction,
        uiI18n,
        isSpecialPlugin
    } = useMarketplace();

    // Get subscription status for this plugin from context
    const pluginSubscriptionStatus = subscriptionStatus[plugin.slug];
    const pluginIsCheckingSubscription = isCheckingSubscription[plugin.slug];
    const assetBase = assetsBaseUrl || (typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl) || "";
    const iconBase = assetBase ? `${assetBase}assets/` : "";
    const handleClick = (action) => {
        // Check if brand is onecom, plugin is not installed, and slug is wp-rocket or rank-math-pro
        const isNotInstalled = !plugin.installed;

        if (isOnecomBrand && isSpecialPlugin(plugin.slug) && isNotInstalled && action === "install") {
            // Track install event with result: initiated for special plugins
            trackButtonClick({
                buttonName: 'Install',
                buttonAction: 'product_install',
                plugin: plugin,
                context: {
                    action: action,
                    result: 'initiated',
                }
            });

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
        // Track the select button click
        trackButtonClick({
            buttonName: 'Select',
            buttonAction: 'subscribe_addon',
            plugin: plugin,
        });

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
        // Track the manage button click
        trackButtonClick({
            buttonName: 'Manage',
            buttonAction: 'manage_product',
            context: {
                product_slug: plugin.slug,
                product_name: plugin.name,
                has_redirect_url: !!(plugin.redirectUrl && plugin.redirectUrl.trim() !== ''),
            }
        });

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

    // Helper function to replace {0} with plugin name
    const formatMessage = (message, pluginName) => {
        if (!message) return '';
        return message.replace('{0}', pluginName || '');
    };

    const pluginName = plugin?.name || '';

    // Check if we should show "Select" button instead of install/activate
    const shouldShowSelectButton = isOnecomBrand && isSpecialPlugin(plugin.slug) && !plugin.installed && pluginSubscriptionStatus === false;

    // Check if we should show skeleton loader (while checking subscription for special plugins)
    // Show skeleton if: checking OR status is undefined (not yet fetched)
    const shouldShowSkeleton = isOnecomBrand && isSpecialPlugin(plugin.slug) && !plugin.installed &&
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
                            ? formatMessage(uiI18n?.notifications?.activating || 'Activating {0}', pluginName)
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
                        ? formatMessage(uiI18n?.notifications?.installing || 'Installing {0}', pluginName)
                        : (uiI18n?.installButton || plugin.i18n?.installButton || 'Install')}
                </button>
            )}
        </div>
    );
}
