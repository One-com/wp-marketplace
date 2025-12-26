import React from "react";
import ReactDOM from "react-dom";
import MarketplaceApp from "./MarketplaceApp";
import './i18n'
import { isWpVersionSupported } from "./utils/wpVersionHelper";

// Inside-WP auto-mount
document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("marketplace-root");
    if (el) {
        const config = window.marketplaceConfig || {};
        if (config.locale) {
            import("i18next").then(({ default: i18n }) => {
                i18n.changeLanguage(config.locale);
            });
        }

        const isSupported = isWpVersionSupported(config.wpVersion, '6.2');

        if (typeof ReactDOM.createRoot === 'function' && isSupported) {
            // React 18+
            const root = ReactDOM.createRoot(el);
            root.render(<MarketplaceApp {...config} />);
        } else {
            // React 17 or unsupported version
            // For unsupported versions, MarketplaceApp will still render and show WpVersionErrorState
            // We just need to use the compatible render method
            ReactDOM.render(<MarketplaceApp {...config} />, el);
        }
    }
});
