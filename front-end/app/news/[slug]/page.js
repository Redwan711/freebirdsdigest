import Image from "next/image";
import Link from "next/link";
import { cache } from "react";
import { fetchAPI } from "@/lib/api";
import { defaultDescription, siteName, siteUrl } from "@/lib/site";

const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      date
      modified
      content
      excerpt
      articleMetadata {
        subheading
        mainImageSourceInfo
        authorSubtitle
        estimatedReadTime
        secndImage {
          node {
            sourceUrl
          }
        }
        imageSource
        videoSource
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

const GET_POST_BY_DATABASE_ID = `
  query GetPostByDatabaseId($postId: ID!) {
    post(id: $postId, idType: DATABASE_ID) {
      id
      slug
      title
      date
      modified
      content
      excerpt
      articleMetadata {
        subheading
        mainImageSourceInfo
        authorSubtitle
        estimatedReadTime
        secndImage {
          node {
            sourceUrl
          }
        }
        imageSource
        videoSource
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

function formatPostDate(dateString) {
  if (!dateString) {
    return "";
  }

  return new Intl.DateTimeFormat("bn-BD", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

function cleanHtml(htmlString = "") {
  return htmlString.replace(/<[^>]*>/g, "").trim();
}

const fetchPost = cache(async (postSlug, postId) => {
  let data = null;

  if (postId) {
    data = await fetchAPI(GET_POST_BY_DATABASE_ID, {
      variables: { postId },
    });
  }

  if (!data?.post) {
    data = await fetchAPI(GET_POST_BY_SLUG, {
      variables: { slug: postSlug },
    });
  }

  return data?.post;
});

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const { pid } = await searchParams;
  const post = await fetchPost(slug, pid);

  if (!post) {
    return {
      title: "সংবাদ পাওয়া যায়নি",
      robots: { index: false, follow: false },
    };
  }

  const description = cleanHtml(post.excerpt) || defaultDescription;
  const canonicalPath = `/news/${post.slug}`;
  const image = post.featuredImage?.node?.sourceUrl;

  return {
    title: cleanHtml(post.title),
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "article",
      locale: "bn_BD",
      url: canonicalPath,
      siteName,
      title: cleanHtml(post.title),
      description,
      publishedTime: post.date,
      modifiedTime: post.modified || post.date,
      images: image
        ? [{ url: image, alt: post.featuredImage.node.altText || cleanHtml(post.title) }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: cleanHtml(post.title),
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function PostPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const postSlug = resolvedParams.slug;
  const postId = resolvedSearchParams?.pid;

  const post = await fetchPost(postSlug, postId);
  const articleMetadata = post?.articleMetadata ?? {};
  const {
    subheading,
    mainImageSourceInfo,
    authorSubtitle,
    estimatedReadTime,
    secndImage,
    imageSource,
    videoSource,
  } = articleMetadata;
  const secondImageSourceUrl = secndImage?.node?.sourceUrl;

  if (!post) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 md:px-6">
        <Link href="/" className="mb-6 inline-flex text-sm text-gray-500 hover:text-black">
          Back to home
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">Post not found</h1>
          <p className="mt-3 text-gray-600">
            The article for this URL could not be loaded from WordPress.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      <Link href="/" className="mb-6 inline-flex text-sm text-gray-500 hover:text-black">
        Back to home
      </Link>

      {/* <Image
        src={secondImageSourceUrl}
        alt={secndImage?.node.altText || post.title}
        sizes="(max-width: 768px) 100vw, 896px"
        className="object-cover"
        fill
      /> */}

      <article className="grid gap-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: cleanHtml(post.title),
              description: cleanHtml(post.excerpt),
              datePublished: post.date,
              dateModified: post.modified || post.date,
              mainEntityOfPage: `${siteUrl}/news/${post.slug}`,
              image: post.featuredImage?.node?.sourceUrl
                ? [post.featuredImage.node.sourceUrl]
                : undefined,
              author: {
                "@type": "Organization",
                name: siteName,
              },
              publisher: {
                "@type": "Organization",
                name: siteName,
                logo: {
                  "@type": "ImageObject",
                  url: `${siteUrl}/astha-logo.png`,
                },
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 text-sm text-gray-500">
            {post.categories?.nodes?.map((category) => (
              <span key={category.slug} className="rounded-full bg-gray-100 px-3 py-1">
                {category.name}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">{post.title}</h1>
          <time dateTime={post.date} className="text-[18px] font-bangali text-gray-500">
            {formatPostDate(post.date)}
          </time>
        </div>

        {post.featuredImage?.node?.sourceUrl && (
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
            <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 text-center">
              {mainImageSourceInfo}
            </p>
          </div>
        )}

        <div className="prose max-w-none prose-headings:font-bold prose-p:leading-8">
          <p className="text-lg text-gray-600">{cleanHtml(post.excerpt || "")}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
        </div>
      </article>
    </main>
  );
}
