import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';

export default function WpVersionErrorState() {
  const { uiI18n } = useMarketplace();

  const handleUpdateClick = () => {
    window.location.href =
      typeof window !== 'undefined' && window.marketplaceConfig?.wpConfig?.adminUrl
        ? `${window.marketplaceConfig.wpConfig.adminUrl}update-core.php`
        : '/wp-admin/update-core.php';
  };

  const updateText = uiI18n?.notifications?.updateWPText?.replace('{0}', '6.2');

  return (
    <div className="marketplace-container gv-flex gv-flex-col gv-flex-wrap gv-gap-lg gv-items-center gv-justify-center gv-p-fluid">
      <div className="gv-text-center">
        <h5 className="gv-header-md gv-mb-sm">{uiI18n?.notifications?.updateWPTitle}</h5>
        <p className="gv-text-md gv-mb-lg">{updateText}</p>
        <button
          type="button"
          className="gv-button gv-button-primary buttons-min-width"
          onClick={handleUpdateClick}
        >
          <span>{uiI18n?.updateWPButton}</span>
        </button>
      </div>
    </div>
  );
}
