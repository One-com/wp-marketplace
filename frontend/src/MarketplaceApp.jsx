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

    return (
        <MarketplaceLayout className="gv-surface-dim">
            {/* Version stamp sits above the banner, top-right: deliberately quiet
                (smallest caption, muted text) so it reads as metadata, not content.
                Marketplace only — the addons screen does not show it. */}
            {version && (
                <p className="marketplace-version gv-caption-sm gv-text-on-alternative gv-text-right gv-my-0">
                    Marketplace v{version}
                </p>
            )}

            {!isDetailPage && !catalogError && !isMaintenance && isSupportedWpVersion && <ProductBanner loading={catalogLoading} />}
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
