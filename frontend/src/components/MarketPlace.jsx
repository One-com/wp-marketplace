import React, { useState, useEffect, useRef } from 'react';
import { normalizePlugins } from './normalised-plugins';
import '@group.one/gravity';
import { useTranslation } from 'react-i18next';
import ProductDetail from './ProductDetail';
import ProductDetailRankMath from './ProductDetailRankMath';
import ErrorState from './ErrorState';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatPluginPrice } from '../utils/priceFormatter';
import {
  trackMarketplaceVisit,
  trackPluginDetailVisit,
  trackPageView
} from '../utils/mixpanelTracking';

export default function Marketplace() {
  const {
    apiBaseUrl,
    useWPHandlers,
    wpConfig,
    enableDefaultStyles,
    assetsBaseUrl,
    pluginInAction,
    setPluginInAction,
    fetchSubscriptionStatus,
    isOnecomBrand,
    plugins,
    setPlugins,
    uiI18n,
    setUiI18n,
    handlePluginAction,
    allPluginsActivated,
    setAllPluginsActivated,
    catalogError,
    setCatalogError,
    catalogLoading,
    setCatalogLoading
  } = useMarketplace();

  // Get active plugin slugs from WordPress config
  const activePlugins =
    typeof window !== 'undefined' && window.marketplaceConfig?.activePlugins
      ? window.marketplaceConfig.activePlugins
      : [];

  // Get active theme author from WordPress config
  const activeThemeAuthor =
    typeof window !== 'undefined' && window.marketplaceConfig?.activeThemeAuthor
      ? window.marketplaceConfig.activeThemeAuthor
      : '';

  const [downloadingPlugins, setDownloadingPlugins] = useState({});
  const [selectedPlugin, setSelectedPlugin] = useState(null);

  // Use ref to track if plugins have already been fetched
  const hasFetchedPlugins = useRef(false);

  // Use ref to track if marketplace visit has been tracked (prevent duplicates)
  const hasTrackedMarketplaceVisit = useRef(false);

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

  // Get base page URL (without plugin parameter)
  const getBaseUrl = () => {
    if (typeof window === 'undefined') return '';
    const url = new URL(window.location.href);
    url.searchParams.delete('plugin');
    return url.toString();
  };

  // After plugins load, select plugin from query if present
  useEffect(() => {
    if (pluginFromQuery && plugins.length) {
      const match = plugins.find((p) => p.slug === pluginFromQuery);
      if (match) setSelectedPlugin(match);
    } else if (!pluginFromQuery) {
      // Clear selectedPlugin when no plugin parameter in URL
      setSelectedPlugin(null);
    }
  }, [pluginFromQuery, plugins]);

  // Listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const currentPluginParam = new URLSearchParams(window.location.search).get('plugin');
      if (!currentPluginParam) {
        // URL no longer has plugin parameter, clear selection
        setSelectedPlugin(null);
      } else if (plugins.length) {
        // URL has plugin parameter, update selection
        const match = plugins.find((p) => p.slug === currentPluginParam);
        if (match) setSelectedPlugin(match);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [plugins]);

  const { t } = useTranslation();

  useEffect(() => {
    // Only fetch once
    if (hasFetchedPlugins.current) {
      return;
    }

    async function fetchPlugins() {
      try {
        hasFetchedPlugins.current = true;
        const res = await fetch(`${apiBaseUrl}`);
        const json = await res.json();

        // Capture timestamp when API content is received
        contentReceivedTimestamp.current = Date.now();

        // Extract is_cached flag from API response
        isCachedRef.current = json.is_cached || false;

        // Check for API error response (success: false)
        if (json && json.success === false) {
          console.error('API returned error:', json.error);
          // Track page view with content render failure
          trackPageView({
            category: 'marketplace_home',
            isContentRendered: false
          });
          setCatalogError(true);
          setCatalogLoading(false);
          return;
        }

        // Check for blank/empty response
        if (
          !json ||
          !json.data ||
          !json.data.catalog ||
          (Array.isArray(json.data.catalog) && json.data.catalog.length === 0)
        ) {
          console.error('API returned empty or blank response');
          // Track page view with content render failure
          trackPageView({
            category: 'marketplace_home',
            isContentRendered: false
          });
          setCatalogError(true);
          setCatalogLoading(false);
          return;
        }

        const { plugins: normalizedPlugins, uiI18n: apiUiI18n } = normalizePlugins(json);
        setPlugins(normalizedPlugins);
        setUiI18n(apiUiI18n);

        // Fetch subscription status for special plugins (wp-rocket, rank-math-pro)
        if (isOnecomBrand) {
          const specialPlugins = normalizedPlugins.filter(
            (p) => p.slug === 'wp-rocket' || p.slug === 'seo-by-rank-math-pro'
          );

          // Fetch subscription status for each special plugin
          specialPlugins.forEach((plugin) => {
            fetchSubscriptionStatus(plugin.slug);
          });
        }
      } catch (e) {
        console.error('Failed to fetch plugins', e);
        // Track page view with content render failure
        trackPageView({
          category: 'marketplace_home',
          isContentRendered: false
        });
        setCatalogError(true);
      } finally {
        setCatalogLoading(false);
      }
    }

    fetchPlugins();
  }, [apiBaseUrl, isOnecomBrand, fetchSubscriptionStatus, setPlugins]);

  // Update allPluginsActivated in context whenever plugins change
  useEffect(() => {
    if (plugins.length > 0) {
      // Filter out activated plugins
      const nonActivatedPlugins = plugins.filter((p) => p.activated !== true);
      const allActivated = nonActivatedPlugins.length === 0;
      setAllPluginsActivated(allActivated);
    }
  }, [plugins, setAllPluginsActivated]);

  // Track marketplace visit when plugins are loaded and no plugin detail is shown
  useEffect(() => {
    if (
      !catalogLoading &&
      !catalogError &&
      plugins.length > 0 &&
      !pluginFromQuery &&
      !hasTrackedMarketplaceVisit.current
    ) {
      // Capture timestamp when content is rendered to the page
      contentRenderTimestamp.current = Date.now();

      // Check if this is a reload caused by plugin activation
      const skipPageView = sessionStorage.getItem('mp_skip_page_view');
      if (skipPageView === 'true') {
        // Clear the flag and skip tracking
        sessionStorage.removeItem('mp_skip_page_view');
        console.log('[Marketplace] Skipping page view tracking after activation reload');
      } else {
        // Normal page load, track the visit
        trackMarketplaceVisit(
          contentReceivedTimestamp.current,
          contentRenderTimestamp.current,
          isCachedRef.current
        );
      }
      hasTrackedMarketplaceVisit.current = true;
    }
  }, [catalogLoading, catalogError, plugins.length, pluginFromQuery]);

  // Track plugin detail page visit when selectedPlugin changes
  useEffect(() => {
    if (
      selectedPlugin &&
      pluginFromQuery &&
      lastTrackedPluginSlug.current !== selectedPlugin.slug
    ) {
      // Capture timestamp when content is rendered to the page
      contentRenderTimestamp.current = Date.now();

      // Check if this is a reload caused by plugin activation
      const skipPageView = sessionStorage.getItem('mp_skip_page_view');
      if (skipPageView === 'true') {
        // Clear the flag and skip tracking
        sessionStorage.removeItem('mp_skip_page_view');
        console.log(
          '[Marketplace] Skipping plugin detail page view tracking after activation reload'
        );
      } else {
        // Normal page load, track the visit
        trackPluginDetailVisit(
          selectedPlugin,
          contentReceivedTimestamp.current,
          contentRenderTimestamp.current,
          isCachedRef.current
        );
      }
      lastTrackedPluginSlug.current = selectedPlugin.slug;
    }
    // Reset when returning to marketplace list
    if (!pluginFromQuery) {
      lastTrackedPluginSlug.current = null;
    }
  }, [selectedPlugin, pluginFromQuery]);

  const handleDownloadClick = (e, plugin) => {
    e.stopPropagation();

    // Set downloading state
    setDownloadingPlugins((prev) => ({ ...prev, [plugin.slug]: true }));

    // Reset after a short delay (download is triggered immediately)
    // The browser handles the actual download, so we simulate completion
    setTimeout(() => {
      setDownloadingPlugins((prev) => ({ ...prev, [plugin.slug]: false }));
    }, 2000);
  };

  const openDetail = (plugin, e) => {
    // Debug to confirm click
    console.log('Opening detail for plugin:', plugin.slug);
    setSelectedPlugin(plugin);
  };

  // Debug: log whenever selectedPlugin changes
  useEffect(() => {
    if (selectedPlugin) {
      console.log('Selected plugin state now:', selectedPlugin.slug);
    }
  }, [selectedPlugin]);

  // Helper function to check if a plugin should be visible based on its rules
  const shouldShowPlugin = (plugin) => {
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
  };

  // Helper function to determine if we should use ProductDetailRankMath
  const shouldUseRankMathDetail = (plugin) => {
    if (!plugin) return false;
    const brand = typeof window !== 'undefined' && window.marketplaceConfig?.brand;
    const isOnecomBrand = brand === 'onecom';
    const isRankMathPlugin =
      plugin.slug === 'seo-by-rank-math-pro' || plugin.slug === 'seo-by-rank-math';
    return isOnecomBrand && isRankMathPlugin;
  };

  if (catalogLoading) {
    // If there's a plugin parameter in the URL, show appropriate skeleton based on plugin type
    if (pluginFromQuery) {
      // Determine if we should use RankMath detail component based on slug
      const brand = typeof window !== 'undefined' && window.marketplaceConfig?.brand;
      const isOnecomBrand = brand === 'onecom';
      const isRankMathPlugin =
        pluginFromQuery === 'seo-by-rank-math-pro' || pluginFromQuery === 'seo-by-rank-math';
      const DetailComponent =
        isOnecomBrand && isRankMathPlugin ? ProductDetailRankMath : ProductDetail;
      return <DetailComponent plugin={null} onClose={() => {}} usePortal={false} loading={true} />;
    }

    // Show catalog skeleton loaders while catalog is loading
    return (
      <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg">
        <section className="category-section">
          <div className="gv-skeleton gv-mb-sm" style={{ width: '160px' }}></div>
          <div className="gv-skeleton gv-text-sm gv-mb-sm" style={{ width: '400px' }}></div>
          <div className="product-grid gv-grid gv-gap-lg gv-mob-grid-cols-1 gv-tab-grid-cols-2 gv-mb-md gv-desk-lg-grid-cols-3 gv-mt-md">
            {/* Generate first 3 skeleton plugin cards */}
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="gv-card gv-gap-md gv-content-container gv-p-lg gv-grid gv-grid-cols-12 gv-radius"
              >
                <div className="gv-desk-span-2 gv-span-3 gv-tab-span-3">
                  <div className="gv-skeleton" style={{ width: '48px', height: '48px' }}></div>
                </div>
                <div className="gv-desk-span-8 gv-tab-span-7 gv-span-7">
                  <div className="gv-skeleton gv-text-sm gv-mb-sm"></div>
                  <div className="gv-skeleton gv-text-sm gv-mb-sm"></div>
                  <div className="gv-skeleton gv-text-sm" style={{ width: '80px' }}></div>
                </div>
                <div className="gv-span-2 gv-content-center gv-text-right">
                  <div className="gv-skeleton" style={{ width: '24px' }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional skeleton loaders after 3 cards */}
          <div className="gv-skeleton gv-mb-sm" style={{ width: '160px' }}></div>
          <div className="gv-skeleton gv-text-sm gv-mb-sm" style={{ width: '400px' }}></div>
          <div className="product-grid gv-grid gv-gap-lg gv-mob-grid-cols-1 gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3 gv-mt-md">
            {/* Generate remaining 3 skeleton plugin cards */}
            {[...Array(3)].map((_, index) => (
              <div
                key={index + 3}
                className="gv-card gv-gap-md gv-content-container gv-p-lg gv-grid gv-grid-cols-12 gv-radius"
              >
                <div className="gv-desk-span-2 gv-span-3 gv-tab-span-3">
                  <div className="gv-skeleton" style={{ width: '48px', height: '48px' }}></div>
                </div>
                <div className="gv-desk-span-8 gv-tab-span-7 gv-span-7">
                  <div className="gv-skeleton gv-text-sm gv-mb-sm"></div>
                  <div className="gv-skeleton gv-text-sm gv-mb-sm"></div>
                  <div className="gv-skeleton gv-text-sm" style={{ width: '80px' }}></div>
                </div>
                <div className="gv-span-2 gv-content-center gv-text-right">
                  <div className="gv-skeleton" style={{ width: '24px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Show error state if API failed or returned error
  if (catalogError) {
    return <ErrorState />;
  }

  // Early return: show full page detail instead of list
  if (selectedPlugin && pluginFromQuery) {
    const DetailComponent = shouldUseRankMathDetail(selectedPlugin)
      ? ProductDetailRankMath
      : ProductDetail;
    return (
      <DetailComponent
        plugin={selectedPlugin}
        onClose={() => {
          // Return to listing (clear selection and URL)
          setSelectedPlugin(null);
          // Check if history.back() will work (has navigable history)
          if (typeof window !== 'undefined' && window.history && window.history.length > 1) {
            window.history.back();
          } else {
            // In new-tab scenario, manually remove plugin parameter from URL
            const url = new URL(window.location.href);
            url.searchParams.delete('plugin');
            window.history.replaceState({}, '', url.toString());
          }
        }}
        usePortal={false}
        loading={catalogLoading}
      />
    );
  }

  // Group plugins by a single, specific category (first category), avoid duplicates across headings
  const categoryMap = new Map();

  // Deduplicate plugins by slug first (in case backend/normalizer still returns duplicates)
  // Also filter out activated plugins, seo-by-rank-math, and plugins that don't pass rules check
  const bySlug = new Map();
  plugins.forEach((p) => {
    if (
      !bySlug.has(p.slug) &&
      p.activated !== true &&
      p.slug !== 'seo-by-rank-math' &&
      shouldShowPlugin(p)
    ) {
      bySlug.set(p.slug, p);
    }
  });

  Array.from(bySlug.values()).forEach((p) => {
    // Handle new category object structure: { id, slug, title, description }
    const categoryObj =
      Array.isArray(p.categories) && p.categories.length
        ? typeof p.categories[0] === 'object'
          ? p.categories[0]
          : { slug: String(p.categories[0]), title: String(p.categories[0]), description: null }
        : { slug: 'Others', title: 'Others', description: null };

    const categoryKey = categoryObj.slug || categoryObj.title || 'Others';

    if (!categoryMap.has(categoryKey)) {
      categoryMap.set(categoryKey, { info: categoryObj, plugins: [] });
    }
    categoryMap.get(categoryKey).plugins.push(p);
  });

  const categories = Array.from(categoryMap.entries()).filter(
    ([catKey, { plugins: list }]) => list.length > 0
  );

  // If all plugins are activated, show the "You've got all our plugins!" message
  if (allPluginsActivated) {
    return (
      <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg gv-items-center gv-justify-center gv-p-fluid">
        <div className="gv-text-center">
          <h5 className="gv-header-md gv-mb-sm">{uiI18n?.notifications?.allPluginsOwned}</h5>
          <p className="gv-text-md gv-mb-lg">{uiI18n?.text?.managePlugins}</p>
          <button
            type="button"
            className="gv-button gv-button-primary  buttons-min-width"
            onClick={() => {
              // Navigate to plugins page
              window.location.href = '/wp-admin/plugins.php';
            }}
          >
            <span>{uiI18n.viewProductsButton}</span>
            <gv-icon aria-hidden="true" src={`${iconBase}/arrow_right.svg`}></gv-icon>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg">
      {categories.map(([catKey, { info, plugins: list }]) => (
        <section key={catKey} className="category-section">
          <p className="gv-text-bold gv-text-lg gv-mb-xs">{info.title || catKey}</p>
          {info.description && <p className="gv-text-sm">{info.description}</p>}
          <div className="product-grid gv-grid gv-gap-lg  gv-mob-grid-cols-1 gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3 gv-mt-md">
            {list.map((plugin) => {
              const freeLabel = uiI18n?.labels?.free || 'Free';
              const price = formatPluginPrice(plugin, freeLabel);
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
                    />
                  </div>
                  <div className="gv-desk-span-8 gv-tab-span-7 gv-span-7">
                    <p className="gv-text-sm gv-text-bold gv-mb-xs">{plugin.name}</p>
                    <p className="oc-card-content gv-text-on-alternative gv-mb-sm gv-text-sm">
                      {' '}
                      {plugin.i18n.listingDescription || plugin.i18n.subtitle}{' '}
                    </p>
                    <span className="gv-caption-lg gv-text-bold">
                      {price}
                      {plugin.licenseType !== 'free' && price && price !== freeLabel && (
                        <span className="gv-period">/mo</span>
                      )}
                    </span>
                  </div>
                  <div className="gv-span-2 gv-content-center gv-text-right">
                    <a
                      href={`${getBaseUrl()}&plugin=${plugin.slug}`}
                      className="gv-reset-button"
                      style={{ display: 'inline-block' }}
                      aria-label={`View details for ${plugin.name}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedPlugin(plugin);
                        const url = new URL(window.location.href);
                        url.searchParams.set('plugin', plugin.slug);
                        window.history.pushState({}, '', url.toString());
                      }}
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
        </section>
      ))}
      {/* Remove overlay render (keep for non-query usage) */}
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
