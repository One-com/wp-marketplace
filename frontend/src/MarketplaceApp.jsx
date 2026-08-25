import React from "react";
import Marketplace from "./components/MarketPlace";
import ProductBanner from "./components/ProductBanner";
import FeaturedCarousel from "./components/FeaturedCarousel";
import MarketplaceLayout from "./components/MarketplaceLayout";
import { MarketplaceProvider, useMarketplace } from "./context/MarketplaceContext";

// Inner component that can access the context
const MarketplaceContent = () => {
    const {
        allPluginsActivated,
        catalogError,
        catalogLoading,
        isWpVersionSupported,
        currentPluginSlug,
        maintenanceState,
        version,
    } = useMarketplace();

    const isSupportedWpVersion = isWpVersionSupported('6.2');
    const isDetailPage = !!currentPluginSlug;
    const isMaintenance = maintenanceState?.isOn;
    const showBanner = !isDetailPage && !catalogError && !isMaintenance && isSupportedWpVersion;

    return (
        <MarketplaceLayout className="gv-surface-dim">
            {/* Stamp and banner share one grid item on purpose. `.gv-layout-product`
                is a grid with a fluid gap (48px from 1440px up), so as siblings they
                were forced a full section-gap apart. Nesting them keeps that gap
                between page sections while letting the stamp sit just above the
                banner. The stamp is deliberately quiet — smallest caption, muted
                text — so it reads as metadata. Marketplace only; not on addons. */}
            {(version || showBanner) && (
                <div>
                    {version && (
                        <p className="marketplace-version gv-caption-sm gv-text-on-alternative gv-text-right gv-mt-0 gv-mb-sm">
                            Marketplace v{version}
                        </p>
                    )}
                    {showBanner && <ProductBanner loading={catalogLoading} />}
                </div>
            )}
            {!isDetailPage && !catalogError && !isMaintenance && !allPluginsActivated && isSupportedWpVersion && <FeaturedCarousel loading={catalogLoading} />}

            <Marketplace />
        </MarketplaceLayout>
    );
};

const MarketplaceApp = ({ apiBaseUrl, useWPHandlers, wpConfig, enableDefaultStyles, assetsBaseUrl }) => {
    return (
        <MarketplaceProvider
            apiBaseUrl={apiBaseUrl}
            useWPHandlers={useWPHandlers}
            wpConfig={wpConfig}
            enableDefaultStyles={enableDefaultStyles}
            assetsBaseUrl={assetsBaseUrl}
        >
            <MarketplaceContent />
        </MarketplaceProvider>
    );
};

export default MarketplaceApp;
