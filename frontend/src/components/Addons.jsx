import React, { useState, useEffect, useRef } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatPluginPrice, getRebatePrice, getFullPrice } from '../utils/priceFormatter';
import ProductDetail from './ProductDetail';
import ProductDetailRankMath from './ProductDetailRankMath';
import ErrorToast from './ErrorToast';
import SuccessToast from './SuccessToast';
import '@group.one/gravity';
import ErrorState from './ErrorState';
import WpVersionErrorState from './WpVersionErrorState';
import { trackButtonClick, trackPageView, trackPluginDetailVisit } from '../utils/mixpanelTracking';
import { getPluginRedirectUrl, navigateToPluginUrl } from '../utils/redirectUrlHelper';

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
    catalogError,
    setCatalogError,
    catalogLoading,
    setCatalogLoading,
    shouldShowProvision,
    isSpecialPlugin,
    shouldShowPlugin,
    isWpVersionSupported
  } = useMarketplace();

  const [selectedPlugin, setSelectedPlugin] = useState(null);
  const [featuredPlugins, setFeaturedPlugins] = useState([]);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const menuRef = useRef(null);

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
  const assetBase =
    assetsBaseUrl ||
    (typeof window.marketplaceConfig !== 'undefined' && window.marketplaceConfig?.assetsBaseUrl) ||
    '';
  const iconBase = assetBase ? `${assetBase}assets/icons/` : '';

  // Determine if a plugin slug is in the URL
  const pluginFromQuery =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('plugin')
      : null;

  // Get marketplace page URL
  const getMarketplaceUrl = (slug) => {
    const adminUrl =
      typeof window !== 'undefined' && window.marketplaceConfig?.wpConfig?.adminUrl
        ? window.marketplaceConfig.wpConfig.adminUrl
        : '/wp-admin/';
    return `${adminUrl}admin.php?page=onecom-marketplace&plugin=${slug}`;
  };

  // Handle "Manage" action
  const handleManageAction = (plugin) => {
    // Track the manage button click
    if (typeof window !== 'undefined' && window.marketplaceConfig?.data_consent_status) {
      trackButtonClick({
        buttonName: 'Manage',
        buttonAction: 'manage_product',
        context: {
          product_slug: plugin.slug,
          product_name: plugin.name,
          has_redirect_url: !!(plugin.redirectUrl && plugin.redirectUrl.trim() !== ''),
          has_onboarding_url: !!(plugin.onboardingUrl && plugin.onboardingUrl.trim() !== '')
        }
      });
    }

    const redirectUrl = getPluginRedirectUrl(plugin, false);
    navigateToPluginUrl(redirectUrl);
  };

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
          const rankMathActivated =
            allPlugins.find((p) => p.slug === 'seo-by-rank-math')?.activated === true;
          const rankMathProActivated =
            allPlugins.find((p) => p.slug === 'seo-by-rank-math-pro')?.activated === true;

          // Filter featured plugins and get top 3
          // Hide if it is already active on the site
          const featured = allPlugins
            .filter((plugin) => {
              // Apply visibility rules
              if (!shouldShowPlugin(plugin)) {
                return false;
              }

              // Skip activated plugins
              if (
                plugin.activated === true ||
                (plugin.featured !== true && plugin.featured !== 'true')
              ) {
                return false;
              }

              // Handle Rank Math plugin visibility
              if (plugin.slug === 'seo-by-rank-math') {
                // Show seo-by-rank-math only if BOTH plugins are NOT activated
                return !rankMathActivated && !rankMathProActivated;
              }

              if (plugin.slug === 'seo-by-rank-math-pro') {
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
            const specialPlugins = allPlugins.filter((p) => isSpecialPlugin(p.slug));

            // Fetch subscription status for each special plugin
            specialPlugins.forEach((plugin) => {
              fetchSubscriptionStatus(plugin.slug);
            });
          }
        } else {
          // Track page view with content render failure
          trackPageView({
            category: 'addons_page',
            itemName: 'Addons Page',
            isContentRendered: false
          });
          throw new Error('Invalid API response structure');
        }
      })
      .catch((err) => {
        console.error('Failed to fetch plugins:', err);
        // Track page view with content render failure
        trackPageView({
          category: 'addons_page',
          itemName: 'Addons Page',
          isContentRendered: false
        });
        setCatalogError(err.message || 'Failed to load plugins');
      })
      .finally(() => {
        setCatalogLoading(false);
      });
  }, [
    apiBaseUrl,
    setPlugins,
    setUiI18n,
    setCatalogError,
    setCatalogLoading,
    shouldShowPlugin,
    fetchSubscriptionStatus,
    isOnecomBrand,
    isSpecialPlugin
  ]);

  // After plugins load, select plugin from query if present
  useEffect(() => {
    if (pluginFromQuery && plugins.length) {
      const match = plugins.find((p) => p.slug === pluginFromQuery);
      if (match) setSelectedPlugin(match);
    } else if (!pluginFromQuery) {
      setSelectedPlugin(null);
    }
  }, [pluginFromQuery, plugins]);

  // Listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const currentPluginParam = new URLSearchParams(window.location.search).get('plugin');
      if (!currentPluginParam) {
        setSelectedPlugin(null);
      } else if (plugins.length) {
        const match = plugins.find((p) => p.slug === currentPluginParam);
        if (match) setSelectedPlugin(match);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [plugins]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIndex(null);
      }
    };

    if (openMenuIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuIndex]);

  // Track addons page visit when plugins are loaded and no plugin detail is shown
  useEffect(() => {
    if (
      !catalogLoading &&
      !catalogError &&
      plugins.length > 0 &&
      !pluginFromQuery &&
      !hasTrackedAddonsVisit.current
    ) {
      // Capture timestamp when content is rendered to the page
      contentRenderTimestamp.current = Date.now();

      // Check if this is a reload caused by plugin activation
      const skipPageView = sessionStorage.getItem('mp_skip_page_view');
      if (skipPageView === 'true') {
        // Clear the flag and skip tracking
        sessionStorage.removeItem('mp_skip_page_view');
        console.log('[Addons] Skipping page view tracking after activation reload');
      } else {
        // Normal page load, track the visit
        trackPageView({
          category: 'addons_page',
          itemName: 'Addons Page',
          contentReceivedAt: contentReceivedTimestamp.current,
          contentRenderedAt: contentRenderTimestamp.current,
          isCached: isCachedRef.current
        });
      }

      hasTrackedAddonsVisit.current = true;
    }
  }, [catalogLoading, catalogError, plugins.length, pluginFromQuery]);

  // Determine which detail component to use
  const shouldUseRankMathDetail = (plugin) => {
    return plugin && plugin.slug === 'seo-by-rank-math';
  };

  // Show loading state
  if (catalogLoading) {
    return (
      <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap">
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
            <div
              key={index}
              className="gv-card gv-gap-md gv-content-container gv-p-lg gv-grid gv-grid-cols-12 gv-radius"
            >
              <div className="gv-desk-span-2 gv-span-3 gv-tab-span-3">
                <div className="gv-skeleton gv-icon-tile"></div>
              </div>
              <div className="gv-desk-span-8 gv-tab-span-7 gv-span-7">
                <div
                  className="gv-skeleton gv-mb-xs"
                  style={{ height: '20px', width: '70%' }}
                ></div>
                <div
                  className="gv-skeleton gv-mb-sm"
                  style={{ height: '16px', width: '100%' }}
                ></div>
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
                <th scope="col">
                  <div className="gv-skeleton" style={{ height: '16px', width: '50px' }}></div>
                </th>
                <th scope="col">
                  <div className="gv-skeleton" style={{ height: '16px', width: '50px' }}></div>
                </th>
                <th scope="col">
                  <div className="gv-skeleton" style={{ height: '16px', width: '50px' }}></div>
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {[0, 1].map((index) => (
                <tr key={index}>
                  <td style={{ width: '80px' }}>
                    <div className="gv-skeleton gv-icon-tile"></div>
                  </td>
                  <td>
                    <div className="gv-skeleton gv-text-sm"></div>
                  </td>
                  <td>
                    <div className="gv-skeleton gv-text-sm"></div>
                  </td>
                  <td>
                    <div className="gv-skeleton gv-text-sm"></div>
                  </td>
                  <td>
                    <div className="gv-skeleton gv-text-sm" style={{ width: '24px' }}></div>
                  </td>
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
    return <ErrorState />;
  }
  // Show WP version error state
  if (!isWpVersionSupported('6.2')) {
    return <WpVersionErrorState />;
  }

  // Show empty state if no featured plugins
  // if (featuredPlugins.length === 0) {
  //     return (
  //         <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg gv-items-center gv-justify-center gv-p-fluid">
  //             <div className="gv-text-center">
  //                 <h5 className="gv-header-md gv-mb-sm">{uiI18n?.notifications?.noFeaturedPlugins || 'No Featured Plugins'}</h5>
  //                 <p className="gv-text-md">{uiI18n?.text?.noFeaturedPluginsDescription || 'There are no featured plugins available at the moment.'}</p>
  //             </div>
  //         </div>
  //     );
  // }

  // Filter plugins for the table: installed OR special plugins with subscription
  const installedPlugins = plugins.filter((p) => p.installed || shouldShowProvision(p));

  return (
    <div className="marketplace-container gv-flex gv-flex-col">
      <div className="addons-header-wrap">
        <h3>{uiI18n?.headings?.myProducts}</h3>
        <p className="gv-text-sm">{uiI18n?.text?.myProducts}</p>
      </div>
      <section className="addons-section gv-mt-fluid">
        <div className="addons-header-container gv-flex gv-max-mob-flex-col gv-justify-between gv-items-start gv-tab-gap-lg">
          <div className="heading-container gv-flex-1">
            <p className="gv-text-bold gv-text-lg gv-mb-xs">
              {uiI18n?.headings?.recommendedProducts}
            </p>
            <p className="gv-text-sm gv-mb-md">{uiI18n?.text?.recommendedText}</p>
          </div>
          <button
            className="gv-button gv-button-primary gv-mode-condensed gv-flex-shrink-0"
            onClick={() => {
              // Navigate to the main marketplace page
              const adminUrl =
                typeof window !== 'undefined' && window.marketplaceConfig?.wpConfig?.adminUrl
                  ? window.marketplaceConfig.wpConfig.adminUrl
                  : '/wp-admin/';
              window.location.href = `${adminUrl}admin.php?page=onecom-marketplace`;
            }}
          >
            {uiI18n.seeAllProducts}
            <gv-icon
              aria-hidden="true"
              src={`${iconBase}arrow_right.svg`}
              alt="See all products"
            ></gv-icon>
          </button>
        </div>
        <div className="product-grid gv-grid gv-gap-lg gv-mob-grid-cols-1 gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3 gv-mt-md">
          {featuredPlugins.map((plugin) => {
            const isProvisionable = shouldShowProvision(plugin);
            const freeLabel =
              plugin.i18n.freeTrialPeriod && plugin.i18n.freeTrialPeriod.trim() !== ''
                ? plugin.i18n.freeTrialPeriod
                : uiI18n?.labels?.free || 'Free';
            const price = formatPluginPrice(plugin, freeLabel, uiI18n);
            const fullPriceAmount = getFullPrice(plugin);
            const rebatePriceAmount = getRebatePrice(plugin);

            return (
              <div
                key={plugin.slug}
                className="gv-card gv-gap-md gv-content-container gv-p-lg gv-grid gv-grid-cols-12 gv-radius"
              >
                <div className="gv-desk-span-2 gv-span-3 gv-tab-span-3">
                  <img
                    className="gv-icon-tile"
                    src={plugin.iconUrl || `${iconBase}add_box.svg`}
                    alt={plugin.name}
                    style={{ maxwidth: 'auto' }}
                  />
                </div>
                <div className="gv-desk-span-8 gv-tab-span-7 gv-span-7">
                  <p className="gv-text-sm gv-text-bold gv-mb-xs">{plugin.name}</p>
                  <p className="oc-card-content gv-text-on-alternative gv-mb-sm gv-text-sm">
                    {plugin.i18n.listingDescription || plugin.i18n.subtitle}
                  </p>
                  <span className="gv-caption-lg gv-text-bold">
                    <>
                      {plugin.licenseType === 'premium' && rebatePriceAmount > 0
                        ? rebatePriceAmount !== null
                          ? rebatePriceAmount
                          : fullPriceAmount
                        : price}
                      {plugin.licenseType !== 'free' &&
                        price &&
                        price !== freeLabel &&
                        price !== (uiI18n?.labels?.freeUntilRenewal || 'Free until renewal') && (
                          <span className="gv-period">/{uiI18n?.labels?.timeMonth}</span>
                        )}
                    </>
                  </span>
                </div>
                <div className="gv-span-2 gv-content-center gv-text-right">
                  <a
                    href={getMarketplaceUrl(plugin.slug)}
                    className="gv-reset-button"
                    style={{ display: 'inline-block' }}
                    aria-label={`View details for ${plugin.name}`}
                  >
                    <img
                      className="gv-tile"
                      src={`${iconBase}arrow_forward.svg`}
                      alt={`View ${plugin.name} details`}
                      style={{ minWidth: '24px' }}
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {installedPlugins.length > 0 && (
          <div className="gv-data-table gv-mt-lg gv-addons-table">
            <table className="gv-col-5-shrink gv-col-6-shrink">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">{uiI18n?.labels?.name}</th>
                  <th scope="col">{uiI18n?.labels?.type}</th>
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
                    const event = new CustomEvent('onecom-plugin-provision', {
                      detail: {
                        slug: plugin.slug
                      },
                      bubbles: true,
                      cancelable: true,
                      composed: true
                    });
                    document.dispatchEvent(event);
                  };

                  return (
                    <tr id={plugin.slug} key={plugin.slug}>
                      <td style={{ width: '80px' }}>
                        <img
                          src={plugin.iconUrl || `${iconBase}add_box.svg`}
                          alt={plugin.name}
                          className="gv-icon-tile"
                          style={{ maxWidth: 'auto' }}
                        />
                      </td>
                      <td>{plugin.name}</td>
                      <td>
                        {plugin.licenseType === 'free'
                          ? uiI18n?.labels?.freePlugin
                          : uiI18n?.labels?.premiumPlugin}
                      </td>
                      <td>
                        <div className="gv-text-indicator">
                          <span
                            className={
                              plugin.activated
                                ? 'gv-indicator gv-state-positive'
                                : 'gv-indicator gv-state-informative'
                            }
                          ></span>
                          <span>
                            {' '}
                            {plugin.activated
                              ? uiI18n?.labels?.active || 'Active'
                              : isProvisionable
                                ? uiI18n?.labels?.notInstalled || 'Not Installed'
                                : uiI18n?.labels?.notActive || 'Not Active'}
                          </span>
                        </div>
                      </td>
                      <td>
                        {isProvisionable ? (
                          <button
                            type="button"
                            className="gv-action gv-reset-button"
                            onClick={handleProvisionClick}
                          >
                            {uiI18n?.installAndActivate || 'Install and activate'}
                          </button>
                        ) : (
                          !plugin.activated && (
                            <button
                              type="button"
                              className="gv-action gv-reset-button"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePluginAction('activate', plugin);
                              }}
                            >
                              {uiI18n?.activateButton || 'Activate'}
                            </button>
                          )
                        )}
                      </td>
                      <td>
                        {(plugin.activated || (plugin.installed && !isProvisionable)) && (
                          <div
                            className="gv-pos-relative"
                            ref={openMenuIndex === index ? menuRef : null}
                          >
                            <button
                              type="button"
                              aria-label="Toggle menu"
                              className="gv-reset-button"
                              onClick={() =>
                                setOpenMenuIndex(openMenuIndex === index ? null : index)
                              }
                            >
                              <gv-icon
                                aria-hidden="true"
                                src={`${iconBase}more_horiz.svg`}
                              ></gv-icon>
                            </button>
                            <div
                              className={`gv-contextual-menu gv-pos-right ${openMenuIndex === index ? '' : 'gv-invisible'}`}
                            >
                              <div className="gv-menu">
                                <button
                                  type="button"
                                  className="gv-btn-close"
                                  aria-label="Close"
                                  onClick={() => setOpenMenuIndex(null)}
                                >
                                  <gv-icon
                                    aria-hidden="true"
                                    src={`${iconBase}close.svg`}
                                  ></gv-icon>
                                </button>
                                <ul>
                                  {plugin.activated && (
                                    <li className="gv-mb-0">
                                      <button
                                        type="button"
                                        className="gv-menu-item gv-reset-button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setOpenMenuIndex(null);
                                          handleManageAction(plugin);
                                        }}
                                      >
                                        <gv-icon
                                          aria-hidden="true"
                                          src={`${iconBase}settings.svg`}
                                        ></gv-icon>
                                        <span>{uiI18n?.labels?.manage || 'Manage'}</span>
                                      </button>
                                    </li>
                                  )}
                                  {plugin.activated && (
                                    <li className="gv-mb-0">
                                      <button
                                        type="button"
                                        className="gv-menu-item gv-reset-button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setOpenMenuIndex(null);
                                          handlePluginAction('deactivate', plugin);
                                        }}
                                      >
                                        <gv-icon
                                          aria-hidden="true"
                                          src={`${iconBase}cancel.svg`}
                                        ></gv-icon>
                                        <span>{uiI18n?.deactivate || 'Deactivate'}</span>
                                      </button>
                                    </li>
                                  )}
                                  <li className="gv-mb-0">
                                    {!plugin.activated && plugin.installed && (
                                      <button
                                        type="button"
                                        className="gv-menu-item gv-reset-button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setOpenMenuIndex(null);
                                          handlePluginAction('delete', plugin);
                                        }}
                                      >
                                        <gv-icon
                                          aria-hidden="true"
                                          src={`${iconBase}cancel.svg`}
                                        ></gv-icon>
                                        <span>{uiI18n?.deleteButton || 'Delete'}</span>
                                      </button>
                                    )}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <ErrorToast />
      <SuccessToast />

      {/* Render detail overlay when plugin is selected */}
      {selectedPlugin &&
        !pluginFromQuery &&
        (() => {
          const DetailComponent = shouldUseRankMathDetail(selectedPlugin)
            ? ProductDetailRankMath
            : ProductDetail;
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
