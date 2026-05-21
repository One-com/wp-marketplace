import React from "react";
import {useMarketplace} from "../context/MarketplaceContext";

/**
 * Shown when the catalog API responds with `data.maintenanceMode === true`.
 * Both the message and the retry button label are normally server-supplied;
 * hardcoded English fallbacks guard the case where the API forgets a field
 * so the user is never stranded without a Retry option.
 */
export default function MaintenanceState({ message, buttonLabel, onRetry }) {
  const {
    assetsBaseUrl
   }=useMarketplace();
    const displayMessage = message || "We're making some improvements. Please try again in a few minutes.";
    const displayButtonLabel = buttonLabel || "Retry";
  const assetBase = assetsBaseUrl || (typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl) || "";
  const iconBase = assetBase ? `${assetBase}assets/icons/` : "";

    return (
        <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg gv-items-center gv-surface-bright gv-justify-center gv-p-fluid">
            <div className="gv-text-center">
                <p className="gv-text-md gv-mb-lg gv-text-bold">{displayMessage}</p>
                <button
                    type="button"
                    className="gv-button gv-button-primary gv-mode-condensed"
                    onClick={onRetry}
                >
                  <gv-icon aria-hidden="true" src={`${iconBase}refresh.svg`}></gv-icon>
                    <span>{displayButtonLabel}</span>
                </button>
            </div>
        </div>
    );
}
