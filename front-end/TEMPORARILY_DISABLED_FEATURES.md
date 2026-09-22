# Freebirds Digest — Temporarily Disabled Features & Quick Re-Activation Guide

This document tracks all pages, routes, widgets, and links that have been temporarily turned off or commented out per request. All code has been 100% preserved in the codebase and can be restored in seconds by uncommenting the designated blocks.

---

## Quick Summary

| Feature / Page | Target Route / Location | Current Status | How to Re-enable |
|---|---|---|---|
| **US Top 5 VPN Post Page** | `/news/5-best-vpns-usa-tested-compared` | 🔴 Disabled (404) | Uncomment lookup in `app/news/[slug]/page.js` |
| **US Top 5 VPN Injections** | Category feed & recent posts | 🔴 Disabled | Uncomment injections in `lib/category-news.js` & `lib/recent-posts.js` |
| **Tools Hub Page** | `/tools` | 🔴 Disabled (404) | Remove `notFound()` in `app/tools/page.js` |
| **Tools Navigation Links** | Header, Mobile Nav, Hero, Footer, 404 | 🔴 Commented Out | Uncomment links in navigation components |
| **Sidebar Sponsors Ad Panel** | `components/SponsorsAdPnl.jsx` | 🟢 **ACTIVE** | Controlled by `showSponsorsAd = true` |

---

## 1. US Top 5 VPN Page (`5-best-vpns-usa-tested-compared`)

The data file containing the full article is preserved in:
👉 [`lib/posts/5-best-vpns-usa.js`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/lib/posts/5-best-vpns-usa.js)

### Modifications Made to Disable Access:

