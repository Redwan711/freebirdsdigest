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

import { replaceEmDashes } from "@/lib/text-utils";

export { replaceEmDashes };

/**
 * Process HTML string by transforming editorial <img> tags to styled responsive image elements,
 * while leaving <img> tags inside .not-prose containers, tables, or custom styled images untouched.
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

const AFFILIATE_CONFIGS = [
  {
    name: "NordVPN",
    testRegex: /NordVPN|Nord\s+VPN/i,
    matchRegex: /\b(NordVPN|Nord\s+VPN)\b/gi,
    url: "/go/nordvpn",
    maxOccurrences: 5,
  },
  {
    name: "PrivadoVPN",
    testRegex: /PrivadoVPN|Privado\s+VPN/i,
    matchRegex: /\b(PrivadoVPN|Privado\s+VPN)\b/gi,
    url: "/go/privadovpn",
    maxOccurrences: 5,
  },
];

/**
 * Distributes affiliate links evenly across plain-text nodes in an HTML string.
 */
function distributeSingleAffiliateLink(html, config) {
  const { testRegex, matchRegex, url, maxOccurrences = 5 } = config;
  if (!html || typeof html !== "string") return html || "";
  if (!testRegex.test(html)) return html;

  // Pattern matches:
  // 1. Forbidden elements (<a>...</a>, <h1..6>...</h1..6>, <script>, <style>, <button>, <pre>, <code>)
  // 2. HTML comments
  // 3. Any HTML tag
  // 4. Any plain-text chunk outside tags
  const pattern = /(<!--[\s\S]*?-->|<(a|h[1-6]|script|style|button|pre|code)\b[^>]*>[\s\S]*?<\/\2>|<[^>]+>)|([^<]+)/gi;

  let totalMatches = 0;
  let match;
  while ((match = pattern.exec(html)) !== null) {
    const textNode = match[3];
    if (textNode) {
      const keywordOccurrences = textNode.match(matchRegex);
      if (keywordOccurrences) {
        totalMatches += keywordOccurrences.length;
      }
    }
  }

  if (totalMatches === 0) return html;

  const selectedIndices = new Set();
  const countToLink = Math.min(totalMatches, maxOccurrences);

  if (countToLink === 1) {
    selectedIndices.add(0);
  } else {
    for (let i = 0; i < countToLink; i++) {
      const targetIndex = Math.round((i * (totalMatches - 1)) / (countToLink - 1));
      selectedIndices.add(targetIndex);
    }
  }

  let currentIndex = 0;
  return html.replace(pattern, (fullMatch, tagOrForbidden, _tag, textNode) => {
    if (tagOrForbidden || !textNode) {
      return fullMatch;
    }

    return textNode.replace(matchRegex, (word) => {
      const isTarget = selectedIndices.has(currentIndex);
      currentIndex++;

      if (isTarget) {
        return `<a href="${url}" target="_blank" rel="nofollow sponsored noopener noreferrer" class="text-brand font-semibold hover:underline">${word}</a>`;
      }
      return word;
    });
  });
}

/**
 * Safely auto-links specified affiliate keywords (NordVPN, PrivadoVPN) in ANY HTML content,
 * distributing links evenly (top, middle, bottom) and skipping headers, links, and code blocks.
 */
export function injectAffiliateLinks(html) {
  if (!html || typeof html !== "string") return html || "";
  let processed = html;
  for (const config of AFFILIATE_CONFIGS) {
    processed = distributeSingleAffiliateLink(processed, config);
  }
  return processed;
}

/**
 * Normalizes WordPress HTML markup so dark mode / light mode theming works seamlessly.
 * Strips hardcoded bgcolor attributes and inline white/near-white backgrounds from WordPress blocks.
 */
export function normalizeTableHtml(html) {
  if (!html || typeof html !== "string") return html || "";

  // 1. Remove hardcoded bgcolor attributes
  let cleanHtml = html.replace(/\s+bgcolor\s*=\s*["'][^"']*["']/gi, "");

  // 2. Remove inline white / near-white backgrounds from style attributes
  cleanHtml = cleanHtml.replace(/style\s*=\s*(["'])([\s\S]*?)\1/gi, (fullMatch, quote, styleContent) => {
    const cleanedStyle = styleContent
      .replace(/background(?:-color)?\s*:\s*(?:#fff(?:fff)?|#f8fafc|#f1f5f9|#ffffff|white|rgb\(\s*255\s*,\s*255\s*,\s*255\s*\)|rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*1(?:\.0+)?\s*\))\s*;?/gi, "")
      .replace(/border(?:-color)?\s*:\s*[^;]*(?:#e[0-9a-f]{5}|#d[0-9a-f]{5})[^;]*;?/gi, "")
      .trim();

    if (!cleanedStyle) {
      return "";
    }
    return `style=${quote}${cleanedStyle}${quote}`;
  });

  // 3. Strip hardcoded Tailwind background classes (bg-white, bg-gray-*, dark:bg-*)
  //    These don't work with data-theme based dark mode and override CSS variable theming
  cleanHtml = cleanHtml.replace(/class\s*=\s*(["'])([\s\S]*?)\1/gi, (fullMatch, quote, classContent) => {
    const cleanedClass = classContent
      .replace(/\b(?:dark:)?bg-(?:white|gray-\d{2,3})\b/g, "")
      .replace(/\b(?:dark:)?text-(?:black|white|gray-\d{2,3})\b/g, "")
      .replace(/\b(?:dark:)?border-(?:gray-\d{2,3})\b/g, "")
      .replace(/\b(?:dark:)?hover:bg-(?:gray-\d{2,3}(?:\/\d+)?)\b/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
    return `class=${quote}${cleanedClass}${quote}`;
  });

  return cleanHtml;
}

export default function ParsedContent({ html }) {
  if (!html) return null;
  const processedHtml = injectAffiliateLinks(processArticleHtml(normalizeTableHtml(html)));

  return (
    <div
      className="parsed-article-content"
      dangerouslySetInnerHTML={{ __html: processedHtml }}
      suppressHydrationWarning
    />
  );
}
