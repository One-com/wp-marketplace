import React from "react";
import { useMarketplace } from "../context/MarketplaceContext";

const Breadcrumbs = ({ iconBase, label, onClose, className = "", disabled = false, children }) => {
    const { uiI18n } = useMarketplace();
    const handleBack = (e) => {
        e.preventDefault();
        if (disabled) return;
        // First check if history is available and has navigable records
        if (typeof window !== "undefined" && window.history && window.history.length > 1) {
            try {
                window.history.back();
            } catch (error) {
                // If history.back() fails, fallback to onClose
                if (onClose) {
                    onClose();
                }
            }
        } else if (onClose) {
            // Fallback to onClose if history is not available or empty
            onClose();
        }
    };

    return (
        <nav className={`gv-breadcrumbs gv-area-nav ${className}`}>
            <a
                href="#"
                onClick={handleBack}
                className="gv-flex gv-items-center gv-gap-xs"
                role="button"
                aria-label={uiI18n?.labels?.goBack || 'Go back'}
                style={{
                    opacity: disabled ? 0.5 : 1,
                    pointerEvents: disabled ? 'none' : 'auto',
                    cursor: disabled ? 'not-allowed' : 'pointer'
                }}
                aria-disabled={disabled ? 'true' : 'false'}
            >
                <img
                    style={{ minWidth: "24px" }}
                    className="gv-tile"
                    src={`${iconBase}arrow_back.svg`}
                    alt="Back"
                />
                <span>{label}</span>
            </a>
            {children}
        </nav>
    );
};

export default Breadcrumbs;
