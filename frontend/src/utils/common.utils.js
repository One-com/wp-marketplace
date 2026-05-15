export const formatMessage = (message, find, replaceWith) => {
  if (!message) return '';
  return message.replace(find, replaceWith || '');
};

export const replacePercentWrapper = (input, firstReplacement, secondReplacement) => {
  return input.replace(/%([^%]+)%/g, (_, innerText) => {
    return `${firstReplacement}${innerText}${secondReplacement}`;
  });
};

export const HtmlRenderer = ({ htmlString }) => {
  return (
    <span dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};

/**
 * Get the brand-specific AJAX action name.
 * Uses the prefix from wpConfig to avoid collisions when multiple plugins
 * embed the marketplace module.
 *
 * @param {string} action - Base action name without prefix, e.g. 'subscribe', 'track_status'
 * @returns {string} e.g. 'onecom_marketplace_subscribe'
 */
export const getAjaxAction = (action) => {
  const prefix = window.marketplaceConfig?.wpConfig?.ajaxActionPrefix || 'marketplace';
  return `${prefix}_${action}`;
};

export const getLatestSubscription = (subscriptions) => {
  if (!subscriptions?.length) return null;

  return subscriptions.reduce((latest, current) => {
    return new Date(current.expiresAt) > new Date(latest.expiresAt)
      ? current
      : latest;
  });
};

