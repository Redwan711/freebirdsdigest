import { cleanText } from "./text-utils";

/**
 * Sanitizes a post object by cleaning its title and excerpt (decoding entities, removing HTML, filtering em-dashes).
 *
 * @param {Object} post - WordPress post object
 * @returns {Object} - Post object with clean title & excerpt
 */
export function sanitizePost(post) {
  if (!post || typeof post !== "object") return post;
  return {
    ...post,
    ...(post.title && typeof post.title === "string" ? { title: cleanText(post.title) } : {}),
    ...(post.excerpt && typeof post.excerpt === "string" ? { excerpt: cleanText(post.excerpt) } : {}),
  };
}

/**
 * Utility to identify and filter out posts belonging to the 'hide' category.
 * If a post is assigned to the 'hide' category in WordPress, it is completely hidden across the site.
 */
export function isPostHidden(post) {
  if (!post) return false;

  const categoryNodes =
    post.categories?.nodes ||
    (Array.isArray(post.categories) ? post.categories : []);

  return categoryNodes.some((c) => {
    const slug = (c?.slug || "").toLowerCase().trim();
    const name = (c?.name || "").toLowerCase().trim();
    return slug === "hide" || name === "hide";
  });
}

export function filterVisiblePosts(posts = []) {
  if (!Array.isArray(posts)) return [];
  return posts
    .filter((post) => !isPostHidden(post))
    .map(sanitizePost);
}
