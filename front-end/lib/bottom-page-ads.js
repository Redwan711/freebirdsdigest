import { fetchAPI } from "./api";

const GET_BOTTOM_PAGE_AD = `
  query GetBottomPageAd {
    posts(where: { categoryName: "bottom-page-ads" }, first: 1) {
      nodes {
        id
        title
        slug
        databaseId
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        sponsore {
          redirectionLink
          adTitleIfAny
          adTextIfAny
          adImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

export async function fetchBottomPageAd() {
  try {
    const data = await fetchAPI(GET_BOTTOM_PAGE_AD);
    return data?.posts?.nodes?.[0] ?? null;
  } catch (err) {
    console.error("Failed fetching bottom page ad:", err);
    return null;
  }
}
