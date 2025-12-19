import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import PluginActions from './PluginActions';
import SuccessNotice from './SuccessNotice';
import ErrorToast from './ErrorToast';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatPluginPrice } from '../utils/priceFormatter';

export default function ProductDetail({ plugin, onClose, usePortal = true, loading = false }) {
  const {
    assetsBaseUrl,
    useWPHandlers,
    pluginInAction,
    uiI18n,
    subscriptionStatus,
    isCheckingSubscription,
    setNoticeState,
    setErrorState
  } = useMarketplace();

  const assetBase =
    assetsBaseUrl ||
    (typeof window.marketplaceConfig !== 'undefined' && window.marketplaceConfig?.assetsBaseUrl) ||
    '';
  const iconBase = assetBase ? `${assetBase}assets/icons/` : '';

  // Scroll to top when component mounts or plugin changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [plugin]);

  // Clear banners when component mounts (handles case when user returns via browser back button)
  useEffect(() => {
    // Clear any existing banners when ProductDetail mounts
    setNoticeState({ visible: false, type: null, pluginSlug: null });
    setErrorState({ visible: false, type: null, pluginSlug: null });
  }, [plugin?.slug, setNoticeState, setErrorState]);

  // Hide banners when user navigates back and returns to the product detail page
  useEffect(() => {
    const handlePopState = () => {
      // Clear notice and error state when navigating via browser back/forward
      setNoticeState({ visible: false, type: null, pluginSlug: null });
      setErrorState({ visible: false, type: null, pluginSlug: null });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setNoticeState, setErrorState]);

  // Show skeleton loaders while loading (even if plugin is null)
  if (loading) {
    const skeletonContent = (
      <div className={usePortal ? 'gv-surface-dim' : 'gv-surface-dim'}>
        <article className="gv-layout-product gv-p-0 gv-product-single gv-w-max-container gv-mx-auto gv-p-fluid">
          {/* Breadcrumbs skeleton */}
          <nav className="gv-breadcrumbs gv-area-nav gv-flex-col gv-items-start">
            <div className="gv-flex gv-items-center gv-gap-xs">
              <div className="gv-skeleton" style={{ width: '60px' }}></div>
            </div>
          </nav>

          {/* Header skeleton */}
          <header className="gv-product-header gv-area-header">
            <div className="gv-content gv-stack-space-sm gv-text-sm">
              <div
                className="gv-skeleton gv-heading-lg gv-mb-sm"
                style={{ marginBottom: '24px' }}
              ></div>
              <div className="gv-skeleton"></div>
              <div className="gv-skeleton"></div>
              <div className="gv-skeleton" style={{ width: '80%' }}></div>
            </div>
            <div className="gv-image">
              <div className="gv-card-image gv-h-full" style={{ marginTop: '75px' }}>
                <div
                  className="gv-skeleton gv-radius-0 gv-h-full"
                  style={{ minHeight: '300px' }}
                ></div>
              </div>
            </div>
          </header>

          {/* Pricing / Action Section skeleton */}
          <section className="gv-product-table gv-features-table gv-products-1 gv-area-table">
            <div className="gv-table-container">
              <div className="gv-table" role="table">
                <div className="gv-table-header" role="rowgroup">
                  <div className="gv-table-row" role="row">
                    <div className="gv-product gv-p-0 oc-border-none" role="columnheader">
                      <div className="gv-content">
                        <div className="gv-skeleton gv-heading-md gv-mb-sm"></div>
                        <div className="gv-skeleton" style={{ width: '70%' }}></div>
                      </div>
                      <div className="gv-bottom">
                        <div className="gv-price-container">
                          <div
                            className="gv-skeleton"
                            style={{ width: '120px', height: '32px' }}
                          ></div>
                        </div>
                        <div className="gv-skeleton gv-heading-md gv-mt-md"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key features skeleton */}
                <div className="gv-section oc-left-border-0" role="rowgroup">
                  <div className="gv-section-header gv-table-row" role="row">
                    <div className="gv-cell" role="cell">
                      <div className="gv-skeleton gv-heading-md" style={{ width: '150px' }}></div>
                    </div>
                  </div>
                  {[...Array(3)].map((_, i) => (
                    <div className="gv-table-row" role="row" key={i}>
                      <div className="gv-cell" role="cell">
                        <div className="gv-skeleton gv-text-sm gv-w-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Benefits skeleton */}
          <div className="gv-area-details gv-grid gv-gap-fluid">
            <section className="gv-stack-space-md">
              <div className="gv-skeleton gv-heading-md gv-mb-md" style={{ width: '180px' }}></div>
              <ul className="gv-list-items gv-list-check gv-mode-condensed">
                {[...Array(3)].map((_, i) => (
                  <li key={i}>
                    <div className="gv-skeleton gv-text-sm"></div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Core Features skeleton */}
          <div className="gv-area-content gv-grid gv-gap-fluid">
            <section className="gv-text-sm gv-stack-space-md">
              <div className="gv-skeleton gv-heading-md gv-mb-md" style={{ width: '250px' }}></div>
              <div className="gv-grid gv-gap-lg gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <div className="gv-item gv-stack-space-sm" key={i}>
                    <div className="gv-skeleton gv-heading-md gv-mb-sm"></div>
                    <div className="gv-skeleton gv-text-sm gv-mb-xs"></div>
                    <div className="gv-skeleton gv-text-sm"></div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>
      </div>
    );
    return usePortal ? createPortal(skeletonContent, document.body) : skeletonContent;
  }

  // If not loading and plugin is null, return null
  if (!plugin) return null;

  const imageURL =
    (typeof window.onecomWpVars !== 'undefined' && window.onecomWpVars?.imageURL) || assetBase;
  const iconSrc = plugin.thumbnail || `${assetBase}assets/icons/placeholder.svg`;
  const mainImage =
    plugin.bannerUrl ||
    plugin.image ||
    plugin.thumbnail ||
    'https://gravity.group.one/guide-images/product-image@2x.png';

  // Extract data with fallbacks
  const title = plugin.name || 'Product';
  const description =
    plugin.i18n?.description ||
    plugin.i18n?.subtitle ||
    plugin.description ||
    plugin.shortDescription ||
    'No description available.';
  const subTitle = plugin.i18n?.subtitle;
  const isFree = plugin.licenseType === 'free';
  const freeTrialText = plugin.i18n?.freeTrialText || '';
  const hasFreeTrialText = freeTrialText && freeTrialText.trim() !== '';
  const price = hasFreeTrialText
    ? uiI18n?.headings?.freeTrial || 'Free trial*'
    : formatPluginPrice(plugin, uiI18n?.labels?.free || 'Free');

  // Helper function to extract numbered properties dynamically from i18n object
  const extractNumberedProps = (obj, baseName) => {
    if (!obj || typeof obj !== 'object') return [];
    const results = [];
    let i = 1;
    while (obj[`${baseName}${i}`]) {
      const value = obj[`${baseName}${i}`];
      if (value && value.trim() !== '') {
        results.push(value);
      }
      i++;
    }
    return results;
  };

  // Extract key benefits from i18n (keyBenefitContent1, keyBenefitContent2, etc.)
  const benefitsFromI18n = extractNumberedProps(plugin.i18n, 'keyBenefitContent');

  // Extract key features from i18n (keyFeatureContent1 through keyFeatureContent6)
  const keyFeaturesFromI18n = extractNumberedProps(plugin.i18n, 'keyFeatureContent');

  // Extract core features (title/content pairs) from i18n
  const coreFeaturesFromI18n = [];
  if (plugin.i18n && typeof plugin.i18n === 'object') {
    let i = 1;
    while (plugin.i18n[`coreFeatureTitle${i}`] || plugin.i18n[`coreFeatureContent${i}`]) {
      const featureTitle = plugin.i18n[`coreFeatureTitle${i}`];
      const content = plugin.i18n[`coreFeatureContent${i}`];
      if (featureTitle && featureTitle.trim() !== '' && content && content.trim() !== '') {
        coreFeaturesFromI18n.push({ name: featureTitle, desc: content });
      }
      i++;
    }
  }

  // Use only i18n data - no fallbacks
  const keyFeatures = keyFeaturesFromI18n;
  const benefits = benefitsFromI18n;
  const coreFeatures = coreFeaturesFromI18n;

  const content = (
    <div className={usePortal ? 'gv-surface-dim' : 'gv-surface-dim'}>
      <article className="gv-layout-product gv-p-0 gv-product-single gv-w-max-container gv-mx-auto gv-p-fluid">
        <nav className="gv-breadcrumbs gv-area-nav gv-flex-col gv-items-start">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              // Disable back navigation when plugin is being activated and reload is pending
              if (pluginInAction[plugin.slug]) {
                return;
              }
              // First check if history is available and has navigable records
              if (typeof window !== 'undefined' && window.history && window.history.length > 1) {
                try {
                  window.history.back();
                } catch (error) {
                  // If history.back() fails, fallback to onClose
                  if (onClose) {
                    onClose();
                  }
                }
              } else if (onClose) {
                // Fallback to onClose if history is not available or empty
                onClose();
              }
            }}
            className="gv-flex gv-items-center gv-gap-xs gv-button-reset"
            aria-label="Go back"
            style={{
              opacity: pluginInAction[plugin.slug] ? 0.5 : 1,
              pointerEvents: pluginInAction[plugin.slug] ? 'none' : 'auto',
              cursor: pluginInAction[plugin.slug] ? 'not-allowed' : 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
              font: 'inherit',
              color: 'inherit'
            }}
            disabled={!!pluginInAction[plugin.slug]}
          >
            <img
              style={{ minWidth: '24px' }}
              className="gv-tile"
              src={`${iconBase}arrow_back.svg`}
              alt="Back to plugins"
            />
            <span>Back</span>
          </button>
          <SuccessNotice plugin={plugin} />
          <ErrorToast plugin={plugin} />
        </nav>

        <header className="gv-product-header gv-area-header">
          <div className="gv-content gv-stack-space-md gv-text-sm">
            <h3 className="gv-title gv-header-lg">{title}</h3>
            <p className="gv-text-sm">{description}</p>
            {/*{plugin.author && (*/}
            {/*    <p className="gv-text-xs gv-mt-sm">*/}
            {/*        Author: {plugin.authorUrl ? <a href={plugin.authorUrl}>{plugin.author}</a> : plugin.author}*/}
            {/*    </p>*/}
            {/*)}*/}
          </div>
          <div className="gv-image">
            <picture>
              <source media="(min-width: 600px)" srcSet={`${mainImage} 1x, ${mainImage} 2x`} />
              <img src={mainImage} srcSet={`${mainImage} 1x, ${mainImage} 2x`} alt={title} />
            </picture>
          </div>
        </header>

        {/* Pricing / Action Section */}
        <section className="gv-product-table gv-features-table gv-products-1 gv-area-table">
          <div className="gv-table-container">
            <div className="gv-table" role="table">
              <div className="gv-table-header" role="rowgroup">
                <div className="gv-table-row" role="row">
                  <div className="gv-product gv-p-0 oc-border-none" role="columnheader">
                    <div className="gv-content">
                      <h3 className="gv-title">{title}</h3>
                      <p>{subTitle}</p>
                    </div>
                    <div className="gv-bottom">
                      {isCheckingSubscription[plugin.slug] ? (
                        <div className="gv-price-container">
                          <div
                            className="gv-skeleton gv-skeleton-text"
                            style={{ width: '120px', height: '32px' }}
                          ></div>
                        </div>
                      ) : (
                        !subscriptionStatus[plugin.slug] && (
                          <div className="gv-price-container">
                            <div className="gv-price">
                              <span className="gv-price-text">
                                {price} {!isFree && !hasFreeTrialText && price && `,-`}
                              </span>
                              {!isFree && !hasFreeTrialText && price && (
                                <span className="gv-period">/mo</span>
                              )}
                            </div>
                            {hasFreeTrialText ? (
                              <div className="gv-price-info">
                                <div className="gv-info">{freeTrialText}</div>
                              </div>
                            ) : (
                              !isFree &&
                              price && (
                                <div className="gv-price-info">
                                  <div className="gv-info">1 year [{price}]/mo.</div>
                                </div>
                              )
                            )}
                          </div>
                        )
                      )}
                      {useWPHandlers ? (
                        <PluginActions plugin={plugin} />
                      ) : (
                        plugin.download && (
                          <a
                            href={plugin.download}
                            download
                            className="gv-button gv-button-secondary"
                          >
                            Download
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {keyFeatures.length > 0 && (
                <div className="gv-section oc-left-border-0" role="rowgroup">
                  <div className="gv-section-header gv-table-row" role="row">
                    <div className="gv-cell" role="cell">
                      <h4 className="gv-title">
                        {uiI18n?.keyFeatureHeading || plugin.i18n?.keyFeatureHeading}
                      </h4>
                    </div>
                  </div>
                  {keyFeatures.map((f, i) => (
                    <div className="gv-table-row" role="row" key={i}>
                      <div className="gv-cell" role="cell">
                        <span className="gv-cell-text">{f}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Details / Benefits */}
        <div className="gv-area-details gv-grid gv-gap-fluid">
          {benefits.length > 0 && (
            <section className="gv-stack-space-md">
              <h2 className="gv-title gv-text-bold gv-text-lg">
                {uiI18n?.benefitHeading || plugin.i18n?.benefitHeading || 'Key benefits'}
              </h2>
              <ul className="gv-list-items gv-list-check gv-mode-condensed">
                {benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Core Features Overview */}
        {coreFeatures.length > 0 && (
          <div className="gv-area-content gv-grid gv-gap-fluid">
            <section className="gv-text-sm gv-stack-space-md">
              <h2 className="gv-title gv-text-bold gv-text-lg">
                {uiI18n?.featureOverviewHeading ||
                  plugin.i18n?.featureOverviewHeading ||
                  'Core features overview'}
              </h2>
              <div className="gv-grid gv-gap-lg gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3">
                {coreFeatures.map((cf, i) => (
                  <div className="gv-item gv-stack-space-sm" key={i}>
                    <h3 className="gv-title gv-text-bold gv-text-lg">{cf.name}</h3>
                    <p className="gv-text-sm">{cf.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </article>
    </div>
  );

  return usePortal ? createPortal(content, document.body) : content;
}

ProductDetail.propTypes = {
  plugin: PropTypes.object,
  onClose: PropTypes.func,
  usePortal: PropTypes.bool,
  loading: PropTypes.bool
};
