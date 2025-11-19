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
    
    // Use ref to track which subscriptions have been checked to avoid recreation of fetchSubscriptionStatus
    const checkedSubscriptionsRef = useRef({});

    const brand = typeof window !== "undefined" && window.marketplaceConfig?.brand;
    const isOnecomBrand = brand === "onecom";

    // Fetch subscription status for special plugins (wp-rocket, rank-math-pro)
    const fetchSubscriptionStatus = useCallback(async (pluginSlug) => {
        if (!isOnecomBrand) return;
        
        const isSpecialPlugin = pluginSlug === "wp-rocket" || pluginSlug === "rank-math-pro";
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
        setPluginInAction(prev => ({ ...prev, [plugin.slug]: true }));

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
            } else {
                alert(result.data?.message || "Failed to perform action");
            }
        } catch (err) {
            console.error("Plugin action failed", err);
        } finally {
            setPluginInAction(prev => ({ ...prev, [plugin.slug]: false }));
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
        handlePluginAction
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
