import React from "react";

export default function PluginActions({ plugin, pluginInAction, onAction }) {
    const handleClick = (action) => {
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