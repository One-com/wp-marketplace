import React from 'react';

const ProductBanner = () => {

    return (
        <header className="gv-product-header">
            <div className="gv-content gv-stack-space-md gv-text-sm">
                <h1 className="gv-title gv-header-lg">one.com WP Marketplace</h1>
                <p>Your place to find plugins, themes, and services for your site.</p>
                <button type="button" className="gv-button gv-button-secondary">Learn more</button>
            </div>
            <div className="gv-image">
                <picture>
                    <source
                        media="(min-width: 600px)"
                        srcSet="
              https://gravity.group.one/guide-images/product-image@2x.png 2x,
              https://gravity.group.one/guide-images/product-image.png    1x
            "
                    />
                    <img
                        src="https://gravity.group.one/guide-images/product-image-mobile.png"
                        srcSet="
              https://gravity.group.one/guide-images/product-image-mobile@2x.png 2x,
              https://gravity.group.one/guide-imagesproduct-image-mobile.png    1x
            "
                        alt="Product image"
                    />
                </picture>
            </div>
        </header>
    );
};

export default ProductBanner;