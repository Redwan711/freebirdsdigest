import authors from "@/data/authors.json";

/**
 * Get all 5 author profiles from JSON
 */
export function getAllAuthors() {
  return authors || [];
}

/**
 * Find an author by slug or nickname or ID
 */
export function getAuthorBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = String(slug).toLowerCase().trim();
  return (
    authors.find(
      (a) =>
        a.slug.toLowerCase() === cleanSlug ||
        a.nickname.toLowerCase() === cleanSlug ||
        a.id === cleanSlug
    ) || null
  );
}

/**
 * Find an author by nickname, slug, or name (case-insensitive string comparison)
 */
export function getAuthorByNickname(nicknameOrName) {
  if (!nicknameOrName) return null;

  const target = String(nicknameOrName).toLowerCase().trim().replace(/\s+/g, "");

  return (
    authors.find((a) => {
      const nick = a.nickname.toLowerCase().trim().replace(/\s+/g, "");
      const slug = a.slug.toLowerCase().trim().replace(/\s+/g, "");
      const name = a.name.toLowerCase().trim().replace(/\s+/g, "");
      return nick === target || slug === target || name === target;
    }) || null
  );
}

/**
 * Sync post author node with authors.json with fallbacks & error handling.
 *
 * @param {Object} postAuthorNode - WordPress GraphQL author node (name, nickname, slug, username, avatar)
 * @param {String} customArticleSubtitle - Optional ACF authorSubtitle from post metadata
 */
export function syncPostAuthor(postAuthorNode, customArticleSubtitle = "") {
  const defaultFallback = {
    name: "Freebirds Editorial Team",
    avatar: null,
    isDefaultIcon: true,
    role: customArticleSubtitle || "Editorial Team at Freebirds Digest",
    bio: "Covering digital nomad workflows, freelancing career growth, remote business tools, and work-from-home strategies.",
    description:
      "The Freebirds Editorial Team brings together industry experts, remote work analysts, and digital nomad contributors to deliver curated insights.",
    socials: { twitter: "", linkedin: "", github: "", website: "" },
    topics: ["Remote Work", "Digital Nomad", "Freelancing"],
    location: "Global Distributed Team",
    slug: null,
    isSynced: false,
  };

  if (!postAuthorNode) {
    return defaultFallback;
  }

  const rawName = postAuthorNode.name || "";
  const rawNickname = postAuthorNode.nickname || "";
  const rawSlug = postAuthorNode.slug || "";
  const rawUsername = postAuthorNode.username || "";

  // Try matching by nickname, slug, username, or full name against authors.json
  const matchedAuthor =
    getAuthorByNickname(rawNickname) ||
    getAuthorByNickname(rawSlug) ||
    getAuthorByNickname(rawUsername) ||
    getAuthorByNickname(rawName);

  if (matchedAuthor) {
    return {
      name: matchedAuthor.name,
      avatar: matchedAuthor.avatar,
      isDefaultIcon: false,
      role: customArticleSubtitle || matchedAuthor.role,
      bio: matchedAuthor.bio,
      description: matchedAuthor.description,
      location: matchedAuthor.location,
      socials: matchedAuthor.socials || {},
      topics: matchedAuthor.topics || [],
      slug: matchedAuthor.slug,
      isSynced: true,
    };
  }

  // Handle generic "admin" or empty author name fallback
  const isDefaultAdmin =
    !rawName ||
    rawName.toLowerCase() === "admin" ||
    rawNickname.toLowerCase() === "admin";

  if (isDefaultAdmin) {
    return defaultFallback;
  }

  // WordPress author whose nickname/name is NOT in authors.json
  const wpAvatarUrl = postAuthorNode.avatar?.url;
  const hasWpAvatar = wpAvatarUrl && !wpAvatarUrl.includes("d=mm");

  return {
    name: rawName || "Freebirds Editorial Team",
    avatar: hasWpAvatar ? wpAvatarUrl : null,
    isDefaultIcon: !hasWpAvatar,
    role: customArticleSubtitle || "Contributor at Freebirds Digest",
    bio: "Covering digital nomad workflows, freelancing career growth, remote business tools, and work-from-home strategies.",
    description: "",
    socials: { twitter: "", linkedin: "", github: "", website: "" },
    topics: ["Remote Work", "Freelancing"],
    location: "Remote Contributor",
    slug: null,
    isSynced: false,
  };
}
