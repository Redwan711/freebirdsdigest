import { fetchAPI } from "./api";
import { BEST_VPNS_USA_POST } from "./posts/5-best-vpns-usa";

const GET_RECENT_POSTS = `
  query GetRecentPosts {
    posts(first: 30) {
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
        categories {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

export async function fetchRecentPosts() {
  let nodes = [];
  try {
    const data = await fetchAPI(GET_RECENT_POSTS);
    nodes = data?.posts?.nodes ?? [];
  } catch (err) {
    console.error("Failed fetching recent posts:", err);
  }

  const exists = nodes.some(
    (n) => n.slug === BEST_VPNS_USA_POST.slug || n.databaseId === BEST_VPNS_USA_POST.databaseId
  );
  if (!exists) {
    nodes = [BEST_VPNS_USA_POST, ...nodes];
  }

  return nodes;
}
