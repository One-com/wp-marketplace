import { createRoot } from 'react-dom/client';
import AddonsApp from './AddonsApp';
import './i18n';
import { isWpVersionSupported } from './utils/wpVersionHelper';

// Inside-WP auto-mount
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('marketplace-addons-root');
  if (el) {
    const config = window.marketplaceConfig || {};
    if (config.locale) {
      import('i18next').then(({ default: i18n }) => {
        i18n.changeLanguage(config.locale);
      });
    }

    const isSupported = isWpVersionSupported(config.wpVersion, '6.2');

    // React 18+ (since we are using React 18+)
    const root = createRoot(el);
    root.render(<AddonsApp {...config} />);
  }
});
