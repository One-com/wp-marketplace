import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';

export default function LoadingOverlay() {
  const { loadingAction, loadingPlugin, assetsBaseUrl } = useMarketplace();

  // Don't show overlay if no action is in progress
  if (!loadingAction) {
    return null;
  }

  const assetBase =
    assetsBaseUrl ||
    (typeof window.marketplaceConfig !== 'undefined' && window.marketplaceConfig?.assetsBaseUrl) ||
    '';
  const spinnerSrc = `${assetBase}assets/images/spinner.svg`;

  return (
    <div className="loading-overlay show">
      <div className="gv-loader-container gv-pos-center gv-pos-absolute">
        <gv-loader src={spinnerSrc}></gv-loader>
        <p>{loadingAction}</p>
      </div>
    </div>
  );
}
