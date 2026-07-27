import { fetchAPI } from './api';


const GET_HEADER_NEWS = `
  query GetHeaderNewsV2 {
    headerNews: posts(where: { categoryName: "header-news" }, first: 2) {
      nodes {
        id
        databaseId
          slug
        title
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
}`;


export async function fetchHeaderNews() {
  const data = await fetchAPI(GET_HEADER_NEWS);
  return {
    headerNews: data?.headerNews?.nodes ?? [],
  }
}