import { fetchAPI } from "@/lib/api";
import { extractImagesFromContent } from "@/lib/parse-images";
import { siteUrl } from "@/lib/site";

export const revalidate = 3600;

const GET_IMAGE_SITEMAP_POSTS = `
  query GetImageSitemapPosts($after: String) {
    posts(first: 100, after: $after) {
      nodes {
        slug
        title
        date
        modified
        content
        featuredImage {
          node {
            sourceUrl
            altText
            title
          }
        }
        articleMetadata {
          secndImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

function escapeXml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function fetchAllPosts() {
  const posts = [];
  let after = null;
  let hasNextPage = true;

  while (hasNextPage) {
    try {
      const data = await fetchAPI(GET_IMAGE_SITEMAP_POSTS, {
        variables: { after },
      });
      const connection = data?.posts;
      posts.push(...(connection?.nodes ?? []));
      hasNextPage = connection?.pageInfo?.hasNextPage ?? false;
      after = connection?.pageInfo?.endCursor ?? null;
    } catch (err) {
      console.error("Error fetching posts for image sitemap:", err);
      break;
    }
  }

  return posts;
}

export async function GET() {
  const posts = await fetchAllPosts();

  const urlBlocks = [];

  for (const post of posts) {
    if (!post.slug) continue;

    const postUrl = `${siteUrl}/news/${post.slug}`;
    const lastModDate = new Date(post.modified || post.date || Date.now()).toISOString();

    const postImages = [];
    const seenImageUrls = new Set();

    function addImage(url, title = "", caption = "") {
      if (!url || typeof url !== "string" || seenImageUrls.has(url)) return;
      seenImageUrls.add(url);
      postImages.push({ url, title, caption });
    }

    // 1. Featured image
    if (post.featuredImage?.node?.sourceUrl) {
      addImage(
        post.featuredImage.node.sourceUrl,
        post.featuredImage.node.title || post.title,
        post.featuredImage.node.altText || post.title
      );
    }

    // 2. Secondary image from metadata
    if (post.articleMetadata?.secndImage?.node?.sourceUrl) {
      addImage(
        post.articleMetadata.secndImage.node.sourceUrl,
        "",
        post.articleMetadata.secndImage.node.altText || ""
      );
    }

    // 3. Inline images from HTML content
    if (post.content) {
      const inlineImages = extractImagesFromContent(post.content);
      for (const img of inlineImages) {
        addImage(img.url, img.title, img.alt);
      }
    }

    // Build XML block for post if it contains images
    if (postImages.length > 0) {
      const imageXmlBlocks = postImages
        .map((img) => {
          let xml = `      <image:image>\n        <image:loc>${escapeXml(img.url)}</image:loc>`;
          if (img.title) {
            xml += `\n        <image:title>${escapeXml(img.title)}</image:title>`;
          }
          if (img.caption) {
            xml += `\n        <image:caption>${escapeXml(img.caption)}</image:caption>`;
          }
          xml += `\n      </image:image>`;
          return xml;
        })
        .join("\n");

      urlBlocks.push(
        `  <url>\n    <loc>${escapeXml(postUrl)}</loc>\n    <lastmod>${lastModDate}</lastmod>\n${imageXmlBlocks}\n  </url>`
      );
    }
  }

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlBlocks.join("\n")}
</urlset>`;

  return new Response(xmlContent, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
