import { fetchAPI } from "./api";

const GET_HERO_NEWS = `
  query GetHeroNews {
    topNews: posts(where: { categoryName: "top-news" }, first: 1) {
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
    trendingNews: posts(where: { categoryName: "trending" }, first: 4) {
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

export async function fetchHeroNews() {
  const data = await fetchAPI(GET_HERO_NEWS);

  return {
    topNews: data?.topNews?.nodes ?? [],
    trendingNews: data?.trendingNews?.nodes ?? [],
  };
}
