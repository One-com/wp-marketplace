import React, { useState, useEffect, useRef } from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import { trackPluginAction, trackButtonClick, trackEvent } from "../utils/mixpanelTracking";
import { getPluginRedirectUrl, navigateToPluginUrl } from "../utils/redirectUrlHelper";
import { startPolling } from "../utils/pollingHelper";
import { getAjaxAction } from "../utils/common.utils";
import { formatDate } from "../utils/dateFormatter";
import PurchaseModal from "./PurchaseModal";

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

/** Terminal status that means the procurement succeeded and a license was issued. */
const SUBSCRIPTION_SUCCESS_STATUSES = ['active'];

export default function PluginActions({ plugin }) {
    const {
        assetsBaseUrl,
        pluginInAction,
        subscriptionStatus,
        isCheckingSubscription,
        isOnecomBrand,
        handlePluginAction,
        uiI18n,
        isSpecialPlugin,
        setErrorState,
        wpConfig,
        pendingProcurements,
        setPendingProcurements,
        setLoadingAction,
        setLoadingPlugin,
        subscriptionsList,
        fetchPartnerSubscriptions,
    } = useMarketplace();

    const [buyNowLoading, setBuyNowLoading] = useState(false);
    const [subscriptionDates, setSubscriptionDates] = useState(null);
    const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
    const pollingIntervalRef = useRef(null);

    // Get subscription status for this plugin from context
    const pluginSubscriptionStatus = subscriptionStatus[plugin.slug];
    const pluginIsCheckingSubscription = isCheckingSubscription[plugin.slug];
    const assetBase = assetsBaseUrl || (typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl) || "";
    const iconBase = assetBase ? `${assetBase}assets/` : "";

    // Whether this plugin can have a subscription (premium on non-onecom brands).
    // Used for subscription date display — does NOT require plugin to be uninstalled.
    const isPremiumOnNonOnecom = !isOnecomBrand && plugin.licenseType === "premium";

    // Find existing subscription for this plugin's productId — if present, user already owns it.
    // Includes 'canceled' status because the subscription may still have remaining days before expiry.
    // Includes 'pending_cancellation' because the subscription is still valid until the backend
    // confirms the cancellation — the user should still be able to install during this window.
    // Once expired, the API stops returning it in the list entirely.
    const activeSubscription = isPremiumOnNonOnecom && plugin.productId && subscriptionsList?.length
        ? subscriptionsList.find(
            s => s.productId === plugin.productId && (s.status === 'active' || s.status === 'canceled' || s.status === 'pending_cancellation') && s.accessDetails?.downloadUrl
        )
        : null;

    // Check if we should show "Buy now" button for premium plugins on non-onecom brands
    // Skip "Buy now" if user already has an active subscription with a download URL,
    // or if subscription dates are already known (e.g. cancellation in progress — keep showing the indicator)
    const shouldShowBuyNow = !isOnecomBrand && plugin.licenseType === "premium" && !plugin.installed && !activeSubscription && !subscriptionDates;

    // Helper function to replace {0} with plugin name
    const formatMessage = (message, pluginName) => {
        if (!message) return '';
        return message.replace('{0}', pluginName || '');
    };

    const pluginName = plugin?.name || '';

    /**
     * Start polling wp-marketplace-track-status for a subscription procurement.
     * Uses the generic startPolling utility so the same pattern can be reused
     * for other tracking operations (e.g. cancellation).
     *
     * @param {string} slug           Plugin slug (used for DB clear + local state key).
     * @param {string} subscriptionId Procurement / subscription ID to track.
     */
    /** Fire-and-forget: acknowledge successful plugin download/installation to the API. */
    const acknowledgePluginDownload = (subscriptionId) => {
        const ajaxUrl = wpConfig?.ajaxUrl;
        if (!ajaxUrl) return;
        fetch(ajaxUrl, {
            method: 'POST',
            body: new URLSearchParams({
                action: getAjaxAction('track_status'),
                nonce: wpConfig.nonce,
                resourceType: 'acknowledge-plugin-download',
                subscriptionId: subscriptionId || '',
            }),
        });
    };

    /** Fire-and-forget: delete the server-side subscription list transient. */
    const clearSubscriptionListCache = () => {
        const ajaxUrl = wpConfig?.ajaxUrl;
        if (!ajaxUrl) return;
        fetch(ajaxUrl, {
            method: 'POST',
            body: new URLSearchParams({
                action: getAjaxAction('clear_subscription_list'),
                nonce: wpConfig.nonce,
            }),
        });
    };

    const startSubscriptionPolling = (slug, subscriptionId) => {
        // Stop any in-flight polling for this component before starting a new one
        if (pollingIntervalRef.current) {
            pollingIntervalRef.current();
        }

        const ajaxUrl = wpConfig?.ajaxUrl;
        if (!ajaxUrl || !subscriptionId) return;

        pollingIntervalRef.current = startPolling({
            ajaxUrl,
            nonce: wpConfig.nonce,
            action: getAjaxAction('track_status'),
            params: { subscriptionId },
            interval: 10000,
            onResult: async (result) => {
                if (!result.success) return false; // keep polling

                // WP AJAX wraps external response: result.data = external API response
                // External response shape: { error, success, data: { type, id, status, license: { provisionedAt, expiresAt, accessDetails: { downloadUrl } } } }
                const procurementData = result?.data?.data;
                const status = procurementData?.status;

                // Stop and show error if the response doesn't have the expected shape
                // (e.g. {"success":true,"data":{"message":"Not Found"}})
                if (!procurementData || !status) {
                    setErrorState({ visible: true, type: 'buy_now', pluginSlug: slug, message: result?.error || result?.data?.message || result?.data?.error || null });
                    fetch(ajaxUrl, {
                        method: 'POST',
                        body: new URLSearchParams({
                            action: getAjaxAction('clear_pending_procurement'),
                            nonce: wpConfig.nonce,
                            slug,
                        }),
                    });
                    setPendingProcurements(prev => {
                        const next = { ...prev };
                        delete next[slug];
                        return next;
                    });
                    return true; // stop polling
                }

                if (SUBSCRIPTION_SUCCESS_STATUSES.includes(status)) {
                    const license = procurementData?.license;
                    const downloadUrl = license?.accessDetails?.downloadUrl;

                    // Show subscription dates — replaces the "processing" message
                    setSubscriptionDates({
                        provisionedAt: license?.provisionedAt || null,
                        expiresAt: license?.expiresAt || null,
                        status: 'active',
                    });

                    // Clear DB entry and local pending state
                    fetch(ajaxUrl, {
                        method: 'POST',
                        body: new URLSearchParams({
                            action: getAjaxAction('clear_pending_procurement'),
                            nonce: wpConfig.nonce,
                            slug,
                        }),
                    });
                    setPendingProcurements(prev => {
                        const next = { ...prev };
                        delete next[slug];
                        return next;
                    });

                    // Clear subscription list cache so addons page shows fresh status
                    clearSubscriptionListCache();

                    if (downloadUrl) {
                        // Track procurement success — fires once when the partner API
                        // returns an active status with a downloadUrl, before the
                        // automatic install attempt.
                        const priceData = getPluginPriceData(plugin);
                        trackEvent('Purchase completed', {
                            product_slug: plugin.slug || '',
                            product_name: plugin.name || '',
                            item_name: plugin.slug || '',
                            subscription_id: subscriptionId,
                            amount: priceData.amount,
                            currency: priceData.currency,
                            period: priceData.period,
                            provisioned_at: license?.provisionedAt || null,
                            expires_at: license?.expiresAt || null,
                            timestamp: Date.now(),
                        });

                        const installed = await handlePluginAction('install', { ...plugin, download: downloadUrl }, 'buy_now');
                        if (installed) {
                            acknowledgePluginDownload(subscriptionId);
                            // Tracks automatic plugin install after successful purchase via polling
                            trackPluginAction({ action: 'install', plugin, result: 'success' });
                        }
                    }

                    // Refetch subscriptions so addons page reflects the active subscription
                    fetchPartnerSubscriptions();

                    return true; // stop polling
                }

                if (status === 'not_found') {
                    setErrorState({ visible: true, type: 'buy_now', pluginSlug: slug, message: result?.error || result?.data?.message || result?.data?.error || null });

                    // Clean up DB entry and local state
                    fetch(ajaxUrl, {
                        method: 'POST',
                        body: new URLSearchParams({
                            action: getAjaxAction('clear_pending_procurement'),
                            nonce: wpConfig.nonce,
                            slug,
                        }),
                    });
                    setPendingProcurements(prev => {
                        const next = { ...prev };
                        delete next[slug];
                        return next;
                    });

                    return true; // stop polling
                }

                return false; // 'pending' — keep polling
            },
            onError: (error) => console.error('[Marketplace] Polling error', error),
        });
    };

    // On mount: resume polling for any pending procurement, and fetch subscription dates
    useEffect(() => {
        const pending = pendingProcurements?.[plugin.slug];
        if (pending?.subscriptionId) {
            startSubscriptionPolling(plugin.slug, pending.subscriptionId);
        }

        // Fetch subscription list to populate dates on page reload (only for premium plugins on non-onecom brands)
        if (isPremiumOnNonOnecom && !subscriptionsList?.length) {
            fetchPartnerSubscriptions();
        }

        return () => {
            if (pollingIntervalRef.current) {
                pollingIntervalRef.current(); // call the stop function
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Derive subscription dates from the list whenever it updates (covers page reload case).
    // 'pending_cancellation' is treated as 'active' for display — the indicator only flips to
    // 'Subscription canceled' once the backend confirms the cancellation with status 'canceled'.
    useEffect(() => {
        if (!isPremiumOnNonOnecom || !plugin.productId || !subscriptionsList?.length) return;
        const match = subscriptionsList.find(
            s => s.productId === plugin.productId && (s.status === 'active' || s.status === 'canceled' || s.status === 'pending_cancellation')
        );
        if (match) {
            setSubscriptionDates({
                provisionedAt: match.provisionedAt || null,
                expiresAt: match.expiresAt || null,
                status: match.status === 'canceled' ? 'canceled' : 'active',
            });
        }
    }, [subscriptionsList]); // eslint-disable-line react-hooks/exhaustive-deps

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

        // If installing a premium plugin with an active subscription, use the subscription's download URL
        if (action === 'install' && activeSubscription?.accessDetails?.downloadUrl) {
            handlePluginAction('install', { ...plugin, download: activeSubscription.accessDetails.downloadUrl }, 'product_detail');
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

    // Tracks "Buy now" button click that opens the purchase confirmation modal
    const handleOpenPurchaseModal = () => {
        trackButtonClick({
            buttonName: 'Buy now',
            buttonAction: 'product_buy',
            plugin: plugin,
            context: { action: 'buy' },
        });
        setPurchaseModalOpen(true);
    };

    const handleBuyNowClick = async () => {
        // Tracks "Buy now" click inside the purchase confirmation modal
        trackButtonClick({
            buttonName: 'Buy now',
            buttonAction: 'product_buy_confirmation',
            plugin: plugin,
            context: { action: 'buy' },
        });

        setBuyNowLoading(true);
        setLoadingAction(formatMessage(uiI18n?.notifications?.processing || 'Purchase in progress, please wait while your payment is processing.', pluginName));
        setLoadingPlugin('');

        const priceData = getPluginPriceData(plugin);

        // Proxy through WordPress AJAX to avoid CORS and keep API key server-side
        const ajaxUrl = wpConfig?.ajaxUrl;
        if (!ajaxUrl) {
            setBuyNowLoading(false);
            setLoadingAction('');
            return;
        }

        try {
            const formData = new URLSearchParams({
                action: getAjaxAction('subscribe'),
                nonce: wpConfig.nonce,
                productId: plugin.productId || '',
                priceAmount: priceData.amount || '',
                priceCurrency: priceData.currency || '',
                pricePeriod: priceData.period || '',
            });

            const response = await fetch(ajaxUrl, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!result.success) {
                trackButtonClick({
                    buttonName: 'Buy now',
                    buttonAction: 'buy_now',
                    plugin: plugin,
                    context: { result: 'error', error_message: result.data?.message || 'Subscription failed' },
                });
                setErrorState({ visible: true, type: 'buy_now', pluginSlug: plugin.slug, message: result?.error || result?.error || result?.data?.message || result?.data?.error || null });
                setBuyNowLoading(false);
                setLoadingAction('');
                return;
            }

            // External API response: result.data = {error, success, data: {status, subscriptionId, productId}}
            const innerData = result?.data?.data;
            const status = innerData?.status;
            const subscriptionId = innerData?.subscriptionId;

            trackButtonClick({
                buttonName: 'Buy now',
                buttonAction: 'buy_now',
                plugin: plugin,
                context: {
                    result: SUBSCRIPTION_SUCCESS_STATUSES.includes(status) ? 'procurement_success' : 'procurement_pending',
                    subscription_id: subscriptionId,
                    status: status,
                },
            });

            if (SUBSCRIPTION_SUCCESS_STATUSES.includes(status)) {
                // Subscription immediately active/created — install using download URL
                const license = innerData?.license;
                const downloadUrl = license?.accessDetails?.downloadUrl;
                setSubscriptionDates({
                    provisionedAt: license?.provisionedAt || null,
                    expiresAt: license?.expiresAt || null,
                    status: 'active',
                });
                setBuyNowLoading(false);
                setLoadingAction('');
                if (downloadUrl) {
                    const installed = await handlePluginAction('install', { ...plugin, download: downloadUrl }, 'buy_now');
                    if (installed) {
                        acknowledgePluginDownload(subscriptionId);
                        // Tracks automatic plugin install after immediate purchase success
                        trackPluginAction({ action: 'install', plugin, result: 'success' });
                    }
                }
            } else if ((status === 'pending' || status === 'pending_provisioning') && subscriptionId) {
                // Clear subscription list cache — external API will now include this
                // subscription as pending, so next addons page load shows it immediately
                clearSubscriptionListCache();

                // Save pending procurement to DB
                const saveProcurementData = new URLSearchParams({
                    action: getAjaxAction('save_pending_procurement'),
                    nonce: wpConfig.nonce,
                    slug: plugin.slug,
                    subscriptionId: subscriptionId,
                    product_id: innerData?.productId || plugin.productId || '',
                });
                // Fire and forget — UI updates immediately via local state
                fetch(ajaxUrl, { method: 'POST', body: saveProcurementData });

                setPendingProcurements(prev => ({
                    ...prev,
                    [plugin.slug]: {
                        subscriptionId: subscriptionId,
                        product_id: innerData?.productId || plugin.productId,
                        timestamp: Math.floor(Date.now() / 1000),
                    },
                }));

                setBuyNowLoading(false);
                setLoadingAction('');

                // Start polling for status updates
                startSubscriptionPolling(plugin.slug, subscriptionId);
            } else {
                setBuyNowLoading(false);
                setLoadingAction('');
            }
        } catch (error) {
            console.error('Buy now subscription request failed', error);
            trackButtonClick({
                buttonName: 'Buy now',
                buttonAction: 'buy_now',
                plugin: plugin,
                context: { result: 'error', error_message: error.message || 'Network error' },
            });
            setErrorState({ visible: true, type: 'buy_now', pluginSlug: plugin.slug, message: error.message || null });
            setBuyNowLoading(false);
            setLoadingAction('');
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

    // Check if we should show "Select" button instead of install/activate
    const shouldShowSelectButton = isOnecomBrand && isSpecialPlugin(plugin.slug) && !plugin.installed && pluginSubscriptionStatus === false;

    // Check if we should show skeleton loader (while checking subscription for special plugins)
    // Show skeleton if: checking OR status is undefined (not yet fetched)
    const shouldShowSkeleton = isOnecomBrand && isSpecialPlugin(plugin.slug) && !plugin.installed &&
        (pluginIsCheckingSubscription || pluginSubscriptionStatus === undefined);

    // Check if there's a pending procurement for this plugin (persisted across page loads)
    const isPendingProcurement = !!pendingProcurements?.[plugin.slug];

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
                        disabled={!!pluginInAction[plugin.slug]}
                        onClick={() => handleClick("activate")}
                    >
                        {pluginInAction[plugin.slug]
                            ? formatMessage(
                                pluginInAction[plugin.slug] === 'install'
                                    ? (uiI18n?.notifications?.installing || 'Installing {0}')
                                    : (uiI18n?.notifications?.activating || 'Activating {0}'),
                                pluginName)
                            : (uiI18n?.activateButton || plugin.i18n?.activateButton || 'Activate')}
                    </button>
                )
            ) : shouldShowBuyNow ? (
                <button
                    type="button"
                    className="gv-button gv-button-primary"
                    disabled={buyNowLoading || !!pluginInAction[plugin.slug] || isPendingProcurement}
                    onClick={handleOpenPurchaseModal}
                >
                    {(buyNowLoading || !!pluginInAction[plugin.slug] || isPendingProcurement) ? (
                      <>
                        <span class="gv-mr-sm">{uiI18n?.labels?.processing || 'Processing'}</span>
                        <gv-loader class="gv-mode-condensed"
                                   src={`${assetBase}assets/images/spinner.svg`}></gv-loader>

                      </>
                    ) : (uiI18n?.labels?.buyNowButton || 'Buy Now')}
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
            {isPremiumOnNonOnecom && (isPendingProcurement ? (
                <div className="gv-text-indicator gv-mt-sm">
                    <div className="gv-indicator gv-state-positive"></div>
                    <span style={{whiteSpace:'normal'}}>{uiI18n?.notifications?.procurementPending || 'Payment successful. The plugin will be available for installation shortly.'}</span>
                </div>
            ) : !shouldShowBuyNow && subscriptionDates ? (
                <div className="gv-mt-sm">
                    {subscriptionDates.expiresAt && (() => {
                        const adminUrl = (typeof window !== 'undefined' && window.marketplaceConfig?.wpConfig?.adminUrl) || '/wp-admin/';
                        const addonsMenuSlug = (typeof window !== 'undefined' && window.marketplaceConfig?.addonsMenuSlug) || 'onecom-marketplace-products';
                        const addonsUrl = `${adminUrl}admin.php?page=${addonsMenuSlug}`;
                        const manageLabel = uiI18n?.labels?.manageYourAddons || 'Manage your addons';
                        return subscriptionDates.status === 'canceled' ? (
                            <div className="gv-text-indicator">
                                <div className="gv-indicator gv-state-attention"></div>
                                <span style={{whiteSpace:'normal'}}>{uiI18n?.labels?.subscriptionCanceled || 'Subscription cancelled'}. <a href={addonsUrl}>{manageLabel}</a></span>
                            </div>
                        ) : (
                            <div className="gv-text-indicator">
                                <div className="gv-indicator gv-state-positive"></div>
                                <span style={{whiteSpace:'normal'}}>{uiI18n?.labels?.subscriptionActive || 'Subscription active'}. <a href={addonsUrl}>{manageLabel}</a></span>
                            </div>
                        );
                    })()}
                </div>
            ) : null)}
            <PurchaseModal
                isOpen={purchaseModalOpen}
                plugin={plugin}
                uiI18n={uiI18n}
                assetsBaseUrl={assetBase}
                onClose={() => setPurchaseModalOpen(false)}
                onPurchase={() => {
                    setPurchaseModalOpen(false);
                    handleBuyNowClick();
                }}
            />
        </div>
    );
}
