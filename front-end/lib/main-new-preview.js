import { fetchAPI } from "./api";
import { filterVisiblePosts } from "./post-filter";

const GET_MAIN_NEW_PREVIEW = `
  query GetMainNewPreview {
    posts(where: { categoryName: "main-new-preview" }, first: 15) {
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

export async function fetchMainNewPreview() {
  const data = await fetchAPI(GET_MAIN_NEW_PREVIEW);
  const raw = data?.posts?.nodes ?? [];
  return filterVisiblePosts(raw).slice(0, 9);
}