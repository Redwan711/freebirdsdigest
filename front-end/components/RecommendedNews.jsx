import Image from "next/image";
import Link from "next/link";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";

const fallbackImage = "/prothomalo-bangla_2026-07-09_nxgtx74x_bbm.avif";

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

export default function RecommendedNews({ posts = [] }) {
  if (!posts || posts.length === 0) return null;

  // Display top 3 posts
  const recommendedList = posts.slice(0, 3);

  return (
    <section className="recommendedNews mt-8 pt-8 border-t border-brandborder space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-brand mb-1">
            <Sparkles className="w-3.5 h-3.5 text-brand shrink-0" />
            <span>Recommended For You</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-text-main font-jakarta">
            Related News & Articles
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {recommendedList.map((post) => {
          const imageUrl =
            post.featuredImage?.node?.sourceUrl || fallbackImage;
          const imageAlt =
            post.featuredImage?.node?.altText || post.title || "News article";
          const categoryName = post.categories?.nodes?.[0]?.name;
          const cleanExcerpt = cleanHtml(post.excerpt || "");

          return (
            <Link
              key={post.id || post.slug}
              href={`/news/${post.slug}`}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-brandborder bg-bg-surface p-4 transition-all duration-300 hover:border-brand/40 hover:shadow-md"
            >
              <div className="space-y-3">
                {/* Article Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-bg-subtle border border-brandborder/50">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {categoryName && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-block rounded-full bg-bg-surface/95 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-accent border border-brandborder/60 shadow-xs">
                        {categoryName}
                      </span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h4 className="text-base font-extrabold text-text-main leading-snug font-jakarta line-clamp-2 transition-colors group-hover:text-brand">
                  {post.title}
                </h4>

                {/* Excerpt */}
                {cleanExcerpt && (
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                    {cleanExcerpt}
                  </p>
                )}
              </div>

              {/* Card Footer: Date & Action */}
              <div className="mt-4 pt-3 border-t border-brandborder/60 flex items-center justify-between text-xs text-text-muted font-semibold">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand shrink-0" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>

                <span className="inline-flex items-center gap-1 text-brand font-bold transition-transform group-hover:translate-x-1">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
