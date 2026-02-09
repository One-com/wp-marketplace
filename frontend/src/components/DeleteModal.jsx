import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {formatMessage, replacePercentWrapper, HtmlRenderer} from '../utils/common.utils';
import { useMarketplace } from '../context/MarketplaceContext';

const DeleteModal = () => {
  const { deleteModalState, closeDeleteModal, handlePluginAction, assetsBaseUrl, uiI18n } = useMarketplace();
  const { isOpen, plugin } = deleteModalState;

  const assetBase = assetsBaseUrl || (typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl) || "";
  const iconBase = assetBase ? `${assetBase}assets/icons/` : "";

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeDeleteModal();
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
  }, [isOpen, closeDeleteModal]);

  if (!isOpen || !plugin) return null;

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('gv-modal')) {
      closeDeleteModal();
    }
  };

  const handleConfirm = () => {
    handlePluginAction('delete', plugin, 'addons');
    closeDeleteModal();
  };

  const isPremium = plugin.licenseType !== "free";
  const pluginName = plugin.name;

  return (
    <div className="gv-modal" onClick={handleOutsideClick}>
      <div
        className="gv-modal-content"
        role="dialog"
        aria-labelledby="id-modal-title"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="gv-modal-close" aria-label="Close" onClick={closeDeleteModal}>
          <gv-icon aria-hidden="true" src={`${iconBase}close.svg`}></gv-icon>
        </button>
        <div className="gv-modal-body">
          <h2 id="id-modal-title" className="gv-modal-title">
            {formatMessage(uiI18n?.deletePlugin, '{0}', pluginName)}?
          </h2>
          <p>
            {formatMessage(uiI18n?.notifications?.deleteModalConfirm, '{0}', pluginName)}
          </p>
          {isPremium && (<div className="gv-notice gv-notice-info">
            <gv-icon
              class="gv-notice-icon"
              aria-hidden="true"
              src={`${iconBase}/info.svg`}
            ></gv-icon>
              <p className="gv-notice-content">
                <HtmlRenderer htmlString={replacePercentWrapper(formatMessage(uiI18n?.notifications?.deleteModalInfo, '{0}', pluginName), '<u><a href="https://www.one.com/admin/" target="_blank">', '</a></u>')} />

              </p>
          </div>
          )}
        </div>
        <div className="gv-button-group">
          <button type="button" className="gv-button gv-button-cancel" onClick={closeDeleteModal}>
            {uiI18n?.cancel}
          </button>
          <button type="button" className="gv-button gv-button-destructive" onClick={handleConfirm}>
            {uiI18n?.deleteButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
