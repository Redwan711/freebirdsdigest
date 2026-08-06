import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const fallbackImage = "/prothomalo-bangla_2026-07-09_nxgtx74x_bbm.avif";

function cleanText(htmlString = "") {
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

function truncateText(text, maxLength = 140) {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

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

export default function RecentNewsFeed({ posts = [] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="recentNewsFeed font-inter rounded-3xl border border-brandborder bg-bg-surface p-5 sm:p-8 shadow-2xs space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brandborder/60 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand/10 text-brand shadow-2xs">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand">Fresh Articles</p>
            <h3 className="text-lg font-extrabold text-text-main sm:text-xl">More Recent Digests</h3>
          </div>
        </div>
        <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand border border-brand/20">
          {posts.length} Articles
        </span>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((story) => (
          <Link
            key={story.id}
            href={`/news/${story.slug}?pid=${story.databaseId}`}
            className="group flex flex-col gap-2.5 rounded-xl border border-brandborder/60 p-3 bg-bg-subtle/70 hover:bg-bg-subtle hover:border-brand/40 transition-all shadow-2xs"
          >
            <div className="image overflow-hidden rounded-lg bg-bg-subtle aspect-16/10">
              <Image
                src={story?.featuredImage?.node?.sourceUrl || fallbackImage}
                alt={story?.featuredImage?.node?.altText || story?.title || "article thumbnail"}
                width={350}
                height={200}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="text space-y-1">
              <h3 className="text-sm font-bold text-text-main group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                {story?.title}
              </h3>
              <p className="text-xs text-text-muted line-clamp-2">
                {truncateText(cleanText(story?.excerpt || ""), 100)}
              </p>
              <p className="text-[11px] text-text-muted font-medium pt-1">
                {formatPostDate(story?.date)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
