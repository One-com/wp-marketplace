import React, { useState, useEffect } from "react";
import Marketplace from "./components/MarketPlace";
import ProductBanner from "./components/ProductBanner";
import FeaturedCarousel from "./components/FeaturedCarousel";
import LoadingOverlay from "./components/LoadingOverlay";
import { MarketplaceProvider } from "./context/MarketplaceContext";

const MarketplaceApp = ({ apiBaseUrl, useWPHandlers, wpConfig, enableDefaultStyles, assetsBaseUrl }) => {
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

        return () => {
            window.removeEventListener('popstate', checkDetailPage);
            window.history.pushState = originalPushState;
        };
    }, []);

    return (
        <MarketplaceProvider
            apiBaseUrl={apiBaseUrl}
            useWPHandlers={useWPHandlers}
            wpConfig={wpConfig}
            enableDefaultStyles={enableDefaultStyles}
            assetsBaseUrl={assetsBaseUrl}
        >
            <LoadingOverlay />
            <div className="gv-activated">
                <div className="marketplace-container gv-layout-product gv-surface-dim gv-w-max-container gv-mx-auto gv-p-fluid ">

                    {!isDetailPage && <ProductBanner />}
                    {!isDetailPage && <FeaturedCarousel />}

                    <Marketplace />
                </div>
            </div>
        </MarketplaceProvider>
    );
};

export default MarketplaceApp;
