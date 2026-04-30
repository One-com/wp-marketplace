import React, { useEffect } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';

/**
 * Format a date string as "DD MMM YYYY" (e.g. "02 Aug 2026").
 */
const formatExpiresAt = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const CancelSubscriptionModal = () => {
    const {
        cancelSubsModalState,
        closeCancelSubsModal,
        assetsBaseUrl,
        uiI18n,
    } = useMarketplace();

    const { isOpen, plugin, expiresAt, onConfirm } = cancelSubsModalState;

    const assetBase = assetsBaseUrl || (typeof window.marketplaceConfig !== 'undefined' && window.marketplaceConfig?.assetsBaseUrl) || '';
    const iconBase = assetBase ? `${assetBase}assets/icons/` : '';
    const labels = uiI18n?.labels || {};

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeCancelSubsModal();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, closeCancelSubsModal]);

    if (!isOpen || !plugin) return null;

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('gv-modal')) {
            closeCancelSubsModal();
        }
    };

    const handleConfirm = () => {
        if (typeof onConfirm === 'function') {
            onConfirm();
        }
        closeCancelSubsModal();
    };

    const pluginName = plugin.name;
    const formattedDate = formatExpiresAt(expiresAt);

    return (
        <div className="gv-modal" onClick={handleOutsideClick}>
            <div
                className="gv-modal-content"
                role="dialog"
                aria-labelledby="id-cancel-subs-modal-title"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
            >
                <button type="button" className="gv-modal-close" aria-label="Close" onClick={closeCancelSubsModal}>
                    <gv-icon aria-hidden="true" src={`${iconBase}close.svg`}></gv-icon>
                </button>

                <div className="gv-modal-body">
                    <h2 id="id-cancel-subs-modal-title" className="gv-modal-title">
                        {labels?.cancelSubscriptionTitle
                            ? labels.cancelSubscriptionTitle.replace('{0}', pluginName)
                            : `Cancel ${pluginName} subscription?`}
                    </h2>

                    {formattedDate && (
                        <p>
                            {labels?.cancelSubscriptionBody
                                ? labels.cancelSubscriptionBody.replace('{0}', formattedDate)
                                : (
                                    <>
                                        By cancelling, you will lose access to premium features after your current period ends on <strong>{formattedDate}</strong>.
                                    </>
                                )}
                        </p>
                    )}

                    <div className="gv-notice gv-notice-error">
                        <p className="gv-notice-content">
                            <strong>
                                {labels?.cancelSubscriptionIrreversible || 'IRREVERSIBLE ACTION'}
                            </strong>
                        </p>
                    </div>

                    <p>
                        {labels?.cancelSubscriptionInfo || 'After the cancellation, you can continue using the plugin until the expiration date. No further charges will be applied.'}
                    </p>
                </div>

                <div className="gv-button-group">
                    <button type="button" className="gv-button gv-button-cancel" onClick={closeCancelSubsModal}>
                        {labels?.cancelSubscriptionKeep || 'Keep subscription'}
                    </button>
                    <button type="button" className="gv-button gv-button-destructive" onClick={handleConfirm}>
                        {labels?.cancelSubscriptionConfirm || 'Confirm cancellation'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelSubscriptionModal;
