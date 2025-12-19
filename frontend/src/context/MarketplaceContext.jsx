import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { trackButtonClick } from '../utils/mixpanelTracking';

const MarketplaceContext = createContext(null);

export const MarketplaceProvider = ({
  children,
  apiBaseUrl,
  useWPHandlers,
  wpConfig,
  enableDefaultStyles,
  assetsBaseUrl,
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
  const [catalogError, setCatalogError] = useState(false);
  const [catalogLoading, setCatalogLoading] = useState(true);

  // Use ref to track which subscriptions have been checked to avoid recreation of fetchSubscriptionStatus
  const checkedSubscriptionsRef = useRef({});

  // Use ref to track reload timeout so it can be cancelled if user navigates
  const reloadTimeoutRef = useRef(null);

  const brand = typeof window !== 'undefined' && window.marketplaceConfig?.brand;
  const isOnecomBrand = brand === 'onecom';

  // Fetch subscription status for special plugins (wp-rocket, rank-math-pro)
  const fetchSubscriptionStatus = useCallback(
    async pluginSlug => {
      if (!isOnecomBrand) return;

      const isSpecialPlugin = pluginSlug === 'wp-rocket' || pluginSlug === 'seo-by-rank-math-pro';
      if (!isSpecialPlugin) return;

      // If already checked or checking, skip
      if (checkedSubscriptionsRef.current[pluginSlug]) {
        return;
      }

      // Mark as being checked
      checkedSubscriptionsRef.current[pluginSlug] = true;
      setIsCheckingSubscription(prev => ({ ...prev, [pluginSlug]: true }));

      try {
        const ajaxUrl =
          typeof window.marketplaceConfig !== 'undefined' &&
          window.marketplaceConfig?.wpConfig?.ajaxUrl;
        if (!ajaxUrl) {
          console.warn('ajaxUrl not available in marketplaceConfig');
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
          body: formData,
        });

        const json = await res.json();
        console.log(`[MarketplaceContext] Subscription status response for ${pluginSlug}:`, json);

        setSubscriptionStatus(prev => ({ ...prev, [pluginSlug]: json.is_purchased }));
      } catch (e) {
        console.error(
          `[MarketplaceContext] Failed to fetch subscription status for ${pluginSlug}`,
          e
        );
        setSubscriptionStatus(prev => ({ ...prev, [pluginSlug]: false }));
      } finally {
        setIsCheckingSubscription(prev => ({ ...prev, [pluginSlug]: false }));
      }
    },
    [isOnecomBrand]
  );

  // Function to cancel scheduled reload (called when user clicks "Get Started")
  const cancelReload = useCallback(() => {
    if (reloadTimeoutRef.current) {
      clearTimeout(reloadTimeoutRef.current);
      reloadTimeoutRef.current = null;
    }
  }, []);

  // Handle plugin actions (install, activate, deactivate)
  const handlePluginAction = useCallback(
    async (action, plugin) => {
      // Check if this is Imagify plugin activation (handles 302 redirect case)
      const isImagifyActivation = action === 'activate' && plugin.slug === 'imagify';

      setPluginInAction(prev => ({ ...prev, [plugin.slug]: true }));

      // Use ref to track if activation was successful (to prevent finally block from clearing pluginInAction)
      let activationSuccessful = false;

      // Set loading state for overlay using API response keys
      const pluginName = plugin.name || plugin.slug;
      let loadingMessage = '';

      if (action === 'activate') {
        const activatingMsg = uiI18n?.notifications?.activating || 'Activating {0}';
        loadingMessage = activatingMsg.replace('{0}', pluginName);
      } else if (action === 'install') {
        const installingMsg = uiI18n?.notifications?.installing || 'Installing {0}';
        loadingMessage = installingMsg.replace('{0}', pluginName);
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
          fetch(url, { method: 'POST' }).catch(err => {
            console.log('Imagify activation request initiated, reload will proceed');
          });

          // Show success notice after delay
          setTimeout(() => {
            setNoticeState({ visible: true, type: 'activated', pluginSlug: plugin.slug });

            // Track successful Imagify activation
            trackButtonClick({
              buttonName: 'Activate',
              buttonAction: 'product_activate',
              plugin: plugin,
              context: {
                action: action,
                result: 'success',
                special_case: 'imagify_redirect',
              },
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
            setPlugins(prev =>
              prev.map(p =>
                p.slug === plugin.slug ? { ...p, installed: true, activated: true } : p
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

            // Track successful install
            trackButtonClick({
              buttonName: 'Install',
              buttonAction: 'product_install',
              plugin: plugin,
              context: {
                action: action,
                result: 'success',
              },
            });
          } else if (action === 'activate' && result.data.activated) {
            activationSuccessful = true; // Mark activation as successful to prevent finally block from clearing pluginInAction
            setNoticeState({ visible: true, type: 'activated', pluginSlug: plugin.slug });

            // Track successful activate
            trackButtonClick({
              buttonName: 'Activate',
              buttonAction: 'product_activate',
              plugin: plugin,
              context: {
                action: action,
                result: 'success',
              },
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
            return; // Skip finally block (though finally will still execute, activationSuccessful flag prevents clearing)
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
                error_message: result.data?.message || 'Activation failed',
              },
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
                error_message: result.data?.message || 'Installation failed',
              },
            });
          } else {
            alert(result.data?.message || 'Failed to perform action');
          }
        }
      } catch (err) {
        console.error('Plugin action failed', err);

        // Track network/exception errors for install and activate
        if (action === 'activate' || action === 'install') {
          trackButtonClick({
            buttonName: action === 'activate' ? 'Activate' : 'Install',
            buttonAction: action === 'activate' ? 'product_activate' : 'product_install',
            plugin: plugin,
            context: {
              action: action,
              result: 'error',
              error_message: err.message || 'Network error',
            },
          });
        }
      } finally {
        // Only clear pluginInAction if activation was not successful
        // For successful activations, keep it true until page reload
        if (!activationSuccessful) {
          setPluginInAction(prev => ({ ...prev, [plugin.slug]: false }));
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
    allPluginsActivated,
    setAllPluginsActivated,
    catalogError,
    setCatalogError,
    catalogLoading,
    setCatalogLoading,
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
