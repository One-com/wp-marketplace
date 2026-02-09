import React, { useEffect } from 'react';
import {formatMessage, replacePercentWrapper, HtmlRenderer} from '../utils/common.utils';
const DeleteModal = ({ isOpen, onClose, onConfirm, pluginName, uiI18n, iconBase, licenseType }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('gv-modal')) {
      onClose();
    }
  };

  const isPremium = licenseType !== "free";
  return (
    <div className="gv-modal" onClick={handleOutsideClick}>
      <div
        className="gv-modal-content"
        role="dialog"
        aria-labelledby="id-modal-title"
        aria-modal="true"
      >
        <button type="button" className="gv-modal-close" aria-label="Close" onClick={onClose}>
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
                <HtmlRenderer htmlString={replacePercentWrapper(formatMessage(uiI18n?.notifications?.deleteModalInfo, '{plugin name}', pluginName), '<u><a href="https://www.one.com/admin/" target="_blank">', '</a></u>')} />

              </p>
          </div>
          )}
        </div>
        <div className="gv-button-group">
          <button type="button" className="gv-button gv-button-cancel" onClick={onClose}>
            {uiI18n?.cancel}
          </button>
          <button type="button" className="gv-button gv-button-destructive" onClick={onConfirm}>
            {uiI18n?.deleteButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
