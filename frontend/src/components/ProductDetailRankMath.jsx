import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PluginActions from './PluginActions';
import SuccessNotice from './SuccessNotice';
import ErrorToast from './ErrorToast';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatPluginPrice, getFullPrice } from '../utils/priceFormatter';

export default function ProductDetailRankMath({
  plugin,
  onClose,
  usePortal = true,
  loading = false,
}) {
  const {
    assetsBaseUrl,
    useWPHandlers,
    pluginInAction,
    plugins,
    uiI18n,
    subscriptionStatus,
    isCheckingSubscription,
    noticeState,
    setNoticeState,
    setErrorState,
  } = useMarketplace();

  // Always get both plugins from context - seo-by-rank-math for first column, rank-math-pro for second
  const freePlugin = plugins.find((p) => p.slug === 'seo-by-rank-math') || null;
  const proPlugin = plugins.find((p) => p.slug === 'seo-by-rank-math-pro') || null;

  const assetBase =
    assetsBaseUrl ||
    (typeof window.marketplaceConfig !== 'undefined' && window.marketplaceConfig?.assetsBaseUrl) ||
    '';
  const iconBase = assetBase ? `${assetBase}assets/icons/` : '';

  const [activeSlide, setActiveSlide] = useState(0);

  // Refs for slider elements
  const tableSliderRef = useRef(null);
  const sliderNavRef = useRef(null);
  const tableRef = useRef(null);
  const tableHeaderRef = useRef(null);
  const paginationRef = useRef(null);
  const dotsRef = useRef([]);

  // Slider functionality
  useEffect(() => {
    const tableSlider = tableSliderRef.current;
    const sliderNav = sliderNavRef.current;
    const table = tableRef.current;
    const tableHeader = tableHeaderRef.current;
    const pagination = paginationRef.current;

    if (!tableSlider || !sliderNav || !table || !tableHeader || !pagination) return;

    const prevButton = sliderNav.querySelector('.gv-previous');
    const nextButton = sliderNav.querySelector('.gv-next');

    // State tracking flags to prevent continuous class toggling
    let navIsAtBottom = false;
    let paginationState = 'top'; // 'top', 'overlay', or 'bottom'
    let isPaginationScrolledPast = false;
    let isTableBottomVisible = false;
    let isUpdatingClasses = false; // Flag to prevent observer callbacks during class updates

    // Throttle timer for scroll events
    let scrollThrottleTimer = null;
    let isScrollThrottled = false;

    // Update active dot and button states based on scroll position
    const updateSliderState = () => {
      const scrollLeft = tableSlider.scrollLeft;
      const slideWidth = tableSlider.offsetWidth;
      const currentSlide = Math.round(scrollLeft / slideWidth);

      setActiveSlide(currentSlide);

      // Update button disabled states
      if (prevButton) {
        if (currentSlide === 0) {
          prevButton.classList.add('gv-disabled');
        } else {
          prevButton.classList.remove('gv-disabled');
        }
      }

      if (nextButton) {
        const maxSlide = Math.round(tableSlider.scrollWidth / slideWidth) - 1;
        if (currentSlide >= maxSlide) {
          nextButton.classList.add('gv-disabled');
        } else {
          nextButton.classList.remove('gv-disabled');
        }
      }
    };

    // Calculate and set dynamic positioning for sticky navigation (only when needed)
    const calculateNavPosition = () => {
      const tablePaddingTop = parseFloat(getComputedStyle(table).paddingTop) || 0;
      const headerHeight = tableHeader.offsetHeight;
      const halfHeaderHeight = headerHeight / 2;

      // [X] = half of table header height + padding-top of table
      const translateY = halfHeaderHeight + tablePaddingTop;

      // [Y] = half viewport height - [X]
      const topValue = window.innerHeight / 2 - translateY;

      // [Z] = half of table header height (excluding padding)
      const bottomValue = 2 * halfHeaderHeight;

      sliderNav.style.transform = `translateY(${translateY}px)`;
      sliderNav.style.top = `${topValue}px`;
      sliderNav.style.bottom = `${bottomValue}px`;

      return { bottomValue, halfHeaderHeight };
    };

    // Check nav boundary and update class only when state changes
    const checkNavBoundary = (bottomValue) => {
      const tableRect = table.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate the threshold where sticky bottom constraint activates
      const stickyBottomThreshold = viewportHeight - bottomValue;

      // Only update class when boundary is crossed (state changes)
      const shouldBeAtBottom = tableRect.bottom <= stickyBottomThreshold;

      if (shouldBeAtBottom !== navIsAtBottom) {
        navIsAtBottom = shouldBeAtBottom;

        if (navIsAtBottom) {
          sliderNav.classList.add('gv-state-bottom');
        } else {
          sliderNav.classList.remove('gv-state-bottom');
        }
      }
    };

    // Update pagination state based on intersection observer flags
    const updatePaginationStateFromObservers = () => {
      // If already updating classes, ignore this call to prevent infinite loop
      if (isUpdatingClasses) {
        return;
      }

      // Determine the new state based on observer flags
      let newState;
      if (!isPaginationScrolledPast) {
        newState = 'top';
      } else if (isPaginationScrolledPast && !isTableBottomVisible) {
        newState = 'overlay';
      } else {
        newState = 'bottom';
      }

      // Only update classes when state actually changes
      if (newState !== paginationState) {
        // Set flag to prevent observer callbacks during class updates
        isUpdatingClasses = true;
        paginationState = newState;

        if (paginationState === 'top') {
          pagination.classList.add('gv-state-top');
          pagination.classList.remove('gv-state-overlay');
        } else if (paginationState === 'overlay') {
          pagination.classList.remove('gv-state-top');
          pagination.classList.add('gv-state-overlay');
        } else {
          pagination.classList.remove('gv-state-top');
          pagination.classList.remove('gv-state-overlay');
        }

        // Use requestAnimationFrame to clear flag after browser completes layout update
        requestAnimationFrame(() => {
          // Add a small delay to ensure layout is fully complete
          setTimeout(() => {
            isUpdatingClasses = false;
          }, 50);
        });
      }
    };

    // Initial calculation of nav position
    const { bottomValue } = calculateNavPosition();

    // Scroll event listener for slider
    tableSlider.addEventListener('scroll', updateSliderState);

    // Set up Intersection Observer for pagination element
    // Observes when pagination scrolls past the top of viewport
    const paginationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When pagination is NOT intersecting and is above viewport, it's scrolled past
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            isPaginationScrolledPast = true;
          } else if (entry.isIntersecting || entry.boundingClientRect.top >= 0) {
            isPaginationScrolledPast = false;
          }
          updatePaginationStateFromObservers();
        });
      },
      {
        threshold: [0, 1],
        rootMargin: '0px'
      }
    );

    // Set up Intersection Observer for table bottom
    // Create a sentinel element at the bottom of the table to observe
    const tableBottomSentinel = document.createElement('div');
    tableBottomSentinel.style.position = 'absolute';
    tableBottomSentinel.style.bottom = '0';
    tableBottomSentinel.style.left = '0';
    tableBottomSentinel.style.width = '1px';
    tableBottomSentinel.style.height = '1px';
    tableBottomSentinel.style.pointerEvents = 'none';
    table.style.position = 'relative';
    table.appendChild(tableBottomSentinel);

    const tableBottomObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isTableBottomVisible = entry.isIntersecting;
          updatePaginationStateFromObservers();
        });
      },
      {
        threshold: [0],
        rootMargin: '-100px 0px 0px 0px'
      }
    );

    // Start observing
    paginationObserver.observe(pagination);
    tableBottomObserver.observe(tableBottomSentinel);

    // Throttled scroll handler - only executes nav boundary check when not already throttled
    const handleScroll = () => {
      if (isScrollThrottled) return;

      isScrollThrottled = true;

      // Use requestAnimationFrame for smooth updates
      requestAnimationFrame(() => {
        checkNavBoundary(bottomValue);
      });

      // Throttle for 100ms to reduce continuous execution
      scrollThrottleTimer = setTimeout(() => {
        isScrollThrottled = false;
      }, 100);
    };

    // Resize handler - recalculate positions and check boundaries
    const handleResize = () => {
      const { bottomValue: newBottomValue } = calculateNavPosition();
      checkNavBoundary(newBottomValue);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Initial updates
    updateSliderState();
    checkNavBoundary(bottomValue);
    updatePaginationStateFromObservers();

    // Cleanup
    return () => {
      if (scrollThrottleTimer) {
        clearTimeout(scrollThrottleTimer);
      }
      tableSlider.removeEventListener('scroll', updateSliderState);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      paginationObserver.disconnect();
      tableBottomObserver.disconnect();
      if (tableBottomSentinel && tableBottomSentinel.parentNode) {
        tableBottomSentinel.parentNode.removeChild(tableBottomSentinel);
      }
    };
  }, []);

  // Scroll to top when component mounts or plugin changes
  useEffect(() => {
    if (plugin) {
      window.scrollTo(0, 0);
    }
  }, [plugin]);

  // Clear banners when component mounts (handles case when user returns via browser back button)
  useEffect(() => {
    if (freePlugin || proPlugin) {
      // Clear any existing banners when ProductDetail mounts
      // BUT don't clear them if they are for the current plugin (e.g. just activated and reloaded)
      setNoticeState((prev) => {
        return prev.visible &&
          (prev.pluginSlug === freePlugin?.slug || prev.pluginSlug === proPlugin?.slug)
          ? prev
          : { visible: false, type: null, pluginSlug: null };
      });
      setErrorState((prev) => {
        return prev.visible &&
          (prev.pluginSlug === freePlugin?.slug || prev.pluginSlug === proPlugin?.slug)
          ? prev
          : { visible: false, type: null, pluginSlug: null };
      });
    }
  }, [freePlugin, proPlugin, setNoticeState, setErrorState]);

  // Hide banners when user navigates back and returns to the product detail page
  useEffect(() => {
    const handlePopState = () => {
      // Clear notice and error state when navigating via browser back/forward
      setNoticeState({ visible: false, type: null, pluginSlug: null });
      setErrorState({ visible: false, type: null, pluginSlug: null });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setNoticeState, setErrorState]);

  // Show skeleton loaders while loading (even if plugin is null)
  if (loading) {
    const skeletonContent = (
      <div className={usePortal ? 'gv-surface-dim' : 'gv-surface-dim'}>
        <article className="gv-w-max-container gv-mx-auto">
          <nav className="gv-breadcrumbs gv-area-nav gv-mb-lg">
            <button
              type="button"
              className="gv-reset-button"
              onClick={(e) => {
                e.preventDefault();
                // First check if history is available and has navigable records
                if (typeof window !== 'undefined' && window.history && window.history.length > 1) {
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
              }}
            >
              <gv-icon aria-hidden="true" src={`${iconBase}arrow_back.svg`}></gv-icon>
              <span>{uiI18n.backButton}</span>
            </button>
          </nav>

          {/* Header skeleton - single skeleton loader */}
          <header className="gv-area-header">
            <div className="gv-image">
              <div className="gv-card-image gv-h-full">
                <div
                  className="gv-skeleton gv-radius-0 gv-h-full"
                  style={{ minHeight: '300px' }}
                ></div>
              </div>
            </div>
          </header>

          <header className="gv-area-header gv-mt-fluid gv-mb-fluid">
            <div className="gv-image">
              <div className="gv-card-image gv-h-full">
                <div
                  className="gv-skeleton gv-radius-0 gv-h-full"
                  style={{ minHeight: '300px' }}
                ></div>
              </div>
            </div>
          </header>
          {/* Benefits skeleton - keep structure, add skeletons */}
          <div className="gv-area-details gv-grid gv-gap-fluid gv-mb-fluid">
            <section className="gv-stack-space-md">
              <div className="gv-skeleton gv-heading-md gv-mb-md" style={{ width: '160px' }}></div>
              <ul className="">
                {[...Array(3)].map((_, i) => (
                  <li key={i}>
                    <div className="gv-skeleton gv-text-sm"></div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Core Features skeleton - keep structure, add skeletons */}
          <div className="gv-area-content gv-grid gv-gap-fluid">
            <section className="gv-text-sm gv-stack-space-md">
              <div
                className="gv-skeleton gv-heading-md"
                style={{ width: '160px', marginBottom: '28px' }}
              ></div>
              <div className="gv-grid gv-gap-lg gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <div className="gv-item gv-stack-space-sm" key={i}>
                    <div
                      className="gv-skeleton gv-heading-md gv-mb-sm"
                      style={{ width: '160px' }}
                    ></div>
                    <div className="gv-skeleton gv-text-sm gv-mb-xs"></div>
                    <div className="gv-skeleton gv-text-sm"></div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>
      </div>
    );
    return usePortal ? createPortal(skeletonContent, document.body) : skeletonContent;
  }

  // If not loading and plugin is null, return null
  if (!plugin) return null;

  // Navigation button click handlers
  const handlePrevClick = () => {
    const tableSlider = tableSliderRef.current;
    if (!tableSlider) return;

    const slideWidth = tableSlider.offsetWidth;
    tableSlider.scrollTo({
      left: tableSlider.scrollLeft - slideWidth,
      behavior: 'smooth'
    });
  };

  const handleNextClick = () => {
    const tableSlider = tableSliderRef.current;
    if (!tableSlider) return;

    const slideWidth = tableSlider.offsetWidth;
    tableSlider.scrollTo({
      left: tableSlider.scrollLeft + slideWidth,
      behavior: 'smooth'
    });
  };

  // Dot click handler
  const handleDotClick = (slideIndex) => {
    const tableSlider = tableSliderRef.current;
    if (!tableSlider) return;

    const slideWidth = tableSlider.offsetWidth;
    tableSlider.scrollTo({
      left: slideWidth * slideIndex,
      behavior: 'smooth'
    });
  };

  // Use the clicked plugin for header/main content, but always use freePlugin for first column
  const imageURL =
    (typeof window.onecomWpVars !== 'undefined' && window.onecomWpVars?.imageURL) || assetBase;
  const iconSrc = plugin.thumbnail || `${assetBase}assets/icons/placeholder.svg`;
  const mainImage =
    plugin.bannerUrl ||
    plugin.image ||
    plugin.thumbnail ||
    'https://gravity.group.one/guide-images/product-image@2x.png';

  // Extract data with fallbacks for free version (first column - always seo-by-rank-math)
  const title = freePlugin?.name || plugin.name || 'Product';
  const description = freePlugin?.i18n?.description || freePlugin?.i18n?.subtitle;
  const subtitle = freePlugin?.i18n?.subtitle;

  // Extract data for pro version (second column - always rank-math-pro)
  const proTitle = proPlugin?.name || 'Rank Math Pro';
  const proDescription = proPlugin?.i18n?.subtitle || proPlugin?.i18n?.description;
  const proPrice = proPlugin
    ? formatPluginPrice(proPlugin, uiI18n?.labels?.free || 'Free', uiI18n)
    : '';

  // Check if proPrice is "Free until renewal" (rebate amount is 0)
  const isProFreeUntilRenewal =
    proPrice === (uiI18n?.labels?.freeUntilRenewal || 'Free until renewal');

  // Extract full price for pro plugin using common utility function
  const proFullPriceAmount = getFullPrice(proPlugin);

  // Helper function to extract numbered properties dynamically from i18n object
  const extractNumberedProps = (obj, baseName) => {
    if (!obj || typeof obj !== 'object') return [];
    const results = [];
    let i = 1;
    while (obj[`${baseName}${i}`]) {
      const value = obj[`${baseName}${i}`];
      if (value && value.trim() !== '') {
        results.push(value);
      }
      i++;
    }
    return results;
  };

  // Extract key benefits from i18n (use freePlugin's i18n if available, otherwise plugin's i18n)
  const i18nSource = freePlugin?.i18n || plugin.i18n;
  const benefitsFromI18n = extractNumberedProps(i18nSource, 'keyBenefitContent');

  // Extract key features separately for both free and pro plugins
  const freeKeyFeatures = extractNumberedProps(freePlugin?.i18n, 'keyFeatureContent');
  const proKeyFeatures = extractNumberedProps(proPlugin?.i18n, 'keyFeatureContent');

  // Determine the maximum number of features to display all from both plugins
  const maxFeatures = Math.max(freeKeyFeatures.length, proKeyFeatures.length);

  // Extract core features (title/content pairs) from i18n
  const coreFeaturesFromI18n = [];
  if (i18nSource && typeof i18nSource === 'object') {
    let i = 1;
    while (i18nSource[`coreFeatureTitle${i}`] || i18nSource[`coreFeatureContent${i}`]) {
      const title = i18nSource[`coreFeatureTitle${i}`];
      const content = i18nSource[`coreFeatureContent${i}`];
      if (title && title.trim() !== '' && content && content.trim() !== '') {
        coreFeaturesFromI18n.push({ name: title, desc: content });
      }
      i++;
    }
  }

  // Use only i18n data - no fallbacks
  const benefits = benefitsFromI18n;
  const coreFeatures = coreFeaturesFromI18n;

  const content = (
    <div className="gv-surface-dim">
      <article className="gv-layout-product gv-w-max-container gv-mx-auto gv-p-fluid gv-p-0">
        <nav className="gv-breadcrumbs gv-area-nav">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              // Disable back navigation when plugin is being activated and reload is pending
              if (pluginInAction[plugin.slug]) {
                return;
              }
              // First check if history is available and has navigable records
              if (typeof window !== 'undefined' && window.history && window.history.length > 1) {
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
            }}
            className="gv-reset-button gv-flex gv-items-center gv-gap-xs"
            aria-label="Go back"
            style={{
              opacity: pluginInAction[plugin.slug] ? 0.5 : 1,
              pointerEvents: pluginInAction[plugin.slug] ? 'none' : 'auto',
              cursor: pluginInAction[plugin.slug] ? 'not-allowed' : 'pointer',
            }}
            disabled={pluginInAction[plugin.slug]}
          >
            <gv-icon aria-hidden="true" src={`${iconBase}arrow_back.svg`}></gv-icon>
            <span>{uiI18n.backButton}</span>
          </button>
          <SuccessNotice
            plugin={noticeState?.pluginSlug === proPlugin?.slug ? proPlugin : freePlugin}
          />
          <ErrorToast plugin={freePlugin} />
          <ErrorToast plugin={proPlugin} />
        </nav>

        <header className="gv-product-header gv-area-header">
          <div className="gv-content gv-stack-space-md gv-text-sm">
            <h3 className="gv-title gv-header-lg">Rank Math</h3>
            <p className="gv-text-sm">{description}</p>
          </div>
          <div className="gv-image">
            <picture>
              <source media="(min-width: 600px)" srcSet={`${mainImage} 2x, ${mainImage} 1x`} />
              <img src={mainImage} srcSet={`${mainImage} 2x, ${mainImage} 1x`} alt="Rank Math" />
            </picture>
          </div>
        </header>

        <section className="gv-product-table gv-features-table gv-products-2 gv-recommended-2 gv-area-table">
          <div className="gv-dots-scroll-area">
            <div className="gv-table-container">
              <div className="gv-slider-nav" ref={sliderNavRef}>
                <button
                  type="button"
                  className="gv-nav-button gv-previous gv-disabled"
                  onClick={handlePrevClick}
                >
                  <gv-icon aria-hidden="true" src={`${iconBase}chevron_left.svg`}></gv-icon>
                </button>
                <button type="button" className="gv-nav-button gv-next" onClick={handleNextClick}>
                  <gv-icon aria-hidden="true" src={`${iconBase}chevron_right.svg`}></gv-icon>
                </button>
              </div>
              <div className="gv-table-slider" ref={tableSliderRef}>
                <div className="gv-table" role="table" ref={tableRef}>
                  <div className="gv-table-header" role="rowgroup" ref={tableHeaderRef}>
                    <div className="gv-table-row" role="row">
                      <div className="gv-product gv-p-0" role="columnheader">
                        <div className="gv-content">
                          <h3 className="gv-title">{`${title} free`}</h3>
                          <p>{subtitle}</p>
                        </div>
                        <div className="gv-bottom">
                          <div className="gv-price-container">
                            <div className="gv-price">
                              <span className="gv-price-text">
                                {uiI18n?.labels?.free || 'Free'}
                              </span>
                            </div>
                          </div>
                          {useWPHandlers && freePlugin ? (
                            <PluginActions plugin={freePlugin} />
                          ) : (
                            freePlugin?.download && (
                              <button type="button" className="gv-button gv-button-secondary">
                                {uiI18n?.installButton ||
                                  freePlugin?.i18n?.installButton ||
                                  'Install'}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                      <div className="gv-product gv-p-0" role="columnheader">
                        <div className="gv-recommended-label">Recommended</div>
                        <div className="gv-content">
                          <h3 className="gv-title">{proTitle}</h3>
                          <p>
                            {proDescription.substring(0, 120)}
                            {proDescription.length > 120 ? '…' : ''}
                          </p>
                        </div>
                        <div className="gv-bottom">
                          <div className="gv-price-container">
                            <div className="gv-price">
                              <span className="gv-price-text">
                                {proPrice}
                                {proPrice && !isProFreeUntilRenewal && `,-`}
                              </span>
                              {proPrice && !isProFreeUntilRenewal && (
                                <span className="gv-period">/{uiI18n?.labels?.timeMonth}</span>
                              )}
                            </div>
                            {proPrice && (
                              <div className="gv-price-info">
                                <div className="gv-info">
                                  {uiI18n.labels.afterThat} [{proFullPriceAmount}]/
                                  {uiI18n?.labels?.timeMonth}
                                </div>
                              </div>
                            )}
                          </div>
                          {useWPHandlers && proPlugin ? (
                            <PluginActions plugin={proPlugin} />
                          ) : (
                            <button type="button" className="gv-button gv-button-primary">
                              Select
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {maxFeatures > 0 && (
                    <div className="gv-section" role="rowgroup">
                      <div className="gv-section-header gv-table-row" role="row">
                        <div className="gv-cell" role="cell">
                          <h4 className="gv-title">
                            {uiI18n?.keyFeatureHeading ||
                              freePlugin?.i18n?.keyFeatureHeading ||
                              'Key features'}
                          </h4>
                        </div>
                        <div className="gv-cell" role="cell">
                          <h4 className="gv-title">
                            {uiI18n?.keyFeatureHeading ||
                              proPlugin?.i18n?.keyFeatureHeading ||
                              'Key features'}
                          </h4>
                        </div>
                      </div>
                      {Array.from({ length: maxFeatures }).map((_, i) => (
                        <div className="gv-table-row" role="row" key={i}>
                          <div className="gv-cell" role="cell">
                            <span className="gv-cell-text">{freeKeyFeatures[i] || ''}</span>
                          </div>
                          <div className="gv-cell" role="cell">
                            <span className="gv-cell-text">{proKeyFeatures[i] || ''}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="gv-slider-pagination gv-state-top" ref={paginationRef}>
              <div className="gv-dots" role="tablist">
                {[0, 1].map((slideIndex) => (
                  <button
                    type="button"
                    key={slideIndex}
                    className={`gv-reset-button gv-dot ${activeSlide === slideIndex ? 'gv-active' : ''}`}
                    role="tab"
                    aria-selected={activeSlide === slideIndex ? 'true' : 'false'}
                    aria-label={`Go to slide ${slideIndex + 1}`}
                    onClick={() => handleDotClick(slideIndex)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="gv-area-details gv-grid gv-gap-fluid">
          {benefits.length > 0 && (
            <section className="gv-stack-space-md">
              <h2 className="gv-title gv-text-bold gv-text-lg">
                {uiI18n?.benefitHeading || plugin.i18n?.benefitHeading || 'Key benefits'}
              </h2>
              <ul className="gv-list-items gv-list-check gv-mode-condensed">
                {benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {coreFeatures.length > 0 && (
          <div className="gv-area-content gv-grid gv-gap-fluid">
            <section className="gv-text-sm gv-stack-space-md">
              <h2 className="gv-title gv-text-bold gv-text-lg">
                {uiI18n?.featureOverviewHeading ||
                  plugin.i18n?.featureOverviewHeading ||
                  'Core features overview'}
              </h2>
              <div className="gv-grid gv-gap-lg gv-tab-grid-cols-2 gv-desk-lg-grid-cols-3">
                {coreFeatures.map((cf, i) => (
                  <div className="gv-item gv-stack-space-sm" key={i}>
                    <h3 className="gv-title gv-text-bold gv-text-lg">{cf.name}</h3>
                    <p className="gv-text-sm">{cf.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </article>
    </div>
  );

  return usePortal ? createPortal(content, document.body) : content;
}
