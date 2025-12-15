import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';

const ProductBanner = () => {
    const { assetsBaseUrl, uiI18n } = useMarketplace();
    const leftBannerUrl = 'https://wpaddon-static.group-cdn.one/images/wp/marketplace/banners/top-header-left-banner.png';
    const rightBannerUrl = 'https://wpaddon-static.group-cdn.one/images/wp/marketplace/banners/top-header-right-banner.png';

    return (
        <header className="gv-product-header gv-product-banner gv-pt-fluid gv-items-stretch gv-justify-between gv-gap-lg gv-max-mob-pt-md">
            <div className="gv-left-banner">
                <div className="gv-image">
                    <picture>
                        <source media="(min-width: 600px)" srcSet={leftBannerUrl} />
                        <img src={leftBannerUrl} alt="Left banner" />
                    </picture>
                </div>
            </div>

            <div className="gv-content gv-banner-content gv-max-mob-pt-0 gv-max-mob-pb-0 gv-desk-lg-text-center gv-tab-text-left gv-flex gv-flex-col gv-align-center gv-justify-center gv-pt-0">
                <h2 className="gv-banner-title">
                  {uiI18n?.headings?.pageTitle}
                </h2>
                <p className="gv-banner-text gv-text-sm gv-mt-sm">
                  {uiI18n?.text?.pageContent}
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
