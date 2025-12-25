/**
 * Mixpanel Tracking Utility
 *
 * Provides centralized tracking functionality with error handling
 * and support for global and event-specific properties.
 */

import mixpanel from 'mixpanel-browser';

// Track initialization status
let isInitialized = false;

// Initialize Mixpanel if token is provided and data consent is given
const initializeMixpanel = () => {
    try {
        if (typeof window === 'undefined') {
            return false;
        }

        // Don't re-initialize if already done
        if (isInitialized) {
            return true;
        }

        const config = window.marketplaceConfig || {};

        // Check if data consent is given
        const dataConsentStatus = config.data_consent_status;
        if (!dataConsentStatus) {
            console.log('[MixpanelTracking] Data consent not given. Mixpanel tracking disabled.');
            return false;
        }

        const mixpanelConfig = config.mixpanel || {};
        const token = mixpanelConfig.token;

        // Only initialize if token is provided
        if (!token || token === '') {
            console.warn('[MixpanelTracking] No Mixpanel token provided. Add your token in MarketplaceController.php');
            return false;
        }

        mixpanel.init(token, {
            debug: mixpanelConfig.debug || false,
            track_pageview: false, // We'll handle page views manually
            persistence: 'localStorage',
            // Disable automatic collection of potentially sensitive properties for privacy
            property_blacklist: [
                '$initial_referrer',
                '$initial_referring_domain',
                '$current_url',
                '$referrer',
                '$referring_domain',
                'mp_lib',
                '$lib_version',
                '$browser',
                '$browser_version',
                '$device',
                '$screen_height',
                '$screen_width',
                '$os',
                '$search_engine',
            ],
        });

        // Set distinct_id if provided
        const distinctId = mixpanelConfig.distinctId;
        console.log('[MixpanelTracking] distinctId from config:', distinctId, 'Type:', typeof distinctId);
        if (distinctId && distinctId !== '') {
            mixpanel.identify(distinctId);
            console.log('[MixpanelTracking] User identified with distinct_id:', distinctId);
        } else {
            console.warn('[MixpanelTracking] No valid distinctId provided. Mixpanel will use auto-generated device ID.');
        }

        isInitialized = true;
        console.log('[MixpanelTracking] Mixpanel initialized successfully');
        return true;
    } catch (error) {
        console.error('[MixpanelTracking] Error initializing Mixpanel:', error);
        return false;
    }
};

// Export initializeMixpanel for manual initialization from React components
export { initializeMixpanel };

// Check if Mixpanel is available
const isMixpanelAvailable = () => {
    try {
        return isInitialized && typeof mixpanel !== 'undefined';
    } catch (error) {
        console.warn('[MixpanelTracking] Error checking Mixpanel availability:', error);
        return false;
    }
};

/**
 * Disable Mixpanel tracking (when consent is revoked)
 * Resets the SDK and clears the initialization flag
 */
export const disableMixpanel = () => {
    try {
        if (isInitialized && typeof mixpanel !== 'undefined') {
            // Reset Mixpanel instance to stop tracking
            mixpanel.reset();
            isInitialized = false;
            console.log('[MixpanelTracking] Mixpanel tracking disabled');
        }
    } catch (error) {
        console.error('[MixpanelTracking] Error disabling Mixpanel:', error);
    }
};

/**
 * Enable Mixpanel tracking (when consent is granted)
 * Reinitializes Mixpanel with current config from window.marketplaceConfig
 */
export const enableMixpanel = () => {
    try {
        if (typeof window === 'undefined') {
            return false;
        }

        const config = window.marketplaceConfig || {};
        const mixpanelConfig = config.mixpanel || {};
        const token = mixpanelConfig.token;

        // Only initialize if token is provided
        if (!token || token === '') {
            console.warn('[MixpanelTracking] No Mixpanel token provided. Cannot enable tracking.');
            return false;
        }

        // Reset flag to allow re-initialization
        isInitialized = false;

        // Initialize Mixpanel
        return initializeMixpanel();
    } catch (error) {
        console.error('[MixpanelTracking] Error enabling Mixpanel:', error);
        return false;
    }
};

/**
 * Get global tracking properties from window.marketplaceConfig.mixpanel.globalProperties
 * @returns {Object} Global properties object
 */
