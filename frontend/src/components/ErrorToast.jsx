import React, { useEffect } from "react";
import { useMarketplace } from "../context/MarketplaceContext";

export default function ErrorToast({ plugin: propPlugin }) {
    const {
        assetsBaseUrl,
        errorState,
        setErrorState,
        uiI18n,
        plugins
    } = useMarketplace();

    const plugin = propPlugin || plugins.find(p => p.slug === errorState.pluginSlug);
    const isVisible = errorState && errorState.visible && errorState.pluginSlug === plugin?.slug;

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                handleClose();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    if (!isVisible) {
        return null;
    }

    const assetBase = assetsBaseUrl || (typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl) || "";
    const iconBase = assetBase ? `${assetBase}assets/` : "";

    const handleClose = () => {
        setErrorState({ visible: false, type: null, pluginSlug: null, message: null });
    };

    const isActivateError = errorState.type === 'activate';
    const isDeactivateError = errorState.type === 'deactivate';
    const isInstallError = errorState.type === 'install';
    const isDeleteError = errorState.type === 'delete';
    const isBuyNowError = errorState.type === 'buy_now';
    const isCancelSubscriptionError = errorState.type === 'cancel_subscription';

    // Helper function to replace {0} with plugin name
    const formatMessage = (message, pluginName) => {
        if (!message) return '';
        return message.replace('{0}', pluginName || '');
    };

    const pluginName = plugin?.name || '';

    // Raw API error codes (e.g. "upstream_error", "invalid_request") aren't user-friendly.
    // A machine code looks like a single token: underscore present and no whitespace.
    const isMachineCode = typeof errorState.message === 'string'
        && errorState.message.includes('_')
        && !/\s/.test(errorState.message);
    const friendlyFallback = uiI18n?.notifications?.somethingWentWrong || 'Something went wrong; please try again.';
    const displayMessage = errorState.message && !isMachineCode ? errorState.message : (isMachineCode ? friendlyFallback : null);

    return (
        <div className="gv-toast-container">
            <div className="gv-toast gv-toast-alert gv-visible">
                <gv-icon
                    className="gv-notice-icon"
                    aria-hidden="true"
                    src={`${iconBase}icons/error.svg`}
                ></gv-icon>
                <div className="gv-toast-content">
                    {displayMessage
                        ? displayMessage
                        : (<>
                            {isActivateError && formatMessage(uiI18n?.notifications?.pluginActivationFailed || "Couldn't activate plugin.", pluginName)}
                            {isDeactivateError && formatMessage(uiI18n?.notifications?.pluginDeactivationFailed || "Couldn't deactivate plugin.", pluginName)}
                            {isInstallError && formatMessage(uiI18n?.notifications?.pluginInstallationFailed || "Couldn't install plugin.", pluginName)}
                            {isDeleteError && formatMessage(uiI18n?.notifications?.pluginDeletionFailed || "Couldn't delete plugin.", pluginName)}
                            {isBuyNowError && (uiI18n?.notifications?.procurementFailed || "Couldn't complete the purchase. Please try again.")}
                            {isCancelSubscriptionError && (uiI18n?.notifications?.cancelSubscriptionFailed || "Couldn't cancel the subscription. Please try again later.")}
                        </>)
                    }
                </div>
                <button type="button" className="gv-toast-close" aria-label={uiI18n?.labels?.close || 'Close'} onClick={handleClose}>
                    <gv-icon aria-hidden="true" src={`${iconBase}icons/close.svg`}></gv-icon>
                </button>
            </div>
        </div>
            );
            }
