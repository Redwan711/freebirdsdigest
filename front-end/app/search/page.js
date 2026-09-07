import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, User, ArrowRight, BookOpen, Compass, AlertCircle } from "lucide-react";
import { fetchSearchResults } from "@/lib/search";
import { fetchNavigationCategories } from "@/lib/categories";
import SearchInputForm from "./SearchInputForm";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const q = params?.q || "";
  const queryText = q.trim();

  return {
    title: queryText
      ? `Search results for "${queryText}" | Freebirds Digest`
      : `Search Articles | Freebirds Digest`,
    description: `Search results and remote work guides on Freebirds Digest for "${queryText}".`,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const q = params?.q || "";
  const query = q.trim();

  const [posts, categories] = await Promise.all([
    query ? fetchSearchResults(query, 30) : [],
    fetchNavigationCategories(),
  ]);

  return (
    <main className="min-h-screen bg-bg-base text-text-main font-inter py-10">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        {/* Page Header Section */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand bg-brand/10 border border-brand/20 px-3.5 py-1.5 rounded-full">
            <Search className="w-3.5 h-3.5" />
            <span>Search Digest</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
            {query ? (
              <>
                Results for &quot;<span className="text-brand">{query}</span>&quot;
              </>
            ) : (
              "Explore Freebirds Digest"
            )}
          </h1>

          <p className="text-sm text-text-muted">
            Find the latest insights, productivity tools, and career guides tailored for remote professionals.
          </p>

          {/* Direct Search Bar input */}
          <div className="pt-2">
            <SearchInputForm initialQuery={query} />
          </div>
        </div>

        {/* Results Metadata Bar */}
        {query && (
          <div className="flex items-center justify-between border-b border-brandborder pb-4 mb-8">
            <p className="text-sm font-semibold text-text-muted">
              Found <span className="text-brand font-extrabold">{posts.length}</span> {posts.length === 1 ? "article" : "articles"}
            </p>
          </div>
        )}

        {/* Search Results Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const category = post.categories?.nodes?.[0];
              const author = post.author?.node;
              const formattedDate = post.date
                ? new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : null;

              return (
                <article
                  key={post.id}
                  className="group flex flex-col bg-bg-surface border border-brandborder rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-brand/40 transition-all duration-300"
                >
                  {/* Featured Image */}
                  <Link
                    href={`/news/${post.slug}?pid=${post.databaseId}`}
                    className="relative w-full aspect-[16/9] bg-bg-subtle overflow-hidden block"
                  >
                    <Image
                      src={post.featuredImage?.node?.sourceUrl || "/freeBird-logo-new.png"}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {category && (
                      <span className="absolute top-3 left-3 bg-bg-surface/90 backdrop-blur-md text-brand font-extrabold text-[11px] px-2.5 py-1 rounded-full border border-brandborder shadow-xs">
                        {category.name}
                      </span>
                    )}
                  </Link>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-xs text-text-muted font-medium">
                        {formattedDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-brand" />
                            {formattedDate}
                          </span>
                        )}
                        {author?.name && (
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-text-muted" />
                            {author.name}
                          </span>
                        )}
                      </div>

                      <h2 className="text-lg font-bold text-text-main line-clamp-2 leading-snug group-hover:text-brand transition-colors">
                        <Link href={`/news/${post.slug}?pid=${post.databaseId}`}>
                          {post.title}
                        </Link>
                      </h2>

                      {post.excerpt && (
                        <div
                          className="text-xs text-text-muted line-clamp-3 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: post.excerpt.replace(/<[^>]+>/g, ""),
                          }}
                        />
                      )}
                    </div>

                    <div className="pt-3 border-t border-brandborder/50 flex items-center justify-between">
                      <Link
                        href={`/news/${post.slug}?pid=${post.databaseId}`}
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand hover:underline group/btn"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : query ? (
          /* Empty Search State */
          <div className="bg-bg-surface border border-brandborder rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6 shadow-sm">
            <div className="w-14 h-14 bg-brand/10 border border-brand/20 rounded-2xl flex items-center justify-center mx-auto text-brand">
              <AlertCircle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-text-main">
                No matching articles found
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                We couldn&apos;t find any articles matching &quot;<span className="text-brand font-semibold">{query}</span>&quot;. Try checking for spelling errors or searching broader terms.
              </p>
            </div>

            {/* Category Suggestions */}
            {categories.length > 0 && (
              <div className="pt-4 border-t border-brandborder space-y-3">
                <p className="text-xs font-extrabold uppercase tracking-wider text-text-muted flex items-center justify-center gap-1.5">
                  <Compass className="w-4 h-4 text-brand" />
                  <span>Browse by Category</span>
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/${cat.slug}`}
                      className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-bg-subtle border border-brandborder hover:bg-brand hover:text-white hover:border-brand transition-all"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <Link
                    href="/reviews"
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-bg-subtle border border-brandborder hover:bg-brand hover:text-white hover:border-brand transition-all"
                  >
                    Reviews
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* No Search Performed Yet */
          <div className="bg-bg-surface border border-brandborder rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6 shadow-sm">
            <div className="w-14 h-14 bg-brand/10 border border-brand/20 rounded-2xl flex items-center justify-center mx-auto text-brand">
              <BookOpen className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-text-main">
                Search Articles & Guides
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Type your topic above to explore career advice, remote tools, freelancing strategies, and industry news.
              </p>
            </div>

            {/* Popular Topics */}
            {categories.length > 0 && (
              <div className="pt-4 border-t border-brandborder space-y-3">
                <p className="text-xs font-extrabold uppercase tracking-wider text-text-muted flex items-center justify-center gap-1.5">
                  <Compass className="w-4 h-4 text-brand" />
                  <span>Popular Digest Topics</span>
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/${cat.slug}`}
                      className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-bg-subtle border border-brandborder hover:bg-brand hover:text-white hover:border-brand transition-all"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
