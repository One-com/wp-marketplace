export function normalizePlugins(rawResponse) {
  // Only support the new response shape:
  // { error: null, success: true, data: [ { ...plugin }, ... ] }

  if (!rawResponse || !Array.isArray(rawResponse.data)) {
    // Log a clear error when the response is not supported
    // Keeping a minimal, non-crashing fallback of returning an empty list
    console.error("Unsupported marketplace response shape. Expected { data: [ ... ] }.", rawResponse);
    return [];
  }

  const items = rawResponse.data;

  if (items.length === 0) return [];

  // Map to normalized structure
  const normalized = items.map((plugin) => {
    // Prefer description coming from textKeys.description, then fallback to description field
    const descriptionFromTextKeys = plugin?.textKeys?.description;
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
    };
  });

  // Deduplicate by slug (first occurrence wins)
  const seen = new Set();
  return normalized.filter((p) => {
    const key = p.slug || p.name || JSON.stringify(p);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}