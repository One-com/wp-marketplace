import React, {useState, useEffect, useRef, useMemo} from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import { formatPluginPrice, getRebatePrice, getFullPrice } from "../utils/priceFormatter";
import ProductDetail from "./ProductDetail";
import ProductDetailRankMath from "./ProductDetailRankMath";
import ErrorToast from "./ErrorToast";
import SuccessToast from "./SuccessToast";
import "@group.one/gravity";
import ErrorState from "./ErrorState";
import WpVersionErrorState from "./WpVersionErrorState";
import {trackButtonClick, trackPageView, trackPluginDetailVisit} from "../utils/mixpanelTracking";
import { getPluginRedirectUrl, navigateToPluginUrl } from "../utils/redirectUrlHelper";
import { getLatestSubscription, getAjaxAction } from "../utils/common.utils";
import { startPolling } from "../utils/pollingHelper";

export default function Addons() {
    const {
        apiBaseUrl,
        assetsBaseUrl,
        pluginInAction,
        setPluginInAction,
        subscriptionStatus,
        fetchSubscriptionStatus,
        isOnecomBrand,
        plugins,
        setPlugins,
        uiI18n,
        setUiI18n,
        handlePluginAction,
        handleCancelSubsAction,
        subscriptionsList,
        setSubscriptionsList,
        fetchPartnerSubscriptions,
        catalogError,
        setCatalogError,
        catalogLoading,
        setCatalogLoading,
        currentPluginSlug,
        shouldShowProvision,
        isSpecialPlugin,
        shouldShowPlugin,
        isWpVersionSupported,
        openDeleteModal,
        wpConfig,
        setErrorState,
        pendingProcurements,
        setLoadingAction,
        setLoadingPlugin,
    } = useMarketplace();

    const [selectedPlugin, setSelectedPlugin] = useState(null);
    const [featuredPlugins, setFeaturedPlugins] = useState([]);
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const menuRef = useRef(null);

    // Track which plugin slugs have a cancellation in flight (hides Cancel button).
    // Pre-populated from DB-persisted pendingCancellations so the state survives page reloads.
    const [refreshing, setRefreshing] = useState(false);

    const [cancellingSubscriptions, setCancellingSubscriptions] = useState(() => {
        const persisted = (typeof window !== 'undefined' && window.marketplaceConfig?.pendingCancellations) || {};
        return Object.fromEntries(Object.keys(persisted).map(slug => [slug, true]));
    });
    // Store stop-functions for each in-flight cancellation poll, keyed by slug
    const cancelPollingRefs = useRef({});

    // Use ref to track if plugins have already been fetched
    const hasFetchedPlugins = useRef(false);

    // Use ref to track if addons visit has been tracked (prevent duplicates)
    const hasTrackedAddonsVisit = useRef(false);

    // Use ref to track last tracked plugin detail to prevent duplicate tracking
    const lastTrackedPluginSlug = useRef(null);

    // Use ref to store timestamps for tracking
    const contentReceivedTimestamp = useRef(null);
    const contentRenderTimestamp = useRef(null);

    // Use ref to store is_cached flag from API response
    const isCachedRef = useRef(false);

    // Construct icon base URL with fallback logic
    const assetBase = assetsBaseUrl || (typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl) || "";
    const iconBase = assetBase ? `${assetBase}assets/icons/` : "";

    // Get marketplace page URL
    const getMarketplaceUrl = (slug) => {
        const adminUrl = typeof window !== "undefined" && window.marketplaceConfig?.wpConfig?.adminUrl
            ? window.marketplaceConfig.wpConfig.adminUrl
            : '/wp-admin/';
        const menuSlug = typeof window !== "undefined" && window.marketplaceConfig?.menuSlug
            ? window.marketplaceConfig.menuSlug
            : 'onecom-marketplace';
        return `${adminUrl}admin.php?page=${menuSlug}&plugin=${slug}`;
    };

    // Clear subscription list transient and refetch fresh data from API
    const handleRefreshSubscriptions = async () => {
        const ajaxUrl = wpConfig?.ajaxUrl;
        if (!ajaxUrl) return;

        setRefreshing(true);
        setLoadingAction(uiI18n?.notifications?.refreshing || 'Refreshing subscriptions...');
        setLoadingPlugin('');
        try {
            // Clear the server-side transient so the next fetch hits the API
            await fetch(ajaxUrl, {
                method: 'POST',
                body: new URLSearchParams({
                    action: getAjaxAction('clear_subscription_list'),
                    nonce: wpConfig.nonce,
                }),
            });

            // Fetch fresh subscriptions — backend will call the API and store new results
            await fetchPartnerSubscriptions();
        } catch (err) {
            console.error('[Marketplace] Refresh subscriptions error', err);
        } finally {
            setRefreshing(false);
            setLoadingAction('');
            setLoadingPlugin('');
        }
    };

    // Handle "Manage" action
    const handleManageAction = (plugin) => {
        // Track the manage button click
        if (typeof window !== "undefined" && window.marketplaceConfig?.data_consent_status) {
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
        }

        const redirectUrl = getPluginRedirectUrl(plugin, false);
        navigateToPluginUrl(redirectUrl);
    };

    /**
     * Start polling track-status for a cancellation.
     * Used both when the user clicks Cancel and on mount to resume persisted cancellations.
     */
    const startCancellationPolling = (slug, subscriptionId) => {
        const ajaxUrl = wpConfig?.ajaxUrl;
        if (!ajaxUrl || !subscriptionId) return;

        if (cancelPollingRefs.current[slug]) {
            cancelPollingRefs.current[slug]();
        }

        const stopPolling = () => {
            fetch(ajaxUrl, {
                method: 'POST',
                body: new URLSearchParams({
                    action: getAjaxAction('clear_pending_cancellation'),
                    nonce: wpConfig.nonce,
                    slug,
                }),
            });
            setCancellingSubscriptions(prev => {
                const next = { ...prev };
                delete next[slug];
                return next;
            });
        };

        cancelPollingRefs.current[slug] = startPolling({
            ajaxUrl,
            nonce: wpConfig.nonce,
            action: getAjaxAction('track_status'),
            params: { subscriptionId, resourceType: 'cancellation', locale: window.marketplaceConfig?.locale || '' },
            interval: 10000,
            onResult: (pollResult) => {
                const data = pollResult?.data?.data;
                const status = data?.status;

                if (status === 'canceled') {
                    stopPolling();
                    fetchPartnerSubscriptions();
                    return true;
                }

                if (status === 'pending' || status === 'pending_cancellation') {
                    return false; // keep polling
                }

                // Unknown / error status
                stopPolling();
                setErrorState({ visible: true, type: 'cancel_subscription', pluginSlug: slug, message: pollResult?.error || pollResult?.data?.message || pollResult?.data?.error || null });
                return true;
            },
            onError: (error) => {
                console.error('[Marketplace] Cancel polling error', error);
                stopPolling();
                setErrorState({ visible: true, type: 'cancel_subscription', pluginSlug: slug, message: error.message || null });
            },
        });
    };

    /**
     * Handle "Cancel subscription" click:
     * 1. Call marketplace_unsubscribe (DELETE via PHP proxy).
     * 2. Check response status:
     *    - 'canceled' immediately → refresh subscription list.
     *    - 'pending_cancellation' → persist to DB, mark as cancelling, start polling.
     */
    const handleCancelClick = (plugin, subscriptionId) => {
        const ajaxUrl = wpConfig?.ajaxUrl;
        if (!ajaxUrl || !subscriptionId) return;

        fetch(ajaxUrl, {
            method: 'POST',
            body: new URLSearchParams({
                action: getAjaxAction('unsubscribe'),
                nonce: wpConfig.nonce,
                subscriptionId,
                locale: window.marketplaceConfig?.locale || '',
            }),
        })
            .then(r => r.json())
            .then(result => {
                if (!result.success) {
                    setErrorState({ visible: true, type: 'cancel_subscription', pluginSlug: plugin.slug, message: result?.error || result?.error || result?.data?.message || result?.data?.error || null });
                    return;
                }

                const responseData = result?.data?.data;
                const status = responseData?.status;

                if (status === 'canceled') {
                    // Immediately canceled — refresh list, no polling needed
                    fetchPartnerSubscriptions();
                    return;
                }

                if (status === 'pending_cancellation') {
                    // Persist to DB and start polling
                    setCancellingSubscriptions(prev => ({ ...prev, [plugin.slug]: true }));

                    fetch(ajaxUrl, {
                        method: 'POST',
                        body: new URLSearchParams({
                            action: getAjaxAction('save_pending_cancellation'),
                            nonce: wpConfig.nonce,
                            slug: plugin.slug,
                            subscriptionId,
                        }),
                    });

                    startCancellationPolling(plugin.slug, subscriptionId);
                    return;
                }

                // Any other status — show error and exit
                setErrorState({ visible: true, type: 'cancel_subscription', pluginSlug: plugin.slug, message: result?.error || result?.data?.message || result?.data?.error || null });
            })
            .catch(err => {
                console.error('[Marketplace] Unsubscribe error', err);
                setErrorState({ visible: true, type: 'cancel_subscription', pluginSlug: plugin.slug, message: err.message || null });
            });
    };

    // On mount: resume polling for any DB-persisted pending cancellations,
    // and stop all polls on unmount.
    useEffect(() => {
        const persisted = (typeof window !== 'undefined' && window.marketplaceConfig?.pendingCancellations) || {};
        Object.entries(persisted).forEach(([slug, data]) => {
            if (data?.subscriptionId) {
                startCancellationPolling(slug, data.subscriptionId);
            }
        });

        const refs = cancelPollingRefs.current;
        return () => { Object.values(refs).forEach(stop => stop()); };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    //Get a subscription list
  useEffect(() => {
    fetchPartnerSubscriptions();
  }, [fetchPartnerSubscriptions]);

  // Synchronously merge plugins with subscriptions — no extra render cycle.
  // Works even when subscriptionsList is empty (plugins without subscriptions
  // still appear; they just get subscriptions:[] and hasSubscription:false).
  const mergedPlugins = useMemo(() => {
    if (!plugins?.length) return [];

    // Group subscriptions by productId (safe when subscriptionsList is empty)
    const subscriptionMap = (subscriptionsList || []).reduce((acc, sub) => {
      if (!acc[sub.productId]) {
        acc[sub.productId] = [];
      }
      acc[sub.productId].push(sub);
      return acc;
    }, {});

    // Merge subscription data into every plugin
    return plugins.map((plugin) => ({
      ...plugin,
      subscriptions: subscriptionMap[plugin.productId] || [],
      hasSubscription: !!subscriptionMap[plugin.productId]?.length,
    }));
  }, [plugins, subscriptionsList]);

    // Fetch plugins from API
    useEffect(() => {
        if (hasFetchedPlugins.current) return;
        hasFetchedPlugins.current = true;

        setCatalogLoading(true);
        setCatalogError(null);

        fetch(apiBaseUrl)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                // Capture timestamp when content is received
                contentReceivedTimestamp.current = Date.now();
                return res.json();
            })
            .then((data) => {
                // Check if response was cached
                if (data.is_cached || data.cached) {
                    isCachedRef.current = true;
                }

                if (data.success && data.data && data.data.catalog) {
                    const allPlugins = data.data.catalog;
                    setPlugins(allPlugins);

                    // Check activation status of Rank Math plugins
                    const rankMathActivated = allPlugins.find(p => p.slug === "seo-by-rank-math")?.activated === true;
                    const rankMathProActivated = allPlugins.find(p => p.slug === "seo-by-rank-math-pro")?.activated === true;

                    // Filter featured plugins and get top 3
                    // Hide if it is already active on the site
                    const featured = allPlugins
                        .filter(plugin => {
                            // Apply visibility rules
                            if (!shouldShowPlugin(plugin)) {
                                return false;
                            }

                            // Skip activated plugins
                            if (plugin.activated === true || (plugin.featured !== true && plugin.featured !== "true")) {
                                return false;
                            }

                            // Handle Rank Math plugin visibility
                            if (plugin.slug === "seo-by-rank-math") {
                                // Show seo-by-rank-math only if BOTH plugins are NOT activated
                                return !rankMathActivated && !rankMathProActivated;
                            }

                            if (plugin.slug === "seo-by-rank-math-pro") {
                                // Show seo-by-rank-math-pro only if seo-by-rank-math IS activated
                                return rankMathActivated;
                            }

                            return true;
                        })
                        .sort((a, b) => {
                            const orderA = a.displayOrder !== undefined ? parseInt(a.displayOrder) : Infinity;
                            const orderB = b.displayOrder !== undefined ? parseInt(b.displayOrder) : Infinity;
                            return orderA - orderB;
                        })
                        .slice(0, 3);

                    setFeaturedPlugins(featured);

                    // Set UI i18n if available
                    const uiI18nData = data.data.uiI18n || data.data.ui_i18n;
                    if (uiI18nData) {
                        setUiI18n(uiI18nData);
                    }

                    // Fetch subscription status for special plugins (wp-rocket, rank-math-pro)
                    if (isOnecomBrand) {
                        const specialPlugins = allPlugins.filter(p => isSpecialPlugin(p.slug));

                        // Fetch subscription status for each special plugin
                        specialPlugins.forEach(plugin => {
                            fetchSubscriptionStatus(plugin.slug);
                        });
                    }
                } else {
                    // Track page view with content render failure
                    trackPageView({
                        category: 'addons_page',
                        itemName: 'Addons Page',
                        isContentRendered: false,
                    });
                    throw new Error("Invalid API response structure");
                }
            })
            .catch((err) => {
                console.error("Failed to fetch plugins:", err);
                // Track page view with content render failure
                trackPageView({
                    category: 'addons_page',
                    itemName: 'Addons Page',
                    isContentRendered: false,
                });
                setCatalogError(err.message || "Failed to load plugins");
            })
            .finally(() => {
                setCatalogLoading(false);
            });
    }, [apiBaseUrl, setPlugins, setUiI18n, setCatalogError, setCatalogLoading, shouldShowPlugin]);

    // After plugins load, select plugin from URL if present
    useEffect(() => {
        if (currentPluginSlug && plugins.length) {
            const match = plugins.find(p => p.slug === currentPluginSlug);
            if (match) setSelectedPlugin(match);
        } else if (!currentPluginSlug) {
            setSelectedPlugin(null);
        }
    }, [currentPluginSlug, plugins]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuIndex(null);
            }
        };

        if (openMenuIndex !== null) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openMenuIndex]);

    // Track addons page visit when plugins are loaded and no plugin detail is shown
    useEffect(() => {
        if (!catalogLoading && !catalogError && plugins.length > 0 && !currentPluginSlug && !hasTrackedAddonsVisit.current) {
            // Capture timestamp when content is rendered to the page
            contentRenderTimestamp.current = Date.now();

            // Check if this is a reload caused by plugin activation
            const skipPageView = sessionStorage.getItem('mp_skip_page_view');
            if (skipPageView === 'true') {
                // Clear the flag and skip tracking
                sessionStorage.removeItem('mp_skip_page_view');
            } else {
                // Normal page load, track the visit
                trackPageView({
                    category: 'addons_page',
                    itemName: 'Addons Page',
                    contentReceivedAt: contentReceivedTimestamp.current,
                    contentRenderedAt: contentRenderTimestamp.current,
                    isCached: isCachedRef.current,
                });
            }

            hasTrackedAddonsVisit.current = true;
        }
    }, [catalogLoading, catalogError, plugins.length, currentPluginSlug]);


    // Determine which detail component to use
    const shouldUseRankMathDetail = (plugin) => {
        return plugin && plugin.slug === 'seo-by-rank-math';
    };



    // Show loading state
    if (catalogLoading) {
        return (
            <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap" >
              <div className="gv-skeleton gv-heading-lg gv-mb-sm" style={{ width: '13%' }}></div>
              <div className="gv-skeleton gv-text-sm gv-mb-fluid" style={{ width: '33%' }}></div>

              <div className="gv-flex gv-justify-between gv-items-start">
                <div className="gv-w-full">
              <div className="gv-skeleton gv-heading-sm gv-mb-sm" style={{ width: '13%' }}></div>
              <div className="gv-skeleton gv-text-sm gv-mb-md" style={{ width: '33%' }}></div>
                </div>
                <div className="gv-skeleton gv-text-sm gv-mb-md" style={{ width: '13%' }}></div>
                </div>
                <div className="product-grid gv-grid gv-gap-lg gv-mob-grid-cols-1 gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3 gv-skeleton-loader">
                    {[0, 1, 2].map((index) => (
                        <div key={index} className="gv-card gv-gap-md gv-content-container gv-p-lg gv-grid gv-grid-cols-12 gv-radius">
                            <div className="gv-desk-span-2 gv-span-3 gv-tab-span-3">
                                <div className="gv-skeleton gv-icon-tile"></div>
                            </div>
                            <div className="gv-desk-span-8 gv-tab-span-7 gv-span-7">
                                <div className="gv-skeleton gv-mb-xs" style={{ height: '20px', width: '70%' }}></div>
                                <div className="gv-skeleton gv-mb-sm" style={{ height: '16px', width: '100%' }}></div>
                                <div className="gv-skeleton" style={{ height: '16px', width: '40%' }}></div>
                            </div>
                            <div className="gv-span-2 gv-content-center gv-text-right">
                                <div className="gv-skeleton" style={{ height: '24px', width: '24px' }}></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="gv-data-table gv-mt-lg gv-overflow-x-auto gv-skeleton-loader">
                    <table className="gv-col-5-shrink gv-col-6-shrink">
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"><div className="gv-skeleton" style={{ height: '16px', width: '50px' }}></div></th>
                            <th scope="col"><div className="gv-skeleton" style={{ height: '16px', width: '50px' }}></div></th>
                            <th scope="col"><div className="gv-skeleton" style={{ height: '16px', width: '50px' }}></div></th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {[0, 1].map((index) => (
                            <tr key={index}>
                                <td style={{ width: "80px" }}>
                                    <div className="gv-skeleton gv-icon-tile"></div>
                                </td>
                                <td><div className="gv-skeleton gv-text-sm" ></div></td>
                                <td><div className="gv-skeleton gv-text-sm" ></div></td>
                                <td><div className="gv-skeleton gv-text-sm" ></div></td>
                                <td><div className="gv-skeleton gv-text-sm" style={{width: '24px' }}></div></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }

    // Show error state
    if (catalogError) {
        return (
          <ErrorState />
        );
    }
  // Show WP version error state
  if (!isWpVersionSupported('6.2')) {
    return (
      <WpVersionErrorState />
    );
  }

    // Filter plugins for the table: installed OR special plugins with subscription
    // Exclude plugins that only have canceled subscriptions and are not installed
    // Show plugin if it has a subscription that is either active OR canceled but not yet expired
    const hasValidSubscription = (p) => p.hasSubscription && p.subscriptions.some(
        s => s.status === 'active' || (s.status === 'canceled' && s.expiresAt && new Date(s.expiresAt) > new Date())
    );
    const brand = typeof window !== "undefined" && window.marketplaceConfig?.brand;
    const rankMathSlugs = ['seo-by-rank-math', 'seo-by-rank-math-pro'];
    const installedPlugins = mergedPlugins.filter(p => {
        // Hide Rank Math plugins from addons list when brand is rankmath
        if (brand === 'rankmath' && rankMathSlugs.includes(p.slug)) return false;
        return p.installed || shouldShowProvision(p) || hasValidSubscription(p) || !!pendingProcurements?.[p.slug];
    });



  /**
   * Formats a date string to DD/MM/YYYY format.
   * @param dateString
   * @returns {string}
   */
  const formatDateDDMMYYYY = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  /**
   * Get plugin status based on subscription status.
   * @param plugin
   * @param latestSubscription
   * @param uiI18n
   * @param isProvisionable
   * @returns {boolean|number|string|ServiceWorker|string|*|SyncHook<Error>}
   */
  const getPluginStatus = (plugin, latestSubscription, uiI18n, isProvisionable) => {
    const labels = uiI18n?.labels || {};

    // 0. Pending procurement (Buy Now triggered, waiting for subscription to activate)
    if (pendingProcurements?.[plugin.slug]) {
      return labels?.orderBeingProcessed || 'Order being processed…';
    }

    // 1. If subscription exists
    if (latestSubscription) {
      const status = latestSubscription.status;

      // Pending → highest priority
      if (status === 'pending') {
        return labels?.subscriptionInProgress || 'Subscription in progress';
      }

      // Failed → show failure
      if (status === 'failed') {
        return labels?.failed || 'Failed';
      }

      // Active subscription
      if (status === 'active') {
        if (!plugin.installed) {
          return labels?.notInstalled || 'Not Installed';
        }

        if (plugin.activated) {
          return labels?.active || 'Active';
        }

        return labels?.notActive || 'Not Active';
      }

    }

    // 2. Fallback (no subscription)
    if (plugin.activated) {
      return labels?.active || 'Active';
    }

    if (isProvisionable) {
      return labels?.notInstalled || 'Not Installed';
    }

    return labels?.notActive || 'Not Active';
  };

  const renderPluginAction = (
    plugin,
    latestSubscription,
    isProvisionable,
    uiI18n,
    handleProvisionClick,
    handlePluginAction
  ) => {
    const labels = uiI18n || {};

    if (latestSubscription) {
      const status = latestSubscription.status;

      // 1. Pending → no action
      if (status === 'pending') {
        return null;
      }

      // 2. Failed → no action (updated)
      if (status === 'failed') {
        return null;
      }

      // 3. Active subscription
      if (status === 'active') {
        const download_url = latestSubscription?.accessDetails?.downloadUrl;
        if (!plugin.installed) {
          return (
            <a
              href="#"
              className="gv-action"
              onClick={(e) => {
                e.preventDefault();
                handlePluginAction('install', plugin, 'addons', download_url);
              }}
            >
              {labels?.installButton || 'Install'}
            </a>
          );
        }

        if (!plugin.activated) {
          return (
            <a
              href="#"
              className="gv-action"
              onClick={(e) => {
                e.preventDefault();
                handlePluginAction('activate', plugin, 'addons');
              }}
            >
              {labels?.activateButton || 'Activate'}
            </a>
          );
        }

        return null;
      }

      // 4. Cancelled but still within the valid period
      if (status === 'canceled') {
        const isStillValid = latestSubscription?.expiresAt && new Date(latestSubscription.expiresAt) > new Date();
        if (isStillValid) {
          if (!plugin.installed) {
            return (
              <a
                href="#"
                className="gv-action"
                onClick={(e) => {
                  e.preventDefault();
                  handlePluginAction('install', plugin, 'addons', latestSubscription?.accessDetails?.downloadUrl);
                }}
              >
                {labels?.installButton || 'Install'}
              </a>
            );
          }

          if (!plugin.activated) {
            return (
              <a
                href="#"
                className="gv-action"
                onClick={(e) => {
                  e.preventDefault();
                  handlePluginAction('activate', plugin, 'addons');
                }}
              >
                {labels?.activateButton || 'Activate'}
              </a>
            );
          }
        }

        return null;
      }
    }

    // 4. Fallback (no subscription)
    if (isProvisionable) {
      return (
        <a
          href="#"
          className="gv-action"
          onClick={handleProvisionClick}
        >
          {labels?.installAndActivate || 'Install and activate'}
        </a>
      );
    }

    if (!plugin.activated) {
      return (
        <a
          href="#"
          className="gv-action"
          onClick={(e) => {
            e.preventDefault();
            handlePluginAction('activate', plugin, 'addons');
          }}
        >
          {labels?.activateButton || 'Activate'}
        </a>
      );
    }

    return null;
  };

    return (
        <div className="marketplace-container gv-flex gv-flex-col">
          <div className="addons-header-wrap">
            <h3>{uiI18n?.headings?.myProducts}</h3>
            <p className="gv-text-sm">{uiI18n?.text?.myProducts}</p>
          </div>
          {featuredPlugins.length > 0 && (
            <section className="addons-section gv-mt-fluid">
              <div className="addons-header-container gv-flex gv-max-mob-flex-col gv-justify-between gv-items-start gv-tab-gap-lg">
                <div className="heading-container gv-flex-1">
                  <p
                    className="gv-text-bold gv-text-lg gv-mb-xs">{uiI18n?.headings?.recommendedProducts}</p>
                  <p className="gv-text-sm gv-mb-md">{uiI18n?.text?.recommendedText}</p>
                </div>
                <div className="gv-flex gv-gap-sm gv-flex-shrink-0">
                  <button
                    className="gv-button gv-button-primary gv-mode-condensed"
                    onClick={() => {
                      // Navigate to the main marketplace page
                      const adminUrl = typeof window !== "undefined" && window.marketplaceConfig?.wpConfig?.adminUrl
                        ? window.marketplaceConfig.wpConfig.adminUrl
                        : '/wp-admin/';
                      const menuSlug = typeof window !== "undefined" && window.marketplaceConfig?.menuSlug
                        ? window.marketplaceConfig.menuSlug
                        : 'onecom-marketplace';
                      window.location.href = `${adminUrl}admin.php?page=${menuSlug}`;
                    }}
                  >
                    {uiI18n.seeAllProducts}
                    <gv-icon aria-hidden="true" src={`${iconBase}arrow_right.svg`} alt="See all products"></gv-icon>
                  </button>
                </div>

              </div>
                <div
                  className="product-grid gv-grid gv-gap-lg gv-mob-grid-cols-1 gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3 gv-mt-md">
                  {featuredPlugins.map((plugin) => {
                      const isProvisionable = shouldShowProvision(plugin);
                      const freeLabel = (plugin.i18n.freeTrialPeriod && plugin.i18n.freeTrialPeriod.trim() !== '')
                        ? plugin.i18n.freeTrialPeriod
                        : (uiI18n?.labels?.free || 'Free');
                      const price = formatPluginPrice(plugin, freeLabel, uiI18n);
                      const fullPriceAmount = getFullPrice(plugin);
                      const rebatePriceAmount = getRebatePrice(plugin);

                      return (
                        <div
                            key={plugin.slug}
                            className="gv-card gv-gap-sm gv-content-container gv-p-lg gv-grid gv-grid-cols-12 gv-radius ocmp-plugin-cards"
                            onClick={() => {
                                window.location.href = getMarketplaceUrl(plugin.slug);
                            }}
                        >
                          <div className="gv-desk-span-2 gv-span-2 gv-tab-span-2">
                            <img
                              className="gv-icon-tile"
                              src={plugin.iconUrl || `${iconBase}add_box.svg`}
                              alt={plugin.name}
                            />
                          </div>
                          <div className="gv-desk-span-9 gv-tab-span-9 gv-span-9 gv-ml-sm">
                            <div className="gv-flex gv-flex-col gv-justify-between gv-h-full">
                              <p className="gv-text-sm gv-text-bold gv-mb-xs">{plugin.name}</p>
                              <p className="oc-card-content gv-text-on-alternative gv-mb-sm gv-text-sm gv-flex-1">
                                {plugin.i18n.listingDescription || plugin.i18n.subtitle}
                              </p>
                              <span className="gv-caption-lg gv-text-bold">
                                  <>
                                      {plugin.licenseType === "premium" && (rebatePriceAmount > 0)
                                        ? (rebatePriceAmount !== null ? rebatePriceAmount : fullPriceAmount)
                                        : price}
                                      {plugin.licenseType !== "free" &&
                                        price &&
                                        price !== freeLabel &&
                                        price !== (uiI18n?.labels?.freeUntilRenewal || 'Free until renewal') &&
                                        <span className="gv-period">/{uiI18n?.labels?.timeMonth}</span>}
                                  </>
                              </span>
                            </div>
                          </div>
                          <div className="gv-span-1 gv-content-center gv-text-right">
                            <div
                              className="gv-reset-button"
                              style={{display: "inline-block"}}
                              aria-label={`View details for ${plugin.name}`}
                            >
                              <img
                                className="gv-tile"
                                src={`${iconBase}arrow_forward.svg`}
                                alt={`View ${plugin.name} details`}
                                style={{minWidth: "24px"}}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
              </section>
          )}

          {/* Entry point for addons list */}
          {installedPlugins.length > 0 && (
            <section className="addons-section gv-mt-fluid">
              <div className="gv-flex gv-justify-end gv-mt-0">
                <button
                  className="gv-button gv-button-secondary gv-mode-condensed"
                  disabled={refreshing}
                  onClick={handleRefreshSubscriptions}
                >
                  <gv-icon aria-hidden="true" src={`${iconBase}refresh.svg`}></gv-icon>
                  <span>{refreshing ? (uiI18n?.labels?.refreshing || 'Refreshing...') : (uiI18n?.labels?.refresh || 'Refresh')}</span>
                </button>
              </div>
              <div className="gv-data-table gv-mt-lg gv-addons-table">
                <table className="gv-col-5-shrink gv-col-6-shrink">
                  <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">{uiI18n?.labels?.name}</th>
                    <th scope="col">{uiI18n?.labels?.type || 'Type'}</th>
                    <th scope="col">{uiI18n?.labels?.subscriptions || 'Subscription'}</th>
                    <th scope="col">{uiI18n?.labels?.status}</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                  </thead>
                  <tbody>
                  {installedPlugins.map((plugin, index) => {
                    const isProvisionable = shouldShowProvision(plugin);

                    const handleProvisionClick = (e) => {
                      e.preventDefault();

                      // Dispatch custom event for provisioning
                      const event = new CustomEvent("onecom-plugin-provision", {
                        detail: {
                          slug: plugin.slug,
                        },
                        bubbles: true,
                        cancelable: true,
                        composed: true
                      });
                      document.dispatchEvent(event);
                    };

                    //Get subscription details
                    const latestSubscription = (plugin.hasSubscription) ? getLatestSubscription(plugin.subscriptions) : null;
                    const latestSubsDate = (latestSubscription !== null) ? formatDateDDMMYYYY(latestSubscription.expiresAt) : '-';
                    const renewalDate = (latestSubscription !== null && latestSubscription.renewsAt != null) ? `Renews at: ${formatDateDDMMYYYY(latestSubscription.renewsAt)}` : null
                    const isCancelledButValid = latestSubscription?.status === 'canceled' && latestSubscription?.expiresAt && new Date(latestSubscription.expiresAt) > new Date();
                    return (
                      <tr id={plugin.slug} key={plugin.slug}>
                        {/* Image */}
                        <td style={{width: "80px"}}>
                          <img
                            src={plugin.iconUrl || `${iconBase}add_box.svg`}
                            alt={plugin.name}
                            className="gv-icon-tile"
                            style={{maxWidth: "auto"}}
                          />
                        </td>
                        {/* Image End */}

                        {/* Plugin name */}
                        <td><p>{plugin.name}</p></td>
                        {/* Plugin name end */}

                        {/* Plugin type */}
                        <td>
                          {plugin.licenseType === 'free' ? (
                            <div className="gv-badge gv-badge-generic">{uiI18n?.labels?.freeLabel || 'FREE'}</div>
                          ) : (
                            <div className="gv-badge gv-badge-info">{uiI18n?.labels?.premiumLabel || 'PREMIUM'}</div>
                          )}
                        </td>
                        {/* Plugin type end */}

                        {/* Plugin subscription */}
                        <td>{!pendingProcurements?.[plugin.slug] && latestSubscription?.status !== 'pending' && latestSubsDate !== '-' ? (
                          <>
                            {latestSubscription?.status === 'expired' ? (
                              <p>{uiI18n?.labels?.expiredOn || 'Expired on'}: {latestSubsDate}</p>
                            ) : latestSubscription?.status === 'canceled' ? (
                              <p>{uiI18n?.labels?.expiresOn || 'Expires'}: {latestSubsDate}</p>
                            ) : (
                              <p>{uiI18n?.labels?.renewsOn || 'Renews'}: {latestSubsDate}</p>
                            )}
                            {latestSubscription?.status === 'expired' ? (
                              <div className="gv-underline"><p style={{ color: 'red' }}>{uiI18n?.labels?.subscriptionExpired || 'Subscription expired'}</p></div>
                            ) : latestSubscription?.status === 'canceled' ? (
                              !isCancelledButValid ? (
                                <div className="gv-underline"><p style={{ color: 'red' }}>{uiI18n?.labels?.subscriptionExpired || 'Subscription expired'}</p></div>
                              ) : (
                                <div className="gv-underline"><p class="gv-text-on-alternative">{uiI18n?.labels?.subscriptionCanceled || 'Subscription cancelled'}</p></div>
                              )
                            ) : (
                              <div className="gv-underline"><p class="gv-text-secondary">{uiI18n?.labels?.subscriptionActive || 'Subscription active'}</p></div>
                            )}
                          </>
                        ) : (
                          <p>-</p>
                        )}</td>
                        {/* Plugin subscription end */}

                        {/* Plugin status */}
                        <td>
                          {cancellingSubscriptions[plugin.slug] ? (
                            <div className="gv-text-indicator">
                              <span className="gv-indicator gv-state-attention"></span>
                              <span> {uiI18n?.labels?.cancellationInProgress || 'Cancellation in progress..'}</span>
                            </div>
                          ) : (
                            <div className="gv-text-indicator">
                              <span
                                className={pendingProcurements?.[plugin.slug] || plugin.activated ? "gv-indicator gv-state-positive" : "gv-indicator gv-state-informative"}></span>
                              <span> {getPluginStatus(plugin, latestSubscription, uiI18n, isProvisionable)}</span>
                            </div>
                          )}
                        </td>
                        {/* Plugin status end */}

                        {/* Plugin actions */}
                        <td>
                          {!pendingProcurements?.[plugin.slug] && renderPluginAction(plugin, latestSubscription, isProvisionable, uiI18n, handleProvisionClick, handlePluginAction)}
                        </td>
                        {/* Plugin actions end */}

                        {/* Menu actions */}
                        <td>
                          {(plugin.activated || (plugin.installed && !isProvisionable) || (latestSubscription?.status === 'active')) && (
                            <div className="gv-pos-relative" ref={openMenuIndex === index ? menuRef : null}>
                              <button
                                type="button"
                                aria-label="Toggle menu"
                                className="gv-reset-button"
                                onClick={() => setOpenMenuIndex(openMenuIndex === index ? null : index)}
                              >
                                <gv-icon aria-hidden="true" src={`${iconBase}more_horiz.svg`}></gv-icon>
                              </button>
                              <div
                                className={`gv-contextual-menu gv-pos-right ${openMenuIndex === index ? '' : 'gv-invisible'}`}>

                                <div className="gv-menu">
                                  <button
                                    type="button"
                                    className="gv-btn-close"
                                    aria-label="Close"
                                    onClick={() => setOpenMenuIndex(null)}
                                  >
                                    <gv-icon aria-hidden="true" src={`${iconBase}close.svg`}></gv-icon>
                                  </button>
                                  <ul>
                                    {plugin.activated && (
                                    <li className="gv-mb-0">

                                        <a
                                          href="#"
                                          className="gv-menu-item"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setOpenMenuIndex(null);
                                            handleManageAction(plugin);
                                          }}
                                        >
                                          <gv-icon aria-hidden="true" src={`${iconBase}settings.svg`}></gv-icon>
                                          <span>{uiI18n?.labels?.manage || 'Manage'}</span>
                                        </a>

                                    </li>
                                        )}
                                    {plugin.activated && (
                                    <li className="gv-mb-0">

                                        <a
                                          href="#"
                                          className="gv-menu-item"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setOpenMenuIndex(null);
                                            handlePluginAction('deactivate', plugin, 'addons');
                                          }}
                                        >
                                          <gv-icon aria-hidden="true" src={`${iconBase}cancel.svg`}></gv-icon>
                                          <span>{uiI18n?.deactivate || 'Deactivate'}</span>
                                        </a>

                                    </li>
                                    )}
                                    <li className="gv-mb-0">
                                      {!plugin.activated && plugin.installed && (
                                        <a
                                          href="#"
                                          className="gv-menu-item"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setOpenMenuIndex(null);
                                            openDeleteModal(plugin);
                                          }}
                                        >
                                          <gv-icon aria-hidden="true" src={`${iconBase}delete.svg`}></gv-icon>
                                          <span>{uiI18n?.deleteButton || 'Delete'}</span>
                                        </a>
                                      )}
                                    </li>


                                    <li className="gv-mb-0">
                                      {latestSubscription?.status === 'active' && !cancellingSubscriptions[plugin.slug] && (
                                        <button
                                          className="gv-menu-item"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setOpenMenuIndex(null);
                                            handleCancelClick(plugin, latestSubscription.subscriptionId);
                                          }}
                                        >
                                          <gv-icon aria-hidden="true" src={`${iconBase}cancel.svg`}></gv-icon>
                                          <span>{uiI18n?.cancel || 'Cancel'}</span>
                                        </button>
                                      )}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}
                        </td>
                        {/* Menu actions end */}
                      </tr>
                    );
                  })}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <ErrorToast />
          <SuccessToast />

          {/* Render detail overlay when plugin is selected */}
          {selectedPlugin && !currentPluginSlug && (() => {
            const DetailComponent = shouldUseRankMathDetail(selectedPlugin) ? ProductDetailRankMath : ProductDetail;
            return (
              <DetailComponent
                plugin={selectedPlugin}
                onClose={() => setSelectedPlugin(null)}
                loading={catalogLoading}
              />
            );
          })()}
        </div>
    );
}
