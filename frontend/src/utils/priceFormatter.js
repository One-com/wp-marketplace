/**
 * Currency symbol mapping - scalable for future currencies
 */
const CURRENCY_SYMBOLS = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  DKK: 'kr',
  NOK: 'kr',
  SEK: 'kr'
  // Add more currencies here as needed
  // 'JPY': '¥',
};

/**
 * Currencies that display the symbol AFTER the amount (e.g., "79.00 kr")
 * Most European currencies like EUR, USD, GBP display before, but Nordic currencies display after
 */
const CURRENCIES_WITH_POST_SYMBOL = ['DKK', 'SEK', 'NOK'];

/**
 * Gets the currency symbol for a given currency code
 * @param {string} currencyCode - The currency code (e.g., 'EUR', 'USD')
 * @returns {string} - The currency symbol or the code itself as fallback
 */
const getCurrencySymbol = (currencyCode) => {
  return CURRENCY_SYMBOLS[currencyCode] || currencyCode;
};

/**
 * Formats price with currency symbol in the correct position
 * @param {string} amount - The formatted amount
 * @param {string} symbol - The currency symbol
 * @param {string} currencyCode - The currency code
 * @returns {string} - Formatted price with symbol in correct position
 */
const formatPriceWithSymbol = (amount, symbol, currencyCode) => {
  if (CURRENCIES_WITH_POST_SYMBOL.includes(currencyCode)) {
    return `${amount} ${symbol}`;
  }
  return `${symbol} ${amount}`;
};

/**
 * Formats the price display for a plugin based on its license type
 * @param {Object} plugin - The plugin object containing price and license information
 * @param {string} freeLabel - Optional label for free plugins (defaults to 'Free')
 * @returns {string} - Formatted price string ('Free', 'Symbol Amount', or blank)
 */
export const formatPluginPrice = (plugin, freeLabel = 'Free') => {
  const isFree = plugin.licenseType === 'free';

  if (isFree) {
    return freeLabel;
  }

  // Handle new API format with prices array
  if (plugin.prices && Array.isArray(plugin.prices) && plugin.prices.length > 0) {
    // Find the first active price, or use first price if isActive is not present
    let priceToUse = plugin.prices.find((price) => price.isActive === true);

    // If no price with isActive:true found, use first price (for formats without isActive)
    if (!priceToUse) {
      priceToUse = plugin.prices[0];
    }

    if (priceToUse && priceToUse.amount && priceToUse.currency) {
      const symbol = getCurrencySymbol(priceToUse.currency);
      // Format amount to 2 decimal places
      const formattedAmount = Number(priceToUse.amount).toFixed(2);
      return formatPriceWithSymbol(formattedAmount, symbol, priceToUse.currency);
    }
  }

  // Backward compatibility: Handle old format with priceCurrency and priceAmount
  if (plugin.priceCurrency && plugin.priceAmount) {
    const symbol = getCurrencySymbol(plugin.priceCurrency);
    // Format amount to 2 decimal places
    const formattedAmount = Number(plugin.priceAmount).toFixed(2);
    return formatPriceWithSymbol(formattedAmount, symbol, plugin.priceCurrency);
  }

  // Return blank for premium products without prices
  return '';
};
