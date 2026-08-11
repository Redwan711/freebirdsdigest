import { siteUrl } from "@/lib/site";

/**
 * Clean and decode attribute strings from HTML tags.
 * @param {string} str
 * @returns {string}
 */
function cleanAttr(str) {
  if (!str) return "";
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

/**
 * Extracts image objects ({ url, alt, title }) from an HTML content string.
 * @param {string} htmlContent
 * @returns {Array<{ url: string, alt: string, title: string }>}
 */
export function extractImagesFromContent(htmlContent) {
  if (!htmlContent || typeof htmlContent !== "string") return [];

  const images = [];
  const seenUrls = new Set();

  const imgRegex = /<img\s+([^>]+)>/gi;
  let match;

  while ((match = imgRegex.exec(htmlContent)) !== null) {
    const attrsStr = match[1];

    const srcMatch = attrsStr.match(/(?:src|data-src)=["']([^"']+)["']/i);
    let url = srcMatch && srcMatch[1] ? srcMatch[1].trim() : "";

    // If src is missing or a base64/SVG data URI placeholder, check srcset / data-srcset
    if (!url || url.startsWith("data:")) {
      const srcsetMatch = attrsStr.match(/(?:srcset|data-srcset)=["']([^"']+)["']/i);
      if (srcsetMatch && srcsetMatch[1]) {
        const candidate = srcsetMatch[1].split(",")[0].trim().split(/\s+/)[0];
        if (candidate && !candidate.startsWith("data:")) {
          url = candidate;
        }
      }
    }

    if (!url || url.startsWith("data:")) continue;

    if (url.startsWith("//")) {
      url = `https:${url}`;
    } else if (url.startsWith("/")) {
      url = `${siteUrl}${url}`;
    }

    if (seenUrls.has(url)) continue;
    seenUrls.add(url);

    const altMatch = attrsStr.match(/alt=["']([^"']*)["']/i);
    const titleMatch = attrsStr.match(/title=["']([^"']*)["']/i);

    const alt = cleanAttr(altMatch ? altMatch[1] : "");
    const title = cleanAttr(titleMatch ? titleMatch[1] : "");

    images.push({
      url,
      alt,
      title,
    });
  }

  return images;
}

/**
 * Returns structured ImageObject array for JSON-LD BlogPosting schema.
 * @param {Object} post
 * @returns {Array<Object>}
 */
export function getPostImageObjects(post) {
  if (!post) return [];

  const imageObjects = [];
  const seenUrls = new Set();

  function addImage(url, caption = "", name = "") {
    if (!url || typeof url !== "string" || seenUrls.has(url)) return;
    seenUrls.add(url);

    const obj = {
      "@type": "ImageObject",
      url: url,
    };
    if (caption) obj.caption = caption;
    if (name) obj.name = name;

    imageObjects.push(obj);
  }

  // 1. Featured Image
  const featuredUrl = post.featuredImage?.node?.sourceUrl;
  const featuredAlt = post.featuredImage?.node?.altText || post.title || "";
  if (featuredUrl) {
    addImage(featuredUrl, featuredAlt, post.title);
  }

  // 2. Secondary Metadata Image (if present in custom fields)
  const secndUrl = post.articleMetadata?.secndImage?.node?.sourceUrl;
  const secndAlt = post.articleMetadata?.secndImage?.node?.altText || "";
  if (secndUrl) {
    addImage(secndUrl, secndAlt);
  }

  // 3. Inline images from HTML content
  if (post.content) {
    const inlineImages = extractImagesFromContent(post.content);
    for (const img of inlineImages) {
      addImage(img.url, img.alt, img.title);
    }
  }

  return imageObjects;
}
