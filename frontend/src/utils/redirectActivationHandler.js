import { trackButtonClick } from "./mixpanelTracking";
import { getAjaxAction } from "./common.utils";

/**
 * Plugins known to redirect (or otherwise not return JSON) from their activation
 * request. The marketplace catalog is the preferred source of truth via
 * `redirectsOnActivate: true`, but the API does not flag every such plugin, so
 * these slugs keep the polling flow working without an API change.
 */
export const KNOWN_REDIRECT_ON_ACTIVATE_SLUGS = ['imagify'];

/**
 * Whether an activation request for this plugin should be confirmed by polling
 * instead of by reading the activation response body.
 */
export const isRedirectOnActivate = (plugin) =>
    plugin?.redirectsOnActivate === true ||
    KNOWN_REDIRECT_ON_ACTIVATE_SLUGS.includes(plugin?.slug);

/**
 * Confirms an activation that has already been requested by polling the
 * `active/{slug}` endpoint, then surfaces the success notice and reloads.
 *
 * Split from `handleRedirectActivation` so the normal activation flow can hand
 * off to it after the fact, when the activation response turns out not to be
 * JSON (see `handlePluginAction`). It never re-sends the activation request.
 */
export const confirmActivationByPolling = ({
    plugin,
    apiBaseUrl,
    source,
    setLoadingAction,
    setLoadingPlugin,
    setPluginInAction,
    setSuccessState,
    setErrorState,
    reloadTimeoutRef,
}) => {
    const action = 'activate';
    let attempts = 0;
    const maxAttempts = 6;

    const checkActivation = async () => {
        try {
            const checkUrl = `${apiBaseUrl}active/${plugin.slug}`;
            const response = await fetch(checkUrl);
            const data = await response.json();

            if (data && data.activated) {
                // Track successful redirect-based activation
                trackButtonClick({
                    buttonName: 'Activate',
                    buttonAction: 'product_activate',
                    plugin: plugin,
                    context: {
                        action: action,
                        result: 'success',
                        special_case: 'redirect_activation',
                    }
                });

                if (source === 'product_detail') {
                    // Set flag to skip page view tracking on reload
                    sessionStorage.setItem('mp_skip_page_view', 'true');
                    sessionStorage.setItem('mp_success_notice', JSON.stringify({
                        visible: true,
                        type: 'activated',
                        pluginSlug: plugin.slug,
                        successType: 'activate'
                    }));

                    // Schedule reload
                    reloadTimeoutRef.current = setTimeout(() => {
                        window.location.reload();
                    }, 500);
                } else {
                    // Old flow for addons page
                    setSuccessState({ visible: true, type: 'activate', pluginSlug: plugin.slug });

                    // Schedule reload after a while
                    reloadTimeoutRef.current = setTimeout(() => {
                        sessionStorage.setItem('mp_skip_page_view', 'true');
                        window.location.reload();
                    }, 3000);

                    // Clear loading state only
                    setLoadingAction('');
                    setLoadingPlugin('');
                }
                return;
            }
        } catch (e) {
            console.error("Error checking activation status", e);
        }

        attempts++;
        if (attempts < maxAttempts) {
            setTimeout(checkActivation, 1000);
        } else {
            // If we reached max attempts and still not activated, show error
            setErrorState({ visible: true, type: 'activate', pluginSlug: plugin.slug });

            // Track activation error
            trackButtonClick({
                buttonName: 'Activate',
                buttonAction: 'product_activate',
                plugin: plugin,
                context: {
                    action: action,
                    result: 'error',
                    error_message: 'Redirect-based activation timeout after polling',
                }
            });

            // Clear loading state
            setLoadingAction('');
            setLoadingPlugin('');
            setPluginInAction(prev => ({ ...prev, [plugin.slug]: false }));
        }
    };

    // Give PHP a moment to finish activating before the first check.
    setTimeout(checkActivation, 1000);
};

/**
 * Handles the activation of plugins whose activation request does not return a
 * parseable JSON response — typically because the plugin issues a wp_redirect
 * from its activation path, so the browser transparently follows the 302 and
 * the body we receive is the HTML of the redirect target.
 *
 * Dispatched from `handlePluginAction` when `isRedirectOnActivate` matches. The
 * flow is:
 *   1. Fire-and-forget the activation request (ignore whatever body comes back).
 *   2. Poll the `active/{slug}` endpoint to confirm the activation landed.
 *   3. On confirmation, surface the success notice and trigger a controlled
 *      reload so the marketplace reflects the now-active plugin.
 *
 * Set `plugin.redirectsOnActivate = true` in the marketplace catalog API
 * response for any plugin known to redirect on activation, or add its slug to
 * `KNOWN_REDIRECT_ON_ACTIVATE_SLUGS`.
 */
export const handleRedirectActivation = async ({
    plugin,
    apiBaseUrl,
    useWPHandlers,
    wpConfig,
    source,
    uiI18n,
    setLoadingAction,
    setLoadingPlugin,
    setPluginInAction,
    setSuccessState,
    setErrorState,
    reloadTimeoutRef,
}) => {
    // Build URL for activation
    const action = 'activate';
    let url = `${apiBaseUrl}${action}/${plugin.slug}`;
    const downloadParam = `download_url=${encodeURIComponent(plugin.download || '')}`;

    if (useWPHandlers) {
        url = `${wpConfig.ajaxUrl}?action=${getAjaxAction(`${action}_plugin`)}&_wpnonce=${wpConfig.nonce}&nonce=${wpConfig.nonce}&slug=${plugin.slug}&${downloadParam}`;
    } else {
        url = url + (url.includes('?') ? '&' : '?') + downloadParam;
    }

    // Allow React to render loading overlay, then execute redirect-aware flow
    setTimeout(async () => {
        // Initiate the activation request without inspecting the response: the
        // plugin redirects, so the body is HTML rather than our JSON payload.
        // Polling below is what tells us whether activation actually landed.
        try {
            await fetch(url, { method: "POST" });
        } catch (err) {
            // A transport-level failure here is not conclusive either — the
            // request may still have reached PHP. Let polling decide.
        }

        confirmActivationByPolling({
            plugin,
            apiBaseUrl,
            source,
            setLoadingAction,
            setLoadingPlugin,
            setPluginInAction,
            setSuccessState,
            setErrorState,
            reloadTimeoutRef,
        });
    }, 100);
};
