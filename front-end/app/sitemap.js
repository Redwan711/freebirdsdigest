import { fetchAllCategories } from "@/lib/categories";
import { fetchAPI } from "@/lib/api";
import { siteUrl } from "@/lib/site";
import { BEST_VPNS_USA_POST } from "@/lib/posts/5-best-vpns-usa";

export const revalidate = 3600;

const GET_SITEMAP_POSTS = `
  query GetSitemapPosts($after: String) {
    posts(first: 100, after: $after) {
      nodes {
        slug
        date
        modified
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

async function fetchSitemapPosts() {
  const posts = [];
  let after = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data = await fetchAPI(GET_SITEMAP_POSTS, { variables: { after } });
    const connection = data?.posts;

    posts.push(...(connection?.nodes ?? []));
    hasNextPage = connection?.pageInfo?.hasNextPage ?? false;
    after = connection?.pageInfo?.endCursor ?? null;
  }

  // Include standalone/local posts if not returned by GraphQL
  if (
    BEST_VPNS_USA_POST?.slug &&
    !posts.some((p) => p.slug === BEST_VPNS_USA_POST.slug)
  ) {
    posts.push({
      slug: BEST_VPNS_USA_POST.slug,
      date: BEST_VPNS_USA_POST.date,
      modified: BEST_VPNS_USA_POST.modified,
    });
  }

  return posts;
}

export default async function sitemap() {
  const [categories, posts] = await Promise.all([
    fetchAllCategories(),
    fetchSitemapPosts(),
  ]);

  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/tools", priority: 0.8, changeFrequency: "weekly" },
    { path: "/vpn-finder", priority: 0.8, changeFrequency: "weekly" },
    { path: "/freelance-rate-calculator", priority: 0.8, changeFrequency: "weekly" },
    { path: "/author", priority: 0.7, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contribute", priority: 0.7, changeFrequency: "monthly" },
    { path: "/affiliate-disclosure", priority: 0.6, changeFrequency: "monthly" },
    { path: "/advertising", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.5, changeFrequency: "monthly" },
    { path: "/newsletter", priority: 0.5, changeFrequency: "monthly" },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const EXCLUDED_CATEGORIES = new Set([
    "top-news",
    "header-news",
    "trending",
    "main-new-preview",
    "side-panel-news",
    "promotional-image",
    "bottom-page-ads",
    "uncategorized",
    "sponsors",
  ]);

  const categoryPages = categories
    .filter(
      (category) =>
        !EXCLUDED_CATEGORIES.has(category.slug) && category.count > 0
    )
    .map((category) => ({
      url: `${siteUrl}/${category.slug}`,
      changeFrequency: "daily",
      priority: 0.8,
    }));

  const articlePages = posts.map((post) => ({
    url: `${siteUrl}/news/${post.slug}`,
    lastModified: new Date(post.modified || post.date),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}

