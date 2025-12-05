import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const MarketplaceContext = createContext(null);

export const MarketplaceProvider = ({
    children,
    apiBaseUrl,
    useWPHandlers,
    wpConfig,
    enableDefaultStyles,
    assetsBaseUrl
}) => {
    const [pluginInAction, setPluginInAction] = useState({});
    const [subscriptionStatus, setSubscriptionStatus] = useState({});
    const [isCheckingSubscription, setIsCheckingSubscription] = useState({});
    const [plugins, setPlugins] = useState([]);
    const [uiI18n, setUiI18n] = useState({});
    const [loadingAction, setLoadingAction] = useState('');
    const [loadingPlugin, setLoadingPlugin] = useState('');
    const [noticeState, setNoticeState] = useState({ visible: false, type: null, pluginSlug: null });
    const [errorState, setErrorState] = useState({ visible: false, type: null, pluginSlug: null });
    const [allPluginsActivated, setAllPluginsActivated] = useState(false);

    // Use ref to track which subscriptions have been checked to avoid recreation of fetchSubscriptionStatus
    const checkedSubscriptionsRef = useRef({});

    const brand = typeof window !== "undefined" && window.marketplaceConfig?.brand;
    const isOnecomBrand = brand === "onecom";

    // Fetch subscription status for special plugins (wp-rocket, rank-math-pro)
    const fetchSubscriptionStatus = useCallback(async (pluginSlug) => {
        if (!isOnecomBrand) return;

        const isSpecialPlugin = pluginSlug === "wp-rocket" || pluginSlug === "seo-by-rank-math-pro";
        if (!isSpecialPlugin) return;

        // If already checked or checking, skip
        if (checkedSubscriptionsRef.current[pluginSlug]) {
            return;
        }

        // Mark as being checked
        checkedSubscriptionsRef.current[pluginSlug] = true;
        setIsCheckingSubscription(prev => ({ ...prev, [pluginSlug]: true }));

        try {
            const ajaxUrl = typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.wpConfig?.ajaxUrl;
            if (!ajaxUrl) {
                console.warn("ajaxUrl not available in marketplaceConfig");
                setIsCheckingSubscription(prev => ({ ...prev, [pluginSlug]: false }));
                return;
            }

            console.log(`[MarketplaceContext] Fetching subscription status for ${pluginSlug}`);

            const formData = new FormData();
            formData.append('action', 'get_addon_purchase_status');
            formData.append('addon_purchase_check', 'true');
            formData.append('addon_slug', pluginSlug);

            const res = await fetch(ajaxUrl, {
                method: 'POST',
                body: formData
            });

            const json = await res.json();
            console.log(`[MarketplaceContext] Subscription status response for ${pluginSlug}:`, json);

            setSubscriptionStatus(prev => ({ ...prev, [pluginSlug]: json.is_purchased }));
        } catch (e) {
            console.error(`[MarketplaceContext] Failed to fetch subscription status for ${pluginSlug}`, e);
            setSubscriptionStatus(prev => ({ ...prev, [pluginSlug]: false }));
        } finally {
            setIsCheckingSubscription(prev => ({ ...prev, [pluginSlug]: false }));
        }
    }, [isOnecomBrand]);

    // Handle plugin actions (install, activate, deactivate)
    const handlePluginAction = useCallback(async (action, plugin) => {
        // Check if this is Imagify plugin activation (handles 302 redirect case)
        const isImagifyActivation = action === 'activate' && plugin.slug === 'imagify';

        setPluginInAction(prev => ({ ...prev, [plugin.slug]: true }));

        // Set loading state for overlay
        const actionText = action.charAt(0).toUpperCase() + (action.endsWith('e') ? action.slice(1, -1) : action.slice(1)) + 'ing';
        setLoadingAction(actionText);
        setLoadingPlugin(plugin.name || plugin.slug);

        // For Imagify, use setTimeout to allow React to render the loading overlay first
        if (isImagifyActivation) {
            // Build URL for activation
            let url = `${apiBaseUrl}/${action}/${plugin.slug}`;
            const downloadParam = `download_url=${encodeURIComponent(plugin.download || '')}`;

            if (useWPHandlers) {
                url = `${wpConfig.ajaxUrl}?action=marketplace_${action}_plugin&_wpnonce=${wpConfig.nonce}&nonce=${wpConfig.nonce}&slug=${plugin.slug}&${downloadParam}`;
            } else {
                url = url + (url.includes('?') ? '&' : '?') + downloadParam;
            }

            // Allow React to render loading overlay, then execute Imagify flow
            setTimeout(() => {
                // Initiate the activation request (don't wait for response due to 302 redirect)
                fetch(url, { method: "POST" }).catch(err => {
                    console.log("Imagify activation request initiated, reload will proceed");
                });

                // Show success notice after delay
                setTimeout(() => {
                    setNoticeState({ visible: true, type: 'activated', pluginSlug: plugin.slug });
                }, 1000);

                // Clear loading overlay after success notice appears
                setTimeout(() => {
                    setLoadingAction('');
                    setLoadingPlugin('');
                    setPluginInAction(prev => ({ ...prev, [plugin.slug]: false }));
                }, 1100);

                // Update plugin state to activated
                setTimeout(() => {
                    setPlugins(prev =>
                        prev.map(p =>
                            p.slug === plugin.slug
                                ? { ...p, installed: true, activated: true }
                                : p
                        )
                    );
                }, 1200);

                // Reload after sufficient delay to show overlay, notice, and updated button
                setTimeout(() => {
                    window.location.reload();
                }, 2500);
            }, 100);
            return;
        }

        try {
            let url = `${apiBaseUrl}/${action}/${plugin.slug}`;

            // prepare encoded download param (safe if plugin.download is undefined)
            const downloadParam = `download_url=${encodeURIComponent(plugin.download || '')}`;

            if (useWPHandlers) {
                // original WP-AJAX URL + download_url appended
                url = `${wpConfig.ajaxUrl}?action=marketplace_${action}_plugin&_wpnonce=${wpConfig.nonce}&nonce=${wpConfig.nonce}&slug=${plugin.slug}&${downloadParam}`;
            } else {
                // append download_url to non-WP URL (adds ? or & correctly)
                url = url + (url.includes('?') ? '&' : '?') + downloadParam;
            }

            const res = await fetch(url, { method: "POST" });
            const result = await res.json();

            if (result.success) {
                setPlugins(prev =>
                    prev.map(p =>
                        p.slug === plugin.slug
                            ? { ...p, installed: result.data.installed, activated: result.data.activated }
                            : p
                    )
                );

                // Show success notice for install and activate actions
                if (action === 'install' && result.data.installed) {
                    setNoticeState({ visible: true, type: 'installed', pluginSlug: plugin.slug });
                } else if (action === 'activate' && result.data.activated) {
                    setNoticeState({ visible: true, type: 'activated', pluginSlug: plugin.slug });
                    // Reload the page after successful activation
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                }
            } else {
                // Show error toast for activation and installation errors
                if (action === 'activate') {
                    setErrorState({ visible: true, type: 'activate', pluginSlug: plugin.slug });
                } else if (action === 'install') {
                    setErrorState({ visible: true, type: 'install', pluginSlug: plugin.slug });
                } else {
                    alert(result.data?.message || "Failed to perform action");
                }
            }
        } catch (err) {
            console.error("Plugin action failed", err);
        } finally {
            setPluginInAction(prev => ({ ...prev, [plugin.slug]: false }));
            // Clear loading state
            setLoadingAction('');
            setLoadingPlugin('');
        }
    }, [apiBaseUrl, useWPHandlers, wpConfig]);

    const value = {
        apiBaseUrl,
        useWPHandlers,
        wpConfig,
        enableDefaultStyles,
        assetsBaseUrl,
        pluginInAction,
        setPluginInAction,
        subscriptionStatus,
        isCheckingSubscription,
        fetchSubscriptionStatus,
        isOnecomBrand,
        plugins,
        setPlugins,
        uiI18n,
        setUiI18n,
        handlePluginAction,
        loadingAction,
        loadingPlugin,
        noticeState,
        setNoticeState,
        errorState,
        setErrorState,
        allPluginsActivated,
        setAllPluginsActivated
    };

    return (
        <MarketplaceContext.Provider value={value}>
            {children}
        </MarketplaceContext.Provider>
    );
};

export const useMarketplace = () => {
    const context = useContext(MarketplaceContext);
    if (!context) {
        throw new Error('useMarketplace must be used within MarketplaceProvider');
    }
    return context;
};
