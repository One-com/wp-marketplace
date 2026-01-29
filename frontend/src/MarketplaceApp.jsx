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
        currentPluginSlug
    } = useMarketplace();

    const isSupportedWpVersion = isWpVersionSupported('6.2');
    const isDetailPage = !!currentPluginSlug;

    return (
        <MarketplaceLayout className="gv-surface-dim">
            {!isDetailPage && !catalogError && isSupportedWpVersion && <ProductBanner loading={catalogLoading} />}
            {!isDetailPage && !allPluginsActivated && isSupportedWpVersion && <FeaturedCarousel loading={catalogLoading} />}

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
