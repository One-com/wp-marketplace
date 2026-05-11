// Formats a date using wp-admin's date_format string. Covers all 10 PHP date
// tokens that appear in date_format: Y y F M m n d j l D. Unrecognised chars
// pass through, so any custom format the admin sets renders faithfully.
// `\\` escapes the next character so admin's literals (e.g. `\Y`) survive.

export function formatDate(dateInput) {
    if (!dateInput) return '';
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    if (isNaN(date.getTime())) return '';

    const cfg = (typeof window !== 'undefined' && window.marketplaceConfig) || {};
    const format = cfg.dateFormat || 'F j, Y';
    const locale = (cfg.locale || '').replace('_', '-') || undefined;

    const name = (length, type) => {
        try {
            return new Intl.DateTimeFormat(locale, { [type]: length }).format(date);
        } catch {
            return '';
        }
    };

    const Y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();

    const tokens = {
        Y: String(Y),                      y: String(Y).slice(-2),
        F: () => name('long', 'month'),    M: () => name('short', 'month'),
        m: String(m).padStart(2, '0'),     n: String(m),
        d: String(d).padStart(2, '0'),     j: String(d),
        l: () => name('long', 'weekday'),  D: () => name('short', 'weekday'),
    };

    let out = '';
    for (let i = 0; i < format.length; i++) {
        const c = format[i];
        if (c === '\\' && i + 1 < format.length) {
            out += format[++i];
            continue;
        }
        const t = tokens[c];
        out += t ? (typeof t === 'function' ? t() : t) : c;
    }
    return out;
}
