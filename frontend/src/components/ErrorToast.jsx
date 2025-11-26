import React from "react";
import { useMarketplace } from "../context/MarketplaceContext";

export default function ErrorToast({ plugin }) {
    const {
        assetsBaseUrl,
        errorState,
        setErrorState
    } = useMarketplace();

    if (!errorState || !errorState.visible || errorState.pluginSlug !== plugin?.slug) {
        return null;
    }

    const assetBase = assetsBaseUrl || (typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl) || "";
    const iconBase = assetBase ? `${assetBase}assets/` : "";

    const handleClose = () => {
        setErrorState({ visible: false, type: null, pluginSlug: null });
    };

    const isActivateError = errorState.type === 'activate';
    const isInstallError = errorState.type === 'install';

    return (
        <div className="gv-toast-container">
            <div className="gv-toast gv-toast-alert gv-visible">
                <gv-icon
                    className="gv-notice-icon"
                    aria-hidden="true"
                    src={`${iconBase}icons/error.svg`}
                ></gv-icon>
                <div className="gv-toast-content">
                    {isActivateError && "Couldn't activate plugin."}
                    {isInstallError && "Couldn't install plugin."}
                </div>
                <button type="button" className="gv-toast-close" aria-label="Close" onClick={handleClose}>
                    <gv-icon aria-hidden="true" src={`${iconBase}icons/close.svg`}></gv-icon>
                </button>
            </div>
        </div>
            );
            }
