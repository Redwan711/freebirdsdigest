import Image from "next/image";
import Link from "next/link";
import { fetchHeroNews } from "@/lib/hero-news";
import { fetchPromotionalImage } from "@/lib/promotional-image";

const fallbackImage = "/prothomalo-bangla_2026-07-09_nxgtx74x_bbm.avif";

function formatHeroDate(dateString) {
  if (!dateString) {
    return "";
  }

  return new Intl.DateTimeFormat("bn-BD", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

function cleanText(htmlString = "") {
  return htmlString.replace(/<[^>]*>/g, "").trim();
}

function truncateText(text, maxLength = 140) {
  if (!text || text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
}

const HeroNews = async () => {
  const { topNews, trendingNews } = await fetchHeroNews();
  const promotionalImagePost = await fetchPromotionalImage();
  const topStory = topNews[0];
  const headerHeroImage =
    promotionalImagePost?.featuredImage?.node?.sourceUrl || fallbackImage;
  const headerHeroImageAlt =
    promotionalImagePost?.featuredImage?.node?.altText ||
    promotionalImagePost?.title ||
    "Hero Image";

  return (
    <div className="pt-8">
      <section className="container mx-auto bg-red-50 border border-brandborder rounded-xl overflow-hidden">
        <div className="headerHeroImage w-full overflow-hidden">
          <Image
            src={headerHeroImage}
            alt={headerHeroImageAlt}
            width={1248}
            height={80}
            className="w-full object-cover"
            priority
          />
        </div>

        <section className="mainTopNews w-full bg-background p-6 md:p-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="topNews border-r-0 lg:border-r lg:border-gray-300 lg:pr-6">
            {topStory ? (
              <Link
                href={`/news/${topStory.slug}?pid=${topStory.databaseId}`}
                className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]"
              >
                <div className="font-bangali grid grid-cols-1 gap-3">
                  <h3 className="text-[18px] font-bold leading-snug md:text-[24px]">
                    {topStory.title}
                  </h3>
                  <p className="text-[14px] leading-6 text-gray-700 md:text-[16px]">
                    {truncateText(cleanText(topStory.excerpt), 160)}
                  </p>
                  <span className="text-sm text-gray-500">
                    {formatHeroDate(topStory.date)}
                  </span>
                </div>                

                <div className="image relative aspect-16/12 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={
                      topStory.featuredImage?.node?.sourceUrl || fallbackImage
                    }
                    alt={
                      topStory.featuredImage?.node?.altText || topStory.title
                    }
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover"
                  />
                </div>
              </Link>
            ) : (
              <p className="font-bangali text-gray-500">
                Top news is not available right now.
              </p>
            )}
          </div>

          <div className="trandingNews grid gap-4 sm:grid-cols-2 xl:grid-cols-2 grid-rows-2">
            {trendingNews.map((post) => (
              <Link
                href={`/news/${post.slug}?pid=${post.databaseId}`}
                key={post.id}
                className="trandingNewsItem flex gap-3 rounded-lg border border-gray-100 bg-white p-3 shadow-sm"
              >
                <div className="texts font-bangali flex min-w-0 flex-1 flex-col justify-between gap-2">
                  <h4 className="text-[14px] font-bold leading-snug text-gray-900 md:text-[15px]">
                    {post.title}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {formatHeroDate(post.date)}
                  </span>
                </div>

                <div className="relative size-23 shrink-0 overflow-hidden rounded-md bg-gray-100">
                  <Image
                    src={post.featuredImage?.node?.sourceUrl || fallbackImage}
                    alt={post.featuredImage?.node?.altText || post.title}
                    fill
                    sizes="92px"
                    className="object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default HeroNews;
