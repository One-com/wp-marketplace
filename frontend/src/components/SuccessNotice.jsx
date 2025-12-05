import React from "react";
import { useMarketplace } from "../context/MarketplaceContext";

export default function SuccessNotice({ plugin }) {
    const {
        assetsBaseUrl,
        noticeState,
        setNoticeState,
        handlePluginAction,
        uiI18n
    } = useMarketplace();

    if (!noticeState || !noticeState.visible || noticeState.pluginSlug !== plugin?.slug) {
        return null;
    }

    const assetBase = assetsBaseUrl || (typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl) || "";
    const iconBase = assetBase ? `${assetBase}assets/` : "";

    const handleClose = () => {
        setNoticeState({ visible: false, type: null, pluginSlug: null });
    };

    const handleActivate = () => {
        handlePluginAction("activate", plugin);
    };

    const handleManage = () => {
        // Check if plugin has a redirectUrl from API response
        if (plugin.redirectUrl && plugin.redirectUrl.trim() !== '') {
            // Get the admin URL from config (provided by PHP)
            const adminUrl = typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.wpConfig?.adminUrl;

            if (adminUrl) {
                // Construct full URL using adminUrl from PHP config
                // adminUrl is like "https://example.com/wp-admin/"
                // redirectUrl comes as "wp-admin\/admin.php?page=termly" (JSON unescapes \/ to /)
                // Strip "wp-admin/" prefix from redirectUrl if present to avoid duplication
                let cleanPath = plugin.redirectUrl;
                if (cleanPath.startsWith('wp-admin/')) {
                    cleanPath = cleanPath.substring('wp-admin/'.length);
                }
                const fullUrl = `${adminUrl}${cleanPath}`;
                window.location.href = fullUrl;
            } else {
                // Fallback: use window.location.origin if adminUrl not available
                const siteUrl = window.location.origin;
                const fullUrl = `${siteUrl}/${plugin.redirectUrl}`;
                window.location.href = fullUrl;
            }
            return;
        }

        // Fallback to plugins page
        window.location.href = '/wp-admin/plugins.php';
    };

    const isInstalled = noticeState.type === 'installed';
    const isActivated = noticeState.type === 'activated';

    // Helper function to replace {0} with plugin name
    const formatMessage = (message, pluginName) => {
        if (!message) return '';
        return message.replace('{0}', pluginName || '');
    };

    const pluginName = plugin?.name || '';

    return (
        <div className="gv-notice gv-notice-success gv-p-lg gv-max-mob-pt-lg gv-mb-0 gv-mt-lg" style={{'gridColumn': '1 / -1','width':'100%'}}>
            <img className="gv-notice-icon" src={`${iconBase}icons/success.svg`} alt="Success" />
            <div className="gv-notice-content">
                <div className="gv-notice-title">
                    {isInstalled && formatMessage(uiI18n?.notifications?.pluginInstalled || 'Plugin was installed.', pluginName)}
                    {isActivated && formatMessage(uiI18n?.notifications?.pluginActivated || 'Plugin was activated.', pluginName)}
                </div>
                <p className="gv-text-sm">
                    {isInstalled && (uiI18n?.notifications?.activateNow || 'Activate it now to start using it.')}
                    {isActivated && formatMessage(uiI18n?.notifications?.manageInMyProducts || '{0} plugin was activated for this site. You can manage it on the My products page.', pluginName)}
                </p>
            </div>
            {isInstalled && (
                <button
                    type="button"
                    className="gv-action gv-button gv-button-neutral"
                    onClick={handleActivate}
                >
                    Activate
                </button>
            )}
            {isActivated && (
                <button
                    type="button"
                    className="gv-action gv-button gv-button-neutral"
                    onClick={handleManage}
                >
                    <span>{uiI18n?.featuredCta || 'Get Started'}</span>
                    <gv-icon aria-hidden="true" src={`${iconBase}icons/arrow_forward.svg`}></gv-icon>
                </button>
            )}
            <button
                type="button"
                className="gv-notice-close"
                aria-label="Close"
                onClick={handleClose}
            >
                <gv-icon aria-hidden="true" src={`${iconBase}icons/close.svg`}></gv-icon>
            </button>
        </div>
    );
}
