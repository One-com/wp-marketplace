import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';

const ProductBanner = () => {
    const { assetsBaseUrl } = useMarketplace();
    const leftBannerUrl = `${assetsBaseUrl}assets/images/left-banner.png`;
    const rightBannerUrl = `${assetsBaseUrl}assets/images/right-banner.png`;

    return (
        <header className="gv-product-header gv-product-banner gv-pt-fluid gv-items-stretch gv-justify-between gv-gap-lg">
            <div className="gv-left-banner">
                <div className="gv-image">
                    <picture>
                        <source media="(min-width: 600px)" srcSet={leftBannerUrl} />
                        <img src={leftBannerUrl} alt="Left banner" />
                    </picture>
                </div>
            </div>

            <div className="gv-content gv-banner-content gv-max-mob-pt-0 gv-max-mob-pb-0">
                <h2 className="gv-banner-title">
                  Fuel your online success with powerful add-ons
                </h2>
                <p className="gv-banner-text gv-text-sm gv-mt-sm">
                  Boost the performance, security, marketing, and design of your WordPress site with tools that help your website grow faster and work smarter.
                </p>
            </div>

            <div className="gv-right-banner gv-max-mob-pl-md">
                <div className="gv-image">
                    <picture>
                        <source media="(min-width: 600px)" srcSet={rightBannerUrl} />
                        <img src={rightBannerUrl} alt="Product image" />
                    </picture>
                </div>
            </div>
        </header>
    );
};

export default ProductBanner;
