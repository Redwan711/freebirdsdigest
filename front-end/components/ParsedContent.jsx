"use client";

/**
 * Checks if an <img> tag at imgIndex in the HTML string is nested inside a container element 
 * with class containing 'not-prose'.
 */
const isInsideNotProse = (html, imgIndex) => {
  const notProseRegex = /<([a-z0-9]+)\b[^>]*\bclass\s*=\s*["'][^"']*\bnot-prose\b[^"']*["'][^>]*>/gi;
  let match;

  while ((match = notProseRegex.exec(html)) !== null) {
    const openTagIndex = match.index;
    if (openTagIndex > imgIndex) break;

    const tagName = match[1].toLowerCase();
    const htmlBetween = html.substring(openTagIndex, imgIndex);

    const openTagCount = (htmlBetween.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) || []).length;
    const closeTagCount = (htmlBetween.match(new RegExp(`</${tagName}\\s*>`, "gi")) || []).length;

    if (openTagCount > closeTagCount) {
      return true;
    }
  }

  return false;
};

/**
 * Normalizes HTML entities without destructively replacing valid punctuation like em-dashes.
 */
export function replaceEmDashes(html) {
  if (!html) return "";
  return html;
}

/**
 * Process HTML string by transforming editorial <img> tags to styled responsive image elements,
 * while leaving <img> tags inside .not-prose containers, tables, or custom styled images untouched.
 */
export function processArticleHtml(html) {
  if (!html) return "";

  const cleanHtml = html;
  const imgRegex = /<img\s+([^>]*)\/?>/gi;
  let result = "";
  let lastIndex = 0;
  let match;

  while ((match = imgRegex.exec(cleanHtml)) !== null) {
    const imgIndex = match.index;
    const fullImgTag = match[0];

    // Append everything before this <img> tag
    result += cleanHtml.substring(lastIndex, imgIndex);

    const attrString = match[1];
    const getAttr = (name) => {
      const attrRegex = new RegExp(
        `${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
        "i"
      );
      const attrMatch = attrString.match(attrRegex);
      return attrMatch ? attrMatch[1] || attrMatch[2] || attrMatch[3] : null;
    };

    const hasCustomClass = getAttr("class") || getAttr("className") || "";
    const hasInlineStyle = getAttr("style");

    if (isInsideNotProse(cleanHtml, imgIndex) || hasCustomClass.includes("not-prose") || hasInlineStyle) {
      // Keep original <img> inside .not-prose containers or with custom inline styles untouched
      result += fullImgTag;
    } else {
      const src = getAttr("src");
      const alt = getAttr("alt") || "";
      const width = getAttr("width") || "1200";
      const height = getAttr("height") || "675";

      if (src) {
        const styledImg = `<img src="${src}" alt="${alt}" width="${width}" height="${height}" loading="lazy" class="block w-full h-auto object-cover rounded-3xl border border-brandborder/60 shadow-sm ${hasCustomClass}" style="width: 100%; height: auto;" />`;
        result += styledImg;
      } else {
        result += fullImgTag;
      }
    }

    lastIndex = imgRegex.lastIndex;
  }

  result += cleanHtml.substring(lastIndex);
  return result;
}

/**
 * Safely auto-links specified affiliate keywords (e.g. NordVPN) in ANY HTML content,
 * including WordPress standard blocks, Classic editor, and Custom HTML widgets (divs, spans, lists, etc).
 * 
 * Safety Rules:
 * - Replaces keyword in visible plain text nodes (inside p, div, span, li, td, etc).
 * - Skips anything inside forbidden blocks: <a>, <h1>-<h6>, <script>, <style>, <button>, <pre>, <code>.
 * - Never modifies HTML tag names or tag attributes (e.g. alt, title, src, href, class).
 * - Caps auto-links at maxOccurrences (default: 5) to maintain SEO health and reader experience.
 */
export function injectAffiliateLinks(html, maxOccurrences = 5) {
  if (!html || typeof html !== "string") return html || "";

  // Quick check: if keyword isn't present, return unmodified
  if (!/NordVPN|Nord\s+VPN/i.test(html)) return html;

  let replacementsCount = 0;

  // Pattern matches either:
  // 1. Forbidden elements (<a>...</a>, <h1..6>...</h1..6>, <script>...</script>, <style>...</style>, <button>...</button>, <pre>...</pre>, <code>...</code>)
  // 2. HTML comments (<!-- ... -->)
  // 3. Any single HTML opening/closing/self-closing tag (<...>)
  // 4. Any plain text chunk outside tags ([^<]+)
  const pattern = /(<!--[\s\S]*?-->|<(a|h[1-6]|script|style|button|pre|code)\b[^>]*>[\s\S]*?<\/\2>|<[^>]+>)|([^<]+)/gi;

  return html.replace(pattern, (match, tagOrForbiddenBlock, _tagName, textNode) => {
    // If it's a tag, comment, or forbidden element, return it as-is
    if (tagOrForbiddenBlock) {
      return tagOrForbiddenBlock;
    }

    // If it's a plain text node:
    if (textNode) {
      if (replacementsCount >= maxOccurrences) {
        return textNode;
      }

      return textNode.replace(/\b(NordVPN|Nord\s+VPN)\b/gi, (word) => {
        if (replacementsCount < maxOccurrences) {
          replacementsCount++;
          return `<a href="/go/nordvpn" target="_blank" rel="nofollow sponsored noopener noreferrer" class="text-brand font-semibold hover:underline">${word}</a>`;
        }
        return word;
      });
    }

    return match;
  });
}

export default function ParsedContent({ html }) {
  if (!html) return null;
  const processedHtml = injectAffiliateLinks(processArticleHtml(html));

  return (
    <div
      className="parsed-article-content"
      dangerouslySetInnerHTML={{ __html: processedHtml }}
      suppressHydrationWarning
    />
  );
}
