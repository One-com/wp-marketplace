import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useTranslation } from 'react-i18next';

export default function ErrorState() {
  const { assetsBaseUrl } = useMarketplace();
  const { t } = useTranslation();

  const assetBase =
    assetsBaseUrl ||
    (typeof window.marketplaceConfig !== 'undefined' && window.marketplaceConfig?.assetsBaseUrl) ||
    '';
  const iconBase = assetBase ? `${assetBase}assets/icons/` : '';

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg gv-items-center gv-justify-center gv-p-fluid">
      <div className="gv-text-center">
        <h5 className="gv-header-md gv-mb-sm">{t('ui.notifications.couldNotLoad')}</h5>
        <p className="gv-text-md gv-mb-lg">{t('ui.notifications.refreshPage')}</p>
        <button
          type="button"
          className="gv-button gv-button-primary buttons-min-width"
          onClick={handleRefresh}
        >
          <span>{t('ui.button.refreshPage')}</span>
        </button>
      </div>
    </div>
  );
}
