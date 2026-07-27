# WPGraphQL — Single Post Query Reference

This doc defines how a single article/post page fetches its data from the headless WordPress backend. Use it as the source of truth when building/reshaping `app/news/[slug]/page.js` (or its renamed equivalent).

## Endpoint & pattern

Same as the rest of the app: POST this query to `NEXT_PUBLIC_WORDPRESS_API_URL` via `lib/api.js`'s `fetchAPI()`. Lookup is by slug (`idType: SLUG`), matching how `app/news/[slug]/page.js` already resolves the route param.

## Query

```graphql
query GetPostBySlug($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    id
    databaseId
    title
    slug
    date
    content
    excerpt

    featuredImage {
      node {
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }

    author {
      node {
        name
        nicename
        avatar {
          url
        }
      }
    }

    categories {
      nodes {
        id
        name
        slug
      }
    }

    # Requires the "WPGraphQL for Yoast SEO" plugin
    seo {
      title
      metaDesc
      canonical
      opengraphTitle
      opengraphDescription
      opengraphImage {
        sourceUrl
      }
      twitterTitle
      twitterDescription
    }

    # Not yet wired up — see "Planned: review/affiliate fields" below.
    # Requires ACF + WPGraphQL for ACF, with the field group registered
    # under this name.
    # articleMetadata {
    #   subheading
    #   mainImageSourceInfo
    #   authorSubtitle
    #   estimatedReadTime
    #   secndImage {
    #     node {
    #       sourceUrl
    #     }
    #   }
    # }
  }
}
```

Note: hardcode the slug into `id` only for manual testing in the GraphiQL IDE. In the app, pass it as the `$slug` variable via `fetchAPI(query, { variables: { slug } })`.

## Field-by-field notes

| Field | Type / shape | Notes |
|---|---|---|
| `content` | HTML string (`<p class="wp-block-paragraph">...`) | Comes pre-wrapped in Gutenberg block classes. Render with `dangerouslySetInnerHTML`, or run through an HTML sanitizer if you want to strip/rewrite block classes before render. |
| `excerpt` | HTML string, auto-truncated by WP (`[&hellip;]`) | Use as fallback for `seo.metaDesc` when that's empty (see below). |
| `featuredImage.node.sourceUrl` | Full URL to WP media | Currently resolves to `http://localhost/astha-news/wp-content/uploads/...` — this is a local dev URL. Before deploy, confirm the prod WP media URL is added to `next.config.mjs`'s `images.remotePatterns`, or `next/image` will reject it. |
| `author.node.nicename` | Can be `null` | Sample data shows `null` even though `name` is set. Don't rely on `nicename` for display — use `name`, and only use `nicename` if present (e.g. for an author archive link slug). |
| `author.node.avatar.url` | Gravatar URL, `d=mm` param | `d=mm` is Gravatar's "mystery man" fallback, meaning this author has no real Gravatar set. Expect a generic placeholder image, not a real photo — plan a real author-bio/avatar system before relying on this for E-E-A-T signals. |
| `seo.metaDesc` | Can be empty string | Sample data shows `""`. Yoast doesn't auto-fill this — if empty, fall back to a trimmed/stripped version of `excerpt`, don't render an empty `<meta name="description">`. |
| `seo.twitterTitle` / `seo.twitterDescription` | Can be empty string | Same issue — Yoast leaves these blank unless set per-post. Fall back to `seo.opengraphTitle` / `seo.opengraphDescription`. |
| `categories.nodes` | Array, can have multiple | Sample post has 3 categories (`breaking`, `business`, `international`) — these are the old news-taxonomy slugs. Once categories are restructured for the freelancer/remote-work niche, this same field shape still works, just with new slugs. |

## Sample response (for shaping component props / types)

```json
{
  "data": {
    "post": {
      "id": "cG9zdDo3NQ==",
      "databaseId": 75,
      "title": "Lorem Ipsum is simply dummy text of the printing and typesetting",
      "slug": "lorem-ipsum-is-simply-dummy-text-of-the-printing-and-typesetting",
      "date": "2026-07-27T13:05:21",
      "content": "<p class=\"wp-block-paragraph\">...</p>",
      "excerpt": "<p>...[&hellip;]</p>",
      "featuredImage": {
        "node": {
          "sourceUrl": "http://localhost/astha-news/wp-content/uploads/2026/07/pexels-zucker-pop-140939669-10531120.jpg",
          "altText": "",
          "mediaDetails": { "width": 1280, "height": 854 }
        }
      },
      "author": {
        "node": {
          "name": "admin",
          "nicename": null,
          "avatar": { "url": "https://secure.gravatar.com/avatar/...?s=96&d=mm&r=g" }
        }
      },
      "categories": {
        "nodes": [
          { "id": "dGVybToxMQ==", "name": "Breaking", "slug": "breaking" },
          { "id": "dGVybToz", "name": "Business", "slug": "business" },
          { "id": "dGVybTo5", "name": "International", "slug": "international" }
        ]
      },
      "seo": {
        "title": "Lorem Ipsum is simply dummy text of the printing and typesetting - Astha News",
        "metaDesc": "",
        "canonical": "http://localhost/astha-news/lorem-ipsum-is-simply-dummy-text-of-the-printing-and-typesetting/",
        "opengraphTitle": "Lorem Ipsum is simply dummy text of the printing and typesetting - Astha News",
        "opengraphDescription": "Contrary to popular belief, Lorem Ipsum is not simply random text...",
        "opengraphImage": { "sourceUrl": "http://localhost/astha-news/wp-content/uploads/2026/07/pexels-zucker-pop-140939669-10531120.jpg" },
        "twitterTitle": "",
        "twitterDescription": ""
      }
    }
  }
}
```

## Known issues to handle in the page component

1. **Empty SEO fallbacks.** `metaDesc`, `twitterTitle`, `twitterDescription` are empty on posts where the author didn't fill in Yoast fields manually. Build fallback chains rather than trusting `seo.*` directly.
2. **Author identity is currently just "admin".** Fine for placeholder content, not fine for a published affiliate/review site — E-E-A-T signals depend on real named authors with bios.
3. **`content` is unstyled block HTML**, still tagged with `wp-block-paragraph` etc. — make sure global CSS or a content wrapper class styles these, or strip the classes on render.
4. **Media URLs are on `localhost`** — swap for the real WP host before deploy and update `remotePatterns`.

## Planned: review/affiliate fields (not yet implemented)

For posts that are product reviews rather than plain articles, this query will need to expand once the corresponding ACF field group exists in WP. Fields to add when that's ready:

```graphql
reviewMeta {
  price
  rating
  pros
  cons
  merchantName
  affiliateUrl
}
```

These drive: the `Product` + `Review`/`AggregateRating` JSON-LD (for star ratings in search results), the "Buy on X" CTA button, and the comparison-table UI. Hold off adding this to the query until the ACF field group is registered in WP and exposed via WPGraphQL for ACF.