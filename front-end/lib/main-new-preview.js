import { fetchAPI } from "./api";

const GET_MAIN_NEW_PREVIEW = `
  query GetMainNewPreview {
    posts(where: { categoryName: "main-new-preview" }, first: 9) {
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

export async function fetchMainNewPreview() {
  const data = await fetchAPI(GET_MAIN_NEW_PREVIEW);

  return data?.posts?.nodes ?? [];
}