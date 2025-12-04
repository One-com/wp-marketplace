import React, { useState, useEffect } from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import { formatPluginPrice } from "../utils/priceFormatter";

export default function FeaturedCarousel() {
    const { plugins, assetsBaseUrl,uiI18n } = useMarketplace();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(2);

    useEffect(() => {
        const updateSlidesPerView = () => {
            if (window.innerWidth > 1024) {
                setSlidesPerView(2); // Desktop: show 2 slides
            } else if (window.innerWidth >= 600) {
                setSlidesPerView(1); // Tablet: show 2 slides
            } else {
                setSlidesPerView(1); // Mobile: show 1 slide
            }
        };

        updateSlidesPerView();
        window.addEventListener('resize', updateSlidesPerView);
        return () => window.removeEventListener('resize', updateSlidesPerView);
    }, []);

    // Filter featured plugins that are not active and reverse the order
    const featuredPlugins = plugins.filter(plugin => plugin.featured === true && plugin.activated !== true).reverse();

    const assetBase = assetsBaseUrl || (typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl) || "";
    const iconBase = assetBase ? `${assetBase}assets/icons/` : "";

    const totalSlides = featuredPlugins.length;
    const maxIndex = Math.max(0, totalSlides - slidesPerView);

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const goToNext = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    // If no featured plugins, don't render anything
    if (!featuredPlugins || featuredPlugins.length === 0) {
        return null;
    }

    const goToSlide = (index) => {
        setCurrentIndex(Math.min(index, maxIndex));
    };

    // Navigate to plugin detail page
    const handleReadMore = (plugin) => {
        if (typeof window !== "undefined") {
            const url = new URL(window.location.href);
            url.searchParams.set("plugin", plugin.slug);
            window.history.pushState({}, "", url.toString());

            // Dispatch custom event to notify app of navigation
            window.dispatchEvent(new PopStateEvent('popstate'));
        }
    };

    return (
        <section className="gv-featured-carousel gv-w-full">
            <div className="gv-carousel-header gv-mb-lg">
                <h5 className="gv-title gv-heading-sm">Recommended for you</h5>
            </div>

            <div className="gv-carousel-container" style={{ position: 'relative', overflow: 'hidden' }}>
                <div
                    className="gv-carousel-track"
                    style={{
                        display: 'flex',
                        transition: 'transform 0.3s ease-in-out',
                        transform: `translateX(calc(-${currentIndex} * ((100% - ${(slidesPerView - 1)}rem) / ${slidesPerView} + 1rem)))`,
                        gap: '1rem'
                    }}
                >
                    {featuredPlugins.map((plugin, index) => {
                        const title = plugin?.i18n?.featuredTitle;
                        const description = plugin?.i18n?.featuredContent;
                        const price = formatPluginPrice(plugin);
                        const mainImage = plugin.bannerUrl || plugin.image || plugin.thumbnail || 'https://gravity.group.one/guide-images/product-image@2x.png';

                        // Extract category name from plugin categories array
                        const categoryObj = Array.isArray(plugin.categories) && plugin.categories.length
                            ? (typeof plugin.categories[0] === 'object' ? plugin.categories[0] : { slug: String(plugin.categories[0]), title: String(plugin.categories[0]), description: null })
                            : { slug: "Others", title: "Others", description: null };
                        const categoryName = categoryObj.title || categoryObj.slug || "Others";

                        return (
                            <div
                                key={`slide-${index}`}
                                className="gv-carousel-slide"
                                style={{
                                    minWidth: `calc((100% - ${(slidesPerView - 1)}rem) / ${slidesPerView})`,
                                    maxWidth: `calc((100% - ${(slidesPerView - 1)}rem) / ${slidesPerView})`,
                                    flex: '0 0 auto',
                                    backgroundColor: '#D9EBF7',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    maxHeight: '456px',
                                }}
                            >
                                <header className="gv-product-header gv-area-header"  style={{
                                  border: 'none',
                                  background:"#D9EBF7"
                                }}>
                                    <div
                                        className="gv-content gv-stack-space-md gv-text-sm gv-flex gv-flex-col gv-items-start"
                                    >
                                      <div className="gv-badge gv-badge-info">{plugin?.name}</div>
                                        <h5
                                            className="gv-title gv-header-sm"
                                        >
                                            {title}
                                        </h5>
                                        <p className="gv-text-sm"
                                            style={{
                                                overflow: 'hidden',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            {description}
                                        </p>

                                        <div className="gv-slide-footer gv-mt-lg gv-flex gv-align-center">
                                            <button
                                                onClick={() => handleReadMore(plugin)}
                                                className="gv-button gv-button-secondary"
                                            >
                                              {uiI18n?.featuredCta}
                                            </button>

                                            <span className="gv-price gv-text-bold gv-text-md gv-ml-md">
                                                {price}
                                                {plugin.licenseType !== "free" && price && price !== 'Free' && <span className="gv-period">/mo</span>}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="gv-image">
                                        <picture>
                                            <source
                                                media="(min-width: 600px)"
                                                srcSet={`${mainImage} 1x, ${mainImage} 2x`}
                                            />
                                            <img
                                                src={mainImage}
                                                srcSet={`${mainImage} 1x, ${mainImage} 2x`}
                                                alt={`${title} image`}
                                            />
                                        </picture>
                                    </div>
                                </header>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Controls: Arrows + Dots */}
            {totalSlides > slidesPerView && (
                <div
                    className="gv-carousel-nav-wrapper gv-flex gv-justify-center gv-align-center gv-mt-sm gv-gap-fluid"
                >
                    <button
                        onClick={goToPrevious}
                        disabled={currentIndex === 0}
                        className="gv-carousel-nav gv-carousel-nav-prev"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                            opacity: currentIndex === 0 ? 0.5 : 1
                        }}
                        aria-label="Previous slide"
                    >
                        <img src={`${iconBase}chevron_left.svg`} alt="Previous" style={{ width: '24px', height: '24px' }} />
                    </button>

                    <div
                        className="gv-carousel-dots"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className="gv-carousel-dot"
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    background: currentIndex === index ? '#0066CC' : '#D0D0D0',
                                    cursor: 'pointer',
                                    padding: 0
                                }}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={goToNext}
                        disabled={currentIndex >= maxIndex}
                        className="gv-carousel-nav gv-carousel-nav-next"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: currentIndex >= maxIndex ? 'not-allowed' : 'pointer',
                            opacity: currentIndex >= maxIndex ? 0.5 : 1
                        }}
                        aria-label="Next slide"
                    >
                        <img src={`${iconBase}chevron_right.svg`} alt="Next" style={{ width: '24px', height: '24px' }} />
                    </button>
                </div>
            )}
        </section>
    );
}
