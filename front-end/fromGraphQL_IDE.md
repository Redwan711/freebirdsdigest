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
    modified
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

    # ACF Field Group: Article Metadata (Registered in WP via WPGraphQL for ACF)
    articleMetadata {
      subheading
      mainImageSourceInfo
      authorSubtitle
      estimatedReadTime
      secndImage {
        node {
          sourceUrl
          altText
        }
      }
      imageSource
      videoSource
      otherUrl
    }
  }
}
```

Note: hardcode the slug into `id` only for manual testing in the GraphiQL IDE. In the app, pass it as the `$slug` variable via `fetchAPI(query, { variables: { slug } })`.

## Field-by-field notes

| Field | Type / shape | Notes |
|---|---|---|
| `content` | HTML string (`<p class="wp-block-paragraph">...`) | Comes pre-wrapped in Gutenberg block classes. Render with `dangerouslySetInnerHTML`, or run through an HTML sanitizer if you want to strip/rewrite block classes before render. |
| `excerpt` | HTML string, auto-truncated by WP (`[&hellip;]`) | Use as fallback for `seo.metaDesc` when that's empty. |
| `featuredImage.node.sourceUrl` | Full URL to WP media | WP media URL — ensure host is listed in `next.config.mjs`'s `images.remotePatterns`. |
| `author.node.name` | String | Main author display name. Fallback to `articleMetadata.authorSubtitle` if `"admin"`. |
| `author.node.avatar.url` | Gravatar URL | Render avatar photo if not default mystery man placeholder. |
| `categories.nodes` | Array | Array of category nodes (`id`, `name`, `slug`). |
| `seo.*` | Yoast SEO fields | Build fallback chains for title, description, canonical, and social images. |

### Custom ACF Fields (`articleMetadata`)

All 8 fields registered under the **Article Metadata** field group in WordPress:

| # | ACF Field Name | GraphQL Field Name | Field Type | Purpose & Rendering |
|---|---|---|---|---|
| 1 | `subheading` | `subheading` | Text | Article sub-headline / lead quote. Render conditionally under post title. |
| 2 | `main_image_source_&_info` | `mainImageSourceInfo` | Text | Caption / credit for featured image. Render conditionally under image. |
| 3 | `author_subtitle` | `authorSubtitle` | Text | Author designation / subtitle. Render conditionally under author name. |
| 4 | `estimated_read_time` | `estimatedReadTime` | Text | Reading time badge (e.g. "5 min read"). Render conditionally with fallback. |
| 5 | `secnd_image` | `secndImage` | Image (`node { sourceUrl altText }`) | Secondary article image. Render conditionally if present. |
| 6 | `image_source_` | `imageSource` | Text | Source text/URL for external image attribution. Render conditionally. |
| 7 | `video_source` | `videoSource` | URL | Video embed URL (YouTube/Vimeo/MP4). Render conditionally with embedded player. |
| 8 | `other_url` | `otherUrl` | URL | External reference/resource link. Render conditionally as CTA button. |

## Sample response (for shaping component props / types)

```json
{
  "data": {
    "post": {
      "id": "cG9zdDo3NQ==",
      "databaseId": 75,
      "title": "Essential Remote Work Strategies for Freelancers in 2026",
      "slug": "essential-remote-work-strategies-for-freelancers-in-2026",
      "date": "2026-07-27T13:05:21",
      "content": "<p class=\"wp-block-paragraph\">...</p>",
      "excerpt": "<p>Learn how to scale your freelance business...</p>",
      "featuredImage": {
        "node": {
          "sourceUrl": "http://localhost/freebirdsdigest/wp-content/uploads/2026/07/remote-work.jpg",
          "altText": "Remote work setup",
          "mediaDetails": { "width": 1280, "height": 854 }
        }
      },
      "author": {
        "node": {
          "name": "Sarah Connor",
          "nicename": "sarah",
          "avatar": { "url": "https://secure.gravatar.com/avatar/...?s=96&d=mm&r=g" }
        }
      },
      "categories": {
        "nodes": [
          { "id": "dGVybToxMQ==", "name": "Freelance Life", "slug": "freelance-life" },
          { "id": "dGVybToz", "name": "Remote Work", "slug": "remote-work" }
        ]
      },
      "seo": {
        "title": "Essential Remote Work Strategies for Freelancers in 2026 - Freebirds Digest",
        "metaDesc": "Scale your freelance business with modern remote work strategies.",
        "canonical": "https://freebirdsdigest.com/news/essential-remote-work-strategies-for-freelancers-in-2026",
        "opengraphTitle": "Essential Remote Work Strategies for Freelancers in 2026",
        "opengraphDescription": "Scale your freelance business with modern remote work strategies.",
        "opengraphImage": { "sourceUrl": "https://freebirdsdigest.com/images/remote-work.jpg" },
        "twitterTitle": "",
        "twitterDescription": ""
      },
      "articleMetadata": {
        "subheading": "Proven tactics to boost productivity and secure high-paying clients.",
        "mainImageSourceInfo": "Photo by Unsplash / Workspace",
        "authorSubtitle": "Senior Remote Work Consultant",
        "estimatedReadTime": "6 min read",
        "secndImage": {
          "node": {
            "sourceUrl": "https://freebirdsdigest.com/images/wfh-setup.jpg",
            "altText": "WFH setup"
          }
        },
        "imageSource": "https://unsplash.com",
        "videoSource": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "otherUrl": "https://github.com/topics/freelance"
      }
    }
  }
}
```

## Known issues & conditional handling rules

1. **Conditional evaluation for all custom fields**: Always wrap `articleMetadata` fields with safe optional chaining (`articleMetadata?.field`) and non-empty string/URL checks to prevent errors when fields are null or unpopulated.
2. **Empty SEO fallbacks**: `metaDesc`, `twitterTitle`, `twitterDescription` fallback chains prevent empty meta tags.
3. **Video Source embedding**: Parse `videoSource` URL (YouTube iframe embed, Vimeo embed, or `<video>` player) and render conditionally.
4. **Other URL badge**: Render `otherUrl` as an external resource badge conditionally if present.