import { fetchAPI } from "./api";

const SEARCH_POSTS = `
  query SearchPosts($search: String!, $first: Int = 30) {
    posts(where: { search: $search }, first: $first) {
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
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
      }
    }
  }
`;

export async function fetchSearchResults(searchQuery, first = 30) {
  if (!searchQuery || !searchQuery.trim()) {
    return [];
  }

  try {
    const data = await fetchAPI(SEARCH_POSTS, {
      variables: { search: searchQuery.trim(), first },
    });
    return data?.posts?.nodes ?? [];
  } catch (err) {
    console.error("Failed fetching search results:", err);
    return [];
  }
}
