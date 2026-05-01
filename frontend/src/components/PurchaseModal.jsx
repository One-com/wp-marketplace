import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { formatPluginPrice, getFullPrice, getRebatePrice } from '../utils/priceFormatter';
import { trackButtonClick } from '../utils/mixpanelTracking';

export default function PurchaseModal({ isOpen, plugin, uiI18n, assetsBaseUrl, onClose, onPurchase }) {
    const assetBase = assetsBaseUrl || '';
    const iconBase = assetBase ? `${assetBase}assets/icons/` : '';

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !plugin) return null;

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('gv-modal')) onClose();
    };

    // Tracks "Cancel" click inside the purchase confirmation modal
    const handleCancelClick = () => {
        trackButtonClick({
            buttonName: 'Cancel',
            buttonAction: 'product_buy_cancel',
            plugin: plugin,
            context: { action: 'Cancel' },
        });
        onClose();
    };

    const title = plugin.name || 'Product';
    const description = plugin.i18n?.subtitle || plugin.i18n?.description || plugin.description || '';
    const image = plugin.bannerUrl || plugin.image || plugin.thumbnail || '';
    const price = formatPluginPrice(plugin, uiI18n?.labels?.free || 'Free', uiI18n);
    const fullPrice = getFullPrice(plugin);
    const rebatePrice = getRebatePrice(plugin);
    const hasFreeTrialPeriod = plugin.i18n?.freeTrialPeriod && plugin.i18n.freeTrialPeriod.trim() !== '';
    const freeTrialText = plugin.i18n?.freeTrialText || '';

    const modal = (
        <div className="gv-activated">
            <div className="gv-modal gv-upgrade-modal" onClick={handleOutsideClick}>
                <div
                    className="gv-modal-content"
                    role="dialog"
                    aria-labelledby="id-purchase-modal-title"
                    aria-modal="true"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button type="button" className="gv-modal-close" aria-label="Close" onClick={onClose}>
                        <gv-icon aria-hidden="true" src={`${iconBase}close.svg`}></gv-icon>
                    </button>
                  <div className="gv-modal-body">
                    <h2 id="id-purchase-modal-title" className="gv-modal-title">Get superior
                      website speed</h2>
                    {description && <p className="gv-product-intro">{description}</p>}

                    <div className="gv-product-price">
                      {fullPrice && rebatePrice !== null && (
                        <div className="gv-price-discount">
                          <span className="gv-price-old">{fullPrice}/{uiI18n?.labels?.timeMonth || 'mo'}</span>
                        </div>
                      )}
                      <div className="gv-price-current">
                                <span className="gv-price">
                                    {hasFreeTrialPeriod ? (uiI18n?.headings?.freeTrial || 'Free trial*') : price}
                                </span>
                        {!hasFreeTrialPeriod && price && price !== (uiI18n?.labels?.free || 'Free') && price !== (uiI18n?.labels?.freeUntilRenewal || 'Free until renewal') && (
                          <span className="gv-price-period">/{uiI18n?.labels?.timeMonth || 'mo'}</span>
                        )}
                      </div>
                    </div>

                    {hasFreeTrialPeriod && freeTrialText && (
                      <div className="gv-product-more-info">
                        <p>{freeTrialText}</p>
                      </div>
                    )}
                    <div className="gv-notice gv-notice-info">
                      <gv-icon
                        className="gv-notice-icon" style={{flexShrink: 0}}
                        aria-hidden="true"
                        src={`${iconBase}info.svg`}
                      ></gv-icon>
                      <p
                        className="gv-notice-content">{uiI18n?.labels?.purchaseMessage || 'Payment will be processed using your saved RankMath method.'}
                      </p>
                    </div>
                    <p className="gv-caption-lg">
                    </p>
                  </div>
                  <div className="gv-button-group">
                    <button type="button" className="gv-button gv-button-cancel" onClick={handleCancelClick}>
                      {uiI18n?.cancel || 'Close'}
                        </button>
                        <button type="button" className="gv-button gv-button-primary" onClick={onPurchase}>
                            {uiI18n?.labels?.buyNowButton || 'Buy now'}
                        </button>
                    </div>

                    {image && (
                        <div className="gv-modal-image">
                            <img src={image} alt={`${title}`} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return createPortal(modal, document.body);
}
