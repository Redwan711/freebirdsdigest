import ArticleImage from "./ArticleImage";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const fallbackImage = "/placeholder-news.svg";

import { cleanText, truncateText } from "@/lib/text-utils";

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

  const featuredStory = posts[0];
  const splitStories = posts.slice(1, 3);
  const gridStories = posts.slice(3);

  return (
    <section className="font-inter grid gap-6 rounded-3xl border border-brandborder bg-bg-surface p-5 sm:p-8 shadow-2xs">
      {/* Feed Header */}
      <div className="flex items-center justify-between border-b border-brandborder pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand" />
          <p className="text-xs font-bold uppercase tracking-wider text-brand">Fresh Articles</p>
        </div>
      </div>

      {/* Featured Top Story (matches RightSideNewsPnl top1sec) */}
      {featuredStory && (
        <section className="grid grid-cols-1 items-center gap-6 border-b border-brandborder pb-6 sm:grid-cols-2">
          <Link
            href={`/news/${featuredStory.slug}`}
            className="group relative overflow-hidden rounded-2xl bg-bg-subtle aspect-16/10"
          >
            <ArticleImage
              src={featuredStory?.featuredImage?.node?.sourceUrl || fallbackImage}
              alt={featuredStory?.featuredImage?.node?.altText || featuredStory?.title || "featured article"}
              fill
              sizes="(max-width: 768px) 100vw, 550px"
              priority
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand">Latest Story</span>
            <h3 className="text-xl font-extrabold text-text-main md:text-2xl leading-snug hover:text-brand transition-colors">
              <Link href={`/news/${featuredStory.slug}`}>
                {featuredStory.title}
              </Link>
            </h3>
            <p className="text-sm leading-relaxed text-text-muted">
              {truncateText(cleanText(featuredStory.excerpt || ""), 180)}
            </p>
            <p className="text-xs text-text-muted pt-2 font-medium">
              {formatPostDate(featuredStory.date)}
            </p>
          </div>
        </section>
      )}

      {/* 2-Column Split Stories (matches RightSideNewsPnl top2sec) */}
      {splitStories.length > 0 && (
        <section className="grid grid-cols-1 gap-6 border-b border-brandborder pb-6 2xl:grid-cols-2">
          <div className="grid grid-cols-1 gap-4 border-b border-brandborder pb-6 sm:grid-cols-2 2xl:border-b-0 2xl:border-r 2xl:pb-0 2xl:pr-6">
            {splitStories[0] && (
              <>
                <Link
                  href={`/news/${splitStories[0].slug}`}
                  className="group relative overflow-hidden rounded-xl bg-bg-subtle aspect-16/10"
                >
                  <ArticleImage
                    src={splitStories[0]?.featuredImage?.node?.sourceUrl || fallbackImage}
                    alt={splitStories[0]?.featuredImage?.node?.altText || splitStories[0]?.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 350px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <div className="text space-y-1.5">
                  <h3 className="text-base font-bold text-text-main hover:text-brand transition-colors line-clamp-2">
                    <Link href={`/news/${splitStories[0].slug}`}>
                      {splitStories[0]?.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-text-muted line-clamp-2">
                    {truncateText(cleanText(splitStories[0]?.excerpt || ""), 120)}
                  </p>
                  <p className="text-[11px] text-text-muted font-medium pt-1">
                    {formatPostDate(splitStories[0]?.date)}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {splitStories[1] && (
              <>
                <Link
                  href={`/news/${splitStories[1].slug}`}
                  className="group relative overflow-hidden rounded-xl bg-bg-subtle aspect-16/10"
                >
                  <ArticleImage
                    src={splitStories[1]?.featuredImage?.node?.sourceUrl || fallbackImage}
                    alt={splitStories[1]?.featuredImage?.node?.altText || splitStories[1]?.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 350px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <div className="text space-y-1.5">
                  <h3 className="text-base font-bold text-text-main hover:text-brand transition-colors line-clamp-2">
                    <Link href={`/news/${splitStories[1].slug}`}>
                      {splitStories[1]?.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-text-muted line-clamp-2">
                    {truncateText(cleanText(splitStories[1]?.excerpt || ""), 120)}
                  </p>
                  <p className="text-[11px] text-text-muted font-medium pt-1">
                    {formatPostDate(splitStories[1]?.date)}
                  </p>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Grid of Remaining Articles (matches RightSideNewsPnl grid6sec) */}
      {gridStories.length > 0 && (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gridStories.map((story) => (
            <Link
              key={story.id}
              href={`/news/${story.slug}`}
              className="group flex flex-col gap-2.5 rounded-xl border border-brandborder/60 p-3 bg-bg-subtle/70 hover:bg-bg-subtle hover:border-brand/40 transition-all shadow-2xs"
            >
              <div className="image relative overflow-hidden rounded-lg bg-bg-subtle aspect-16/10">
                <ArticleImage
                  src={story?.featuredImage?.node?.sourceUrl || fallbackImage}
                  alt={story?.featuredImage?.node?.altText || story?.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
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
        </section>
      )}
    </section>
  );
}
