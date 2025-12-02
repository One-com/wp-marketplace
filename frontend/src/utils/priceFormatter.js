/**
 * Formats the price display for a plugin based on its license type
 * @param {Object} plugin - The plugin object containing price and license information
 * @returns {string} - Formatted price string ('Free' or 'Currency Amount')
 */
export const formatPluginPrice = (plugin) => {
    const isFree = plugin.licenseType === "free";

    if (isFree) {
        return 'Free';
    }

    if (plugin.priceCurrency && plugin.priceAmount) {
        return `${plugin.priceCurrency} ${plugin.priceAmount}`;
    }

    return '€ 0,-';
};
