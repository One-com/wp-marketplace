import { trackButtonClick } from "./mixpanelTracking";
import { getAjaxAction } from "./common.utils";

/**
 * Handles the activation of plugins whose activation hook issues a redirect
 * (or otherwise terminates PHP without returning a JSON response).
 *
 * Dispatched from `handlePluginAction` when the catalog flags the plugin
 * with `redirectsOnActivate: true`. The flow is:
 *   1. Fire-and-forget the activation request (swallow the inevitable error).
 *   2. Poll the `active/{slug}` endpoint to confirm the activation landed.
 *   3. On confirmation, surface the success notice and trigger a controlled
 *      reload so the marketplace reflects the now-installed plugin.
 *
 * Set `plugin.redirectsOnActivate = true` in the marketplace catalog API
 * response for any plugin known to redirect on activation.
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
        // Initiate the activation request (don't wait for response — the plugin will
        // redirect and the fetch will reject as a network error, but PHP-side activation
        // has already started.)
        try {
            await fetch(url, { method: "POST" });
        } catch (err) {
            // Redirecting plugins return 302 which fetch rejects as a network error.
            // The request still reaches the server, so swallow the error and let polling
            // confirm activation.
        }

        // Poll for activation status
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

        // Start checking
        setTimeout(checkActivation, 1000);
    }, 100);
};
