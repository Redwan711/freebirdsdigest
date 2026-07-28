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

const NAVIGATION_CATEGORY_SLUGS = [
  'feature-story',
  'financial',
  'lifestyle',
  'personal',
  'platform',
  'technology',
];

const NAV_SLUG_SET = new Set(NAVIGATION_CATEGORY_SLUGS);

export function filterNavCategories(categories = []) {
  if (!Array.isArray(categories)) return [];
  const navMatches = categories.filter((cat) => NAV_SLUG_SET.has(cat?.slug));
  if (navMatches.length > 0) {
    return navMatches;
  }
  return categories.filter(
    (cat) =>
      ![
        'top-news',
        'header-news',
        'trending',
        'main-new-preview',
        'side-panel-news',
        'promotional-image',
        'uncategorized',
      ].includes(cat?.slug)
  );
}

export const fetchAllCategories = cache(async () => {
  const data = await fetchAPI(GET_ALL_CATEGORIES);

  return data?.categories?.nodes ?? [];
});

export async function fetchNavigationCategories() {
  const allCategories = await fetchAllCategories();
  const categoryMap = new Map(allCategories.map((cat) => [cat.slug, cat]));

  return NAVIGATION_CATEGORY_SLUGS.map((slug) => {
    return (
      categoryMap.get(slug) || {
        id: slug,
        slug,
        name: slug
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase()),
        count: 0,
      }
    );
  });
}
