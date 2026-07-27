import { fetchAPI } from "./api";

const GET_PROMOTIONAL_IMAGE = `
  query GetPromotionalImage {
    posts(where: { categoryName: "promotional-image" }, first: 1) {
      nodes {
        id
        title
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

export async function fetchPromotionalImage() {
  const data = await fetchAPI(GET_PROMOTIONAL_IMAGE);

  return data?.posts?.nodes?.[0] ?? null;
}
