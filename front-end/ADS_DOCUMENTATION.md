# Freebirds Digest — Advertisement Placements & Activation Guide

This document outlines all advertisement, promotional banner, and sponsored partner placements across the codebase. All ad components remain fully intact in the codebase and are currently hidden from the UI using boolean feature flags.

---

## Quick Summary of Ad Placements

| # | Ad Placement | Component File | Current UI Status | Activation Flag / Location |
|---|---|---|---|---|
| 1 | **Top Hero Banner Ad** | `components/HeroNews.jsx` | ❌ Hidden | Set `showTopBannerAd = true` in `HeroNews.jsx` |
| 2 | **In-Between / Bottom Ad Banner** | `components/BottomPageAd.jsx` | ❌ Hidden | Set `showBottomPageAd = true` in `BottomPageAd.jsx` |
| 3 | **Right Sidebar Sponsors Ad Panel** | `components/SponsorsAdPnl.jsx` | ❌ Hidden | Set `showSponsorsAd = true` in `SponsorsAdPnl.jsx` |

---

## 1. Top Hero Banner Ad

- **Component File**: [`components/HeroNews.jsx`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/components/HeroNews.jsx)
- **Data Source / API**: [`lib/promotional-image.js`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/lib/promotional-image.js) (`fetchPromotionalImage()`)
- **Pages Rendered**: 
  - **Homepage (`/`)**: Pinned at the very top of the Hero News block (`max-h-[140px]`).
- **How to Activate / Show in UI**:
  Open [`components/HeroNews.jsx`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/components/HeroNews.jsx) and change line 83:
  ```javascript
  // Change from false to true to enable top hero banner ad:
  const showTopBannerAd = true;
  ```

---

## 2. In-Between / Bottom Page Ad Banner

- **Component File**: [`components/BottomPageAd.jsx`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/components/BottomPageAd.jsx)
- **Data Source / API**: [`lib/bottom-page-ads.js`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/lib/bottom-page-ads.js) (`fetchBottomPageAd()`)
- **Pages Rendered**:
  - **Homepage (`/`)**: Rendered in the center column inside [`pages/Home.jsx`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/pages/Home.jsx#L93) between the main preview panel and recent news feed.
  - **News Article Post Pages (`/news/[slug]`)**: Rendered inside [`app/news/[slug]/page.js`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/app/news/%5Bslug%5D/page.js#L1339) in the post article footer below the newsletter subscription box.
- **How to Activate / Show in UI**:
  Open [`components/BottomPageAd.jsx`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/components/BottomPageAd.jsx) and change line 15:
  ```javascript
  // Change from false to true to enable bottom page ad banner:
  const showBottomPageAd = true;
  ```

---

## 3. Right Sidebar Sponsors Ad Panel

- **Component File**: [`components/SponsorsAdPnl.jsx`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/components/SponsorsAdPnl.jsx)
- **Data Source / API**: [`lib/sponsors.js`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/lib/sponsors.js) (`fetchSponsors()`)
- **Pages Rendered**:
  - **Homepage (`/`)**: Rendered in [`pages/Home.jsx`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/pages/Home.jsx#L99) inside the right-most sticky column (`2xl:sticky`).
  - **News Article Post Pages (`/news/[slug]`)**: Rendered in [`app/news/[slug]/page.js`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/app/news/%5Bslug%5D/page.js#L1345) inside the right-most sticky sidebar column (`lg:sticky`).
- **How to Activate / Show in UI**:
  Open [`components/SponsorsAdPnl.jsx`](file:///c:/Users/theGreatPotato/Documents/GitHub/freebirdsdigest/front-end/components/SponsorsAdPnl.jsx) and change line 7:
  ```javascript
  // Change from false to true to enable right sidebar sponsors ad panel:
  const showSponsorsAd = true;
  ```

---

## Summary of Code Structure Safety

All 3 ad components remain fully integrated into their respective page layouts (`pages/Home.jsx`, `app/news/[slug]/page.js`, `components/HeroNews.jsx`). Because each component short-circuits to `return null` when its boolean flag is set to `false`, **zero DOM nodes are rendered**, and page layout grids collapse cleanly without leaving empty whitespace.
