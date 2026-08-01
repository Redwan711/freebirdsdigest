import Image from "next/image";
import Link from "next/link";
import { cache } from "react";
import { fetchAPI } from "@/lib/api";
import { filterNavCategories } from "@/lib/categories";
import { defaultDescription, siteName, siteUrl } from "@/lib/site";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  BookOpen,
  Mail,
  Sparkles,
  CheckCircle2,
  Video,
  ExternalLink,
  Link as LinkIcon,
} from "lucide-react";
import ArticleActions from "@/components/ArticleActions";
import NewsletterForm from "@/components/NewsletterForm";
import ParsedContent from "@/components/ParsedContent";
import SponsorsAdPnl from "@/components/SponsorsAdPnl";
import TableOfContents from "@/components/TableOfContents";
import { parseHeadingsAndInjectIds } from "@/lib/toc";

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
      }
      articleMetadata {
        subheading
        authorSubtitle
        estimatedReadTime
        mainImageSourceInfo
        videoSource
        otherUrl
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
      }
      articleMetadata {
        subheading
        authorSubtitle
        estimatedReadTime
        mainImageSourceInfo
        videoSource
        otherUrl
      }
    }
  }
`;

function formatPostDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function cleanHtml(htmlString = "") {
  if (!htmlString) return "";
  return htmlString
    .replace(/<[^>]*>/g, "")
    .replace(/\[\s*&hellip;\s*\]|\[\s*\.\.\.\s*\]|&hellip;|&#8230;/gi, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function getVideoEmbedUrl(url) {
  if (!url) return "";
  const ytMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;
  }
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  return url;
}

function isDirectVideo(url) {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
}

const fetchPost = cache(async (postSlug, postId) => {
  let data = null;

  if (postId) {
    try {
      data = await fetchAPI(GET_POST_BY_DATABASE_ID, {
        variables: { postId },
      });
    } catch (err) {
      console.error("Failed fetching post by databaseId:", err);
    }
  }

  if (!data?.post && postSlug) {
    try {
      const decodedSlug = decodeURIComponent(postSlug);
      data = await fetchAPI(GET_POST_BY_SLUG, {
        variables: { slug: decodedSlug },
      });
    } catch (err) {
      console.error("Failed fetching post by decoded slug:", err);
    }
  }

  if (!data?.post && postSlug) {
    try {
      data = await fetchAPI(GET_POST_BY_SLUG, {
        variables: { slug: postSlug },
      });
    } catch (err) {
      console.error("Failed fetching post by raw slug:", err);
    }
  }

  return data?.post;
});

export async function generateMetadata({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const slug = resolvedParams?.slug;
  const pid = resolvedSearchParams?.pid;
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
  const image =
    seo.opengraphImage?.sourceUrl || post.featuredImage?.node?.sourceUrl;

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
      images: image
        ? [
          {
            url: image,
            alt: post.featuredImage?.node?.altText || cleanHtml(post.title),
          },
        ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDesc,
      images: image ? [image] : undefined,
    },
  };
}

export default async function PostPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const postSlug = resolvedParams?.slug;
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
          <h1 className="text-3xl font-extrabold text-text-main">
            Article Not Found
          </h1>
          <p className="mt-3 text-text-muted max-w-md mx-auto">
            We couldn't locate the post you're looking for. It may have been
            moved or updated.
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

  // ACF Article Metadata fields
  const articleMetadata = post?.articleMetadata ?? {};
  const {
    subheading,
    authorSubtitle,
    estimatedReadTime,
    mainImageSourceInfo,
    videoSource,
    otherUrl,
  } = articleMetadata;

  // Author identity resolution
  const authorNode = post.author?.node;
  const rawAuthorName = authorNode?.name;
  const isDefaultAdmin =
    !rawAuthorName || rawAuthorName.toLowerCase() === "admin";
  const displayAuthorName =
    !isDefaultAdmin && rawAuthorName
      ? rawAuthorName
      : "Freebirds Editorial Team";
  const authorAvatarUrl = authorNode?.avatar?.url;
  const cleanExcerptText = cleanHtml(post.excerpt || "");

  // Filter categories to only show public navigation menu categories
  const displayCategories = filterNavCategories(post.categories?.nodes ?? []);

  // Parse H1-H4 headings & inject unique IDs for Table of Contents
  const { modifiedHtml, headings } = parseHeadingsAndInjectIds(
    post.content || ""
  );

  return (
    <main className="mx-auto max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1536px] px-4 py-8 md:px-6 font-inter">
      {/* Top Navigation & Action Bar */}
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

      {/* Main 3-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
        {/* Left Column: Pinned / Sticky News Side Panel (3/12 width on Desktop) */}
        <aside className="order-2 lg:order-1 lg:col-span-3 space-y-6 lg:sticky lg:top-24 self-start">
          {/* Table of Contents Section */}
          <TableOfContents headings={headings} />

          {/* ACF Field #7: videoSource (Featured Video Embed Player) */}
          {videoSource && (
            <div className="rounded-3xl border border-brandborder bg-bg-surface p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand border-b border-brandborder pb-3">
                <Video className="w-4 h-4" />
                <span>Featured Video</span>
              </div>
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-bg-subtle border border-brandborder">
                {isDirectVideo(videoSource) ? (
                  <video
                    controls
                    src={videoSource}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <iframe
                    src={getVideoEmbedUrl(videoSource)}
                    title="Featured Article Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                )}
              </div>
            </div>
          )}

          {/* ACF Field #8: otherUrl (External Resource Link Button) */}
          {otherUrl && (
            <div className="rounded-3xl border border-brandborder bg-gradient-to-br from-accent/5 via-bg-surface to-brand/5 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-accent border-b border-brandborder/50 pb-2">
                <LinkIcon className="w-4 h-4" />
                <span>External Resource</span>
              </div>
              <a
                href={otherUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 rounded-2xl bg-accent px-5 py-3 text-xs font-bold text-white transition-all hover:bg-accent/90 hover:scale-[1.01] shadow-xs group"
              >
                <span className="truncate">Visit Resource Link</span>
                <ExternalLink className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          )}
        </aside>

        {/* Center Column: Main Article Content (6/12 width on Desktop) */}
        <article className="mainNewsBody bg-bg-surface p-6 sm:p-8 rounded-3xl border border-brandborder shadow-xs order-1 lg:order-2 lg:col-span-6 grid gap-8 min-w-0">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: cleanHtml(post.title),
                description: cleanExcerptText,
                datePublished: post.date,
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
                    url: `${siteUrl}/freeBird-logo-new.png`,
                  },
                },
              }).replace(/</g, "\\u003c"),
            }}
          />

          {/* Article Hero Header */}
          <header className="space-y-5">
            {/* Categories Badges — Only public nav categories */}
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              {displayCategories.map((category) => (
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

            {/* ACF Field: Subheading */}
            {subheading && (
              <div className="relative overflow-hidden rounded-2xl bg-bg-surface border-l-4 border-brand p-5 shadow-2xs">
                <p className="text-base sm:text-lg font-medium leading-relaxed text-text-main/90 italic">
                  "{cleanHtml(subheading)}"
                </p>
              </div>
            )}

            {/* Author & Meta Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-y border-brandborder py-4 text-sm text-text-muted min-w-0 max-w-full overflow-hidden">
              <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
                {authorAvatarUrl && !authorAvatarUrl.includes("d=mm") ? (
                  <div className="relative h-11 w-11 shrink-0 aspect-square overflow-hidden rounded-full border-2 border-brand/30 shadow-xs">
                    <Image
                      src={authorAvatarUrl}
                      alt={displayAuthorName}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <div className="relative h-11 w-11 shrink-0 aspect-square overflow-hidden rounded-full border-2 border-brand/30 bg-bg-subtle p-2 shadow-xs flex items-center justify-center">
                    <Image
                      src="/free_Bird icon-.png"
                      alt={displayAuthorName}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="font-bold text-text-main flex items-center gap-1.5 text-sm sm:text-base">
                    <span className="truncate">{displayAuthorName}</span>
                    <CheckCircle2 className="w-4 h-4 text-accent fill-accent/20 shrink-0" />
                  </p>

                  {/* ACF Field: Author Subtitle */}
                  {authorSubtitle && (
                    <p className="text-xs text-text-muted line-clamp-2 break-words">
                      {authorSubtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-semibold shrink-0">
                <span className="flex items-center gap-1.5 text-text-muted bg-bg-subtle px-3 py-1.5 rounded-full border border-brandborder">
                  <Calendar className="w-3.5 h-3.5 text-brand shrink-0" />
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                </span>

                {/* ACF Field: Estimated Read Time */}
                {estimatedReadTime && (
                  <span className="flex items-center gap-1.5 text-text-muted bg-bg-subtle px-3 py-1.5 rounded-full border border-brandborder">
                    <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
                    {estimatedReadTime}
                  </span>
                )}
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

              {/* ACF Field: Main Image Source Info */}
              {mainImageSourceInfo && (
                <figcaption className="bg-bg-surface/90 backdrop-blur-md p-3 text-center text-xs font-medium text-text-muted border-t border-brandborder">
                  <span>{mainImageSourceInfo}</span>
                </figcaption>
              )}
            </figure>
          )}

          {/* Article Body Content — Parsed with full width inline images & compact list spacing */}
          <div className="prose prose-lg max-w-none dark:prose-invert text-text-main prose-headings:font-extrabold prose-headings:text-text-main prose-headings:tracking-tight prose-headings:scroll-mt-24 prose-p:leading-8 prose-p:text-text-main prose-a:text-brand prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-strong:text-text-main prose-blockquote:border-l-brand prose-blockquote:text-text-muted prose-table:w-full prose-table:border-collapse prose-th:border prose-th:border-brandborder prose-th:p-3 prose-td:border prose-td:border-brandborder prose-td:p-3 [&_.wp-block-paragraph]:mb-6 [&_.wp-block-heading]:mt-10 [&_.wp-block-heading]:mb-4 [&_.wp-block-quote]:border-l-4 [&_.wp-block-quote]:border-brand [&_.wp-block-quote]:pl-5 [&_.wp-block-quote]:py-2 [&_.wp-block-quote]:italic [&_.wp-block-image]:my-8 [&_.wp-block-image_img]:rounded-3xl [&_.wp-block-image_img]:shadow-sm [&_.wp-block-list]:pl-6 [&_.wp-block-list]:list-disc [&_li]:mb-1 [&_li]:mt-0.5 [&_li_p]:my-0">
            <ParsedContent html={modifiedHtml} />
          </div>

          {/* E-E-A-T Author Bio Card */}
          <div className="rounded-3xl border border-brandborder bg-bg-surface p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            {authorAvatarUrl && !authorAvatarUrl.includes("d=mm") ? (
              <div className="relative h-16 w-16 shrink-0 aspect-square overflow-hidden rounded-full border-2 border-brand/30 shadow-sm">
                <Image
                  src={authorAvatarUrl}
                  alt={displayAuthorName}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            ) : (
              <div className="relative h-16 w-16 shrink-0 aspect-square overflow-hidden rounded-full border-2 border-brand/30 bg-bg-subtle p-3 shadow-sm flex items-center justify-center">
                <Image
                  src="/free_Bird icon-.png"
                  alt={displayAuthorName}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            )}
            <div className="space-y-2 min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h4 className="text-base sm:text-lg font-extrabold text-text-main">
                  {displayAuthorName}
                </h4>
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-bold text-accent border border-accent/20">
                  <CheckCircle2 className="w-3 h-3" /> Verified Author
                </span>
              </div>
              <p className="text-xs text-text-muted font-medium">
                {authorSubtitle ||
                  "Freelance & Remote Work Specialist at Freebirds Digest"}
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                Covering digital nomad workflows, freelancing career growth,
                remote business tools, and work-from-home strategies.
              </p>
            </div>
          </div>

          {/* Article Footer & In-article Newsletter Box */}
          <footer className="mt-6 pt-6 border-t border-brandborder space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                  Topics:
                </span>
                {displayCategories.map((cat) => (
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
                  Join thousands of remote professionals receiving actionable
                  guides, tool recommendations, and career insights every week.
                </p>
              </div>

              <NewsletterForm />
            </div>
          </footer>
        </article>

        {/* Right Column: Pinned / Sticky Sponsors Ad Panel Column (3/12 width on Desktop) */}
        <div className="sponsors w-full order-3 lg:order-3 lg:col-span-3 lg:sticky lg:top-24 self-start">
          <SponsorsAdPnl />
        </div>
      </div>
    </main>
  );
}
