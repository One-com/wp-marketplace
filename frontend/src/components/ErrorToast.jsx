import React, { useEffect, useCallback } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';

export default function ErrorToast({ plugin: propPlugin }) {
  const { assetsBaseUrl, errorState, setErrorState, uiI18n, plugins } = useMarketplace();

  const plugin = propPlugin || plugins.find((p) => p.slug === errorState.pluginSlug);
  const isVisible = errorState && errorState.visible && errorState.pluginSlug === plugin?.slug;

  const handleClose = useCallback(() => {
    setErrorState({ visible: false, type: null, pluginSlug: null });
  }, [setErrorState]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, handleClose]);

  if (!isVisible) {
    return null;
  }

  const assetBase =
    assetsBaseUrl ||
    (typeof window.marketplaceConfig !== 'undefined' && window.marketplaceConfig?.assetsBaseUrl) ||
    '';
  const iconBase = assetBase ? `${assetBase}assets/` : '';

  const isActivateError = errorState.type === 'activate';
  const isDeactivateError = errorState.type === 'deactivate';
  const isInstallError = errorState.type === 'install';
  const isDeleteError = errorState.type === 'delete';

  // Helper function to replace {0} with plugin name
  const formatMessage = (message, pluginName) => {
    if (!message) return '';
    return message.replace('{0}', pluginName || '');
  };

  const pluginName = plugin?.name || '';

  return (
    <div className="gv-toast-container">
      <div className="gv-toast gv-toast-alert gv-visible">
        <gv-icon
          className="gv-notice-icon"
          aria-hidden="true"
          src={`${iconBase}icons/error.svg`}
        ></gv-icon>
        <div className="gv-toast-content">
          {isActivateError &&
            formatMessage(
              uiI18n?.notifications?.pluginActivationFailed || "Couldn't activate plugin.",
              pluginName
            )}
          {isDeactivateError &&
            formatMessage(
              uiI18n?.notifications?.pluginDeactivationFailed || "Couldn't deactivate plugin.",
              pluginName
            )}
          {isInstallError &&
            formatMessage(
              uiI18n?.notifications?.pluginInstallationFailed || "Couldn't install plugin.",
              pluginName
            )}
          {isDeleteError &&
            formatMessage(
              uiI18n?.notifications?.pluginDeletionFailed || "Couldn't delete plugin.",
              pluginName
            )}
        </div>
        <button type="button" className="gv-toast-close" aria-label="Close" onClick={handleClose}>
          <gv-icon aria-hidden="true" src={`${iconBase}icons/close.svg`}></gv-icon>
        </button>
      </div>
    </div>
  );
}
