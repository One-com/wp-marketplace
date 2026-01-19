import React, { useEffect } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';

export default function SuccessToast({ plugin: propPlugin }) {
  const { assetsBaseUrl, successState, setSuccessState, uiI18n, plugins } = useMarketplace();

  const plugin = propPlugin || plugins.find((p) => p.slug === successState.pluginSlug);
  const isVisible =
    successState && successState.visible && successState.pluginSlug === plugin?.slug;

  const handleClose = React.useCallback(() => {
    setSuccessState({ visible: false, type: null, pluginSlug: null });
  }, [setSuccessState]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, handleClose]);

  const isActivated = successState.type === 'activate';
  const isDeactivated = successState.type === 'deactivate';
  const isDeleted = successState.type === 'delete';

  // Helper function to replace {0} with plugin name
  const formatMessage = (message, pluginName) => {
    if (!message) return '';
    return message.replace('{0}', pluginName || '');
  };

  const pluginName = plugin?.name || '';

  const assetBase =
    assetsBaseUrl ||
    (typeof window.marketplaceConfig !== 'undefined' && window.marketplaceConfig?.assetsBaseUrl) ||
    '';
  const iconBase = assetBase ? `${assetBase}assets/` : '';

  return (
    <div className="gv-toast-container">
      <div className="gv-toast gv-toast-success gv-visible">
        <gv-icon
          className="gv-notice-icon"
          aria-hidden="true"
          src={`${iconBase}icons/check_circle.svg`}
        ></gv-icon>
        <div className="gv-toast-content">
          {isActivated &&
            formatMessage(
              uiI18n?.notifications?.pluginActivatedShort || 'Plugin activated.',
              pluginName
            )}
          {isDeactivated &&
            formatMessage(
              uiI18n?.notifications?.pluginDeactivated || 'Plugin deactivated.',
              pluginName
            )}
          {isDeleted &&
            formatMessage(
              uiI18n?.notifications?.pluginDeleted || 'Plugin deleted successfully.',
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
