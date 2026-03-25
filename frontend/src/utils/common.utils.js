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

export const getLatestSubscription = (subscriptions) => {
  if (!subscriptions?.length) return null;

  return subscriptions.reduce((latest, current) => {
    return new Date(current.expiresAt) > new Date(latest.expiresAt)
      ? current
      : latest;
  });
};

