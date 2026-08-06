import { fetchAPI } from "./api";

const GET_SIDE_PANEL_NEWS = `
  query GetSidePanelNews {
    sideCategoryPosts: posts(where: { categoryName: "side-panel-news" }, first: 30) {
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
    allRecentPosts: posts(first: 60) {
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

export async function fetchSidePanelNews() {
  try {
    const data = await fetchAPI(GET_SIDE_PANEL_NEWS);
    const categoryNodes = data?.sideCategoryPosts?.nodes ?? [];
    const allNodes = data?.allRecentPosts?.nodes ?? [];

    const combined = [...categoryNodes];
    const existingIds = new Set(categoryNodes.map((p) => String(p.databaseId || p.id || p.slug)));

    for (const post of allNodes) {
      const key = String(post.databaseId || post.id || post.slug);
      if (!existingIds.has(key)) {
        existingIds.add(key);
        combined.push(post);
      }
    }

    return combined;
  } catch (err) {
    console.error("Failed fetching side panel news:", err);
    return [];
  }
}