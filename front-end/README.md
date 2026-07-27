# Astha News

Astha News is a responsive Bengali digital-news frontend built with Next.js. It renders news, categories, navigation, and article details from a headless WordPress site through WPGraphQL.

## Features

- Responsive layouts for mobile, tablet, and desktop
- Headless WordPress/WPGraphQL content source
- Dynamic category and article routes
- Bengali typography with Noto Serif Bengali
- Mobile navigation with close, outside-click, and Escape-key support
- Search-engine metadata, canonical URLs, `robots.txt`, and dynamic sitemap
- `NewsArticle` structured data for individual articles

## Tech stack

- Next.js 16 and React 19
- Tailwind CSS 4
- Biome for formatting and static checks
- `next/image` for image optimization
- WPGraphQL / WordPress API

## Requirements

- Node.js 20.9 or newer
- npm
- A WordPress site with the WPGraphQL endpoint enabled

## Getting started

Clone the repository and enter the frontend directory:

```bash
git clone <repository-url>
cd asthaNews/front-end
```

Install dependencies:

```bash
npm install
```

Create a local environment file from the example:

```bash
copy .env.example .env.local
```

On macOS or Linux:

```bash
cp .env.example .env.local
```

Update `.env.local` with your values, then start development:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> On Windows PowerShell installations that block `npm.ps1`, use `npm.cmd run dev` instead.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_WORDPRESS_API_URL` | Yes | Full URL of the WordPress WPGraphQL endpoint. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public canonical site URL, for example `https://asthanews.com`. |

`NEXT_PUBLIC_SITE_URL` temporarily falls back to `https://asthanews.com` when omitted. Set it before production deployment if your final domain is different.

Never commit `.env.local` or API credentials.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Create an optimized production build. |
| `npm run start` | Run the production build locally. |
| `npm run lint` | Run Biome checks. |
| `npm run format` | Format project files with Biome. |

## Project structure

```text
app/
  about/                 About page
  news/[slug]/           Dynamic article page and article SEO metadata
  [category]/            Dynamic category pages
  layout.js              Global fonts, layout, and site metadata
  robots.js              Generated robots.txt
  sitemap.js             Generated sitemap.xml
components/              Reusable UI components
lib/
  api.js                 WPGraphQL request helper
  site.js                Site URL, name, and default SEO description
pages/Home.jsx           Homepage composition
public/                  Logos, icons, and fallback images
```

## Content model

The frontend expects WordPress posts with:

- `slug`, `title`, `date`, `modified`, `excerpt`, and `content`
- A featured image (`sourceUrl`, `altText`)
- Categories
- Optional `articleMetadata` fields used by the article layout

Navigation categories are controlled in [lib/categories.js](./lib/categories.js). Update `NAVIGATION_CATEGORY_SLUGS` when the WordPress category structure changes.

## SEO

The project currently generates:

- Site-wide metadata and Open Graph/Twitter cards
- Canonical URLs for home, categories, About, and articles
- Article-specific metadata from WordPress content
- `NewsArticle` JSON-LD on news pages
- `/robots.txt`
- `/sitemap.xml`, including paginated WordPress posts and active categories

Before launch, update [lib/site.js](./lib/site.js) with the final brand description and configure `NEXT_PUBLIC_SITE_URL`. A dedicated 1200×630 Open Graph image is also recommended; the current logo is a temporary share image.

## Production checklist

- Set both environment variables in the hosting provider.
- Ensure the WordPress GraphQL endpoint is reachable from the deployed app.
- Verify every remote image host is allowed in [next.config.mjs](./next.config.mjs).
- Visit `/robots.txt` and `/sitemap.xml` after deployment.
- Submit the sitemap to Google Search Console and Bing Webmaster Tools.
- Replace demo text on the About page and create the linked policy/newsletter pages.

## Deployment

Deploy to any platform that supports Next.js, such as Vercel. Add the environment variables in the platform settings, run `npm run build`, and serve the resulting Next.js application.
