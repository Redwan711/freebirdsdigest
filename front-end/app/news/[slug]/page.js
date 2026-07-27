import Image from "next/image";
import Link from "next/link";
import { cache } from "react";
import { fetchAPI } from "@/lib/api";
import { defaultDescription, siteName, siteUrl } from "@/lib/site";
import { ArrowLeft, Clock, Calendar, User, Share2, Tag, BookOpen, Mail } from "lucide-react";

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
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
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
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { slug } = resolvedParams;
  const { pid } = resolvedSearchParams || {};
  const post = await fetchPost(slug, pid);

  if (!post) {
    return {
      title: "Article Not Found | Freebirds Digest",
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
      locale: "en_US",
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
  console.log(post.content)

  if (!post) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 md:px-6">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-brand transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="rounded-3xl border border-brandborder bg-bg-surface p-10 shadow-sm text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
            <BookOpen className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-extrabold text-text-main">Article Not Found</h1>
          <p className="mt-3 text-text-muted max-w-md mx-auto">
            We couldn't locate the post you're looking for. It may have been renamed or moved.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 shadow-md"
          >
            Browse Articles
          </Link>
        </div>
      </main>
    );
  }

  const articleMetadata = post?.articleMetadata ?? {};
  const {
    subheading,
    mainImageSourceInfo,
    authorSubtitle,
    estimatedReadTime,
    secndImage,
  } = articleMetadata;
  const secondImageSourceUrl = secndImage?.node?.sourceUrl;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      {/* Back Navigation & Breadcrumb */}
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-brand transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Digest
        </Link>

        {post.categories?.nodes?.[0] && (
          <Link
            href={`/${post.categories.nodes[0].slug}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20 transition-all hover:bg-accent/20"
          >
            <Tag className="w-3 h-3" />
            {post.categories.nodes[0].name}
          </Link>
        )}
      </div>

      <article className="grid gap-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: cleanHtml(post.title),
              description: cleanHtml(post.excerpt),
              datePublished: post.date,
              dateModified: post.modified || post.date,
              mainEntityOfPage: `${siteUrl}/news/${post.slug}`,
              image: post.featuredImage?.node?.sourceUrl
                ? [post.featuredImage.node.sourceUrl]
                : undefined,
              author: {
                "@type": "Person",
                name: authorSubtitle || siteName,
              },
              publisher: {
                "@type": "Organization",
                name: siteName,
                logo: {
                  "@type": "ImageObject",
                  url: `${siteUrl}/freeBird-logo.png`,
                },
              },
            }).replace(/</g, "\\u003c"),
          }}
        />

        {/* Article Hero Header */}
        <header className="space-y-5">
          {/* Categories Pill Tags */}
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {post.categories?.nodes?.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="rounded-full bg-accent/10 text-accent border border-accent/20 px-3.5 py-1 transition-all hover:bg-accent hover:text-white"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Article Title */}
          <h1 className="text-3xl font-extrabold tracking-tight text-text-main sm:text-4xl md:text-5xl md:leading-[1.18]">
            {post.title}
          </h1>

          {/* Subheading / Lead Excerpt */}
          {(subheading || post.excerpt) && (
            <p className="text-lg md:text-xl font-normal leading-relaxed text-text-muted border-l-4 border-brand pl-4 py-1 italic">
              {cleanHtml(subheading || post.excerpt)}
            </p>
          )}

          {/* Author & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-brandborder py-4 text-sm text-text-muted">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand font-bold text-base">
                {authorSubtitle ? authorSubtitle.charAt(0) : "F"}
              </div>
              <div>
                <p className="font-semibold text-text-main flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-brand" />
                  {authorSubtitle || "Freebirds Editorial Team"}
                </p>
                <p className="text-xs text-text-muted">Freelance & Remote Work Specialist</p>
              </div>
            </div>

            <div className="flex items-center gap-5 text-xs sm:text-sm font-medium">
              <span className="flex items-center gap-1.5 text-text-muted">
                <Calendar className="w-4 h-4 text-brand" />
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              </span>

              <span className="flex items-center gap-1.5 text-text-muted bg-bg-subtle px-3 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 text-accent" />
                {estimatedReadTime ? estimatedReadTime : "4 min read"}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Main Image */}
        {post.featuredImage?.node?.sourceUrl && (
          <figure className="group relative overflow-hidden rounded-3xl border border-brandborder bg-bg-subtle shadow-sm">
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {mainImageSourceInfo && (
              <figcaption className="bg-bg-surface/90 backdrop-blur-sm p-3 text-center text-xs font-medium text-text-muted border-t border-brandborder">
                {mainImageSourceInfo}
              </figcaption>
            )}
          </figure>
        )}

        {/* Article Body Content */}
        <div className="prose prose-lg max-w-none text-text-main prose-headings:font-bold prose-headings:text-text-main prose-p:leading-8 prose-p:text-text-main prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-strong:text-text-main prose-blockquote:border-l-brand prose-blockquote:text-text-muted">
          <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
        </div>

        {/* Secondary Image optional display */}
        {secondImageSourceUrl && (
          <figure className="my-6 relative aspect-video overflow-hidden rounded-2xl border border-brandborder bg-bg-subtle">
            <Image
              src={secondImageSourceUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
          </figure>
        )}

        {/* Article Footer & Tags */}
        <footer className="mt-8 pt-8 border-t border-brandborder space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Topics:</span>
              {post.categories?.nodes?.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="text-xs font-semibold text-text-muted hover:text-brand bg-bg-subtle px-3 py-1 rounded-full transition-colors"
                >
                  #{cat.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-text-muted flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5 text-brand" /> Share this digest
              </span>
            </div>
          </div>

          {/* Remote Worker Newsletter Subscription Box */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand/10 via-bg-surface to-accent/10 border border-brandborder p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6 shadow-sm">
            <div className="space-y-2 max-w-lg">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
                <Mail className="w-4 h-4" /> Freebirds Digest Newsletter
              </div>
              <h3 className="text-xl font-bold text-text-main">
                Elevate your remote work & freelance journey
              </h3>
              <p className="text-sm text-text-muted">
                Join thousands of remote professionals receiving actionable guides, tool recommendations, and career insights every week.
              </p>
            </div>
            <div className="mt-6 sm:mt-0 flex-shrink-0">
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-md"
              >
                Subscribe Free
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}

