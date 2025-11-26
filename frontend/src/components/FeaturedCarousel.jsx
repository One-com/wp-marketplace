import React, { useState, useEffect, useRef } from "react";
import { useMarketplace } from "../context/MarketplaceContext";

export default function FeaturedCarousel() {
    const { plugins, assetsBaseUrl } = useMarketplace();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(2);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const trackRef = useRef(null);
    
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

    // Filter featured plugins that are not active
    const featuredPlugins = plugins.filter(plugin => plugin.featured === true && plugin.activated !== true);

    const assetBase = assetsBaseUrl || (typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.assetsBaseUrl) || "";
    const iconBase = assetBase ? `${assetBase}assets/icons/` : "";

    const totalSlides = featuredPlugins.length;
    const maxIndex = Math.max(0, totalSlides - slidesPerView);
    
    // Create extended array with clones for infinite effect
    // Clone slidesPerView items from the end at the beginning, and from the beginning at the end
    const clonedPlugins = [
        ...featuredPlugins.slice(-slidesPerView),  // Clone last slidesPerView items at the start
        ...featuredPlugins,                        // Original items
        ...featuredPlugins.slice(0, slidesPerView) // Clone first slidesPerView items at the end
    ];
    
    // Adjust currentIndex to account for cloned slides at the beginning
    const actualIndex = currentIndex + slidesPerView;

    const goToPrevious = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(prev => prev - 1);
    };

    const goToNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(prev => prev + 1);
    };
    
    // Handle transition end to reset position for infinite loop
    useEffect(() => {
        const handleTransitionEnd = () => {
            setIsTransitioning(false);
            
            // If we've moved past the last real slide, jump to the first real slide
            if (currentIndex >= totalSlides) {
                setCurrentIndex(0);
            }
            // If we've moved before the first real slide, jump to the last real slide
            else if (currentIndex < 0) {
                setCurrentIndex(totalSlides - 1);
            }
        };
        
        const track = trackRef.current;
        if (track) {
            track.addEventListener('transitionend', handleTransitionEnd);
            return () => track.removeEventListener('transitionend', handleTransitionEnd);
        }
    }, [currentIndex, totalSlides]);

    // If no featured plugins, don't render anything
    if (!featuredPlugins || featuredPlugins.length === 0) {
        return null;
    }

    const goToSlide = (index) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
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
        <section className="gv-featured-carousel gv-w-full gv-mt-fluid">
            <div className="gv-carousel-header gv-mb-md">
                <h5 className="gv-title gv-heading-sm">Recommended for you</h5>
            </div>

            <div className="gv-carousel-container" style={{ position: 'relative', overflow: 'hidden' }}>
                <div 
                    ref={trackRef}
                    className="gv-carousel-track"
                    style={{
                        display: 'flex',
                        transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none',
                        transform: `translateX(calc(-${actualIndex} * ((100% - ${(slidesPerView - 1)}rem) / ${slidesPerView} + 1rem)))`,
                        gap: '1rem'
                    }}
                >
                    {clonedPlugins.map((plugin, index) => {
                        const title = plugin.name || 'Product';
                        const description = plugin.description || plugin.shortDescription || 'No description available.';
                        const isFree = plugin.licenseType === "free";
                        const price = isFree ? 'Free' : (plugin.priceCurrency && plugin.priceAmount) ? `${plugin.priceCurrency} ${plugin.priceAmount}` : '€ 0,-';
                        const mainImage = plugin.bannerUrl || plugin.image || plugin.thumbnail || 'https://gravity.group.one/guide-images/product-image@2x.png';

                        return (
                            <div
                                key={`slide-${index}`}
                                className="gv-carousel-slide"
                                style={{
                                    minWidth: `calc((100% - ${(slidesPerView - 1)}rem) / ${slidesPerView})`,
                                    maxWidth: `calc((100% - ${(slidesPerView - 1)}rem) / ${slidesPerView})`,
                                    flex: '0 0 auto',
                                    backgroundColor: '#E8F4F8',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    maxHeight: '380px',
                                }}
                            >
                                <header className="gv-product-header gv-area-header">
                                    <div 
                                        className="gv-content gv-stack-space-md gv-text-sm"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <h5
                                            className="gv-title gv-header-sm"
                                            style={{
                                                overflow: 'hidden',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            {title}
                                        </h5>
                                        <p 
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
                                                Read more
                                            </button>
                                            
                                            <span className="gv-price gv-text-bold gv-text-md gv-ml-md">
                                                {price}
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
                        className="gv-carousel-nav gv-carousel-nav-prev"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            opacity: 1
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
                                    width: '12px',
                                    height: '12px',
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
                        className="gv-carousel-nav gv-carousel-nav-next"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            opacity: 1
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
