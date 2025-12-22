import React from 'react';
import { createRoot } from 'react-dom';
import MarketplaceApp from './MarketplaceApp';
import './i18n';

// Inside-WP auto-mount
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('marketplace-root');
  if (el) {
    const config = window.marketplaceConfig || {};
    if (config.locale) {
      import('i18next').then(({ default: i18n }) => {
        i18n.changeLanguage(config.locale);
      });
    }
    const root = createRoot(el);
    root.render(<MarketplaceApp {...config} />);
  }
});
