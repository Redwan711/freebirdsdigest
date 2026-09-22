import { fetchAPI } from './api';
import { filterVisiblePosts } from './post-filter';

const GET_HEADER_NEWS = `
  query GetHeaderNewsV2 {
    headerNews: posts(where: { categoryName: "header-news" }, first: 6) {
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

export async function fetchHeaderNews() {
  const data = await fetchAPI(GET_HEADER_NEWS);
  const raw = data?.headerNews?.nodes ?? [];
  return {
    headerNews: filterVisiblePosts(raw).slice(0, 2),
  };
}