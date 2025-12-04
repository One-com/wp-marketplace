import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import PluginActions from "./PluginActions";
import SuccessNotice from "./SuccessNotice";
import ErrorToast from "./ErrorToast";
import { useMarketplace } from "../context/MarketplaceContext";
import { formatPluginPrice } from "../utils/priceFormatter";

export default function ProductDetail({
    plugin,
    onClose,
    usePortal = true
}) {
    const {
        assetsBaseUrl,
        useWPHandlers,
        pluginInAction,
        uiI18n
    } = useMarketplace();
    if (!plugin) return null;

    // Scroll to top when component mounts or plugin changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [plugin]);

    const assetBase = assetsBaseUrl || (typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl) || "";
    const imageURL = (typeof window.onecomWpVars !== "undefined" && window.onecomWpVars?.imageURL) || assetBase;
    const iconSrc = plugin.thumbnail || `${assetBase}assets/icons/placeholder.svg`;
    const iconBase = assetBase ? `${assetBase}assets/icons/` : "";
    const mainImage = plugin.bannerUrl || plugin.image || plugin.thumbnail || 'https://gravity.group.one/guide-images/product-image@2x.png';

    // Extract data with fallbacks
    const title = plugin.name || 'Product';
    const description = plugin.i18n?.description || plugin.i18n?.subtitle || plugin.description || plugin.shortDescription || 'No description available.';
    const subTitle = plugin.i18n?.subtitle;
    const isFree = plugin.licenseType === "free";
    const price = formatPluginPrice(plugin);

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
            const title = plugin.i18n[`coreFeatureTitle${i}`];
            const content = plugin.i18n[`coreFeatureContent${i}`];
            if (title && title.trim() !== '' && content && content.trim() !== '') {
                coreFeaturesFromI18n.push({ name: title, desc: content });
            }
            i++;
        }
    }

    // Use only i18n data - no fallbacks
    const keyFeatures = keyFeaturesFromI18n;
    const benefits = benefitsFromI18n;
    const coreFeatures = coreFeaturesFromI18n;

    const content = (
        <div className={usePortal ? "gv-surface-dim" : "gv-surface-dim"}>
            <article className="gv-layout-product gv-p-0 gv-product-single gv-w-max-container gv-mx-auto gv-p-fluid">
                <nav className="gv-breadcrumbs gv-area-nav gv-flex-col gv-items-start">
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
                        className="gv-flex gv-items-center gv-gap-xs"
                        role="button"
                        aria-label="Go back"
                    >
                        <img style={{ minWidth: "24px" }} className="gv-tile" src={`${iconBase}arrow_back.svg`}
                                        alt="Back to plugins" />
                        <span>Back</span>
                    </a>
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
                                                    <span className="gv-price-text">{price} {!isFree && price && `,-`}</span>
                                                    {!isFree && price && <span className="gv-period">/mo</span>}
                                                </div>
                                              {!isFree && price &&
                                                <div className="gv-price-info">
                                                  <div className="gv-info">1 year [{price}]/mo.</div>
                                                </div>}
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
                                            <h4 className="gv-title">{uiI18n?.keyFeatureHeading || plugin.i18n?.keyFeatureHeading}</h4>
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
