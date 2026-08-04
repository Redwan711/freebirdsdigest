import Image from "next/image";
import Link from "next/link";
import { getAuthorBySlug } from "@/lib/authors";
import { fetchAPI } from "@/lib/api";
import { siteName } from "@/lib/site";
import {
  ArrowLeft,
  MapPin,
  CheckCircle2,
  Globe,
  BookOpen,
  Calendar,
  Sparkles,
  Tag,
  ArrowRight,
} from "lucide-react";
import { TwitterIcon, LinkedinIcon, GithubIcon } from "@/components/SocialIcons";

const GET_LATEST_ARTICLES = `
  query GetLatestArticles {
    posts(first: 6) {
      nodes {
        id
        databaseId
        slug
        title
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

function formatDate(dateString) {
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

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const author = getAuthorBySlug(slug);

  if (!author) {
    return {
      title: `Author Not Found | ${siteName}`,
    };
  }

  return {
    title: `${author.name} - ${author.role} | ${siteName}`,
    description: author.bio || author.description,
  };
}

export default async function AuthorProfilePage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const author = getAuthorBySlug(slug);

  if (!author) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 md:px-6 font-inter">
        <Link
          href="/author"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-brand transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Authors
        </Link>

        <div className="rounded-3xl border border-brandborder bg-bg-surface p-12 shadow-sm text-center">
          <h1 className="text-3xl font-extrabold text-text-main">
            Author Profile Not Found
          </h1>
          <p className="mt-3 text-text-muted max-w-md mx-auto">
            We couldn't locate the author profile you're looking for.
          </p>
          <Link
            href="/author"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-md"
          >
            Explore Authors Directory
          </Link>
        </div>
      </main>
    );
  }

  const {
    name,
    role,
    location,
    bio,
    description,
    avatar,
    socials,
    topics,
  } = author;

  // Fetch articles to show in the author's feed
  let articles = [];
  try {
    const data = await fetchAPI(GET_LATEST_ARTICLES);
    articles = data?.posts?.nodes ?? [];
  } catch (err) {
    console.error("Failed fetching author articles:", err);
  }

  return (
    <main className="mx-auto max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1536px] px-4 py-8 md:px-6 font-inter space-y-10">
      {/* Top Nav Back Link */}
      <div>
        <Link
          href="/author"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-muted hover:text-brand transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to All Authors</span>
        </Link>
      </div>

      {/* Author Profile Card Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-brandborder bg-bg-surface p-6 sm:p-10 shadow-xs flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
        {/* Avatar */}
        <div className="relative h-28 w-28 sm:h-36 sm:w-36 shrink-0 aspect-square overflow-hidden rounded-full border-4 border-brand/30 bg-bg-subtle shadow-md">
          {avatar ? (
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover rounded-full"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-brand/10 text-brand">
              <Image
                src="/free_Bird icon-.png"
                alt={name}
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
          )}
        </div>

        {/* Profile Content */}
        <div className="space-y-4 min-w-0 flex-1 text-center md:text-left">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main font-jakarta">
                {name}
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent border border-accent/20">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Contributor
              </span>
            </div>
            <p className="text-sm sm:text-base text-text-muted font-bold">
              {role}
            </p>
            {location && (
              <p className="text-xs text-text-muted flex items-center justify-center md:justify-start gap-1.5 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-brand shrink-0" />
                <span>{location}</span>
              </p>
            )}
          </div>

          <p className="text-sm sm:text-base text-text-main/90 leading-relaxed max-w-3xl">
            {description || bio}
          </p>

          {/* Topics */}
          {topics && topics.length > 0 && (
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Expertise:
              </span>
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full bg-bg-subtle border border-brandborder px-3 py-1 text-xs font-semibold text-text-muted"
                >
                  #{topic}
                </span>
              ))}
            </div>
          )}

          {/* Social Media Links */}
          <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
            {socials?.twitter && (
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-bg-subtle border border-brandborder px-3.5 py-1.5 text-xs font-bold text-text-muted hover:text-brand hover:border-brand/40 transition-all"
              >
                <TwitterIcon className="w-3.5 h-3.5" /> Twitter
              </a>
            )}
            {socials?.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-bg-subtle border border-brandborder px-3.5 py-1.5 text-xs font-bold text-text-muted hover:text-brand hover:border-brand/40 transition-all"
              >
                <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
              </a>
            )}
            {socials?.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-bg-subtle border border-brandborder px-3.5 py-1.5 text-xs font-bold text-text-muted hover:text-brand hover:border-brand/40 transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" /> GitHub
              </a>
            )}
            {socials?.website && (
              <a
                href={socials.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-bg-subtle border border-brandborder px-3.5 py-1.5 text-xs font-bold text-text-muted hover:text-brand hover:border-brand/40 transition-all"
              >
                <Globe className="w-3.5 h-3.5" /> Website
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Articles Published Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-brandborder pb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-text-main font-jakarta">
              Articles & Guides by {name}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((post) => {
            const imageUrl = post.featuredImage?.node?.sourceUrl;
            const categoryName = post.categories?.nodes?.[0]?.name;
            const cleanExcerpt = cleanHtml(post.excerpt || "");

            return (
              <Link
                key={post.id || post.slug}
                href={`/news/${post.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-brandborder bg-bg-surface p-4 transition-all duration-300 hover:border-brand/40 hover:shadow-md"
              >
                <div className="space-y-3">
                  {imageUrl && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-bg-subtle border border-brandborder/50">
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {categoryName && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="inline-block rounded-full bg-bg-surface/95 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-accent border border-brandborder/60 shadow-xs">
                            {categoryName}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <h3 className="text-base font-extrabold text-text-main leading-snug font-jakarta line-clamp-2 transition-colors group-hover:text-brand">
                    {post.title}
                  </h3>

                  {cleanExcerpt && (
                    <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                      {cleanExcerpt}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-brandborder/60 flex items-center justify-between text-xs text-text-muted font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand shrink-0" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </span>

                  <span className="inline-flex items-center gap-1 text-brand font-bold transition-transform group-hover:translate-x-1">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
