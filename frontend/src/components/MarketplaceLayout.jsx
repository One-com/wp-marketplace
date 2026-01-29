import React from "react";
import LoadingOverlay from "./LoadingOverlay";

const MarketplaceLayout = ({ children, className = "" }) => {
    return (
        <>
            <LoadingOverlay />
            <div className="gv-activated">
                <div className={`marketplace-container gv-layout-product gv-w-max-container gv-mx-auto gv-p-fluid ${className}`}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default MarketplaceLayout;
