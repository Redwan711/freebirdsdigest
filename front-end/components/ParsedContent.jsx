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
 * Replaces em-dashes and en-dashes (—, &mdash;, &#8212;, –, &ndash;, &#8211;) with a comma and space (", ").
 */
export function replaceEmDashes(html) {
  if (!html) return "";
  return html.replace(/\s*(?:&mdash;|&#8212;|—|&ndash;|&#8211;|–)\s*/gi, ", ");
}

/**
 * Process HTML string by transforming editorial <img> tags to styled responsive image elements,
 * while leaving <img> tags inside .not-prose containers untouched.
 */
export function processArticleHtml(html) {
  if (!html) return "";

  const cleanHtml = replaceEmDashes(html);
  const imgRegex = /<img\s+([^>]*)\/?>/gi;
  let result = "";
  let lastIndex = 0;
  let match;

  while ((match = imgRegex.exec(cleanHtml)) !== null) {
    const imgIndex = match.index;
    const fullImgTag = match[0];

    // Append everything before this <img> tag
    result += cleanHtml.substring(lastIndex, imgIndex);

    if (isInsideNotProse(cleanHtml, imgIndex)) {
      // Keep original <img> inside .not-prose containers untouched
      result += fullImgTag;
    } else {
      const attrString = match[1];

      const getAttr = (name) => {
        const attrRegex = new RegExp(
          `${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
          "i"
        );
        const attrMatch = attrString.match(attrRegex);
        return attrMatch ? attrMatch[1] || attrMatch[2] || attrMatch[3] : null;
      };

      const src = getAttr("src");
      const alt = getAttr("alt") || "";
      const width = getAttr("width") || "1200";
      const height = getAttr("height") || "675";
      const className = getAttr("class") || getAttr("className") || "";

      if (src) {
        const styledImg = `<img src="${src}" alt="${alt}" width="${width}" height="${height}" loading="lazy" class="block w-full h-auto object-cover rounded-3xl border border-brandborder/60 shadow-sm ${className}" style="width: 100%; height: auto;" />`;
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

export default function ParsedContent({ html }) {
  if (!html) return null;
  const processedHtml = processArticleHtml(html);

  return (
    <div
      className="parsed-article-content"
      dangerouslySetInnerHTML={{ __html: processedHtml }}
      suppressHydrationWarning
    />
  );
}
