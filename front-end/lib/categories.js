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
        parent {
          node {
            id
            slug
            name
          }
        }
      }
    }
  }
`;

const NAVIGATION_CATEGORY_SLUGS = [
  'featured',
  'finance',
  'technology',
  'lifestyle',
  'news',
];

const DEFAULT_REVIEW_SUBCATEGORIES = [
  { id: 'ai-tools-reviews', slug: 'ai-tools-reviews', name: 'AI Tools Reviews' },
  { id: 'hosting-reviews', slug: 'hosting-reviews', name: 'Hosting Reviews' },
  { id: 'domain-reviews', slug: 'domain-reviews', name: 'Domain Reviews' },
  { id: 'vpn-reviews', slug: 'vpn-reviews', name: 'VPN Reviews' },
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
        'bottom-page-ads',
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

export async function fetchReviewSubcategories() {
  try {
    const allCategories = await fetchAllCategories();
    const reviewCats = allCategories.filter((cat) => {
      const parentSlug = cat?.parent?.node?.slug;
      return (
        parentSlug === 'reviews' ||
        (cat?.slug !== 'reviews' && cat?.slug?.endsWith('-reviews'))
      );
    });

    if (reviewCats.length > 0) {
      return reviewCats.map((cat) => ({
        id: cat.id || cat.slug,
        slug: cat.slug,
        name: cat.name,
      }));
    }
  } catch (error) {
    console.error('Error fetching review subcategories:', error);
  }

  return DEFAULT_REVIEW_SUBCATEGORIES;
}

