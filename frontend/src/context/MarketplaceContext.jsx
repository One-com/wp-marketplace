import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { trackButtonClick, initializeMixpanel, enableMixpanel, disableMixpanel } from '../utils/mixpanelTracking';
import { isWpVersionSupported as isWpVersionSupportedHelper } from '../utils/wpVersionHelper';
import { handleImagifyActivation } from '../utils/imagifyHandler';
import { getAjaxAction } from '../utils/common.utils';

const MarketplaceContext = createContext(null);

/**
 * Helper to construct localized loading messages for plugin actions
 */
const getLoadingMessage = (action, pluginName, uiI18n) => {
    let message = '';
    const notifications = uiI18n?.notifications || {};

    switch (action) {
        case 'activate':
            message = notifications.activating || 'Activating {0}';
            break;
        case 'deactivate':
            message = notifications.deactivating || 'Deactivating {0}';
            break;
        case 'install':
            message = notifications.installing || 'Installing {0}';
            break;
        case 'delete':
            message = notifications.deleting || 'Deleting {0}';
            break;
        default:
            const actionText = action.charAt(0).toUpperCase() + (action.endsWith('e') ? action.slice(1, -1) : action.slice(1)) + 'ing';
            return `${actionText} ${pluginName}`;
    }

    return message.replace('{0}', pluginName) + '...';
};

