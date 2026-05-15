/**
 * Generic WP AJAX polling utility.
 *
 * Sends repeated POST requests to admin-ajax.php on an interval.
 * The caller supplies `onResult` to inspect each response and return `true`
 * to stop polling, or `false` to keep going.
 *
 * @param {Object}   options
 * @param {string}   options.ajaxUrl          WordPress admin-ajax.php URL.
 * @param {string}   options.nonce            WordPress nonce.
 * @param {string}   options.action           WP AJAX action name (e.g. 'marketplace_track_status').
 * @param {Object}   options.params           Additional POST params merged alongside action + nonce.
 * @param {number}   [options.interval=10000] Polling interval in milliseconds.
 * @param {Function} options.onResult         Called with the parsed JSON result each tick.
 *                                            May be async. Return true to stop polling.
 * @param {Function} [options.onError]        Called with any fetch/parse error. Polling continues.
 *
 * @returns {Function} stop — call to cancel polling immediately.
 */
export function startPolling({ ajaxUrl, nonce, action, params = {}, interval = 10000, onResult, onError }) {
    let stopped = false;

    const tick = async () => {
        if (stopped) return;

        try {
            const formData = new URLSearchParams({
                action,
                nonce,
                ...params,
            });

            const response = await fetch(ajaxUrl, { method: 'POST', body: formData });
            const result = await response.json();

            if (stopped) return;

            const shouldStop = await Promise.resolve(onResult(result));
            if (shouldStop) {
                stopped = true;
                clearInterval(intervalId); // eslint-disable-line no-use-before-define
            }
        } catch (error) {
            if (onError) onError(error);
        }
    };

    const intervalId = setInterval(tick, interval);

    return () => {
        stopped = true;
        clearInterval(intervalId);
    };
}
