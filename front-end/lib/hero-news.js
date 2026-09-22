import { fetchAPI } from "./api";
import { filterVisiblePosts } from "./post-filter";

const GET_HERO_NEWS = `
  query GetHeroNews {
    topNews: posts(where: { categoryName: "top-news" }, first: 5) {
      nodes {
        id
        databaseId
        slug
        title
        date
        modified
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
    trendingNews: posts(where: { categoryName: "trending" }, first: 10) {
      nodes {
        id
        databaseId
        slug
        title
        date
        modified
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

export async function fetchHeroNews() {
  const data = await fetchAPI(GET_HERO_NEWS);

  const rawTop = data?.topNews?.nodes ?? [];
  const rawTrending = data?.trendingNews?.nodes ?? [];

  return {
    topNews: filterVisiblePosts(rawTop).slice(0, 1),
    trendingNews: filterVisiblePosts(rawTrending).slice(0, 4),
  };
}
