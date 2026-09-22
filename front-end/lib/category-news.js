import { cache } from "react";
import { fetchAPI } from "./api";
import { BEST_VPNS_USA_POST } from "./posts/5-best-vpns-usa";

const GET_CATEGORY_NEWS = `
  query GetCategoryNews($categoryName: String!, $first: Int) {
    posts(where: { categoryName: $categoryName }, first: $first) {
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

export const fetchCategoryNews = cache(async (categoryName, first = 24) => {
  let nodes = [];
  try {
    const data = await fetchAPI(GET_CATEGORY_NEWS, {
      variables: { categoryName, first },
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
});