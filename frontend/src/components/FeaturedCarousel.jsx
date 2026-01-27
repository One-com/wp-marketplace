import React, { useState, useEffect } from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import { formatPluginPrice } from "../utils/priceFormatter";

export default function FeaturedCarousel({ loading = false }) {
    const { plugins, assetsBaseUrl,uiI18n } = useMarketplace();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(2);

    // Get active plugin slugs from WordPress config
    const activePlugins = typeof window !== "undefined" && window.marketplaceConfig?.activePlugins
        ? window.marketplaceConfig.activePlugins
        : [];

    // Get active theme author from WordPress config
    const activeThemeAuthor = typeof window !== "undefined" && window.marketplaceConfig?.activeThemeAuthor
        ? window.marketplaceConfig.activeThemeAuthor
        : "";

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

    // Helper function to check if a plugin should be visible based on its rules
    const shouldShowPlugin = (plugin) => {
        // If plugin has no rules, show it by default
        if (!plugin.rules) {
            return true;
        }

        // Check mustHavePlugins rule
        if (plugin.rules.mustHavePlugins && Array.isArray(plugin.rules.mustHavePlugins)) {
            // If the array is empty, no requirements exist, so show the plugin
            if (plugin.rules.mustHavePlugins.length === 0) {
                return true;
            }

            // Plugin should be visible if ANY of the required plugins is active
            const hasRequiredPlugin = plugin.rules.mustHavePlugins.some(requiredSlug =>
                activePlugins.includes(requiredSlug)
            );

            // If mustHavePlugins rule exists but no required plugin is active, hide the plugin
            if (!hasRequiredPlugin) {
                return false;
            }
        }

        // Check mustHaveThemesByAuthor rule
        if (plugin.rules.mustHaveThemesByAuthor && typeof plugin.rules.mustHaveThemesByAuthor === 'string') {
            // Plugin should be visible only if the active theme author matches the required author
            const requiredAuthor = plugin.rules.mustHaveThemesByAuthor;
            if (activeThemeAuthor !== requiredAuthor) {
                return false;
            }
        }

        // Add support for other rule types here in the future
        // For now, if all rules pass (or don't exist), show the plugin
        return true;
    };

    // Check activation status of Rank Math plugins
    const rankMathActivated = plugins.find(p => p.slug === "seo-by-rank-math")?.activated === true;
    const rankMathProActivated = plugins.find(p => p.slug === "seo-by-rank-math-pro")?.activated === true;

    // Filter featured plugins that are not active, pass rules check, and handle Rank Math logic
    const featuredPlugins = plugins.filter(plugin => {
        // Skip activated plugins
        if (plugin.activated === true || plugin.featured !== true) {
            return false;
        }

        // Handle Rank Math plugin visibility
        if (plugin.slug === "seo-by-rank-math") {
            // Show seo-by-rank-math only if BOTH plugins are NOT activated
            return !rankMathActivated && !rankMathProActivated && shouldShowPlugin(plugin);
        }

        if (plugin.slug === "seo-by-rank-math-pro") {
            // Show seo-by-rank-math-pro only if seo-by-rank-math IS activated
            return rankMathActivated && shouldShowPlugin(plugin);
        }

        // For all other plugins, apply normal filtering
        return shouldShowPlugin(plugin);
    }).sort((a, b) => {
        const orderA = a.displayOrder !== undefined ? parseInt(a.displayOrder) : Infinity;
        const orderB = b.displayOrder !== undefined ? parseInt(b.displayOrder) : Infinity;
        return orderA - orderB;
    });

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

    // Show skeleton loaders while loading
    if (loading) {
        return (
            <section className="gv-featured-carousel gv-w-full">
                <div className="gv-carousel-header gv-mb-lg gv-tab-mt-md gv-max-mob-mt-0">
                    <div className="gv-skeleton gv-heading-md" style={{ width: '200px' }}></div>
                </div>

                <div className="gv-carousel-container" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div
                        className="gv-carousel-track"
                        style={{
                            display: 'flex',
                            gap: '1rem'
                        }}
                    >
                        {/* Generate 2 skeleton carousel slides */}
                        {[...Array(slidesPerView)].map((_, index) => (
                            <div
                                key={`skeleton-slide-${index}`}
                                className="gv-carousel-slide gv-border-alt"
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
                                <header className="gv-product-header gv-area-header gv-w-full" style={{
                                    border: 'none',
                                    background: "#D9EBF7"
                                }}>
                                    <div className="gv-content gv-stack-space-sm gv-text-sm gv-flex gv-flex-col gv-items-start">
                                        {/* Badge skeleton */}
                                        <div className="gv-skeleton" style={{ width: '80px', marginBottom: '24px' }}></div>

                                        {/* Title skeleton */}
                                        <div className="gv-skeleton gv-heading-md gv-w-full"></div>

                                        {/* Description skeletons */}
                                        <div className="gv-skeleton gv-heading-md gv-w-full"></div>
                                        <div className="gv-skeleton gv-text-sm" style={{ width: '90%' }}></div>
                                        <div className="gv-skeleton gv-text-sm" style={{ width: '80%' }}></div>

                                        {/* Footer with button and price skeletons */}
                                        <div className="gv-slide-footer gv-flex gv-align-center gv-flex-wrap gv-items-center" style={{ marginTop: '24px' }}>
                                            <div className="gv-skeleton" style={{ width: '100px', height: '40px' }}></div>
                                            <div className="gv-skeleton gv-ml-md" style={{ width: '60px', height: '24px' }}></div>
                                        </div>
                                    </div>
                                    <div className="gv-image gv-max-mob-pl-md">
                                        <div className="gv-card-image" style={{ width: '100%', height: '100%',marginTop:"74px" }}>
                                            <div className="gv-skeleton gv-radius-0 gv-h-full"></div>
                                        </div>
                                    </div>
                                </header>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

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
            <div className="gv-carousel-header gv-mb-lg gv-tab-mt-md gv-max-mob-mt-0">
                <h5 className="gv-title gv-heading-sm gv-recommended-heading">{uiI18n?.headings?.recommendedHeading}</h5>
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
                        const freeLabel = (plugin.i18n.freeTrialPeriod && plugin.i18n.freeTrialPeriod.trim() !== '')
                            ? plugin.i18n.freeTrialPeriod
                            : (uiI18n?.labels?.free || 'Free');
                        const price = formatPluginPrice(plugin, freeLabel, uiI18n);
                        const mainImage = plugin.bannerUrl || plugin.image || plugin.thumbnail || 'https://gravity.group.one/guide-images/product-image@2x.png';

                        // Extract category name from plugin categories array
                        const categoryObj = Array.isArray(plugin.categories) && plugin.categories.length
                            ? (typeof plugin.categories[0] === 'object' ? plugin.categories[0] : { slug: String(plugin.categories[0]), title: String(plugin.categories[0]), description: null })
                            : { slug: "Others", title: "Others", description: null };
                        const categoryName = categoryObj.title || categoryObj.slug || "Others";

                        return (
                            <div
                                key={`slide-${index}`}
                                className="gv-carousel-slide gv-border-alt"
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
                                    className="gv-content  gv-stack-space-lg gv-text-sm gv-flex gv-flex-col gv-items-start gv-h-full gv-justify-between"
                                  >
                                    <div className="gv-badge gv-badge-info gv-flex-none">{plugin?.name}</div>
                                    <div className="gv-flex gv-flex-col gv-h-full gv-justify-between">
                                    <div style={{
                                      display: '-webkit-box',
                                      WebkitBoxOrient: 'vertical',
                                      WebkitLineClamp: 8,
                                      overflow: 'hidden',
                                      width: '100%',
                                    }}>
                                      <h5
                                        className="gv-title gv-header-sm" style={{
                                        marginBottom: '8px',
                                      }}
                                      >
                                        {title}
                                      </h5>
                                      <p className="gv-text-sm">
                                        {description?.trim()}
                                      </p>
                                    </div>

                                        <div className="gv-slide-footer gv-flex gv-align-center gv-items-center">
                                            <button
                                                onClick={() => handleReadMore(plugin)}
                                                className="gv-button gv-button-secondary gv-w-auto gv-flex-shrink-0"
                                            >
                                              {uiI18n?.featuredCta}
                                            </button>

                                            <span className="gv-price gv-text-bold gv-text-md gv-ml-md gv-flex-1">
                                                {price}
                                                {plugin.licenseType !== "free" && price && price !== freeLabel && price !== (uiI18n?.labels?.freeUntilRenewal || 'Free until renewal') && <span className="gv-period">/{uiI18n?.labels?.timeMonth}</span>}
                                            </span>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="gv-image gv-max-mob-pl-md">
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
                        className="gv-carousel-dots gv-flex-wrap gv-items-center gv-flex gv-justify-center  gv-gap-sm">
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
