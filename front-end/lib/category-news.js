import { fetchAPI } from "./api";
import { BEST_VPNS_USA_POST } from "./posts/5-best-vpns-usa";

const GET_CATEGORY_NEWS = `
  query GetCategoryNews($categoryName: String!) {
    posts(where: { categoryName: $categoryName }, first: 9) {
      nodes {
        id
        databaseId
        slug
        title
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export async function fetchCategoryNews(categoryName) {
  let nodes = [];
  try {
    const data = await fetchAPI(GET_CATEGORY_NEWS, {
      variables: { categoryName },
    });
    nodes = data?.posts?.nodes ?? [];
  } catch (err) {
    console.error("Failed fetching category news from GraphQL:", err);
  }

  const isVpnCategory =
    categoryName?.toLowerCase() === "vpn-reviews" ||
    categoryName?.toLowerCase() === "vpn reviews";

  if (isVpnCategory) {
    const exists = nodes.some(
      (n) => n.slug === BEST_VPNS_USA_POST.slug || n.databaseId === BEST_VPNS_USA_POST.databaseId
    );
    if (!exists) {
      // Prepend or merge our post so it appears in the Category Digest feed
      nodes = [BEST_VPNS_USA_POST, ...nodes];
    }
  }

  return nodes;
}