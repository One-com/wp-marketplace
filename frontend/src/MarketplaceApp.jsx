import React, { useState, useEffect } from "react";
import Marketplace from "./components/MarketPlace";
import ProductBanner from "./components/ProductBanner";
import FeaturedCarousel from "./components/FeaturedCarousel";
import LoadingOverlay from "./components/LoadingOverlay";
import { MarketplaceProvider, useMarketplace } from "./context/MarketplaceContext";

// Inner component that can access the context
const MarketplaceContent = () => {
    const { allPluginsActivated, catalogError, catalogLoading, isWpVersionSupported } = useMarketplace();

    const isSupportedWpVersion = isWpVersionSupported('6.2');

    // Track detail page visibility with state
    const [isDetailPage, setIsDetailPage] = useState(
        typeof window !== "undefined" && new URLSearchParams(window.location.search).get("plugin")
    );

    // Listen for URL changes (both popstate and custom events)
    useEffect(() => {
        const checkDetailPage = () => {
            const hasPlugin = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("plugin");
            setIsDetailPage(!!hasPlugin);
        };

        // Listen for browser back/forward
        window.addEventListener('popstate', checkDetailPage);

        // Listen for programmatic URL changes (from pushState)
        const originalPushState = window.history.pushState;
        window.history.pushState = function(...args) {
            originalPushState.apply(this, args);
            checkDetailPage();
        };

        // Listen for programmatic URL changes (from replaceState)
        const originalReplaceState = window.history.replaceState;
        window.history.replaceState = function(...args) {
            originalReplaceState.apply(this, args);
            checkDetailPage();
        };

        return () => {
            window.removeEventListener('popstate', checkDetailPage);
            window.history.pushState = originalPushState;
            window.history.replaceState = originalReplaceState;
        };
    }, []);

    return (
        <>
            <LoadingOverlay />
            <div className="gv-activated">
                <div className="marketplace-container gv-layout-product gv-surface-dim gv-w-max-container gv-mx-auto gv-p-fluid ">

                    {!isDetailPage && !catalogError && isSupportedWpVersion && <ProductBanner loading={catalogLoading} />}
                    {!isDetailPage && !allPluginsActivated && isSupportedWpVersion && <FeaturedCarousel loading={catalogLoading} />}

                    <Marketplace />
                </div>
            </div>
        </>
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
