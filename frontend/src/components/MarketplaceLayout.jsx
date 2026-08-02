import React from "react";
import LoadingOverlay from "./LoadingOverlay";
import DeleteModal from "./DeleteModal";
import CancelSubscriptionModal from "./CancelSubscriptionModal";
import { useMarketplace } from "../context/MarketplaceContext";

const MarketplaceLayout = ({ children, className = "" }) => {
    const { version } = useMarketplace();
    return (
        <>
            <LoadingOverlay />
            {/* Modals are wrapped in .gv-activated so brand-scoped CSS rules
                (e.g. `.brand-rankmath .gv-activated …`) reach their content. */}
            <div className="gv-activated">
                <DeleteModal />
                <CancelSubscriptionModal />
            </div>
            <div className="gv-activated">
                <div className={`marketplace-container gv-layout-product gv-w-max-container gv-mx-auto gv-p-fluid ${className}`}>
                    {children}
                    {/* Rendered in the shared layout so the module version shows on
                        both the marketplace and addons screens (WPIN-8835). */}
                    {version && (
                        <p className="marketplace-version gv-caption-sm gv-text-secondary gv-text-center gv-mt-lg">
                            v{version}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default MarketplaceLayout;
