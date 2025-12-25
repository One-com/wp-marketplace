import React, { useState, useEffect, useRef } from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import { formatPluginPrice, getRebatePrice, getFullPrice } from "../utils/priceFormatter";
import ProductDetail from "./ProductDetail";
import ProductDetailRankMath from "./ProductDetailRankMath";
import ErrorToast from "./ErrorToast";
import SuccessToast from "./SuccessToast";
import "@group.one/gravity";

export default function Addons() {
    const {
        apiBaseUrl,
        assetsBaseUrl,
        pluginInAction,
        setPluginInAction,
        subscriptionStatus,
        isOnecomBrand,
        plugins,
        setPlugins,
        uiI18n,
        setUiI18n,
        handlePluginAction,
        catalogError,
        setCatalogError,
        catalogLoading,
        setCatalogLoading
    } = useMarketplace();

    const [selectedPlugin, setSelectedPlugin] = useState(null);
    const [featuredPlugins, setFeaturedPlugins] = useState([]);
    const [openMenuIndex, setOpenMenuIndex] = useState(null);

    // Use ref to track if plugins have already been fetched
    const hasFetchedPlugins = useRef(false);

    // Construct icon base URL with fallback logic
    const assetBase = assetsBaseUrl || (typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl) || "";
    const iconBase = assetBase ? `${assetBase}assets/icons/` : "";

    // Determine if a plugin slug is in the URL
    const pluginFromQuery = typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("plugin")
        : null;

    // Get marketplace page URL
    const getMarketplaceUrl = (slug) => {
        const adminUrl = typeof window !== "undefined" && window.marketplaceConfig?.wpConfig?.adminUrl
            ? window.marketplaceConfig.wpConfig.adminUrl
            : '/wp-admin/';
        return `${adminUrl}admin.php?page=onecom-marketplace&plugin=${slug}`;
    };

    // Handle "Manage" action
    const handleManageAction = (plugin) => {
        // Track the manage button click
        if (typeof window !== "undefined" && window.marketplaceConfig?.data_consent_status) {
            // Tracking would go here if we had mixpanelTracking imported
            console.log('[Addons] Managing plugin:', plugin.slug);
        }

        // Check if plugin has a redirectUrl from API response
        if (plugin.redirectUrl && plugin.redirectUrl.trim() !== '') {
            const adminUrl = typeof window !== "undefined" && window.marketplaceConfig?.wpConfig?.adminUrl
                ? window.marketplaceConfig.wpConfig.adminUrl
                : '/wp-admin/';

            let cleanPath = plugin.redirectUrl;
            // JSON might have escaped slashes
            cleanPath = cleanPath.replace(/\\\//g, '/');

            if (cleanPath.startsWith('wp-admin/')) {
                cleanPath = cleanPath.substring('wp-admin/'.length);
            }

            // Ensure we don't have double slashes if cleanPath starts with /
            const separator = (adminUrl.endsWith('/') || cleanPath.startsWith('/')) ? '' : '/';
            window.location.href = `${adminUrl}${separator}${cleanPath}`;
            return;
        }

        // Fallback: Open detail overlay
        setSelectedPlugin(plugin);
        const url = new URL(window.location.href);
        url.searchParams.set("plugin", plugin.slug);
        window.history.pushState({}, '', url.toString());
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
                return res.json();
            })
            .then((data) => {
                if (data.success && data.data && data.data.catalog) {
                    const allPlugins = data.data.catalog;
                    setPlugins(allPlugins);

                    // Filter featured plugins and get top 4
                    // Hide if it is already active on the site
                    const featured = allPlugins
                        .filter(plugin => (plugin.featured === true || plugin.featured === "true") && !plugin.activated)
                        .slice(0, 4);

                    setFeaturedPlugins(featured);

                    // Set UI i18n if available
                    const uiI18nData = data.data.uiI18n || data.data.ui_i18n;
                    if (uiI18nData) {
                        setUiI18n(uiI18nData);
                    }
                } else {
                    throw new Error("Invalid API response structure");
                }
            })
            .catch((err) => {
                console.error("Failed to fetch plugins:", err);
                setCatalogError(err.message || "Failed to load plugins");
            })
            .finally(() => {
                setCatalogLoading(false);
            });
    }, [apiBaseUrl, setPlugins, setUiI18n, setCatalogError, setCatalogLoading]);

    // After plugins load, select plugin from query if present
    useEffect(() => {
        if (pluginFromQuery && plugins.length) {
            const match = plugins.find(p => p.slug === pluginFromQuery);
            if (match) setSelectedPlugin(match);
        } else if (!pluginFromQuery) {
            setSelectedPlugin(null);
        }
    }, [pluginFromQuery, plugins]);

    // Listen for browser back/forward navigation
    useEffect(() => {
        const handlePopState = () => {
            const currentPluginParam = new URLSearchParams(window.location.search).get("plugin");
            if (!currentPluginParam) {
                setSelectedPlugin(null);
            } else if (plugins.length) {
                const match = plugins.find(p => p.slug === currentPluginParam);
                if (match) setSelectedPlugin(match);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [plugins]);

    // Determine which detail component to use
    const shouldUseRankMathDetail = (plugin) => {
        return plugin && plugin.slug === 'seo-by-rank-math';
    };

    // Show loading state
    if (catalogLoading) {
        return (
            <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg gv-p-fluid">
                <div className="product-grid gv-grid gv-gap-lg gv-mob-grid-cols-1 gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3">
                    {[0, 1, 2, 3].map((index) => (
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
            </div>
        );
    }

    // Show error state
    if (catalogError) {
        return (
            <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg gv-items-center gv-justify-center gv-p-fluid">
              <div className="gv-text-center">
                    <h5 className="gv-header-md gv-mb-sm">{uiI18n?.notifications?.errorTitle || 'Error'}</h5>
                    <p className="gv-text-md gv-mb-lg">{catalogError}</p>
                </div>
            </div>
        );
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
    const installedPlugins = plugins.filter(p => {
        if (p.installed) return true;

        const isSpecialPlugin = p.slug === "wp-rocket" || p.slug === "seo-by-rank-math-pro";
        if (isOnecomBrand && isSpecialPlugin && subscriptionStatus[p.slug] === true) {
            return true;
        }

        return false;
    });

    return (
        <div className="marketplace-container gv-flex gv-flex-col">
          <div className="addons-header-wrap">
            <h3>{uiI18n?.headings?.yourAddons}</h3>
            <p className="gv-text-sm">{uiI18n?.text?.myProducts}</p>
          </div>
          <section className="addons-section gv-mt-fluid">
            <div className="addons-header-container gv-flex gv-max-mob-flex-col gv-justify-between gv-items-start gv-tab-gap-lg">
              <div className="heading-container gv-flex-1">
                <p
                  className="gv-text-bold gv-text-lg gv-mb-xs">{uiI18n?.headings?.recommendedProducts}</p>
                <p className="gv-text-sm gv-mb-md">{uiI18n?.text?.recommendedText}</p>
              </div>
              <button
                className="gv-button gv-button-primary gv-mode-condensed gv-flex-shrink-0"
                onClick={() => {
                  // Navigate to the main marketplace page
                  const adminUrl = typeof window !== "undefined" && window.marketplaceConfig?.wpConfig?.adminUrl
                    ? window.marketplaceConfig.wpConfig.adminUrl
                    : '/wp-admin/';
                  window.location.href = `${adminUrl}admin.php?page=onecom-marketplace`;
                }}
              >
                {uiI18n.seeAllProducts}
                <gv-icon aria-hidden="true" src={`${iconBase}arrow_right.svg`} alt="See all products"></gv-icon>
              </button>

            </div>
            <div
              className="product-grid gv-grid gv-gap-lg gv-mob-grid-cols-1 gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3 gv-mt-md">
              {featuredPlugins.map((plugin) => {
                const freeLabel = (plugin.i18n.freeTrialPeriod && plugin.i18n.freeTrialPeriod.trim() !== '')
                  ? plugin.i18n.freeTrialPeriod
                  : (uiI18n?.labels?.free || 'Free');
                const price = formatPluginPrice(plugin, freeLabel, uiI18n);
                const fullPriceAmount = getFullPrice(plugin);
                const rebatePriceAmount = getRebatePrice(plugin);

                return (
                  <div key={plugin.slug}
                       className="gv-card gv-gap-md gv-content-container gv-p-lg gv-grid gv-grid-cols-12 gv-radius">
                    <div className="gv-desk-span-2 gv-span-3 gv-tab-span-3">
                      <img
                        className="gv-icon-tile"
                        src={plugin.iconUrl || `${iconBase}add_box.svg`}
                        alt={plugin.name}
                        style={{maxwidth: "auto"}}
                      />
                    </div>
                    <div className="gv-desk-span-8 gv-tab-span-7 gv-span-7">
                      <p className="gv-text-sm gv-text-bold gv-mb-xs">{plugin.name}</p>
                      <p className="oc-card-content gv-text-on-alternative gv-mb-sm gv-text-sm">
                        {plugin.i18n.listingDescription || plugin.i18n.subtitle}
                      </p>
                      <span className="gv-caption-lg gv-text-bold">
                                        {plugin.licenseType === "premium" && (rebatePriceAmount > 0)
                                          ? (rebatePriceAmount !== null ? rebatePriceAmount : fullPriceAmount)
                                          : price}
                        {plugin.licenseType !== "free" &&
                          price &&
                          price !== freeLabel &&
                          price !== (uiI18n?.labels?.freeUntilRenewal || 'Free until renewal') &&
                          <span className="gv-period">/{uiI18n?.labels?.timeMonth}</span>}
                                    </span>
                    </div>
                    <div className="gv-span-2 gv-content-center gv-text-right">
                      <a
                        href={getMarketplaceUrl(plugin.slug)}
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
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="gv-data-table gv-mt-lg gv-overflow-x-auto">
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
                  const isSpecialPlugin = plugin.slug === "wp-rocket" || plugin.slug === "seo-by-rank-math-pro";
                  const shouldShowProvision = isOnecomBrand && isSpecialPlugin && !plugin.installed && subscriptionStatus[plugin.slug] === true;

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

                  return (
                    <tr key={plugin.slug}>
                      <td style={{width: "80px"}}>
                        <img
                          src={plugin.iconUrl || `${iconBase}add_box.svg`}
                          alt={plugin.name}
                          className="gv-icon-tile"
                          style={{maxWidth: "auto"}}
                        />
                      </td>
                      <td>{plugin.name}</td>
                      <td>{plugin.licenseType === 'free' ? uiI18n?.labels?.freePlugin : uiI18n?.labels?.premiumPlugin}</td>
                      <td>
                        <div className="gv-text-indicator">
                          <span
                            className={plugin.activated ? "gv-indicator gv-state-positive" : "gv-indicator gv-state-informative"}></span>
                          <span> {plugin.activated ? (uiI18n?.labels?.active || 'Active') : (uiI18n?.labels?.notActive || 'Not Active')}</span>
                        </div>
                      </td>
                      <td>
                        {shouldShowProvision ? (
                          <a
                            href="#"
                            className="gv-action"
                            onClick={handleProvisionClick}
                          >
                            {uiI18n?.installAndActivate || 'Install and activate'}
                          </a>
                        ) : !plugin.activated && (
                          <a
                            href="#"
                            className="gv-action"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePluginAction('activate', plugin);
                            }}
                          >
                            {uiI18n?.activateButton || 'Activate'}
                          </a>
                        )}
                      </td>
                      <td>
                        {plugin.activated && (
                          <div className="gv-pos-relative">
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
                                <ul>
                                  <li>
                                    {plugin.activated && (
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
                                    )}
                                  </li>
                                  <li>
                                    {plugin.activated && (
                                      <a
                                        href="#"
                                        className="gv-menu-item"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setOpenMenuIndex(null);
                                          handlePluginAction('deactivate', plugin);
                                        }}
                                      >
                                        <gv-icon aria-hidden="true" src={`${iconBase}cancel.svg`}></gv-icon>
                                        <span>{uiI18n?.deactivate || 'Deactivate'}</span>
                                      </a>
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

          </section>

          {installedPlugins.map(plugin => (
            <React.Fragment key={`toasts-${plugin.slug}`}>
              <ErrorToast plugin={plugin} />
              <SuccessToast plugin={plugin} />
            </React.Fragment>
          ))}

          {/* Render detail overlay when plugin is selected */}
          {selectedPlugin && !pluginFromQuery && (() => {
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
