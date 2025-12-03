/**
 * Currency symbol mapping - scalable for future currencies
 */
const CURRENCY_SYMBOLS = {
    'EUR': '€',
    'USD': '$',
    // Add more currencies here as needed
    // 'GBP': '£',
    // 'JPY': '¥',
};

/**
 * Gets the currency symbol for a given currency code
 * @param {string} currencyCode - The currency code (e.g., 'EUR', 'USD')
 * @returns {string} - The currency symbol or the code itself as fallback
 */
const getCurrencySymbol = (currencyCode) => {
    return CURRENCY_SYMBOLS[currencyCode] || currencyCode;
};

/**
 * Formats the price display for a plugin based on its license type
 * @param {Object} plugin - The plugin object containing price and license information
 * @returns {string} - Formatted price string ('Free', 'Symbol Amount', or blank)
 */
export const formatPluginPrice = (plugin) => {
    const isFree = plugin.licenseType === "free";

    if (isFree) {
        return 'Free';
    }

    // Handle new API format with prices array
    if (plugin.prices && Array.isArray(plugin.prices) && plugin.prices.length > 0) {
        // Find the first active price
        const activePrice = plugin.prices.find(price => price.isActive === true);

        if (activePrice && activePrice.amount && activePrice.currency) {
            const symbol = getCurrencySymbol(activePrice.currency);
            return `${symbol} ${activePrice.amount}`;
        }
    }

    // Backward compatibility: Handle old format with priceCurrency and priceAmount
    if (plugin.priceCurrency && plugin.priceAmount) {
        const symbol = getCurrencySymbol(plugin.priceCurrency);
        return `${symbol} ${plugin.priceAmount}`;
    }

    // Return blank for premium products without prices
    return '';
};
