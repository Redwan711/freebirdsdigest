import ArticleImage from "@/components/ArticleImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchCategoryNews } from "../../lib/category-news";
import { siteName, siteUrl } from "@/lib/site";
import { cleanText, truncateText, formatCategoryTitle } from "@/lib/text-utils";

const fallbackImage = "/placeholder-news.svg";

export async function generateMetadata({ params }) {
  const { category } = await params;
  const posts = await fetchCategoryNews(category);

  if (!posts || posts.length === 0) {
    return {
      title: `Page Not Found | ${siteName}`,
      robots: {
        index: false,
        follow: false,
        nocache: true,
      },
    };
  }

  const formattedTitle = formatCategoryTitle(category);

  return {
    title: formattedTitle,
    description: `Read the latest articles, guides, and updates in ${formattedTitle} on Freebirds Digest.`,
    alternates: {
      canonical: `/${category}`,
    },
    openGraph: {
      type: "website",
      url: `/${category}`,
      title: `${formattedTitle} | Freebirds Digest`,
      description: `Read the latest articles, guides, and updates in ${formattedTitle} on Freebirds Digest.`,
    },
  };
}

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

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const currentCategory = resolvedParams.category;

  const posts = await fetchCategoryNews(currentCategory);

  if (!posts || posts.length === 0) {
    notFound();
  }

  const mainStory = posts[0];
  const splitStories = posts.slice(1, 3);
  const gridStories = posts.slice(3);

  const formattedTitle = formatCategoryTitle(currentCategory);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 font-inter">
      {/* Schema.org BreadcrumbList JSON-LD Payload */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: formattedTitle,
                item: `${siteUrl}/${currentCategory}`,
              },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />

      <section className="mb-8 flex flex-col gap-2 border-b border-brandborder pb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-brand">Category Digest</p>
        <h1 className="font-jakarta text-3xl font-extrabold text-text-main md:text-4xl tracking-tight">
          {formattedTitle}
        </h1>
      </section>

      <div className="rightSideNewsPnl font-inter grid gap-6">
        <section className="top1sec grid grid-cols-1 items-center gap-6 border-b border-brandborder pb-6 sm:grid-cols-2">
          <Link href={`/news/${mainStory.slug}`} className="group relative overflow-hidden rounded-2xl bg-bg-subtle aspect-16/10">
            <ArticleImage
              src={mainStory.featuredImage?.node?.sourceUrl || fallbackImage}
              alt={mainStory.featuredImage?.node?.altText || mainStory.title}
              fill
              sizes="(max-width: 768px) 100vw, 550px"
              priority
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <div className="right space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand">Featured Article</span>
            <h3 className="text-xl font-extrabold text-text-main md:text-3xl leading-snug hover:text-brand transition-colors">
              <Link href={`/news/${mainStory.slug}`}>
                {mainStory.title}
              </Link>
            </h3>
            <p className="text-sm leading-relaxed text-text-muted">
              {truncateText(cleanText(mainStory.excerpt || ""), 200)}
            </p>
            <p className="text-xs text-text-muted pt-2 font-medium">
              {formatPostDate(mainStory.date)}
            </p>
          </div>
        </section>

        <section className="top2sec grid grid-cols-1 gap-6 border-b border-brandborder pb-6 2xl:grid-cols-2">
          <div className="lefttNews grid grid-cols-1 gap-4 border-b border-brandborder pb-6 sm:grid-cols-2 2xl:border-b-0 2xl:border-r 2xl:pb-0 2xl:pr-6">
            {splitStories[0] && (
              <>
                <Link href={`/news/${splitStories[0]?.slug}`} className="group relative overflow-hidden rounded-xl bg-bg-subtle aspect-16/10">
                  <ArticleImage
                    src={splitStories[0]?.featuredImage?.node?.sourceUrl || fallbackImage}
                    alt={splitStories[0]?.featuredImage?.node?.altText || splitStories[0]?.title || formattedTitle}
                    fill
                    sizes="(max-width: 640px) 100vw, 350px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <div className="text space-y-1.5">
                  <h3 className="text-base font-bold text-text-main hover:text-brand transition-colors line-clamp-2">
                    <Link href={`/news/${splitStories[0]?.slug}`}>
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

          <div className="righttNews grid grid-cols-1 gap-4 sm:grid-cols-2">
            {splitStories[1] && (
              <>
                <Link href={`/news/${splitStories[1]?.slug}`} className="group relative overflow-hidden rounded-xl bg-bg-subtle aspect-16/10">
                  <ArticleImage
                    src={splitStories[1]?.featuredImage?.node?.sourceUrl || fallbackImage}
                    alt={splitStories[1]?.featuredImage?.node?.altText || splitStories[1]?.title || formattedTitle}
                    fill
                    sizes="(max-width: 640px) 100vw, 350px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <div className="text space-y-1.5">
                  <h3 className="text-base font-bold text-text-main hover:text-brand transition-colors line-clamp-2">
                    <Link href={`/news/${splitStories[1]?.slug}`}>
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

        <section className="grid6sec grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gridStories.map((post) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="group flex flex-col gap-2.5 rounded-xl border border-brandborder p-3 bg-bg-surface hover:border-brand/40 transition-all shadow-2xs"
            >
              <div className="image relative overflow-hidden rounded-lg bg-bg-subtle aspect-16/10">
                <ArticleImage
                  src={post.featuredImage?.node?.sourceUrl || fallbackImage}
                  alt={post.featuredImage?.node?.altText || post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="text space-y-1">
                <h3 className="text-sm font-bold text-text-main group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-text-muted line-clamp-2">
                  {truncateText(cleanText(post.excerpt || ""), 100)}
                </p>
                <p className="text-[11px] text-text-muted font-medium pt-1">
                  {formatPostDate(post.date)}
                </p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}

