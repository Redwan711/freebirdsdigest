import { fetchAPI } from "./api";

const GET_SIDE_PANEL_NEWS = `
  query GetSidePanelNews {
    posts(where: { categoryName: "side-panel-news" }, first: 8) {
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

export async function fetchSidePanelNews() {
  const data = await fetchAPI(GET_SIDE_PANEL_NEWS);

  return data?.posts?.nodes ?? [];
}