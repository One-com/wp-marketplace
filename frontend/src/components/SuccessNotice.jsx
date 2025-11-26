import React from "react";
import { useMarketplace } from "../context/MarketplaceContext";

export default function SuccessNotice({ plugin }) {
    const {
        assetsBaseUrl,
        noticeState,
        setNoticeState,
        handlePluginAction
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
        // Redirect to plugin's settings page
        // Common plugin admin pages
        const pluginAdminPages = {
            'wp-rocket': 'wp-rocket',
            'rank-math-pro': 'rank-math',
            'seo-by-rank-math': 'rank-math',
            'akismet': 'akismet-key-config',
            'jetpack': 'jetpack',
            'wordfence': 'Wordfence',
            'yoast': 'wpseo_dashboard'
        };

        const adminPage = pluginAdminPages[plugin.slug] || plugin.slug;
        const adminUrl = typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.wpConfig?.adminUrl;
        
        if (adminUrl) {
            window.location.href = `${adminUrl}admin.php?page=${adminPage}`;
        } else {
            // Fallback to plugins page
            window.location.href = '/wp-admin/plugins.php';
        }
    };

    const isInstalled = noticeState.type === 'installed';
    const isActivated = noticeState.type === 'activated';

    return (
        <div className="gv-notice gv-notice-success gv-p-lg gv-max-mob-pt-lg gv-mb-0 gv-mt-lg" style={{'gridColumn': '1 / -1','width':'100%'}}>
            <img className="gv-notice-icon" src={`${iconBase}icons/success.svg`} alt="Success" />
            <div className="gv-notice-content">
                <div className="gv-notice-title">
                    {isInstalled && "Plugin was installed."}
                    {isActivated && "Plugin was activated."}
                </div>
                <p>
                    {isInstalled && "Activate it now to start using it."}
                    {isActivated && "You can start using it."}
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
                    Manage
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
