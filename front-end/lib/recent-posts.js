import { fetchAPI } from "./api";

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
  try {
    const data = await fetchAPI(GET_RECENT_POSTS);
    return data?.posts?.nodes ?? [];
  } catch (err) {
    console.error("Failed fetching recent posts:", err);
    return [];
  }
}
