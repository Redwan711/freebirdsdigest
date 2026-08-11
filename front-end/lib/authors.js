import authors from "@/data/authors.json";

/**
 * Get all 10 author profiles from JSON
 */
export function getAllAuthors() {
  return authors || [];
}

/**
 * Find an author by ID (serial number)
 */
export function getAuthorById(id) {
  if (id === null || id === undefined || id === "") return null;
  const cleanId = String(id).trim();
  return (
    authors.find(
      (a) =>
        a.id === cleanId ||
        a.id === String(parseInt(cleanId, 10))
    ) || null
  );
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
      const idStr = String(a.id).trim();
      return nick === target || slug === target || name === target || idStr === target;
    }) || null
  );
}

/**
 * Sync post author with authors.json via authorSerial ACF field.
 * If authorSerial is empty or unmatched, returns the general default data
 * ("Freebirds Editorial Team" + logo icon).
 *
 * @param {Object} postAuthorNode - WordPress GraphQL author node
 * @param {String} customArticleSubtitle - Optional ACF authorSubtitle from post metadata
 * @param {String|Number} authorSerial - ACF author_serial (Author Serial Number / ID)
 */
export function syncPostAuthor(
  postAuthorNode,
  customArticleSubtitle = "",
  authorSerial = ""
) {
  const defaultFallback = {
    id: null,
    name: "Freebirds Editorial Team",
    email: "editorial@freebirdsdigest.com",
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

  // Strict check: Only sync if authorSerial (Author Serial ACF field) is provided and matches an author
  if (authorSerial !== null && authorSerial !== undefined && String(authorSerial).trim() !== "") {
    const matchedAuthor =
      getAuthorById(authorSerial) || getAuthorByNickname(authorSerial);

    if (matchedAuthor) {
      return {
        id: matchedAuthor.id,
        name: matchedAuthor.name,
        email: matchedAuthor.email || "",
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
  }

  // When authorSerial is empty or does not match any author serial ID, return general default fallback
  return defaultFallback;
}
