import React from "react";
import LoadingOverlay from "./LoadingOverlay";
import DeleteModal from "./DeleteModal";
import CancelSubscriptionModal from "./CancelSubscriptionModal";

const MarketplaceLayout = ({ children, className = "" }) => {
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
                </div>
            </div>
        </>
    );
};

export default MarketplaceLayout;
