export function normalizePlugins(rawResponse) {
  // Support the new response shape:
  // { error: null, success: true, data: { catalog: [...], locale: "...", uiI18n: {...} } }

  if (!rawResponse || !rawResponse.data || !Array.isArray(rawResponse.data.catalog)) {
    // Log a clear error when the response is not supported
    // Keeping a minimal, non-crashing fallback of returning an empty object
    console.error("Unsupported marketplace response shape. Expected { data: { catalog: [...] } }.", rawResponse);
    return { plugins: [], uiI18n: {}, locale: null };
  }

  const items = rawResponse.data.catalog;
  const uiI18n = rawResponse.data.uiI18n || {};
  const locale = rawResponse.data.locale || null;

  if (items.length === 0) return { plugins: [], uiI18n, locale };

  // Map to normalized structure
  const normalized = items.map((plugin) => {
    // Prefer description coming from i18n.description, then fallback to description field
    const descriptionFromTextKeys = plugin?.i18n?.description;
    const description =
      (typeof descriptionFromTextKeys === "string" && descriptionFromTextKeys)
        ? descriptionFromTextKeys
        : (typeof plugin?.description === "object" && plugin.description !== null
            ? (plugin.description["en-gb"] || Object.values(plugin.description)[0] || "")
            : (plugin?.description || "")
          );

    const download = plugin?.download || plugin?.download_url || plugin?.downloadUrl || "";

    // Author may be a string or an object { name, url }
    const authorName = typeof plugin?.author === "object" && plugin.author !== null
      ? (plugin.author.name || "")
      : (plugin?.author || "");
    const authorUrl = typeof plugin?.author === "object" && plugin.author !== null
      ? (plugin.author.url || "")
      : "";

    const priceAmount = typeof plugin?.price === "object" && plugin.price !== null
      ? plugin.price.amount
      : undefined;
    const priceCurrency = typeof plugin?.price === "object" && plugin.price !== null
      ? plugin.price.currency
      : undefined;

    return {
      ...plugin,
      name: plugin?.name || "Unknown",
      slug: plugin?.slug || "",
      thumbnail: plugin?.thumbnail || "",
      description,
      download,
      author: authorName,
      authorUrl,
      priceAmount,
      priceCurrency,
      installed: plugin?.installed ?? false,
      activated: plugin?.activated ?? false,
      i18n: plugin?.i18n || {},
    };
  });

  // Deduplicate by slug (first occurrence wins)
  const seen = new Set();
  const plugins = normalized.filter((p) => {
    const key = p.slug || p.name || JSON.stringify(p);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return { plugins, uiI18n, locale };
}
