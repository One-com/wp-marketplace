import React from "react";
import Addons from "./components/Addons";
import MarketplaceLayout from "./components/MarketplaceLayout";
import { MarketplaceProvider } from "./context/MarketplaceContext";

const AddonsApp = ({ apiBaseUrl, useWPHandlers, wpConfig, enableDefaultStyles, assetsBaseUrl }) => {
    return (
        <MarketplaceProvider
            apiBaseUrl={apiBaseUrl}
            useWPHandlers={useWPHandlers}
            wpConfig={wpConfig}
            enableDefaultStyles={enableDefaultStyles}
            assetsBaseUrl={assetsBaseUrl}
        >
            <MarketplaceLayout>
                <Addons />
            </MarketplaceLayout>
        </MarketplaceProvider>
    );
};

export default AddonsApp;
