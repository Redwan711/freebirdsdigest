import { cache } from 'react';
import { fetchAPI } from './api';

const GET_ALL_CATEGORIES = `
  query GetAllCategories {
    categories(first: 50) {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

const NAVIGATION_CATEGORY_SLUGS = new Set([
  'breaking',
  'business',
  'health',
  'international',
  'last-updates',
  'politics',
  'sports',
  'technology',
  'trending',
]);

export const fetchAllCategories = cache(async () => {
  const data = await fetchAPI(GET_ALL_CATEGORIES);

  return data?.categories?.nodes ?? [];
});

export async function fetchNavigationCategories() {
  const allCategories = await fetchAllCategories();

  return allCategories.filter(
    (category) =>
      category.slug !== 'uncategorized' &&
      category.count > 0 &&
      NAVIGATION_CATEGORY_SLUGS.has(category.slug)
  );
}
