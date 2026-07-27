import Image from "next/image";
import Link from "next/link";
import { cache } from "react";
import { fetchAPI } from "@/lib/api";
import { defaultDescription, siteName, siteUrl } from "@/lib/site";
import { ArrowLeft, Clock, Calendar, User, Tag, BookOpen, Mail, Sparkles, CheckCircle2, MessageSquare } from "lucide-react";
import ArticleActions from "@/components/ArticleActions";
import NewsletterForm from "@/components/NewsletterForm";

const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      databaseId
      slug
      title
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
    }
  }
`;

const GET_POST_BY_DATABASE_ID = `
  query GetPostByDatabaseId($postId: ID!) {
    post(id: $postId, idType: DATABASE_ID) {
      id
      databaseId
      slug
      title
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
      title: `Article Not Found | ${siteName}`,
      robots: { index: false, follow: false },
    };
  }

  const seo = post.seo || {};
  const pageTitle = seo.title || cleanHtml(post.title);
  
  const description =
    seo.metaDesc ||
    seo.opengraphDescription ||
    cleanHtml(post.excerpt) ||
    defaultDescription;

  const canonicalPath = seo.canonical || `${siteUrl}/news/${post.slug}`;
  const ogTitle = seo.opengraphTitle || pageTitle;
  const ogDesc = seo.opengraphDescription || description;
  const image = seo.opengraphImage?.sourceUrl || post.featuredImage?.node?.sourceUrl;
  const twTitle = seo.twitterTitle || ogTitle;
  const twDesc = seo.twitterDescription || ogDesc;

  return {
    title: pageTitle,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: canonicalPath,
      siteName,
      title: ogTitle,
      description: ogDesc,
      publishedTime: post.date,
      modifiedTime: post.modified || post.date,
      images: image
        ? [{ url: image, alt: post.featuredImage?.node?.altText || cleanHtml(post.title) }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: twTitle,
      description: twDesc,
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

  if (!post) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 md:px-6 font-inter">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-brand transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="rounded-3xl border border-brandborder bg-bg-surface p-12 shadow-sm text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand">
            <BookOpen className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-text-main">Article Not Found</h1>
          <p className="mt-3 text-text-muted max-w-md mx-auto">
            We couldn't locate the post you're looking for. It may have been moved or updated.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] shadow-md"
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

  // Author identity resolution
  const authorNode = post.author?.node;
  const rawAuthorName = authorNode?.name;
  const isDefaultAdmin = !rawAuthorName || rawAuthorName.toLowerCase() === 'admin';
  const displayAuthorName = !isDefaultAdmin
    ? rawAuthorName
    : (authorSubtitle || "Freebirds Editorial Team");
  const authorAvatarUrl = authorNode?.avatar?.url;
  const cleanExcerptText = cleanHtml(post.excerpt || "");

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 md:px-6 font-inter">
      {/* Top Floating Action Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-brandborder/60 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-muted hover:text-brand transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Articles</span>
        </Link>

        <ArticleActions title={post.title} />
      </div>

      <article className="grid gap-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: cleanHtml(post.title),
              description: cleanExcerptText,
              datePublished: post.date,
              dateModified: post.modified || post.date,
              mainEntityOfPage: `${siteUrl}/news/${post.slug}`,
              image: post.featuredImage?.node?.sourceUrl
                ? [post.featuredImage.node.sourceUrl]
                : undefined,
              author: {
                "@type": "Person",
                name: displayAuthorName,
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
          {/* Categories Badges */}
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {post.categories?.nodes?.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent border border-accent/20 px-3.5 py-1.5 transition-all hover:bg-accent hover:text-white shadow-2xs"
              >
                <Tag className="w-3 h-3" />
                {category.name}
              </Link>
            ))}
          </div>

          {/* Article Title */}
          <h1 className="text-3xl font-extrabold tracking-tight text-text-main sm:text-4xl md:text-5xl md:leading-[1.16]">
            {post.title}
          </h1>

          {/* Subheading / Lead Excerpt Quote */}
          {(subheading || cleanExcerptText) && (
            <div className="relative overflow-hidden rounded-2xl bg-bg-surface border-l-4 border-brand p-5 shadow-2xs">
              <p className="text-base sm:text-lg font-medium leading-relaxed text-text-main/90 italic">
                "{cleanHtml(subheading || cleanExcerptText)}"
              </p>
            </div>
          )}

          {/* Author & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-brandborder py-4 text-sm text-text-muted">
            <div className="flex items-center gap-3">
              {authorAvatarUrl && !authorAvatarUrl.includes("d=mm") ? (
                <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-brand/30 shadow-xs">
                  <Image
                    src={authorAvatarUrl}
                    alt={displayAuthorName}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand/20 to-accent/20 text-brand font-extrabold text-base border border-brand/20 shadow-xs">
                  {displayAuthorName.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-bold text-text-main flex items-center gap-1.5 text-sm sm:text-base">
                  {displayAuthorName}
                  <CheckCircle2 className="w-4 h-4 text-accent fill-accent/20" />
                </p>
                <p className="text-xs text-text-muted">Remote & Freelance Specialist</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold">
              <span className="flex items-center gap-1.5 text-text-muted bg-bg-subtle px-3 py-1.5 rounded-full border border-brandborder">
                <Calendar className="w-3.5 h-3.5 text-brand" />
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              </span>

              <span className="flex items-center gap-1.5 text-text-muted bg-bg-subtle px-3 py-1.5 rounded-full border border-brandborder">
                <Clock className="w-3.5 h-3.5 text-accent" />
                {estimatedReadTime ? estimatedReadTime : "4 min read"}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Main Image Frame */}
        {post.featuredImage?.node?.sourceUrl && (
          <figure className="group relative overflow-hidden rounded-3xl border border-brandborder bg-bg-subtle shadow-md">
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {mainImageSourceInfo && (
              <figcaption className="bg-bg-surface/90 backdrop-blur-md p-3 text-center text-xs font-medium text-text-muted border-t border-brandborder">
                {mainImageSourceInfo}
              </figcaption>
            )}
          </figure>
        )}

        {/* Key Highlights Quick Box */}
        {cleanExcerptText && (
          <section className="rounded-3xl bg-gradient-to-br from-brand/5 via-bg-surface to-accent/5 border border-brandborder p-6 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Key Takeaways</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-text-main font-medium">
              {cleanExcerptText}
            </p>
          </section>
        )}

        {/* Article Body Content — Gutenberg HTML Styling */}
        <div className="prose prose-lg max-w-none text-text-main prose-headings:font-extrabold prose-headings:text-text-main prose-headings:tracking-tight prose-p:leading-8 prose-p:text-text-main prose-a:text-brand prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-strong:text-text-main prose-blockquote:border-l-brand prose-blockquote:text-text-muted [&_.wp-block-paragraph]:mb-6 [&_.wp-block-heading]:mt-10 [&_.wp-block-heading]:mb-4 [&_.wp-block-quote]:border-l-4 [&_.wp-block-quote]:border-brand [&_.wp-block-quote]:pl-5 [&_.wp-block-quote]:py-2 [&_.wp-block-quote]:italic [&_.wp-block-image]:my-8 [&_.wp-block-image_img]:rounded-3xl [&_.wp-block-image_img]:shadow-sm [&_.wp-block-list]:pl-6 [&_.wp-block-list]:list-disc [&_.wp-block-list_li]:mb-2">
          <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
        </div>

        {/* Secondary Image display if available */}
        {secondImageSourceUrl && (
          <figure className="my-6 relative aspect-video overflow-hidden rounded-3xl border border-brandborder bg-bg-subtle shadow-sm">
            <Image
              src={secondImageSourceUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
          </figure>
        )}

        {/* E-E-A-T Author Bio Card */}
        <div className="rounded-3xl border border-brandborder bg-bg-surface p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          {authorAvatarUrl && !authorAvatarUrl.includes("d=mm") ? (
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-brand/30 shrink-0 shadow-sm">
              <Image
                src={authorAvatarUrl}
                alt={displayAuthorName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand/20 to-accent/20 text-brand font-extrabold text-2xl border border-brand/20 shadow-sm">
              {displayAuthorName.charAt(0)}
            </div>
          )}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h4 className="text-base sm:text-lg font-extrabold text-text-main">
                {displayAuthorName}
              </h4>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-bold text-accent border border-accent/20">
                <CheckCircle2 className="w-3 h-3" /> Verified Author
              </span>
            </div>
            <p className="text-xs text-text-muted font-medium">
              Freelance & Remote Work Specialist at Freebirds Digest
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
              Covering digital nomad workflows, freelancing career growth, remote business tools, and work-from-home strategies.
            </p>
          </div>
        </div>

        {/* Article Footer & Interactive Newsletter Box */}
        <footer className="mt-6 pt-6 border-t border-brandborder space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Topics:</span>
              {post.categories?.nodes?.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="text-xs font-semibold text-text-muted hover:text-brand bg-bg-subtle px-3 py-1 rounded-full border border-brandborder transition-colors"
                >
                  #{cat.name}
                </Link>
              ))}
            </div>

            <ArticleActions title={post.title} />
          </div>

          {/* Interactive Remote Worker Newsletter Subscription Box */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand/10 via-bg-surface to-accent/10 border border-brandborder p-8 shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand">
                <Mail className="w-4 h-4" /> Freebirds Digest Newsletter
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-text-main">
                Elevate your remote work & freelance journey
              </h3>
              <p className="text-sm text-text-muted max-w-xl">
                Join thousands of remote professionals receiving actionable guides, tool recommendations, and career insights every week.
              </p>
            </div>

            <NewsletterForm />
          </div>
        </footer>
      </article>
    </main>
  );
}



