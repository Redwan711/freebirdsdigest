import { fetchAPI } from "./api";

const GET_SPONSORS = `
  query GetSponsors {
    posts(where: { categoryName: "sponsors" }, first: 3) {
      nodes {
        id
        databaseId
        title
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

export async function fetchSponsors() {
  try {
    const data = await fetchAPI(GET_SPONSORS);
    return data?.posts?.nodes ?? [];
  } catch (err) {
    console.error("Failed fetching sponsor ads:", err);
    return [];
  }
}
