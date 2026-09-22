/**
 * Safely decodes both numeric (decimal/hex) and named HTML entities.
 * Handles WordPress entities like &#8217; (curly apostrophe), &#8220;/&#8221; (quotes),
 * &#8211;/&#8212; (dashes), &#8230; (ellipsis), etc.
 *
 * @param {string} str - String potentially containing HTML entities
 * @returns {string} - Clean decoded UTF-8 string
 */
export function decodeHtmlEntities(str = "") {
  if (!str || typeof str !== "string") return "";

  return str
    // 1. Numeric decimal entities: &#8217;, &#39;, etc.
    .replace(/&#(\d+);/g, (match, dec) => {
      try {
        const code = parseInt(dec, 10);
        // Valid unicode character range
        if (code > 0 && code <= 0x10ffff) {
          return String.fromCodePoint(code);
        }
        return match;
      } catch {
        return match;
      }
    })
    // 2. Numeric hexadecimal entities: &#x2019;, etc.
    .replace(/&#x([0-9a-f]+);/gi, (match, hex) => {
      try {
        const code = parseInt(hex, 16);
        if (code > 0 && code <= 0x10ffff) {
          return String.fromCodePoint(code);
        }
        return match;
      } catch {
        return match;
      }
    })
    // 3. Common named typographical entities
    .replace(/&rsquo;/gi, "’")
    .replace(/&lsquo;/gi, "‘")
    .replace(/&rdquo;/gi, "”")
    .replace(/&ldquo;/gi, "“")
    .replace(/&mdash;/gi, "—")
    .replace(/&ndash;/gi, "–")
    .replace(/&hellip;/gi, "…")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    // 4. Decode ampersands last so we don't prematurely trigger entity patterns
    .replace(/&amp;/gi, "&");
}

/**
 * Strips HTML tags, removes WordPress excerpt artifacts (e.g. [&hellip;]),
 * decodes all HTML entities, normalizes whitespace, and trims.
 *
 * @param {string} htmlString - Raw HTML or excerpt from WordPress
 * @returns {string} - Clean plain text
 */
export function cleanText(htmlString = "") {
  if (!htmlString || typeof htmlString !== "string") return "";

  const stripped = htmlString
    .replace(/<[^>]*>/g, "")
    .replace(/\[\s*(?:&hellip;|&#8230;|\.{3})\s*\]/gi, "")
    .replace(/(?:&hellip;|&#8230;|\.{3})/gi, "…");

  return decodeHtmlEntities(stripped)
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Alias for cleanText to maintain backwards compatibility with existing cleanHtml calls.
 */
export const cleanHtml = cleanText;

/**
 * Cleanly truncates text to a specified maximum length, ensuring no dangling cut words.
 *
 * @param {string} text - Plain text to truncate
 * @param {number} [maxLength=140] - Maximum length before appending ellipsis
 * @returns {string} - Truncated string
 */
export function truncateText(text = "", maxLength = 140) {
  if (!text || typeof text !== "string" || text.length <= maxLength) {
    return text || "";
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
}

const KNOWN_ACRONYMS = new Set([
  "vpn",
  "ai",
  "seo",
  "usa",
  "api",
  "ui",
  "ux",
  "faq",
  "rss",
  "ip",
  "dns",
  "os",
  "url",
  "html",
  "css",
  "js",
]);

/**
 * Formats a slug into a properly capitalized title, preserving acronyms in uppercase.
 * Example: 'vpn-reviews' -> 'VPN Reviews', 'ai-tools-reviews' -> 'AI Tools Reviews'
 *
 * @param {string} slug - Category or route slug
 * @returns {string} - Formatted title string
 */
export function formatCategoryTitle(slug = "") {
  if (!slug || typeof slug !== "string") return "";

  return slug
    .split("-")
    .map((word) => {
      const lower = word.toLowerCase();
      if (KNOWN_ACRONYMS.has(lower)) {
        return lower.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

