import React from 'react';
import Addons from './components/Addons';
import LoadingOverlay from './components/LoadingOverlay';
import { MarketplaceProvider } from './context/MarketplaceContext';

const AddonsApp = ({ apiBaseUrl, useWPHandlers, wpConfig, enableDefaultStyles, assetsBaseUrl }) => {
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
        <div className="marketplace-container gv-layout-product gv-w-max-container gv-mx-auto gv-p-fluid">
          <Addons />
        </div>
      </div>
    </MarketplaceProvider>
  );
};

export default AddonsApp;
