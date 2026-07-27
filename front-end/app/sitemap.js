import { fetchAllCategories } from "@/lib/categories";
import { fetchAPI } from "@/lib/api";
import { siteUrl } from "@/lib/site";

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

  return posts;
}

export default async function sitemap() {
  const [categories, posts] = await Promise.all([
    fetchAllCategories(),
    fetchSitemapPosts(),
  ]);

  const staticPages = ["", "/about"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path ? "monthly" : "daily",
    priority: path ? 0.7 : 1,
  }));

  const categoryPages = categories
    .filter((category) => category.slug !== "uncategorized" && category.count > 0)
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