export const getGlobalProperties = () => {
    try {
        if (typeof window === 'undefined') {
            return {};
        }

        const config = window.marketplaceConfig || {};
        const mixpanelConfig = config.mixpanel || {};
        const globalProps = mixpanelConfig.globalProperties || {};

        // Add hit_type and page/path properties to the global properties from PHP
        // Extract base path from query params for 'page' property
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = urlParams.get('page') || '';

        const enhancedProperties = {
            ...globalProps,
            hit_type: 'event',
            page: pageParam || window.location.pathname,
            path: window.location.pathname + window.location.search,
            referrer: document.referrer.split('/').filter(Boolean).pop() || '',
        };

        // Filter out empty values to keep the payload clean
        return Object.fromEntries(
            Object.entries(enhancedProperties).filter(([_, value]) => {
                if (value === '' || value === null || value === undefined) {
                    return false;
                }
                if (Array.isArray(value) && value.length === 0) {
                    return false;
                }
                return true;
            })
        );
    } catch (error) {
        console.error('[MixpanelTracking] Error building global properties:', error);
        return {};
    }
};

/**
 * Track a Mixpanel event with global and event-specific properties
 * @param {string} eventName - Name of the event to track
 * @param {Object} eventProperties - Event-specific properties
 */
export const trackEvent = (eventName, eventProperties = {}) => {
    try {
        if (!isMixpanelAvailable()) {
            // Silently skip tracking if Mixpanel is not available
            // This is expected when data consent is not given or token is missing
            return;
        }

        // Merge global properties with event-specific properties
        const properties = {
            ...getGlobalProperties(),
            ...eventProperties,
        };

        // Track the event
        mixpanel.track(eventName, properties);

        console.log('[MixpanelTracking] Event tracked:', eventName, properties);
    } catch (error) {
        console.error('[MixpanelTracking] Error tracking event:', eventName, error);
    }
};

/**
 * Track page view event
 * @param {Object} options - Page view options
 * @param {string} options.pluginSlug - Plugin slug (for detail pages)
 * @param {string} options.pluginName - Plugin name (for detail pages)
 * @param {string} options.category - Plugin category
 * @param {string} options.itemName - Custom item_name value (overrides default)
 * @param {boolean} options.isContentRendered - Whether content was successfully rendered (default: true)
 * @param {number} options.contentReceivedAt - Timestamp when API content was received
 * @param {number} options.contentRenderedAt - Timestamp when content was rendered to page
 * @param {boolean} options.isCached - Whether the response was served from cache (default: false)
 */
export const trackPageView = ({ pluginSlug, pluginName, category, itemName, isContentRendered = true, contentReceivedAt = null, contentRenderedAt = null, isCached = false } = {}) => {
    try {
        const timestamp = Date.now();

        const eventProperties = {
            content_received_at: contentReceivedAt || timestamp,
            is_content_rendered: isContentRendered,
            is_cached: isCached,
        };

        // Only add content_rendered_at if content was successfully rendered
        if (isContentRendered) {
            eventProperties.content_rendered_at = contentRenderedAt || timestamp;
        }

        // Use itemName if provided, otherwise use pluginSlug (for backward compatibility)
        if (itemName) {
            eventProperties.item_name = itemName;
        } else if (pluginSlug) {
            eventProperties.item_name = pluginSlug;
        }

        if (pluginSlug) {
            eventProperties.product_slug = pluginSlug;
        }

        if (pluginName) {
            eventProperties.product_name = pluginName;
        }

        if (category) {
            eventProperties.item_category = category;
        }

        trackEvent('Page Viewed', eventProperties);
    } catch (error) {
        console.error('[MixpanelTracking] Error tracking page view:', error);
    }
};

/**
 * Track plugin action (install, activate, etc.)
 * @param {Object} options - Action options
 * @param {string} options.action - Action type (e.g., 'install', 'activate')
 * @param {Object} options.plugin - Plugin object
 * @param {string} options.result - Action result (e.g., 'success', 'error')
 */
export const trackPluginAction = ({ action, plugin, result = 'initiated' } = {}) => {
    try {
        if (!plugin) {
            console.warn('[MixpanelTracking] Plugin object required for tracking action');
            return;
        }

        const eventName = `Plugin ${action.charAt(0).toUpperCase() + action.slice(1)}`;

        const eventProperties = {
            action: action,
            product_slug: plugin.slug || '',
            product_name: plugin.name || '',
            item_name: plugin.slug || '',
            result: result,
            timestamp: Date.now(),
        };

        // Add plugin-specific properties
        if (plugin.categories && plugin.categories.length > 0) {
            const category = typeof plugin.categories[0] === 'object'
                ? plugin.categories[0].slug || plugin.categories[0].title
                : plugin.categories[0];
            eventProperties.item_category = category;
        }

        if (plugin.licenseType) {
            eventProperties.license_type = plugin.licenseType;
        }

        if (plugin.priceAmount !== undefined) {
            eventProperties.price_amount = plugin.priceAmount;
        }

        if (plugin.priceCurrency) {
            eventProperties.price_currency = plugin.priceCurrency;
        }

        trackEvent(eventName, eventProperties);
    } catch (error) {
        console.error('[MixpanelTracking] Error tracking plugin action:', error);
    }
};

