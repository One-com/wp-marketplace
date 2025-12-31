import React, { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  trackButtonClick,
  initializeMixpanel,
  enableMixpanel,
  disableMixpanel
} from '../utils/mixpanelTracking';
import { isWpVersionSupported as isWpVersionSupportedHelper } from '../utils/wpVersionHelper';

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
  const [successState, setSuccessState] = useState({
    visible: false,
    type: null,
    pluginSlug: null
  });
  const [allPluginsActivated, setAllPluginsActivated] = useState(false);
  const [catalogError, setCatalogError] = useState(false);
  const [catalogLoading, setCatalogLoading] = useState(true);

  // State for tracking consent status
  const [consentStatus, setConsentStatus] = useState(() => {
    const initialConsent =
      typeof window !== 'undefined' && window.marketplaceConfig?.data_consent_status;
    console.log(
      '[MarketplaceContext] Initializing with consent status from config:',
      initialConsent,
      'Type:',
      typeof initialConsent
    );
    // Convert to boolean: handle true, 'true', '1', 1 as true
    return (
      initialConsent === true ||
      initialConsent === 'true' ||
      initialConsent === '1' ||
      initialConsent === 1
    );
  });

  // Use ref to track which subscriptions have been checked to avoid recreation of fetchSubscriptionStatus
  const checkedSubscriptionsRef = useRef({});

  // Use ref to track reload timeout so it can be cancelled if user navigates
  const reloadTimeoutRef = useRef(null);

  const brand = typeof window !== 'undefined' && window.marketplaceConfig?.brand;
  const isOnecomBrand = brand === 'onecom';

  // Get active plugin slugs from WordPress config
  const activePlugins = useMemo(() => {
    return typeof window !== 'undefined' && window.marketplaceConfig?.activePlugins
      ? window.marketplaceConfig.activePlugins
      : [];
  }, []);

  // Get active theme author from WordPress config
  const activeThemeAuthor = useMemo(() => {
    return typeof window !== 'undefined' && window.marketplaceConfig?.activeThemeAuthor
      ? window.marketplaceConfig.activeThemeAuthor
      : '';
  }, []);

  // Get WP version from WordPress config
  const wpVersion = useMemo(() => {
    return typeof window !== 'undefined' && window.marketplaceConfig?.wpVersion
      ? window.marketplaceConfig.wpVersion
      : '';
  }, []);

  // Initialize Mixpanel on mount and monitor consent changes
  // Uses useEffect to ensure Mixpanel only initializes when consent is given
  useEffect(() => {
    // Initialize Mixpanel on component mount based on initial consent status
    if (consentStatus === true) {
      console.log('[MarketplaceContext] Initial consent is true - initializing Mixpanel');
      initializeMixpanel();
    } else {
      console.log('[MarketplaceContext] Initial consent is false - Mixpanel will not initialize');
    }

    // Set up listener for consent changes from plugin
    const handleConsentChange = (e) => {
      const newConsentStatus =
        e.detail?.data_consent_status !== undefined ? e.detail.data_consent_status : false;
      console.log(
        '[MarketplaceContext] Consent change detected via onConsentStatusChanged event:',
        newConsentStatus
      );

      // Update state
      setConsentStatus(newConsentStatus);

      // Handle Mixpanel based on new consent status
      if (newConsentStatus === true) {
        // Consent granted - enable Mixpanel
        console.log('[MarketplaceContext] Consent granted - enabling Mixpanel tracking');

        // Update window.marketplaceConfig consent status
        // Note: mixpanel config (token, globalProperties, distinctId) is always sent by PHP
        // regardless of consent status, so we can use it directly
        if (typeof window !== 'undefined' && window.marketplaceConfig) {
          window.marketplaceConfig.data_consent_status = true;
        }

        // Enable Mixpanel - it will read the config from window.marketplaceConfig
        enableMixpanel();
      } else {
        // Consent revoked - disable Mixpanel
        console.log('[MarketplaceContext] Consent revoked - disabling Mixpanel tracking');

        // Update window.marketplaceConfig
        if (typeof window !== 'undefined' && window.marketplaceConfig) {
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
        console.log(
          '[MarketplaceContext] Consent change detected via storage event (cross-page):',
          newConsentStatus
        );

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
  }, [consentStatus]); // Added consentStatus as dependency

  // Fetch subscription status for special plugins (wp-rocket, rank-math-pro)
  const fetchSubscriptionStatus = useCallback(
    async (pluginSlug) => {
      if (!isOnecomBrand) return;

      if (!isSpecialPlugin(pluginSlug)) return;

      // Mark as being checked
      setIsCheckingSubscription((prev) => ({ ...prev, [pluginSlug]: true }));

      try {
        const ajaxUrl =
          typeof window.marketplaceConfig !== 'undefined' &&
          window.marketplaceConfig?.wpConfig?.ajaxUrl;
        if (!ajaxUrl) {
          console.warn('ajaxUrl not available in marketplaceConfig');
          setIsCheckingSubscription((prev) => ({ ...prev, [pluginSlug]: false }));
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

        setSubscriptionStatus((prev) => ({ ...prev, [pluginSlug]: json.is_purchased }));
      } catch (e) {
        console.error(
          `[MarketplaceContext] Failed to fetch subscription status for ${pluginSlug}`,
          e
        );
        setSubscriptionStatus((prev) => ({ ...prev, [pluginSlug]: false }));
      } finally {
        setIsCheckingSubscription((prev) => ({ ...prev, [pluginSlug]: false }));
      }
    },
    [isOnecomBrand, isSpecialPlugin]
  );

  // Function to cancel scheduled reload (called when user clicks "Get Started")
  const cancelReload = useCallback(() => {
    if (reloadTimeoutRef.current) {
      clearTimeout(reloadTimeoutRef.current);
      reloadTimeoutRef.current = null;
    }
  }, []);

  const isSpecialPlugin = useCallback((pluginSlug) => {
    return pluginSlug === 'wp-rocket' || pluginSlug === 'seo-by-rank-math-pro';
  }, []);

  const isWpVersionSupported = useCallback(
    (minVersion) => {
      return isWpVersionSupportedHelper(wpVersion, minVersion);
    },
    [wpVersion]
  );

  const shouldShowProvision = useCallback(
    (plugin) => {
      if (!plugin || !isOnecomBrand) return false;
      return (
        isSpecialPlugin(plugin.slug) &&
        !plugin.installed &&
        subscriptionStatus[plugin.slug] === true
      );
    },
    [isOnecomBrand, subscriptionStatus, isSpecialPlugin]
  );

  // Helper function to check if a plugin should be visible based on its rules
  const shouldShowPlugin = useCallback(
    (plugin) => {
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
        const hasRequiredPlugin = plugin.rules.mustHavePlugins.some((requiredSlug) =>
          activePlugins.includes(requiredSlug)
        );

        // If mustHavePlugins rule exists but no required plugin is active, hide the plugin
        if (!hasRequiredPlugin) {
          return false;
        }
      }

      // Check mustHaveThemesByAuthor rule
      if (
        plugin.rules.mustHaveThemesByAuthor &&
        typeof plugin.rules.mustHaveThemesByAuthor === 'string'
      ) {
        // Plugin should be visible only if the active theme author matches the required author
        const requiredAuthor = plugin.rules.mustHaveThemesByAuthor;
        if (activeThemeAuthor !== requiredAuthor) {
          return false;
        }
      }

      // Add support for other rule types here in the future
      // For now, if all rules pass (or don't exist), show the plugin
      return true;
    },
    [activePlugins, activeThemeAuthor]
  );

  // Handle plugin actions (install, activate, deactivate)
  const handlePluginAction = useCallback(
    async (action, plugin) => {
      // Check if this is Imagify plugin activation (handles 302 redirect case)
      const isImagifyActivation = action === 'activate' && plugin.slug === 'imagify';

      setPluginInAction((prev) => ({ ...prev, [plugin.slug]: true }));

      // Use ref to track if action was successful (to prevent finally block from clearing pluginInAction)
      let actionSuccessful = false;

      // Set loading state for overlay using API response keys
      const pluginName = plugin.name || plugin.slug;
      let loadingMessage = '';

      if (action === 'activate') {
        const activatingMsg = uiI18n?.notifications?.activating || 'Activating {0}';
        loadingMessage = activatingMsg.replace('{0}', pluginName) + '...';
      } else if (action === 'deactivate') {
        const deactivatingMsg = uiI18n?.notifications?.deactivating || 'Deactivating {0}';
        loadingMessage = deactivatingMsg.replace('{0}', pluginName) + '...';
      } else if (action === 'install') {
        const installingMsg = uiI18n?.notifications?.installing || 'Installing {0}';
        loadingMessage = installingMsg.replace('{0}', pluginName) + '...';
      } else if (action === 'delete') {
        const deletingMsg = uiI18n?.notifications?.deleting || 'Deleting {0}';
        loadingMessage = deletingMsg.replace('{0}', pluginName) + '...';
      } else {
        // Fallback for other actions
        const actionText =
          action.charAt(0).toUpperCase() +
          (action.endsWith('e') ? action.slice(1, -1) : action.slice(1)) +
          'ing';
        loadingMessage = `${actionText} ${pluginName}`;
      }

      setLoadingAction(loadingMessage);
      setLoadingPlugin('');

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
          fetch(url, { method: 'POST' }).catch((err) => {
            console.log('Imagify activation request initiated, reload will proceed');
          });

          // Show success notice after delay
          setTimeout(() => {
            setNoticeState({ visible: true, type: 'activated', pluginSlug: plugin.slug });
            setSuccessState({ visible: true, type: 'activate', pluginSlug: plugin.slug });

            // Track successful Imagify activation
            trackButtonClick({
              buttonName: 'Activate',
              buttonAction: 'product_activate',
              plugin: plugin,
              context: {
                action: action,
                result: 'success',
                special_case: 'imagify_redirect'
              }
            });
          }, 1000);

          // Clear loading overlay after success notice appears
          // Keep pluginInAction true to disable back button until reload
          setTimeout(() => {
            setLoadingAction('');
            setLoadingPlugin('');
          }, 1100);

          // Update plugin state to activated
          setTimeout(() => {
            setPlugins((prev) =>
              prev.map((p) =>
                (p.slug === plugin.slug ? { ...p, installed: true, activated: true } : p)
              )
            );
          }, 1200);

          // Schedule reload after showing the success notice and updated state
          // User can cancel this by clicking "Get Started" button
          reloadTimeoutRef.current = setTimeout(() => {
            // Set flag to skip page view tracking on reload
            sessionStorage.setItem('mp_skip_page_view', 'true');
            window.location.reload();
          }, 5000);
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

        const res = await fetch(url, { method: 'POST' });
        const result = await res.json();

        if (result.success) {
          setPlugins((prev) =>
            prev.map((p) => {
              if (p.slug === plugin.slug) {
                return { ...p, installed: result.data.installed, activated: result.data.activated };
              }

              // Handle Rank Math dependency: if Free is deactivated, Pro is also deactivated
              if (
                action === 'deactivate' &&
                plugin.slug === 'seo-by-rank-math' &&
                p.slug === 'seo-by-rank-math-pro'
              ) {
                return { ...p, activated: false };
              }

              // Handle Rank Math dependency: if Pro is activated, Free is also activated
              if (
                action === 'activate' &&
                plugin.slug === 'seo-by-rank-math-pro' &&
                p.slug === 'seo-by-rank-math'
              ) {
                return { ...p, activated: true };
              }

              return p;
            })
          );

          // Show success notice for install, activate and delete actions
          if (action === 'install' && result.data.installed) {
            setNoticeState({ visible: true, type: 'installed', pluginSlug: plugin.slug });

            // Track successful install
            trackButtonClick({
              buttonName: 'Install',
              buttonAction: 'product_install',
              plugin: plugin,
              context: {
                action: action,
                result: 'success'
              }
            });
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
                result: 'success'
              }
            });
          } else if (action === 'activate' && result.data.activated) {
            actionSuccessful = true; // Mark action as successful to prevent finally block from clearing pluginInAction
            setNoticeState({ visible: true, type: 'activated', pluginSlug: plugin.slug });
            setSuccessState({ visible: true, type: 'activate', pluginSlug: plugin.slug });

            // Track successful activate
            trackButtonClick({
              buttonName: 'Activate',
              buttonAction: 'product_activate',
              plugin: plugin,
              context: {
                action: action,
                result: 'success'
              }
            });

            // Schedule reload after activation to refresh plugin state
            // User can cancel this by clicking "Get Started" button
            reloadTimeoutRef.current = setTimeout(() => {
              // Set flag to skip page view tracking on reload
              sessionStorage.setItem('mp_skip_page_view', 'true');
              window.location.reload();
            }, 3000);

            // Don't clear pluginInAction for successful activation - keep back button disabled until reload
            // Clear loading state only
            setLoadingAction('');
            setLoadingPlugin('');
            // Skip finally block (though finally will still execute, actionSuccessful flag prevents clearing)
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
                result: 'success'
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
          }
        } else {
          // Show error toast for activation and installation errors
          if (action === 'activate') {
            setErrorState({ visible: true, type: 'activate', pluginSlug: plugin.slug });

            // Track activation error
            trackButtonClick({
              buttonName: 'Activate',
              buttonAction: 'product_activate',
              plugin: plugin,
              context: {
                action: action,
                result: 'error',
                error_message:
                  result.data?.message ||
                  uiI18n?.notifications?.pluginActivationFailed ||
                  'Activation failed'
              }
            });
          } else if (action === 'deactivate') {
            setErrorState({ visible: true, type: 'deactivate', pluginSlug: plugin.slug });

            // Track deactivation error
            trackButtonClick({
              buttonName: 'Deactivate',
              buttonAction: 'product_deactivate',
              plugin: plugin,
              context: {
                action: action,
                result: 'error',
                error_message:
                  result.data?.message ||
                  uiI18n?.notifications?.pluginDeactivationFailed ||
                  'Deactivation failed'
              }
            });
          } else if (action === 'install') {
            setErrorState({ visible: true, type: 'install', pluginSlug: plugin.slug });

            // Track installation error
            trackButtonClick({
              buttonName: 'Install',
              buttonAction: 'product_install',
              plugin: plugin,
              context: {
                action: action,
                result: 'error',
                error_message: result.data?.message || 'Installation failed'
              }
            });
          } else if (action === 'delete') {
            setErrorState({ visible: true, type: 'delete', pluginSlug: plugin.slug });

            // Track deletion error
            trackButtonClick({
              buttonName: 'Delete',
              buttonAction: 'product_delete',
              plugin: plugin,
              context: {
                action: action,
                result: 'error',
                error_message:
                  result.data?.message ||
                  uiI18n?.notifications?.pluginDeletionFailed ||
                  'Deletion failed'
              }
            });
          } else {
            alert(result.data?.message || 'Failed to perform action');
          }
        }
      } catch (err) {
        console.error('Plugin action failed', err);

        // Track network/exception errors for install and activate
        if (action === 'activate' || action === 'install' || action === 'delete') {
          trackButtonClick({
            buttonName:
              action === 'activate' ? 'Activate' : action === 'install' ? 'Install' : 'Delete',
            buttonAction:
              action === 'activate'
                ? 'product_activate'
                : action === 'install'
                  ? 'product_install'
                  : 'product_delete',
            plugin: plugin,
            context: {
              action: action,
              result: 'error',
              error_message: err.message || 'Network error'
            }
          });
        }
      } finally {
        // Only clear pluginInAction if action was not successful
        // For successful actions (activate/deactivate), keep it true until page reload
        if (!actionSuccessful) {
          setPluginInAction((prev) => ({ ...prev, [plugin.slug]: false }));
        }
        // Clear loading state
        setLoadingAction('');
        setLoadingPlugin('');
      }
    },
    [apiBaseUrl, useWPHandlers, wpConfig, uiI18n]
  );

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
    cancelReload,
    loadingAction,
    loadingPlugin,
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
    shouldShowProvision,
    isSpecialPlugin,
    shouldShowPlugin,
    isWpVersionSupported,
    wpVersion,
    activePlugins,
    activeThemeAuthor
  };

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within MarketplaceProvider');
  }
  return context;
};
