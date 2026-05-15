import { trackButtonClick } from "./mixpanelTracking";
import { getAjaxAction } from "./common.utils";

/**
 * Handles the special case of Imagify plugin activation which involves a 302 redirect.
 */
export const handleImagifyActivation = async ({
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

    // Allow React to render loading overlay, then execute Imagify flow
    setTimeout(async () => {
        // Initiate the activation request (don't wait for response due to 302 redirect)
        try {
            await fetch(url, { method: "POST" });
        } catch (err) {
            console.log("Imagify activation request initiated");
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
                    // Track successful Imagify activation
                    trackButtonClick({
                        buttonName: 'Activate',
                        buttonAction: 'product_activate',
                        plugin: plugin,
                        context: {
                            action: action,
                            result: 'success',
                            special_case: 'imagify_redirect',
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
                        error_message: 'Imagify activation timeout after polling',
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