/**
 * Extract common properties from a plugin object
 * @param {Object} plugin - Plugin object
 * @returns {Object} Extracted properties
 */
const extractPluginProperties = (plugin) => {
    if (!plugin) return {};

    const properties = {
        product_slug: plugin.slug || '',
        product_name: plugin.name || '',
        // Note: item_name is NOT included here by default
        // It should be set contextually by the calling function
    };

    // Extract category
    if (plugin.categories && plugin.categories.length > 0) {
        const category = typeof plugin.categories[0] === 'object'
            ? plugin.categories[0].slug || plugin.categories[0].title
            : plugin.categories[0];
        properties.item_category = category;
    }

    // Extract license type
    if (plugin.licenseType) {
        properties.license_type = plugin.licenseType;
    }

    // Extract price information
    if (plugin.priceAmount !== undefined) {
        properties.price_amount = plugin.priceAmount;
    }

    if (plugin.priceCurrency) {
        properties.price_currency = plugin.priceCurrency;
    }

    return properties;
};

/**
 * Track button click event
 * @param {Object} options - Click options
 * @param {string} options.buttonName - Name/label of the button
 * @param {string} options.buttonAction - Action associated with the button
 * @param {Object} options.plugin - Optional plugin object (will auto-extract properties)
 * @param {Object} options.context - Additional context (merged with plugin properties)
 */
export const trackButtonClick = ({ buttonName, buttonAction, plugin = null, context = {} } = {}) => {
    try {
        // Start with base properties
        const eventProperties = {
            button_name: buttonName || '',
            button_action: buttonAction || '',
            item_name: buttonName || '', // item_name should be the button name
            timestamp: Date.now(),
        };

        // Auto-extract plugin properties if plugin object is provided
        if (plugin) {
            Object.assign(eventProperties, extractPluginProperties(plugin));
        }

        // Merge additional context (context takes precedence over auto-extracted properties)
        Object.assign(eventProperties, context);

        trackEvent('Button Clicked', eventProperties);
    } catch (error) {
        console.error('[MixpanelTracking] Error tracking button click:', error);
    }
};

/**
 * Track marketplace visit
 * @param {number} contentReceivedAt - Timestamp when API content was received
 * @param {number} contentRenderedAt - Timestamp when content was rendered to page
 * @param {boolean} isCached - Whether the response was served from cache
 */
export const trackMarketplaceVisit = (contentReceivedAt = null, contentRenderedAt = null, isCached = false) => {
    try {
        trackPageView({
            category: 'marketplace_home',
            itemName: 'Catalog Page', // Set item_name to 'Catalog page' for marketplace listing
            contentReceivedAt: contentReceivedAt,
            contentRenderedAt: contentRenderedAt,
            isCached: isCached,
        });
    } catch (error) {
        console.error('[MixpanelTracking] Error tracking marketplace visit:', error);
    }
};

/**
 * Track plugin detail page visit
 * @param {Object} plugin - Plugin object
 * @param {number} contentReceivedAt - Timestamp when API content was received
 * @param {number} contentRenderedAt - Timestamp when content was rendered to page
 * @param {boolean} isCached - Whether the response was served from cache
 */
export const trackPluginDetailVisit = (plugin, contentReceivedAt = null, contentRenderedAt = null, isCached = false) => {
    try {
        if (!plugin) {
            console.warn('[MixpanelTracking] Plugin object required for tracking detail visit');
            return;
        }

        const category = plugin.categories && plugin.categories.length > 0
            ? (typeof plugin.categories[0] === 'object'
                ? plugin.categories[0].slug || plugin.categories[0].title
                : plugin.categories[0])
            : '';

        trackPageView({
            pluginSlug: plugin.slug,
            pluginName: plugin.name,
            category: category,
            itemName: 'Product Page', // Set item_name to 'Product page' for plugin detail page
            contentReceivedAt: contentReceivedAt,
            contentRenderedAt: contentRenderedAt,
            isCached: isCached,
        });
    } catch (error) {
        console.error('[MixpanelTracking] Error tracking plugin detail visit:', error);
    }
};

// Export default object with all tracking functions
export default {
    trackEvent,
    trackPageView,
    trackPluginAction,
    trackButtonClick,
    trackMarketplaceVisit,
    trackPluginDetailVisit,
    getGlobalProperties,
    isMixpanelAvailable,
};
