import React from "react";

export default function PluginActions({ plugin, pluginInAction, onAction }) {
    const handleClick = (action) => {
        // Check if brand is onecom, plugin is not installed, and slug is wp-rocket or rank-math-pro
        const brand = typeof window !== "undefined" && window.marketplaceConfig?.brand;
        const isOnecomBrand = brand === "onecom";
        const isSpecialPlugin = plugin.slug === "wp-rocket" || plugin.slug === "rank-math-pro";
        const isNotInstalled = !plugin.installed;
        
        if (isOnecomBrand && isSpecialPlugin && isNotInstalled && action === "install") {
            // Dispatch custom event instead of calling onAction
            const event = new CustomEvent("onecom-plugin-provision", {
                detail: {
                    slug: plugin.slug,
                    action: action,
                    plugin: plugin
                }
            });
            window.dispatchEvent(event);
            return;
        }
        
        // Default behavior
        onAction(action, plugin);
    };

    return (
        <div className="plugin-actions gv-mt-md">
            {plugin.installed ? (
                plugin.activated ? (
                    <button
                        className="gv-button gv-button-secondary"
                        disabled={pluginInAction[plugin.slug]}
                        onClick={() => handleClick("deactivate")}
                    >
                        {pluginInAction[plugin.slug]
                            ? (marketplaceConfig?.labels?.deactivating || 'Deactivating...')
                            : (marketplaceConfig?.labels?.deactivate || 'Deactivate')}
                    </button>
                ) : (
                    <button
                        className="gv-button gv-button-primary"
                        disabled={pluginInAction[plugin.slug]}
                        onClick={() => handleClick("activate")}
                    >
                        {pluginInAction[plugin.slug]
                            ? (marketplaceConfig?.labels?.activating || 'Activating...')
                            : (marketplaceConfig?.labels?.activate || 'Activate')}
                    </button>
                )
            ) : (
                <button
                    className="gv-button gv-button-secondary"
                    disabled={pluginInAction[plugin.slug]}
                    onClick={() => handleClick("install")}
                >
                    {pluginInAction[plugin.slug]
                        ? (marketplaceConfig?.labels?.installing || 'Installing...')
                        : (marketplaceConfig?.labels?.install || 'Install')}
                </button>
            )}
        </div>
    );
}