export const MarketplaceProvider = ({
    children,
    apiBaseUrl,
    useWPHandlers,
    wpConfig,
    enableDefaultStyles,
    assetsBaseUrl
}) => {
    const [pluginInAction, setPluginInAction] = useState({});
    const [subscriptionsList, setSubscriptionsList] = useState([]);
    const [subscriptionStatus, setSubscriptionStatus] = useState({});
    const [isCheckingSubscription, setIsCheckingSubscription] = useState({});
    const [plugins, setPlugins] = useState([]);
    const [uiI18n, setUiI18n] = useState({});
    const [loadingAction, setLoadingAction] = useState('');
    const [loadingPlugin, setLoadingPlugin] = useState('');
    const [noticeState, setNoticeState] = useState({ visible: false, type: null, pluginSlug: null });
    const [errorState, setErrorState] = useState({ visible: false, type: null, pluginSlug: null });
    const [successState, setSuccessState] = useState({ visible: false, type: null, pluginSlug: null });
    const [allPluginsActivated, setAllPluginsActivated] = useState(false);
    const [catalogError, setCatalogError] = useState(false);
    const [catalogLoading, setCatalogLoading] = useState(true);
    // Separate from catalogError so the auto-reload effect doesn't fire on planned downtime.
    // `message` and `buttonLabel` come straight from the API response — no local i18n fallback.
    const [maintenanceState, setMaintenanceState] = useState({ isOn: false, message: '', buttonLabel: '' });
    const [deleteModalState, setDeleteModalState] = useState({ isOpen: false, plugin: null });
    const [cancelSubsModalState, setCancelSubsModalState] = useState({ isOpen: false, plugin: null, subscriptionId: null, expiresAt: null, onConfirm: null });
    const [pendingProcurements, setPendingProcurements] = useState(() => {
        return typeof window !== "undefined" && window.marketplaceConfig?.pendingProcurements
            ? window.marketplaceConfig.pendingProcurements
            : {};
    });
    const [currentPluginSlug, setCurrentPluginSlug] = useState(() => {
        return typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("plugin") : null;
    });

    // Track URL changes to keep currentPluginSlug in sync
    useEffect(() => {
        const handleUrlChange = () => {
            const slug = new URLSearchParams(window.location.search).get("plugin");
            setCurrentPluginSlug(slug);
        };

        window.addEventListener('popstate', handleUrlChange);

        const originalPushState = window.history.pushState;
        window.history.pushState = function(...args) {
            originalPushState.apply(this, args);
            handleUrlChange();
        };

        const originalReplaceState = window.history.replaceState;
        window.history.replaceState = function(...args) {
            originalReplaceState.apply(this, args);
            handleUrlChange();
        };

        return () => {
            window.removeEventListener('popstate', handleUrlChange);
            window.history.pushState = originalPushState;
            window.history.replaceState = originalReplaceState;
        };
    }, []);

    // State for tracking consent status
    const [consentStatus, setConsentStatus] = useState(() => {
        const initialConsent = typeof window !== "undefined" && window.marketplaceConfig?.data_consent_status;
        // Convert to boolean: handle true, 'true', '1', 1 as true
        return initialConsent === true || initialConsent === 'true' || initialConsent === '1' || initialConsent === 1;
    });

    // Use ref to track which subscriptions have been checked to avoid recreation of fetchSubscriptionStatus
    const checkedSubscriptionsRef = useRef({});

    // Use ref to track reload timeout so it can be cancelled if user navigates
    const reloadTimeoutRef = useRef(null);

    const brand = typeof window !== "undefined" && window.marketplaceConfig?.brand;
    const isOnecomBrand = brand === "onecom";

    // Get active plugin slugs from WordPress config
    const activePlugins = typeof window !== "undefined" && window.marketplaceConfig?.activePlugins
        ? window.marketplaceConfig.activePlugins
        : [];

    // Get active theme author from WordPress config
    const activeThemeAuthor = typeof window !== "undefined" && window.marketplaceConfig?.activeThemeAuthor
        ? window.marketplaceConfig.activeThemeAuthor
        : "";

    // Get WP version from WordPress config
    const wpVersion = typeof window !== "undefined" && window.marketplaceConfig?.wpVersion
        ? window.marketplaceConfig.wpVersion
        : "";

    useEffect(() => {
        const persistedNotice = sessionStorage.getItem('mp_success_notice');
        if (persistedNotice) {
            try {
                const noticeData = JSON.parse(persistedNotice);
                setNoticeState({
                    visible: noticeData.visible,
                    type: noticeData.type,
                    pluginSlug: noticeData.pluginSlug
                });
                setSuccessState({
                    visible: noticeData.visible,
                    type: noticeData.successType,
                    pluginSlug: noticeData.pluginSlug
                });

                // Schedule clearing from sessionStorage AFTER the notice is set in state
                // and the components have had a chance to mount and check it.
                // We use a small timeout to ensure it stays in sessionStorage long enough
                // for ProductDetail.jsx mount effect to see it.
                setTimeout(() => {
                    sessionStorage.removeItem('mp_success_notice');
                }, 100);
            } catch (e) {
                console.error('Error parsing persisted success notice', e);
            }
        }
    }, []);

    // Initialize Mixpanel on mount and monitor consent changes
    // Uses useEffect to ensure Mixpanel only initializes when consent is given
    useEffect(() => {
        // Initialize Mixpanel on component mount based on initial consent status
        if (consentStatus === true) {
            initializeMixpanel();
        }

        // Set up listener for consent changes from plugin
        const handleConsentChange = (e) => {
            const newConsentStatus = e.detail?.data_consent_status !== undefined ? e.detail.data_consent_status : false;

            // Update state
            setConsentStatus(newConsentStatus);

            // Handle Mixpanel based on new consent status
            if (newConsentStatus === true) {
                // Consent granted - enable Mixpanel
                // Update window.marketplaceConfig consent status
                // Note: mixpanel config (token, globalProperties, distinctId) is always sent by PHP
                // regardless of consent status, so we can use it directly
                if (typeof window !== "undefined" && window.marketplaceConfig) {
                    window.marketplaceConfig.data_consent_status = true;
                }

                // Enable Mixpanel - it will read the config from window.marketplaceConfig
                enableMixpanel();
            } else {

                // Update window.marketplaceConfig
                if (typeof window !== "undefined" && window.marketplaceConfig) {
                    window.marketplaceConfig.data_consent_status = false;
                    // Keep mixpanel config available for when consent is granted again
                }

                disableMixpanel();
            }
        };

        // Listen for custom consent change event from plugin (same page)
        window.addEventListener('onConsentStatusChanged', handleConsentChange);

        // Listen for localStorage changes (cross-page communication)
        const handleStorageChange = (e) => {
            // Only handle changes to our consent key
            if (e.key === 'onecom_data_consent_status') {
                const newConsentStatus = e.newValue === '1';

                // Trigger the same handler with the new consent status
                handleConsentChange({ detail: { data_consent_status: newConsentStatus } });
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('onConsentStatusChanged', handleConsentChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []); // Empty dependency array - only run on mount/unmount

    // Fetch subscription status for special plugins (wp-rocket, rank-math-pro)
    const fetchSubscriptionStatus = useCallback(async (pluginSlug) => {
        if (!isOnecomBrand) return;

        if (!isSpecialPlugin(pluginSlug)) return;

        // Mark as being checked
        setIsCheckingSubscription(prev => ({ ...prev, [pluginSlug]: true }));

        try {
            const ajaxUrl = typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.wpConfig?.ajaxUrl;
            if (!ajaxUrl) {
                setIsCheckingSubscription(prev => ({ ...prev, [pluginSlug]: false }));
                return;
            }

            const formData = new FormData();
            formData.append('action', 'get_addon_purchase_status');
            formData.append('addon_purchase_check', 'true');
            formData.append('addon_slug', pluginSlug);

            const res = await fetch(ajaxUrl, {
                method: 'POST',
                body: formData
            });

            const json = await res.json();

            setSubscriptionStatus(prev => ({ ...prev, [pluginSlug]: json.is_purchased }));
        } catch (e) {
            setSubscriptionStatus(prev => ({ ...prev, [pluginSlug]: false }));
        } finally {
            setIsCheckingSubscription(prev => ({ ...prev, [pluginSlug]: false }));
        }
    }, [isOnecomBrand]);

    // Function to cancel scheduled reload (called when user clicks "Get Started")
    const cancelReload = useCallback(() => {
        if (reloadTimeoutRef.current) {
            clearTimeout(reloadTimeoutRef.current);
            reloadTimeoutRef.current = null;
        }
        sessionStorage.removeItem('mp_success_notice');
    }, []);

    const isSpecialPlugin = useCallback((pluginSlug) => {
        return pluginSlug === "wp-rocket" || pluginSlug === "seo-by-rank-math-pro";
    }, []);

    const isWpVersionSupported = useCallback((minVersion) => {
        return isWpVersionSupportedHelper(wpVersion, minVersion);
    }, [wpVersion]);

    const openDeleteModal = useCallback((plugin) => {
        setDeleteModalState({ isOpen: true, plugin });
    }, []);

    const closeDeleteModal = useCallback(() => {
        setDeleteModalState({ isOpen: false, plugin: null });
    }, []);

    const openCancelSubsModal = useCallback((plugin, subscriptionId, expiresAt, onConfirm) => {
        setCancelSubsModalState({ isOpen: true, plugin, subscriptionId, expiresAt, onConfirm });
    }, []);

    const closeCancelSubsModal = useCallback(() => {
        setCancelSubsModalState({ isOpen: false, plugin: null, subscriptionId: null, expiresAt: null, onConfirm: null });
    }, []);

    const shouldShowProvision = useCallback((plugin) => {
        if (!plugin || !isOnecomBrand) return false;
        return isSpecialPlugin(plugin.slug) && !plugin.installed && subscriptionStatus[plugin.slug] === true;
    }, [isOnecomBrand, subscriptionStatus, isSpecialPlugin]);

    // Helper function to check if a plugin should be visible based on its rules
    const shouldShowPlugin = useCallback((plugin) => {
        // If plugin has no rules, show it by default
        if (!plugin.rules) {
            return true;
        }

        // Check mustHavePlugins rule
        if (plugin.rules.mustHavePlugins && Array.isArray(plugin.rules.mustHavePlugins)) {
            // If the array is empty, no requirements exist, so show the plugin
            if (plugin.rules.mustHavePlugins.length === 0) {
                return true;
            }

            // Plugin should be visible if ANY of the required plugins is active
            const hasRequiredPlugin = plugin.rules.mustHavePlugins.some(requiredSlug =>
                activePlugins.includes(requiredSlug)
            );

            // If mustHavePlugins rule exists but no required plugin is active, hide the plugin
            if (!hasRequiredPlugin) {
                return false;
            }
        }

        // Check mustHaveThemesByAuthor rule
        if (plugin.rules.mustHaveThemesByAuthor && typeof plugin.rules.mustHaveThemesByAuthor === 'string') {
            // Plugin should be visible only if the active theme author matches the required author
            const requiredAuthor = plugin.rules.mustHaveThemesByAuthor;
            if (activeThemeAuthor !== requiredAuthor) {
                return false;
            }
        }

        // Add support for other rule types here in the future
        // For now, if all rules pass (or don't exist), show the plugin
        return true;
    }, [activePlugins, activeThemeAuthor]);


    // Fetch the full subscriptions list (used on both Marketplace and Addons pages)
    const fetchPartnerSubscriptions = useCallback(async () => {
        try {
            const ajaxUrl = typeof window !== "undefined" && window.marketplaceConfig?.wpConfig?.ajaxUrl;
            if (!ajaxUrl) {
                console.error('ajaxUrl is missing');
                return;
            }

            const formData = new URLSearchParams({
                action: getAjaxAction('get_subscriptions_list'),
                nonce: window.marketplaceConfig?.wpConfig?.nonce,
            });

            const response = await fetch(ajaxUrl, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!result.success) {
                setSubscriptionsList([]);
                return;
            }
            console.log('Subscriptions list:', result?.data || []);
            setSubscriptionsList(result?.data || []);
        } catch (error) {
            console.error('Error during fetch subscription list', error);
            setSubscriptionsList([]);
        }
    }, []);

    // Handle "Cancel Subscription" action
    const handleCancelSubsAction = useCallback(async (action, plugin, subscription_id) => {
        try {
            const ajaxUrl = typeof window !== "undefined" && window.marketplaceConfig?.wpConfig?.ajaxUrl;

            if (!ajaxUrl) {
                console.error('ajaxUrl is missing');
                return;
            }

            const formData = new URLSearchParams({
                action: getAjaxAction('cancel_subscription'),
                nonce: window.marketplaceConfig?.wpConfig?.nonce,
                plugin_slug: plugin.slug,
                ...(subscription_id ? { subscription_id } : {}),
            });

            const response = await fetch(ajaxUrl, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!result.success) {
                console.error('Cancel subscription failed:', result?.data?.message || 'Unknown error');
                return;
            }

            // Refresh subscriptions list after successful cancellation
            const refreshFormData = new URLSearchParams({
                action: getAjaxAction('get_subscriptions_list'),
                nonce: window.marketplaceConfig?.wpConfig?.nonce,
            });

            const refreshResponse = await fetch(ajaxUrl, {
                method: 'POST',
                body: refreshFormData,
            });

            const refreshResult = await refreshResponse.json();

            if (refreshResult.success) {
                setSubscriptionsList(refreshResult?.data || []);
            }
        } catch (error) {
            console.error('Error during cancel subscription', error);
        }
    }, []);

    // Handle plugin actions (install, activate, deactivate)
    // downloadUrl (4th arg) overrides plugin.download for install; omit to keep existing behaviour
    const handlePluginAction = useCallback(async (action, plugin, source = '', downloadUrl = '') => {
        // Check if this is Imagify plugin activation (handles 302 redirect case)
        const isImagifyActivation = action === 'activate' && plugin.slug === 'imagify';

        setPluginInAction(prev => ({ ...prev, [plugin.slug]: action }));

        // Use ref to track if action was successful (to prevent finally block from clearing pluginInAction)
        let actionSuccessful = false;

        // Set loading state for overlay using API response keys
        const pluginName = plugin.name || plugin.slug;
        const loadingMessage = getLoadingMessage(action, pluginName, uiI18n);

        setLoadingAction(loadingMessage);
        setLoadingPlugin('');

        // For Imagify, use the specialized handler
        if (isImagifyActivation) {
            handleImagifyActivation({
                plugin,
                apiBaseUrl,
                useWPHandlers,
                wpConfig,
                source,
                uiI18n,
                setLoadingAction,
                setLoadingPlugin,
                setPluginInAction,
                setSuccessState,
                setErrorState,
                reloadTimeoutRef,
                trackButtonClick
            });
            return;
        }

        try {
            let url = `${apiBaseUrl}/${action}/${plugin.slug}`;

            // prefer explicit downloadUrl arg, fall back to plugin.download, then empty string
            const downloadParam = `download_url=${encodeURIComponent(downloadUrl || plugin.download || '')}`;

            if (useWPHandlers) {
                // original WP-AJAX URL + download_url appended
                url = `${wpConfig.ajaxUrl}?action=${getAjaxAction(`${action}_plugin`)}&_wpnonce=${wpConfig.nonce}&nonce=${wpConfig.nonce}&slug=${plugin.slug}&${downloadParam}`;
            } else {
                // append download_url to non-WP URL (adds ? or & correctly)
                url = url + (url.includes('?') ? '&' : '?') + downloadParam;
            }

            const res = await fetch(url, { method: "POST" });
            const result = await res.json();

            if (result.success) {
                setPlugins(prev =>
                    prev.map(p => {
                        if (p.slug === plugin.slug) {
                            return { ...p, installed: result.data.installed, activated: result.data.activated };
                        }

                        // Handle Rank Math dependency: if Free is deactivated, Pro is also deactivated
                        if (action === 'deactivate' && plugin.slug === 'seo-by-rank-math' && p.slug === 'seo-by-rank-math-pro') {
                            return { ...p, activated: false };
                        }

                        // Handle Rank Math dependency: if Pro is activated, Free is also activated
                        if (action === 'activate' && plugin.slug === 'seo-by-rank-math-pro' && p.slug === 'seo-by-rank-math') {
                            return { ...p, activated: true };
                        }

                        return p;
                    })
                );

                // Show success notice for install, activate and delete actions
                if (action === 'install' && result.data.installed) {
                    // Track successful install
                    trackButtonClick({
                        buttonName: 'Install',
                        buttonAction: 'product_install',
                        plugin: plugin,
                        context: {
                            action: action,
                            result: 'success',
                        }
                    });

                    if (source === 'buy_now') {
                        // Buy Now flow: show notice but no reload — let the state update
                        // naturally show the Activate button. actionSuccessful stays false
                        // so the finally block releases the pluginInAction lock.
                        setNoticeState({ visible: true, type: 'installed', pluginSlug: plugin.slug });
                        setSuccessState({ visible: true, type: 'install', pluginSlug: plugin.slug });
                        return true;
                    }

                    actionSuccessful = true; // keep pluginInAction locked until reload

                    if (source === 'product_detail') {
                        // Quick reload for product detail page
                        sessionStorage.setItem('mp_skip_page_view', 'true');
                        sessionStorage.setItem('mp_success_notice', JSON.stringify({
                            visible: true,
                            type: 'installed',
                            pluginSlug: plugin.slug,
                            successType: 'install'
                        }));
                        reloadTimeoutRef.current = setTimeout(() => {
                            window.location.reload();
                        }, 500);
                    } else {
                        // Addons page: show success toast, reload after a short delay
                        setNoticeState({ visible: true, type: 'installed', pluginSlug: plugin.slug });
                        setSuccessState({ visible: true, type: 'install', pluginSlug: plugin.slug });

                        reloadTimeoutRef.current = setTimeout(() => {
                            sessionStorage.setItem('mp_skip_page_view', 'true');
                            window.location.reload();
                        }, 3000);

                        // Explicitly clear loading state so loader hides immediately
                        setLoadingAction('');
                        setLoadingPlugin('');
                    }

                    return;
                } else if (action === 'delete' && !result.data.installed) {
                    setNoticeState({ visible: true, type: 'deleted', pluginSlug: plugin.slug });
                    setSuccessState({ visible: true, type: 'delete', pluginSlug: plugin.slug });

                    // Track successful delete
                    trackButtonClick({
                        buttonName: 'Delete',
                        buttonAction: 'product_delete',
                        plugin: plugin,
                        context: {
                            action: action,
                            result: 'success',
                        }
                    });
                } else if (action === 'activate' && result.data.activated) {
                    actionSuccessful = true; // Mark action as successful to prevent finally block from clearing pluginInAction

                    // Track successful activate
                    trackButtonClick({
                        buttonName: 'Activate',
                        buttonAction: 'product_activate',
                        plugin: plugin,
                        context: {
                            action: action,
                            result: 'success',
                        }
                    });

                    if (source === 'product_detail') {
                        // Set flag to skip page view tracking on reload
                        sessionStorage.setItem('mp_skip_page_view', 'true');
                        sessionStorage.setItem('mp_success_notice', JSON.stringify({
                            visible: true,
                            type: 'activated',
                            pluginSlug: plugin.slug,
                            successType: 'activate'
                        }));

                        // Schedule reload almost instantly
                        reloadTimeoutRef.current = setTimeout(() => {
                            window.location.reload();
                        }, 500);
                    } else {
                        // Old flow for addons page
                        setSuccessState({ visible: true, type: 'activate', pluginSlug: plugin.slug });

                        // Schedule reload after a while
                        reloadTimeoutRef.current = setTimeout(() => {
                            // Set flag to skip page view tracking on reload
                            sessionStorage.setItem('mp_skip_page_view', 'true');
                            window.location.reload();
                        }, 3000);

                        // Clear loading state only
                        setLoadingAction('');
                        setLoadingPlugin('');
                    }

                    return; // Skip finally block (though finally will still execute, actionSuccessful flag prevents clearing)
                } else if (action === 'deactivate' && !result.data.activated) {
                    actionSuccessful = true; // Mark action as successful to prevent finally block from clearing pluginInAction
                    setSuccessState({ visible: true, type: 'deactivate', pluginSlug: plugin.slug });

                    // Track successful deactivate
                    trackButtonClick({
                        buttonName: 'Deactivate',
                        buttonAction: 'product_deactivate',
                        plugin: plugin,
                        context: {
                            action: action,
                            result: 'success',
                        }
                    });

                    // Schedule reload after deactivation to refresh plugin state
                    reloadTimeoutRef.current = setTimeout(() => {
                        // Set flag to skip page view tracking on reload
                        sessionStorage.setItem('mp_skip_page_view', 'true');
                        window.location.reload();
                    }, 3000);

                    // Don't clear pluginInAction for successful deactivation - keep back button disabled until reload
                    // Clear loading state only
                    setLoadingAction('');
                    setLoadingPlugin('');
                    return;
                }
            } else {
                // Show error toast for activation and installation errors
                if (action === 'activate') {
                    setErrorState({ visible: true, type: 'activate', pluginSlug: plugin.slug, message: result?.error || result?.data?.message || result?.data?.error || null });

                    // Track activation error
                    trackButtonClick({
                        buttonName: 'Activate',
                        buttonAction: 'product_activate',
                        plugin: plugin,
                        context: {
                            action: action,
                            result: 'error',
                            error_message: result.data?.message || uiI18n?.notifications?.pluginActivationFailed || 'Activation failed',
                        }
                    });
                } else if (action === 'deactivate') {
                    setErrorState({ visible: true, type: 'deactivate', pluginSlug: plugin.slug, message: result?.error || result?.data?.message || result?.data?.error || null });

                    // Track deactivation error
                    trackButtonClick({
                        buttonName: 'Deactivate',
                        buttonAction: 'product_deactivate',
                        plugin: plugin,
                        context: {
                            action: action,
                            result: 'error',
                            error_message: result.data?.message || uiI18n?.notifications?.pluginDeactivationFailed || 'Deactivation failed',
                        }
                    });
                } else if (action === 'install') {
                    setErrorState({ visible: true, type: 'install', pluginSlug: plugin.slug, message: result?.error || result?.data?.message || result?.data?.error || null });

                    // Track installation error
                    trackButtonClick({
                        buttonName: 'Install',
                        buttonAction: 'product_install',
                        plugin: plugin,
                        context: {
                            action: action,
                            result: 'error',
                            error_message: result.data?.message || 'Installation failed',
                        }
                    });
                } else if (action === 'delete') {
                    setErrorState({ visible: true, type: 'delete', pluginSlug: plugin.slug, message: result?.error || result?.data?.message || result?.data?.error || null });

                    // Track deletion error
                    trackButtonClick({
                        buttonName: 'Delete',
                        buttonAction: 'product_delete',
                        plugin: plugin,
                        context: {
                            action: action,
                            result: 'error',
                            error_message: result.data?.message || uiI18n?.notifications?.pluginDeletionFailed || 'Deletion failed',
                        }
                    });
                } else {
                    alert(result.data?.message || uiI18n?.notifications?.actionFailed || "Failed to perform action");
                }
            }
        } catch (err) {
            console.error("Plugin action failed", err);

            // Track network/exception errors for install and activate
            if (action === 'activate' || action === 'install' || action === 'delete') {
                trackButtonClick({
                    buttonName: action === 'activate' ? 'Activate' : (action === 'install' ? 'Install' : 'Delete'),
                    buttonAction: action === 'activate' ? 'product_activate' : (action === 'install' ? 'product_install' : 'product_delete'),
                    plugin: plugin,
                    context: {
                        action: action,
                        result: 'error',
                        error_message: err.message || 'Network error',
                    }
                });
            }
        } finally {
            // Only clear pluginInAction if action was not successful
            // For successful actions (activate/deactivate), keep it true until page reload
            if (!actionSuccessful) {
                setPluginInAction(prev => ({ ...prev, [plugin.slug]: false }));
            }
            // Clear loading state
            setLoadingAction('');
            setLoadingPlugin('');
        }
    }, [apiBaseUrl, useWPHandlers, wpConfig, uiI18n]);

    const value = {
        apiBaseUrl,
        useWPHandlers,
        wpConfig,
        enableDefaultStyles,
        assetsBaseUrl,
        pluginInAction,
        setPluginInAction,
        subscriptionsList,
        setSubscriptionsList,
        subscriptionStatus,
        isCheckingSubscription,
        fetchPartnerSubscriptions,
        fetchSubscriptionStatus,
        isOnecomBrand,
        plugins,
        setPlugins,
        uiI18n,
        setUiI18n,
        handlePluginAction,
        handleCancelSubsAction,
        cancelReload,
        loadingAction,
        setLoadingAction,
        loadingPlugin,
        setLoadingPlugin,
        noticeState,
        setNoticeState,
        errorState,
        setErrorState,
        successState,
        setSuccessState,
        allPluginsActivated,
        setAllPluginsActivated,
        catalogError,
        setCatalogError,
        catalogLoading,
        setCatalogLoading,
        maintenanceState,
        setMaintenanceState,
        currentPluginSlug,
        setCurrentPluginSlug,
        deleteModalState,
        openDeleteModal,
        closeDeleteModal,
        cancelSubsModalState,
        openCancelSubsModal,
        closeCancelSubsModal,
        shouldShowProvision,
        isSpecialPlugin,
        shouldShowPlugin,
        isWpVersionSupported,
        wpVersion,
        activePlugins,
        activeThemeAuthor,
        pendingProcurements,
        setPendingProcurements
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
