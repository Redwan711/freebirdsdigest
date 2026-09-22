import ArticleImage from "./ArticleImage";
import Image from "next/image";
import Link from "next/link";
import { fetchHeroNews } from "@/lib/hero-news";
import { fetchPromotionalImage } from "@/lib/promotional-image";
import { Clock } from "lucide-react";

const fallbackImage = "/placeholder-news.svg";

function formatHeroDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

import { cleanText, truncateText } from "@/lib/text-utils";

function formatRedirectionUrl(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

const HeroNews = async ({ heroData: passedHeroData } = {}) => {
  const { topNews, trendingNews } = passedHeroData || (await fetchHeroNews());
  const promotionalImagePost = await fetchPromotionalImage();
  const topStory = topNews[0];
  const sponsoreData = promotionalImagePost?.sponsore || promotionalImagePost?.sponsors || {};
  const rawRedirectionLink = sponsoreData.redirectionLink || promotionalImagePost?.redirectionLink;
  const redirectionLink = formatRedirectionUrl(rawRedirectionLink);

  const headerHeroImage =
    sponsoreData.adImage?.node?.sourceUrl ||
    sponsoreData.adImage?.sourceUrl ||
    (typeof sponsoreData.adImage === "string" ? sponsoreData.adImage : null) ||
    promotionalImagePost?.featuredImage?.node?.sourceUrl ||
    fallbackImage;

  const headerHeroImageAlt =
    sponsoreData.adImage?.node?.altText ||
    promotionalImagePost?.featuredImage?.node?.altText ||
    sponsoreData.adTitleIfAny ||
    promotionalImagePost?.title ||
    "Hero Banner";

  const postLink = promotionalImagePost?.slug
    ? `/news/${promotionalImagePost.slug}`
    : null;

  const finalLink = redirectionLink || postLink;
  const isExternal = Boolean(redirectionLink);

  const showTopBannerAd = false;

  return (
    <div className="container mx-auto px-4 md:px-6 pt-4">
      <section className="bg-bg-surface border border-brandborder rounded-3xl overflow-hidden shadow-xs">
        {showTopBannerAd && headerHeroImage && (
          finalLink ? (
            <a
              href={finalLink}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="headerHeroImage block w-full overflow-hidden max-h-[140px] relative transition-opacity hover:opacity-95"
            >
              <Image
                src={headerHeroImage}
                alt={headerHeroImageAlt}
                width={1248}
                height={140}
                className="w-full h-auto object-cover"
                priority
              />
            </a>
          ) : (
            <div className="headerHeroImage w-full overflow-hidden max-h-[140px] relative">
              <Image
                src={headerHeroImage}
                alt={headerHeroImageAlt}
                width={1248}
                height={140}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )
        )}

        <section className="mainTopNews w-full p-6 md:p-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="topNews border-r-0 lg:border-r lg:border-brandborder lg:pr-6">
            {topStory ? (
              <Link
                href={`/news/${topStory.slug}`}
                className="grid gap-5 lg:grid-cols-2 items-center group"
              >
                <div className="font-inter grid grid-cols-1 gap-3">
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand">
                    Featured Digest
                  </span>
                  <h2 className="text-xl font-bold tracking-tight leading-snug md:text-2xl text-text-main group-hover:text-brand transition-colors">
                    {topStory.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-text-muted">
                    {truncateText(cleanText(topStory.excerpt), 160)}
                  </p>
                  <span className="text-xs text-text-muted flex items-center gap-1 mt-1">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    {formatHeroDate(topStory.date)}
                  </span>
                </div>

                <div className="image relative aspect-video w-full overflow-hidden rounded-xl bg-bg-subtle shadow-sm self-center">
                  <ArticleImage
                    src={
                      topStory.featuredImage?.node?.sourceUrl || fallbackImage
                    }
                    alt={
                      topStory.featuredImage?.node?.altText || topStory.title
                    }
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    priority
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
            ) : (
              <p className="font-inter text-text-muted">
                Featured digest is currently being prepared.
              </p>
            )}
          </div>

          <div className="trandingNews grid gap-4 sm:grid-cols-2 xl:grid-cols-2 grid-rows-2">
            {trendingNews.map((post) => {
              const displayDate = post.modified || post.date;
              return (
                <Link
                  href={`/news/${post.slug}`}
                  key={post.id}
                  className="trandingNewsItem flex items-start gap-3 rounded-xl border border-brandborder bg-bg-subtle/50 p-3 shadow-2xs hover:border-brand/40 transition-all group h-full"
                >
                  <div className="texts font-inter flex min-w-0 flex-1 flex-col justify-between h-full gap-2">
                    <h4 className="text-xs sm:text-sm font-bold leading-snug text-text-main group-hover:text-brand transition-colors line-clamp-3">
                      {post.title}
                    </h4>
                    <span className="text-[10px] sm:text-xs text-text-muted mt-auto">
                      {formatHeroDate(displayDate)}
                    </span>
                  </div>

                  <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-bg-subtle self-start">
                    <ArticleImage
                      src={post.featuredImage?.node?.sourceUrl || fallbackImage}
                      alt={post.featuredImage?.node?.altText || post.title}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </section>
    </div>
  );
};

export default HeroNews;

