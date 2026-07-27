import Image from "next/image";
import Link from "next/link";
import { fetchCategoryNews } from "../../lib/category-news";

const fallbackImage = "/prothomalo-bangla_2026-07-09_nxgtx74x_bbm.avif";

export async function generateMetadata({ params }) {
  const { category } = await params;
  const title = category.replace(/-/g, " ");

  return {
    title: `${title} সংবাদ`,
    description: `Astha News-এ ${title} বিভাগের সর্বশেষ খবর ও আপডেট পড়ুন।`,
    alternates: {
      canonical: `/${category}`,
    },
  };
}

function cleanText(htmlString = "") {
  return htmlString.replace(/<[^>]*>/g, "").trim();
}

function truncateText(text, maxLength = 180) {
  if (!text || text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
}

function formatPostDate(dateString) {
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

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const currentCategory = resolvedParams.category;

  const posts = await fetchCategoryNews(currentCategory);
  const mainStory = posts[0];
  const splitStories = posts.slice(1, 3);
  const gridStories = posts.slice(3, 9);

  const formattedCategory = currentCategory.replace(/-/g, " ");

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <section className="mb-6 flex flex-col gap-2 border-b border-brandborder pb-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Category</p>
        <h1 className="font-bangali text-3xl font-bold text-gray-900 md:text-4xl uppercase">
          {formattedCategory}
        </h1>
      </section>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-gray-500 text-lg">
            No news found in this category yet.
          </p>
        </div>
      ) : (
        <div className="rightSideNewsPnl font-bangali grid gap-6">
          <section className="top1sec grid grid-cols-1 items-center gap-4 border-b border-brandborder pb-4 font-bangali sm:grid-cols-2 sm:max-h-100">
            <Link href={`/news/${mainStory.slug}?pid=${mainStory.databaseId}`} className="leftt h-full">
              <Image
                src={mainStory.featuredImage?.node?.sourceUrl || fallbackImage}
                alt={mainStory.featuredImage?.node?.altText || mainStory.title}
                width={350}
                height={250}
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="right">
              <h3 className="text-2xl font-bold text-gray-900 md:text-[38px]">
                {mainStory.title}
              </h3>
              <p>{truncateText(cleanText(mainStory.excerpt || ""), 220)}</p>
              <p className="mt-4 text-[16px] text-gray-500">
                {formatPostDate(mainStory.date)}
              </p>
            </div>
          </section>

          <section className="top2sec grid grid-cols-1 gap-4 border-b border-brandborder pb-4 font-bangali 2xl:grid-cols-2">
            <div className="lefttNews grid grid-cols-1 gap-4 border-b border-brandborder pb-4 sm:grid-cols-2 2xl:border-b-0 2xl:border-r 2xl:pb-0 2xl:pr-4">
              <Link href={`/news/${splitStories[0]?.slug}?pid=${splitStories[0]?.databaseId || ""}`} className="image">
                <Image
                  src={splitStories[0]?.featuredImage?.node?.sourceUrl || fallbackImage}
                  alt={splitStories[0]?.featuredImage?.node?.altText || splitStories[0]?.title || formattedCategory}
                  width={350}
                  height={250}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <div className="text">
                <h3 className="text-[20px] font-bold text-gray-900">
                  {splitStories[0]?.title || "No post available"}
                </h3>
                <p>{truncateText(cleanText(splitStories[0]?.excerpt || ""), 180)}</p>
                <p className="mt-2 text-[16px] text-gray-500">
                  {formatPostDate(splitStories[0]?.date)}
                </p>
              </div>
            </div>

            <div className="righttNews grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link href={`/news/${splitStories[1]?.slug}?pid=${splitStories[1]?.databaseId || ""}`} className="image">
                <Image
                  src={splitStories[1]?.featuredImage?.node?.sourceUrl || fallbackImage}
                  alt={splitStories[1]?.featuredImage?.node?.altText || splitStories[1]?.title || formattedCategory}
                  width={350}
                  height={250}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <div className="text">
                <h3 className="text-[20px] font-bold text-gray-900">
                  {splitStories[1]?.title || "No post available"}
                </h3>
                <p>{truncateText(cleanText(splitStories[1]?.excerpt || ""), 180)}</p>
                <p className="mt-2 text-[16px] text-gray-500">
                  {formatPostDate(splitStories[1]?.date)}
                </p>
              </div>
            </div>
          </section>

          <section className="grid6sec grid grid-cols-1 gap-6 font-bangali sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
            {gridStories.map((post, index) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}?pid=${post.databaseId}`}
                className={`flex flex-col gap-2 ${index + 1}`}
              >
                <div className="image">
                  <Image
                    src={post.featuredImage?.node?.sourceUrl || fallbackImage}
                    alt={post.featuredImage?.node?.altText || post.title}
                    width={350}
                    height={250}
                    className="object-cover aspect-[16/9] transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="text">
                  <h3 className="text-[20px] font-bold text-gray-900">
                    {post.title}
                  </h3>
                  <p>{truncateText(cleanText(post.excerpt || ""), 180)}</p>
                  <p className="mt-2 text-[16px] text-gray-500">
                    {formatPostDate(post.date)}
                  </p>
                </div>
              </Link>
            ))}
          </section>
        </div>
      )}
    </main>
  );
}
