import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import PluginActions from "./PluginActions";
import SuccessNotice from "./SuccessNotice";
import ErrorToast from "./ErrorToast";
import { useMarketplace } from "../context/MarketplaceContext";
import { formatPluginPrice } from "../utils/priceFormatter";

export default function ProductDetailRankMath({
    plugin,
    onClose,
    usePortal = true
}) {
    const {
        assetsBaseUrl,
        useWPHandlers,
        pluginInAction,
        plugins,
        uiI18n
    } = useMarketplace();
    if (!plugin) return null;

    // Scroll to top when component mounts or plugin changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [plugin]);

    // Always get both plugins from context - seo-by-rank-math for first column, rank-math-pro for second
    const freePlugin = plugins.find(p => p.slug === "seo-by-rank-math") || null;
    const proPlugin = plugins.find(p => p.slug === "seo-by-rank-math-pro") || null;

    // Use the clicked plugin for header/main content, but always use freePlugin for first column
    const assetBase = assetsBaseUrl || (typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl) || "";
    const imageURL = (typeof window.onecomWpVars !== "undefined" && window.onecomWpVars?.imageURL) || assetBase;
    const iconSrc = plugin.thumbnail || `${assetBase}assets/icons/placeholder.svg`;
    const iconBase = assetBase ? `${assetBase}assets/icons/` : "";
    const mainImage = plugin.bannerUrl || plugin.image || plugin.thumbnail || 'https://gravity.group.one/guide-images/product-image@2x.png';

    // Extract data with fallbacks for free version (first column - always seo-by-rank-math)
    const title = freePlugin?.name || plugin.name || 'Product';
    const description = freePlugin?.i18n?.description || freePlugin?.i18n?.subtitle;
    const subtitle = freePlugin?.i18n?.subtitle;

    // Extract data for pro version (second column - always rank-math-pro)
    const proTitle = proPlugin?.name || 'Rank Math Pro';
    const proDescription = proPlugin?.i18n?.subtitle || proPlugin?.i18n?.description;
    const proPrice = proPlugin ? formatPluginPrice(proPlugin) : '';

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

    // Extract key benefits from i18n (use freePlugin's i18n if available, otherwise plugin's i18n)
    const i18nSource = freePlugin?.i18n || plugin.i18n;
    const benefitsFromI18n = extractNumberedProps(i18nSource, 'keyBenefitContent');

    // Extract key features separately for both free and pro plugins
    const freeKeyFeatures = extractNumberedProps(freePlugin?.i18n, 'keyFeatureContent');
    const proKeyFeatures = extractNumberedProps(proPlugin?.i18n, 'keyFeatureContent');

    // Determine the maximum number of features to display all from both plugins
    const maxFeatures = Math.max(freeKeyFeatures.length, proKeyFeatures.length);

    // Extract core features (title/content pairs) from i18n
    const coreFeaturesFromI18n = [];
    if (i18nSource && typeof i18nSource === 'object') {
        let i = 1;
        while (i18nSource[`coreFeatureTitle${i}`] || i18nSource[`coreFeatureContent${i}`]) {
            const title = i18nSource[`coreFeatureTitle${i}`];
            const content = i18nSource[`coreFeatureContent${i}`];
            if (title && title.trim() !== '' && content && content.trim() !== '') {
                coreFeaturesFromI18n.push({ name: title, desc: content });
            }
            i++;
        }
    }

    // Use only i18n data - no fallbacks
    const benefits = benefitsFromI18n;
    const coreFeatures = coreFeaturesFromI18n;

    const content = (
        <div className="gv-surface-dim">
            <article className="gv-layout-product gv-w-max-container gv-mx-auto gv-p-fluid gv-p-0">
                <nav className="gv-breadcrumbs gv-area-nav">
                    <a
                        href="#"
                        onClick={e => {
                            e.preventDefault();
                            if (typeof window !== "undefined" && window.history && window.history.length > 1) {
                                window.history.back();
                            } else if (onClose) {
                                onClose();
                            }
                        }}
                    >
                        <gv-icon aria-hidden="true" src={`${iconBase}chevron_left.svg`}></gv-icon>
                        <span>Back</span>
                    </a>
                </nav>

                <SuccessNotice plugin={plugin} />
                <ErrorToast plugin={plugin} />

                <header className="gv-product-header gv-area-header">
                    <div className="gv-content gv-stack-space-md gv-text-sm">
                        <h3 className="gv-title gv-header-lg">Rank Math</h3>
                        <p className="gv-text-sm">{description}</p>
                    </div>
                    <div className="gv-image">
                        <picture>
                            <source
                                media="(min-width: 600px)"
                                srcSet={`${mainImage} 2x, ${mainImage} 1x`}
                            />
                            <img
                                src={mainImage}
                                srcSet={`${mainImage} 2x, ${mainImage} 1x`}
                                alt="Product image"
                            />
                        </picture>
                    </div>
                </header>

                <section className="gv-product-table gv-features-table gv-products-2 gv-recommended-2 gv-area-table">
                    <div className="gv-dots-scroll-area">
                        <div className="gv-table-container">
                            <div className="gv-slider-nav">
                                <button type="button" className="gv-nav-button gv-previous gv-disabled">
                                    <gv-icon aria-hidden="true" src={`${iconBase}chevron_left.svg`}></gv-icon>
                                </button>
                                <button type="button" className="gv-nav-button gv-next">
                                    <gv-icon aria-hidden="true" src={`${iconBase}chevron_right.svg`}></gv-icon>
                                </button>
                            </div>
                            <div className="gv-table-slider">
                                <div className="gv-table" role="table">
                                    <div className="gv-table-header" role="rowgroup">
                                        <div className="gv-table-row" role="row">
                                            <div className="gv-product gv-p-0" role="columnheader">
                                                <div className="gv-content">
                                                    <h3 className="gv-title">{title}</h3>
                                                    <p>{subtitle}</p>
                                                </div>
                                                <div className="gv-bottom">
                                                    <div className="gv-price-container">
                                                        <div className="gv-price">
                                                            <span className="gv-price-text">Free</span>
                                                        </div>
                                                    </div>
                                                    {useWPHandlers && freePlugin ? (
                                                        <PluginActions
                                                            plugin={freePlugin}
                                                        />
                                                    ) : (
                                                        freePlugin?.download && (
                                                            <button type="button" className="gv-button gv-button-secondary">{uiI18n?.installButton || freePlugin?.i18n?.installButton || 'Install'}</button>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                          <div className="gv-product gv-p-0" role="columnheader">
                                            <div className="gv-recommended-label">Recommended</div>
                                            <div className="gv-content">
                                              <h3 className="gv-title">{proTitle}</h3>
                                              <p>{proDescription.substring(0, 120)}{proDescription.length > 120 ? '…' : ''}</p>
                                            </div>
                                            <div className="gv-bottom">
                                              <div className="gv-price-container">
                                                <div className="gv-price">
                                                  <span className="gv-price-text">{proPrice}{proPrice && `,-`}</span>
                                                  {proPrice && <span className="gv-period">/mo</span>}
                                                </div>
                                                {proPrice &&
                                                <div className="gv-price-info">
                                                  <div className="gv-info">1 year [{proPrice}]/mo.</div>
                                                </div>}
                                              </div>
                                              {useWPHandlers && proPlugin ? (
                                                <PluginActions
                                                  plugin={proPlugin}
                                                />
                                              ) : (
                                                <button type="button"
                                                        className="gv-button gv-button-primary">Select</button>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                    </div>
                                    {maxFeatures > 0 && (
                                        <div className="gv-section" role="rowgroup">
                                            <div className="gv-section-header gv-table-row" role="row">
                                                <div className="gv-cell" role="cell">
                                                    <h4 className="gv-title">{uiI18n?.keyFeatureHeading || freePlugin?.i18n?.keyFeatureHeading || 'Key features'}</h4>
                                                </div>
                                                <div className="gv-cell" role="cell">
                                                    <h4 className="gv-title">{uiI18n?.keyFeatureHeading || proPlugin?.i18n?.keyFeatureHeading || 'Key features'}</h4>
                                                </div>
                                            </div>
                                            {Array.from({ length: maxFeatures }).map((_, i) => (
                                                <div className="gv-table-row" role="row" key={i}>
                                                    <div className="gv-cell" role="cell">
                                                        <span className="gv-cell-text">{freeKeyFeatures[i] || ''}</span>
                                                    </div>
                                                    <div className="gv-cell" role="cell">
                                                        <span className="gv-cell-text">{proKeyFeatures[i] || ''}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="gv-slider-pagination gv-state-top">
                            <div className="gv-dots" role="tablist">
                                <span className="gv-dot gv-active" role="tab" aria-selected="true" aria-label="Go to slide 1"></span>
                                <span className="gv-dot" role="tab" aria-selected="false" aria-label="Go to slide 2"></span>
                            </div>
                        </div>
                    </div>
                </section>

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

                {coreFeatures.length > 0 && (
                    <div className="gv-area-content gv-grid gv-gap-fluid">
                        <section className="gv-text-sm gv-stack-space-md">
                            <h2 className="gv-title gv-text-bold gv-text-lg">{uiI18n?.featureOverviewHeading || plugin.i18n?.featureOverviewHeading || 'Core features overview'}</h2>
                            <div className="gv-grid gv-gap-lg gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3">
                                {coreFeatures.map((cf, i) => (
                                    <div className="gv-item gv-stack-space-sm" key={i}>
                                        <h3 className="gv-title gv-text-bold gv-text-sm">{cf.name}</h3>
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
