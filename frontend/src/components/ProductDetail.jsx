import React from "react";
import { createPortal } from "react-dom";
import PluginActions from "./PluginActions";

export default function ProductDetail({
    plugin,
    onClose,
    assetsBaseUrl,
    useWPHandlers,
    pluginInAction,
    onAction,
    usePortal = true
}) {
    if (!plugin) return null;

    const assetBase = assetsBaseUrl || (typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl) || "";
    const imageURL = (typeof window.onecomWpVars !== "undefined" && window.onecomWpVars?.imageURL) || assetBase;
    const iconSrc = plugin.thumbnail || `${assetBase}assets/icons/placeholder.svg`;
    const iconBase = assetBase ? `${assetBase}assets/icons/` : "";
    const mainImage = plugin.image || plugin.thumbnail || 'https://gravity.group.one/guide-images/product-image@2x.png';

    // Extract data with fallbacks
    const title = plugin.name || 'Product';
    const description = plugin.description || plugin.shortDescription || 'No description available.';
    const price = (plugin.priceCurrency && plugin.priceAmount) 
        ? `${plugin.priceCurrency} ${plugin.priceAmount}`
        : '€ 0,-';

    // Derive features from description or plugin data
    const rawFeatureSource = plugin.features && plugin.features.length
        ? plugin.features
        : description.split(/[.?!]/).map(s => s.trim()).filter(Boolean);

    const keyFeatures = rawFeatureSource.slice(0, 3).map(f => f.replace(/\.$/, ''));
    while (keyFeatures.length < 3) keyFeatures.push('Sample feature');

    const benefits = [
        keyFeatures[0],
        keyFeatures[1] || 'Improves performance',
        keyFeatures[2] || 'Easy setup'
    ];

    const coreFeatures = [
        { name: keyFeatures[0], desc: description.substring(0, 150) || 'Feature description' },
        { name: keyFeatures[1], desc: 'Enhances your WordPress experience with reliable performance' },
        { name: keyFeatures[2], desc: 'Easy to set up and configure with minimal technical knowledge' }
    ];

    const content = (
        <div className={usePortal ? "gv-surface-dim" : "gv-surface-dim"}>
            <article className="gv-layout-product gv-product-single gv-w-max-container gv-mx-auto gv-p-fluid">
                <nav className="gv-breadcrumbs gv-area-nav test-">
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
                        <img style={{ minWidth: "24px" }} className="gv-tile" src={`${iconBase}chevron_left.svg`}
                                        alt="Back to plugins" />
                        <span>Back</span>
                    </a>
                </nav>

                <header className="gv-product-header gv-area-header">
                    <div className="gv-content gv-stack-space-md gv-text-sm">
                        <h1 className="gv-title gv-header-lg">{title}</h1>
                        <p>{description}</p>
                        {plugin.author && (
                            <p className="gv-text-xs gv-mt-sm">
                                Author: {plugin.authorUrl ? <a href={plugin.authorUrl}>{plugin.author}</a> : plugin.author}
                            </p>
                        )}
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
                                    <div className="gv-product" role="columnheader">
                                        <div className="gv-content">
                                            <h3 className="gv-title">{title}</h3>
                                            <p>{description.substring(0, 120)}{description.length > 120 ? '…' : ''}</p>
                                        </div>
                                        <div className="gv-bottom">
                                            <div className="gv-price-container">
                                                <div className="gv-price">
                                                    <span className="gv-price-text">{price}</span>
                                                    <span className="gv-period">/mo</span>
                                                </div>
                                            </div>
                                            {useWPHandlers ? (
                                                <PluginActions
                                                    plugin={plugin}
                                                    pluginInAction={pluginInAction}
                                                    onAction={onAction}
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

                            <div className="gv-section" role="rowgroup">
                                <div className="gv-section-header gv-table-row" role="row">
                                    <div className="gv-cell" role="cell">
                                        <h4 className="gv-title">Key features</h4>
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
                        </div>
                    </div>
                </section>

                {/* Details / Benefits */}
                <div className="gv-area-details gv-grid gv-gap-fluid">
                    <section className="gv-stack-space-md">
                        <h2 className="gv-title gv-text-bold gv-text-lg">Key benefits</h2>
                        <ul className="gv-list-items gv-list-check gv-mode-condensed">
                            {benefits.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                    </section>

                    <section className="gv-text-max gv-text-sm gv-stack-space-md">
                        <h2 className="gv-title gv-text-bold gv-text-lg">Why choose {title}?</h2>
                        <p>
                            This plugin helps you enhance your site with reliable performance and simplicity.
                            It is designed to integrate smoothly and scale as your needs grow.
                        </p>
                    </section>
                </div>

                {/* Core Features Overview */}
                <div className="gv-area-content gv-grid gv-gap-fluid">
                    <section className="gv-text-sm gv-stack-space-md">
                        <h2 className="gv-title gv-text-bold gv-text-lg">Core features overview</h2>
                        <div className="gv-grid gv-gap-lg gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3">
                            {coreFeatures.map((cf, i) => (
                                <div className="gv-item gv-stack-space-sm" key={i}>
                                    <h3 className="gv-title gv-text-bold gv-text-sm">{cf.name}</h3>
                                    <p>{cf.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </article>
        </div>
    );

    return usePortal ? createPortal(content, document.body) : content;
}
