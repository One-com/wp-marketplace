import React, { useState, useEffect } from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import { trackPluginAction, trackButtonClick } from "../utils/mixpanelTracking";
import { getPluginRedirectUrl, navigateToPluginUrl } from "../utils/redirectUrlHelper";

/**
 * Extracts price data from a plugin object for the subscription API.
 * Supports both new prices array format and legacy priceAmount/priceCurrency.
 */
const getPluginPriceData = (plugin) => {
    // New format: prices array
    if (plugin.prices && Array.isArray(plugin.prices) && plugin.prices.length > 0) {
        // Prefer full price type, then any active price, then first price
        let price = plugin.prices.find(p => p.priceType === 'full' && (p.isActive === true || p.isActive === undefined));
        if (!price) {
            price = plugin.prices.find(p => p.isActive === true);
        }
        if (!price) {
            price = plugin.prices[0];
        }
        return {
            amount: price.amount,
            currency: price.currency,
            period: price.period || 'month',
        };
    }

    // Legacy format
    return {
        amount: plugin.priceAmount,
        currency: plugin.priceCurrency,
        period: 'month',
    };
};

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

    const [buyNowLoading, setBuyNowLoading] = useState(false);

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
        handlePluginAction(action, plugin, 'product_detail');
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

    const handleBuyNowClick = async () => {
        trackButtonClick({
            buttonName: 'Buy now',
            buttonAction: 'buy_now',
            plugin: plugin,
        });

        setBuyNowLoading(true);

        const priceData = getPluginPriceData(plugin);

        // TODO: Replace staging URL with config api_url when ready
        const subscriptionUrl = 'https://wp-marketplace-staging.g1i.one/api/v1.0/subscriptions';

        try {
            const response = await fetch(subscriptionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    partnersCustomersId: 'grn:groupone:rankmath:rankmath.com:user:1857972',
                    productId: plugin.productId,
                    priceAmount: priceData.amount,
                    priceCurrency: priceData.currency,
                    pricePeriod: priceData.period,
                }),
            });

            const result = await response.json();

            if (result.redirectUrl) {
                window.location.href = result.redirectUrl;
            }

            trackButtonClick({
                buttonName: 'Buy now',
                buttonAction: 'buy_now',
                plugin: plugin,
                context: {
                    result: response.ok ? 'success' : 'error',
                },
            });
        } catch (error) {
            console.error('Buy now subscription request failed', error);

            trackButtonClick({
                buttonName: 'Buy now',
                buttonAction: 'buy_now',
                plugin: plugin,
                context: {
                    result: 'error',
                    error_message: error.message || 'Network error',
                },
            });
        } finally {
            setBuyNowLoading(false);
        }
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
                has_onboarding_url: !!(plugin.onboardingUrl && plugin.onboardingUrl.trim() !== ''),
            }
        });

        const redirectUrl = getPluginRedirectUrl(plugin, false);
        navigateToPluginUrl(redirectUrl);
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

    // Check if we should show "Buy now" button for premium plugins on non-onecom brands
    const shouldShowBuyNow = !isOnecomBrand && plugin.licenseType === "premium" && !plugin.installed;

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
            ) : shouldShowBuyNow ? (
                <button
                    type="button"
                    className="gv-button gv-button-primary"
                    disabled={buyNowLoading}
                    onClick={handleBuyNowClick}
                >
                    {buyNowLoading ? (uiI18n?.notifications?.processing || 'Processing...') : (uiI18n?.buyNowButton || 'Buy now')}
                </button>
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