1. **Direct Page Access (`app/news/[slug]/page.js`)**:
   - Location: Lines 652–662 in [`fetchPost`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/app/news/%5Bslug%5D/page.js#L652).
   - **Status**: The local slug lookup for `BEST_VPNS_USA_POST` is commented out. Navigating directly to `/news/5-best-vpns-usa-tested-compared` triggers `notFound()` (404).
   - **To Re-enable**: Uncomment the block inside `fetchPost` in `app/news/[slug]/page.js`:
     ```javascript
     const isMatchingSlug =
       postSlug === BEST_VPNS_USA_POST.slug ||
       decodeURIComponent(postSlug || "") === BEST_VPNS_USA_POST.slug;
     const isMatchingId =
       postId && (postId == BEST_VPNS_USA_POST.databaseId || postId === BEST_VPNS_USA_POST.id);

     if (isMatchingSlug || isMatchingId) {
       return BEST_VPNS_USA_POST;
     }
     ```

2. **Category Feed Injection (`lib/category-news.js`)**:
   - Location: Lines 37–49 in [`fetchCategoryNews`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/lib/category-news.js#L37).
   - **Status**: The block that injected the post into the `/vpn-reviews` category page is commented out.
   - **To Re-enable**: Uncomment the `isVpnCategory` check in `lib/category-news.js`.

3. **Recent Posts Injection (`lib/recent-posts.js`)**:
   - Location: Lines 41–47 in [`fetchRecentPosts`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/lib/recent-posts.js#L41).
   - **Status**: The block prepending the post to recent posts feed is commented out.
   - **To Re-enable**: Uncomment the `exists` check and injection in `lib/recent-posts.js`.

4. **Sitemap (`app/sitemap.js`)**:
   - Location: Lines 39–48 in [`sitemap.js`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/app/sitemap.js#L39).
   - **Status**: Commented out so the post is not submitted to search engines.
   - **To Re-enable**: Uncomment lines 39–48 in `app/sitemap.js`.

---

## 2. Tools Page (`/tools`) & Navigation Links

The full tools directory page component and data are preserved in:
👉 [`app/tools/page.js`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/app/tools/page.js)

### Modifications Made to Disable Access:

1. **Route Short-Circuit (`app/tools/page.js`)**:
   - Location: Line 87 in [`ToolsPage`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/app/tools/page.js#L87).
   - **Status**: Added `notFound()` call at top of the component and `robots: { index: false, follow: false }` in metadata. Navigating to `/tools` renders a clean 404 page.
   - **To Re-enable**: Remove `notFound();` and the `robots` block in `app/tools/page.js`.

2. **Desktop Header Navigation (`components/BottomHeader.jsx`)**:
   - Location: Lines 102–111 in [`BottomHeader.jsx`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/components/BottomHeader.jsx#L102).
   - **Status**: Commented out the `<Link href="/tools">` (Tools Hub) navigation button.
   - **To Re-enable**: Uncomment lines 103–111 in `components/BottomHeader.jsx`.

3. **Mobile Drawer Navigation (`components/MobileNav.jsx`)**:
   - Location: Lines 128–138 in [`MobileNav.jsx`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/components/MobileNav.jsx#L128).
   - **Status**: Commented out the `Freebirds Tools` menu link.
   - **To Re-enable**: Uncomment lines 129–137 in `components/MobileNav.jsx`.

4. **Homepage Brand Hero Pill (`components/HomeBrandHero.jsx`)**:
   - Location: Lines 33–42 in [`HomeBrandHero.jsx`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/components/HomeBrandHero.jsx#L33).
   - **Status**: Commented out the `Interactive Toolkit (HUB)` navigation pill.
   - **To Re-enable**: Uncomment lines 34–42 in `components/HomeBrandHero.jsx`.

5. **Footer Link (`components/Footer.jsx`)**:
   - Location: Lines 100–105 in [`Footer.jsx`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/components/Footer.jsx#L100).
   - **Status**: Commented out the `Freebirds Tools` link under Company & Legal.
   - **To Re-enable**: Uncomment lines 101–105 in `components/Footer.jsx`.

6. **404 Page (`app/not-found.js`)**:
   - Location: Lines 25 & 64 in [`app/not-found.js`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/app/not-found.js).
   - **Status**: Commented out `Tools Directory` quick link and `Explore Tools` button.
   - **To Re-enable**: Uncomment both blocks in `app/not-found.js`.

7. **Sitemap (`app/sitemap.js`)**:
   - Location: Line 61 in [`sitemap.js`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/app/sitemap.js#L61).
   - **Status**: Commented out `{ path: "/tools", ... }`.
   - **To Re-enable**: Uncomment line 61 in `app/sitemap.js`.

---

## 3. Sidebar Sponsors Ad Bar Activation

- **Component File**: [`components/SponsorsAdPnl.jsx`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/components/SponsorsAdPnl.jsx)
- **Documentation Reference**: [`ADS_DOCUMENTATION.md`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/ADS_DOCUMENTATION.md) (Item #3)
- **Status**: 🟢 **ACTIVE**
- **Changes Made**:
  - Changed `const showSponsorsAd = false;` to `const showSponsorsAd = true;` on line 18.
  - When active, the sidebar switches away from `<ToolsWidget />` and now directly renders the **Featured Partners / Sponsored Ad Panel** fetching from the WordPress `sponsors` category.

---

## 4. Automatic Post Hiding via the `hide` Category

Any post assigned to the WordPress category **`hide`** (slug: `hide`) is automatically and completely suppressed from the entire frontend:

### How it Works:
1. **Direct Post Access (`app/news/[slug]/page.js`)**:
   - If a post's categories include `hide`, `fetchPost` returns `null`.
   - The user receives a clean `404 Not Found` page and `robots: { index: false, follow: false }` metadata.
2. **Category Page Access (`app/[category]/page.js`)**:
   - Visiting `/hide` returns a clean `404 Not Found` page.
3. **Navigation & Feeds Suppressed**:
   - **Hero Digest & Trending News**: Excluded via `lib/hero-news.js`.
   - **Header Bar Top News**: Excluded via `lib/headerNews.js`.
   - **Recent Articles & Category Feeds**: Excluded via `lib/recent-posts.js` and `lib/category-news.js`.
   - **Main News Preview**: Excluded via `lib/main-new-preview.js`.
   - **Side Panel News**: Excluded via `lib/side-panel-news.js`.
   - **Search Results**: Excluded via `lib/search.js`.
   - **Author Profiles**: Excluded from author article lists in `app/author/[slug]/page.js`.
   - **Recommended News**: Excluded from the related posts widget at the bottom of articles.
   - **Sitemap**: Excluded from `sitemap.xml` via `app/sitemap.js`.
   - **Navbar / Menus**: The category `hide` itself is excluded from all navigation categories in `lib/categories.js`.

### How to Hide or Unhide a Post:
- **To Hide**: In WordPress Admin, simply check the **hide** category on the post and save.
- **To Unhide**: In WordPress Admin, uncheck the **hide** category from the post and save.

