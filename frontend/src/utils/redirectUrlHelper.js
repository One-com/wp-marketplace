/**
 * Get the redirect URL for a plugin based on its configuration and state.
 *
 * @param {Object} plugin The plugin object from API.
 * @param {boolean} forceOnboarding Whether to prioritize onboardingUrl for all plugins (default: false).
 * @returns {string} The resolved redirect path.
 */
export const getPluginRedirectUrl = (plugin, forceOnboarding = false) => {
    let redirectUrl = plugin.redirectUrl;

    const isRankMath = plugin.slug === 'seo-by-rank-math' || plugin.slug === 'seo-by-rank-math-pro';
    const hasOnboardingUrl = plugin.onboardingUrl && typeof plugin.onboardingUrl === 'string' && plugin.onboardingUrl.trim() !== '';

    if (isRankMath) {
        // Safe access to rankMathRegistrationSkip config
        const wpConfig = window.marketplaceConfig?.wpConfig;
        const rankMathRegistrationSkip = wpConfig ? wpConfig.rankMathRegistrationSkip === true : false;

        if (!rankMathRegistrationSkip && hasOnboardingUrl) {
            redirectUrl = plugin.onboardingUrl;
        }
    } else if (forceOnboarding && hasOnboardingUrl) {
        redirectUrl = plugin.onboardingUrl;
    }

    return redirectUrl;
};

/**
 * Navigates to the plugin's page in WordPress admin.
 *
 * @param {string} redirectPath The relative path to redirect to.
 */
export const navigateToPluginUrl = (redirectPath) => {
    if (redirectPath && redirectPath.trim() !== '') {
        // Get the admin URL from config (provided by PHP)
        const adminUrl = typeof window.marketplaceConfig !== "undefined" && window.marketplaceConfig?.wpConfig?.adminUrl;

        if (adminUrl) {
            // Construct full URL using adminUrl from PHP config
            // adminUrl is like "https://example.com/wp-admin/"
            // redirectUrl comes as "wp-admin\/admin.php?page=termly" (JSON unescapes \/ to /)
            // Strip "wp-admin/" prefix from redirectUrl if present to avoid duplication
            let cleanPath = redirectPath;
            if (cleanPath.startsWith('wp-admin/')) {
                cleanPath = cleanPath.substring('wp-admin/'.length);
            }
            const fullUrl = `${adminUrl}${cleanPath}`;
            window.location.href = fullUrl;
        } else {
            // Fallback: use window.location.origin if adminUrl not available
            const siteUrl = window.location.origin;
            const fullUrl = `${siteUrl}/${redirectPath}`;
            window.location.href = fullUrl;
        }
        return;
    }

    // Fallback to plugins page
    window.location.href = '/wp-admin/plugins.php';
};
