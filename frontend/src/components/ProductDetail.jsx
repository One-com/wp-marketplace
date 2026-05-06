import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import PluginActions from "./PluginActions";
import SuccessNotice from "./SuccessNotice";
import ErrorToast from "./ErrorToast";
import Breadcrumbs from "./Breadcrumbs";
import { useMarketplace } from "../context/MarketplaceContext";
import { formatPluginPrice, getFullPrice, getRebatePrice } from "../utils/priceFormatter";
import { HtmlRenderer } from "../utils/common.utils";

export default function ProductDetail({
    plugin,
    onClose,
    usePortal = true,
    loading = false
}) {
    const {
        assetsBaseUrl,
        useWPHandlers,
        pluginInAction,
        uiI18n,
        setNoticeState,
        setErrorState
    } = useMarketplace();

    const assetBase = assetsBaseUrl || (typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl) || "";
    const iconBase = assetBase ? `${assetBase}assets/icons/` : "";
    const brand = (typeof window !== 'undefined' && window.marketplaceConfig?.brand) || '';
    const brandClass = brand ? ` brand-${brand.replace(/[^a-zA-Z0-9_-]/g, '')}` : '';

    // Show skeleton loaders while loading (even if plugin is null)
    if (loading) {
        const skeletonContent = (
            <div className={`gv-surface-dim${brandClass}`}>
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
                            <div className="gv-skeleton gv-heading-lg gv-mb-sm" style={{ marginBottom:'24px' }}></div>
                            <div className="gv-skeleton"></div>
                            <div className="gv-skeleton"></div>
                            <div className="gv-skeleton" style={{ width: '80%' }}></div>
                        </div>
                        <div className="gv-image">
                            <div className="gv-card-image gv-h-full" style={{ marginTop:'75px' }}>
                                <div className="gv-skeleton gv-radius-0 gv-h-full" style={{ minHeight: '300px' }}></div>
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
                                                    <div className="gv-skeleton" style={{ width: '120px', height: '32px' }}></div>
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

    // Scroll to top when component mounts or plugin changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [plugin]);

    // Clear banners when component mounts (handles case when user returns via browser back button)
    useEffect(() => {
        // Clear any existing banners when ProductDetail mounts
        // BUT don't clear them if they are for the current plugin (e.g. just activated and reloaded)
        setNoticeState(prev => (prev.visible && prev.pluginSlug === plugin.slug) ? prev : { visible: false, type: null, pluginSlug: null });
        setErrorState(prev => (prev.visible && prev.pluginSlug === plugin.slug) ? prev : { visible: false, type: null, pluginSlug: null });
    }, [plugin.slug, setNoticeState, setErrorState]);

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

    const imageURL = (typeof window.onecomWpVars !== "undefined" && window.onecomWpVars?.imageURL) || assetBase;
    const iconSrc = plugin.thumbnail || `${assetBase}assets/icons/placeholder.svg`;
    const mainImage = plugin.bannerUrl || plugin.image || plugin.thumbnail || 'https://gravity.group.one/guide-images/product-image@2x.png';

    // // --- MOCK DATA: Remove this block once API returns real values ---
    if (!plugin.version) plugin = { ...plugin, version: '3.2.1' };
    if (!plugin.testedUpTo) plugin = { ...plugin, testedUpTo: '6.7' };
    if (!plugin.requiresPhpVersion) plugin = { ...plugin, requiresPhpVersion: '7.4' };
    if (!plugin.requiresWpVersion) plugin = { ...plugin, requiresWpVersion: '5.8' };
    if (plugin.rating === null || plugin.rating === undefined) plugin = { ...plugin, rating: 92 };
    if (plugin.ratingCount === null || plugin.ratingCount === undefined) plugin = { ...plugin, ratingCount: 1247 };
    if (plugin.activeInstalls === null || plugin.activeInstalls === undefined) plugin = { ...plugin, activeInstalls: 500000 };
    if (!plugin.pluginLastUpdated) plugin = { ...plugin, pluginLastUpdated: '2026-03-15T10:30:00.000Z' };
    // // --- END MOCK DATA ---

    // Extract data with fallbacks
    const title = plugin.name || 'Product';
    const description = plugin.i18n?.description || plugin.i18n?.subtitle || plugin.description || plugin.shortDescription || 'No description available.';
    const subTitle = plugin.i18n?.subtitle;
    const isFree = plugin.licenseType === "free";
    const freeTrialText = plugin.i18n?.freeTrialText || '';
    const hasFreeTrialText = freeTrialText && freeTrialText.trim() !== '';
    const freeTrialPeriod = plugin.i18n?.freeTrialPeriod || '';
    const hasFreeTrialPeriod = freeTrialPeriod && freeTrialPeriod.trim() !== '';

    const price = (hasFreeTrialPeriod || hasFreeTrialText)
        ? (uiI18n?.headings?.freeTrial || 'Free trial*')
        : formatPluginPrice(plugin, uiI18n?.labels?.free || 'Free', uiI18n, true);

    // Check if price is "Free until renewal" (rebate amount is 0)
    const isFreeUntilRenewal = price === (uiI18n?.labels?.freeUntilRenewal || 'Free until renewal');

    // Extract full and rebate prices using common utility functions
    const fullPriceAmount = getFullPrice(plugin, true);
    const rebatePriceAmount = getRebatePrice(plugin, true);

    const getTimeAgo = (dateStr) => {
        const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
        if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        const weeks = Math.floor(days / 7);
        if (weeks < 52) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
        const years = Math.floor(weeks / 52);
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    };

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
        <div className={brandClass}>
            <article className="gv-layout-product gv-p-0 gv-product-single gv-w-max-container gv-mx-auto gv-p-fluid">
                <Breadcrumbs
                    iconBase={iconBase}
                    label={uiI18n.backButton}
                    onClose={onClose}
                    disabled={pluginInAction[plugin.slug]}
                    className="gv-flex-col gv-items-start"
                >
                    <SuccessNotice plugin={plugin} />
                    <ErrorToast plugin={plugin} />
                </Breadcrumbs>



                <header className="gv-product-header gv-area-header">
                    <div className="gv-content gv-stack-space-md gv-text-sm">
                        <h3 className="gv-title gv-header-lg">{title}</h3>
                        <p className="gv-text-sm">{description}</p>
                    </div>
                    <div className="gv-image">
                        <picture>
                            <source
                                media="(min-width: 600px)"
                                srcSet={`${mainImage} 1x, ${mainImage} 2x`}
                            />
                            <img
                                src={mainImage}
                                srcSet={`${mainImage} 1x, ${mainImage} 2x`}
                                alt={`${title} image`}
                            />
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
                                            <div className="gv-price-container">
                                                <div className="gv-price">
                                                    {(hasFreeTrialPeriod || hasFreeTrialText) ? (
                                                        <span className="gv-price-text">{price}</span>
                                                    ) : (
                                                        <>
                                                            <span className="gv-price-text">
                                                                <HtmlRenderer htmlString={plugin.licenseType === "premium" && rebatePriceAmount !== null
                                                                    ? (rebatePriceAmount !== null ? rebatePriceAmount : fullPriceAmount)
                                                                    : price} />
                                                            </span>
                                                            {!isFree && !isFreeUntilRenewal && price && (
                                                                <span className="gv-period">/{window.marketplaceConfig?.brand === 'rankmath' ? ' month' : uiI18n?.labels?.timeMonth}</span>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                                {(hasFreeTrialPeriod || hasFreeTrialText) ? (
                                                    <div className="gv-price-info">
                                                        <div className="gv-info">{freeTrialText}</div>
                                                    </div>
                                                ) : (
                                                    !isFree && price && fullPriceAmount && rebatePriceAmount !== null &&
                                                    <div className="gv-price-info">
                                                        <div className="gv-info">{uiI18n.labels.untilRenewal} [<HtmlRenderer htmlString={rebatePriceAmount} />]/{uiI18n?.labels?.timeMonth}</div>
                                                        <div className="gv-info">{uiI18n.labels.afterThat} [<HtmlRenderer htmlString={fullPriceAmount} />]/{uiI18n?.labels?.timeMonth}</div>
                                                    </div>
                                                )}
                                            </div>
                                            {useWPHandlers ? (
                                                <PluginActions
                                                    plugin={plugin}
                                                />
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
                                      <h4 className="gv-title">{uiI18n?.headings?.key_features || plugin.i18n?.keyFeatureHeading}</h4>
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
                  {/* Plugin Meta — rendered outside gv-layout-product grid to avoid area conflicts */}
                  {(plugin.version || plugin.testedUpTo || plugin.requiresPhpVersion || plugin.requiresWpVersion || plugin.pluginLastUpdated || plugin.activeInstalls !== null || plugin.rating !== null) && (
                    <div className="gv-table-container gv-mt-fluid">
                      <div className="gv-table" role="table">
                        <div className="gv-section oc-left-border-0" role="rowgroup">
                          <div className="gv-section-header gv-table-row" role="row">
                            <div className="gv-cell" role="cell" style={{ borderTop: '1px solid #E0E0E0'}}>
                              <h4 className="gv-title">{uiI18n?.headings?.plugin_meta || 'Plugin Meta'}</h4>
                            </div>
                          </div>
                          {plugin.version && (
                            <div className="gv-table-row" role="row">
                              <div className="gv-cell" role="cell">
                                <span className="gv-cell-text gv-flex gv-justify-between gv-w-full"><span>{uiI18n?.labels?.version || 'Version'}</span><strong>{plugin.version}</strong></span>
                              </div>
                            </div>
                          )}
                          {plugin.testedUpTo && (
                            <div className="gv-table-row" role="row">
                              <div className="gv-cell" role="cell">
                                <span className="gv-cell-text gv-flex gv-justify-between gv-w-full"><span>{uiI18n?.labels?.tested_upto || 'Tested up to'}</span><strong>{plugin.testedUpTo}</strong></span>
                              </div>
                            </div>
                          )}
                          {plugin.requiresPhpVersion && (
                            <div className="gv-table-row" role="row">
                              <div className="gv-cell" role="cell">
                                <span className="gv-cell-text gv-flex gv-justify-between gv-w-full"><span>{uiI18n?.headings?.php_version || 'PHP version'}</span><strong>{plugin.requiresPhpVersion} {uiI18n?.labels?.orHigher || 'or higher'}</strong></span>
                              </div>
                            </div>
                          )}
                          {plugin.requiresWpVersion && (
                            <div className="gv-table-row" role="row">
                              <div className="gv-cell" role="cell">
                                <span className="gv-cell-text gv-flex gv-justify-between gv-w-full"><span>{uiI18n?.headings?.wordpress_version || 'WordPress version'}</span><strong>{plugin.requiresWpVersion} {uiI18n?.labels?.orHigher || 'or higher'}</strong></span>
                              </div>
                            </div>
                          )}
                          {plugin.pluginLastUpdated && (
                            <div className="gv-table-row" role="row">
                              <div className="gv-cell" role="cell">
                                <span className="gv-cell-text gv-flex gv-justify-between gv-w-full"><span>{uiI18n?.labels?.lastUpdated || 'Last updated'}</span><strong>{getTimeAgo(plugin.pluginLastUpdated)}</strong></span>
                              </div>
                            </div>
                          )}
                          {plugin.activeInstalls !== null && (
                            <div className="gv-table-row" role="row">
                              <div className="gv-cell" role="cell">
                                <span className="gv-cell-text gv-flex gv-justify-between gv-w-full"><span>{uiI18n?.headings?.active_installs || 'Active installations'}</span><strong>{plugin.activeInstalls.toLocaleString()}+</strong></span>
                              </div>
                            </div>
                          )}
                          {plugin.rating !== null && (
                            <div className="gv-table-row" role="row">
                              <div className="gv-cell" role="cell">
                                <span className="gv-cell-text gv-flex gv-justify-between gv-w-full"><span>{uiI18n?.labels?.rating || 'Rating'}</span><strong>{(plugin.rating / 20).toFixed(1)}/5{plugin.ratingCount !== null && ` (${plugin.ratingCount})`}</strong></span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </section>

                {/* Details / Benefits */}
                <div className="gv-area-details gv-grid gv-gap-fluid">
                    {benefits.length > 0 && (
                        <section className="gv-stack-space-md">
                            <h2 className="gv-title gv-text-bold gv-text-lg">{uiI18n?.benefitHeading || plugin.i18n?.benefitHeading || 'Key benefits'}</h2>
                            <ul className="gv-list-items gv-list-check gv-mode-condensed">
                                {benefits.map((b, i) => <li key={i}>{b}</li>)}
                            </ul>
                        </section>
                    )}
                </div>

                {/* Core Features Overview */}
                {coreFeatures.length > 0 && (
                    <div className="gv-area-content gv-grid gv-gap-fluid">
                        <section className="gv-text-sm gv-stack-space-md">
                            <h2 className="gv-title gv-text-bold gv-text-lg">{uiI18n?.featureOverviewHeading || plugin.i18n?.featureOverviewHeading || 'Core features overview'}</h2>
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
