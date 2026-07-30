import React, { useState } from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import { getAjaxAction } from "../utils/common.utils";
import { trackButtonClick } from "../utils/mixpanelTracking";

/**
 * Small, prominent single-sign-on link for a subscribed product (e.g. SocialPilot).
 *
 * Click -> POST to the marketplace track-status endpoint with type=get_sso_url for this
 * subscription -> the backend returns a fresh { ssoUrl } -> we open it in a NEW TAB.
 *
 * Callers own the gating (SSO-capable slug + an active/valid subscription) and pass a
 * fully-resolved iconUrl, since the icon base path differs between call sites.
 *
 * @param {object}  props
 * @param {string}  props.subscriptionId  Subscription the SSO session is for (required).
 * @param {string}  props.iconUrl         Resolved URL to the open_in_new icon.
 * @param {object}  [props.plugin]        Plugin object (for analytics context).
 * @param {string}  [props.className]     Extra classes (e.g. spacing "gv-mt-sm").
 */
const SsoLoginLink = ({ subscriptionId, iconUrl, plugin = null, className = "" }) => {
  const { wpConfig, setErrorState, uiI18n } = useMarketplace();
  const [loading, setLoading] = useState(false);

  const label = uiI18n?.labels?.ssoLogin || "Log in";

  const handleSso = async (e) => {
    if (e) e.preventDefault();
    if (loading || !subscriptionId || !wpConfig?.ajaxUrl) return;

    setLoading(true);
    trackButtonClick({
      buttonName: "SSO login",
      buttonAction: "get_sso_url",
      plugin,
      context: { product_slug: plugin?.slug, subscription_id: subscriptionId },
    });

    try {
      const response = await fetch(wpConfig.ajaxUrl, {
        method: "POST",
        body: new URLSearchParams({
          action: getAjaxAction("track_status"),
          nonce: wpConfig.nonce,
          type: "get_sso_url",
          subscriptionId,
        }),
      });
      const result = await response.json();
      const ssoUrl = result?.data?.ssoUrl;

      if (result?.success && ssoUrl) {
        // Open the SSO session in a new tab; noopener to keep the opener isolated.
        window.open(ssoUrl, "_blank", "noopener");
      } else {
        setErrorState({
          visible: true,
          type: "sso_login",
          pluginSlug: plugin?.slug || null,
          message: result?.data?.message || result?.error || null,
        });
      }
    } catch (err) {
      console.error("SSO login failed:", err);
      setErrorState({
        visible: true,
        type: "sso_login",
        pluginSlug: plugin?.slug || null,
        message: err?.message || null,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={`gv-button gv-button-secondary gv-button-sm sso-login-link ${className}`.trim()}
      onClick={handleSso}
      disabled={loading}
    >
      <span>{loading ? (uiI18n?.labels?.loading || "Loading…") : label}</span>
      {!loading && iconUrl && <gv-icon aria-hidden="true" src={iconUrl}></gv-icon>}
    </button>
  );
};

export default SsoLoginLink;
