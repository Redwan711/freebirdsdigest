import { fetchAPI } from "./api";

const GET_CATEGORY_NEWS = `
  query GetCategoryNews($categoryName: String!) {
    posts(where: { categoryName: $categoryName }, first: 9) {
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

export async function fetchCategoryNews(categoryName) {
  const data = await fetchAPI(GET_CATEGORY_NEWS, {
    variables: { categoryName },
  });

  return data?.posts?.nodes ?? [];
}