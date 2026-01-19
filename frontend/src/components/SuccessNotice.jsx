import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { trackButtonClick } from '../utils/mixpanelTracking';
import { getPluginRedirectUrl, navigateToPluginUrl } from '../utils/redirectUrlHelper';

export default function SuccessNotice({ plugin }) {
  const { assetsBaseUrl, noticeState, setNoticeState, handlePluginAction, cancelReload, uiI18n } =
    useMarketplace();

  if (!noticeState || !noticeState.visible || noticeState.pluginSlug !== plugin?.slug) {
    return null;
  }

  const assetBase =
    assetsBaseUrl ||
    (typeof window.marketplaceConfig !== 'undefined' && window.marketplaceConfig?.assetsBaseUrl) ||
    '';
  const iconBase = assetBase ? `${assetBase}assets/` : '';

  const handleClose = () => {
    setNoticeState({ visible: false, type: null, pluginSlug: null });
    sessionStorage.removeItem('mp_success_notice');
  };

  const handleActivate = () => {
    handlePluginAction('activate', plugin, 'product_detail');
  };

  const handleManage = () => {
    // Track the Get Started button click
    trackButtonClick({
      buttonName: 'Get started',
      buttonAction: 'manage_product',
      plugin: plugin,
      context: {
        product_slug: plugin.slug,
        product_name: plugin.name,
        has_redirect_url: !!(plugin.redirectUrl && plugin.redirectUrl.trim() !== ''),
        has_onboarding_url: !!(plugin.onboardingUrl && plugin.onboardingUrl.trim() !== ''),
      },
    });

    // Cancel the scheduled reload since user is navigating manually
    cancelReload();

    const redirectUrl = getPluginRedirectUrl(plugin, true);
    navigateToPluginUrl(redirectUrl);
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
    <div
      className="gv-notice gv-notice-success gv-p-lg gv-max-mob-pt-lg gv-mb-0 gv-mt-lg"
      style={{ gridColumn: '1 / -1', width: '100%' }}
    >
      <img className="gv-notice-icon" src={`${iconBase}icons/success.svg`} alt="Success" />
      <div className="gv-notice-content">
        <div className="gv-notice-title">
          {isInstalled &&
            formatMessage(
              uiI18n?.notifications?.pluginInstalled || 'Plugin was installed.',
              pluginName
            )}
          {isActivated &&
            formatMessage(
              uiI18n?.notifications?.pluginActivated || 'Plugin was activated.',
              pluginName
            )}
        </div>
        <p className="gv-text-sm">
          {isInstalled &&
            (uiI18n?.notifications?.activateNow || 'Activate it now to start using it.')}
          {isActivated &&
            formatMessage(
              uiI18n?.notifications?.manageInMyProducts ||
                '{0} plugin was activated for this site. You can manage it on the My products page.',
              pluginName
            )}
        </p>
      </div>
      {isInstalled && (
        <button
          type="button"
          className="gv-action gv-button gv-button-neutral"
          onClick={handleActivate}
        >
          {uiI18n?.activatePluginButton}
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
      <button type="button" className="gv-notice-close" aria-label="Close" onClick={handleClose}>
        <gv-icon aria-hidden="true" src={`${iconBase}icons/close.svg`}></gv-icon>
      </button>
    </div>
  );
}
