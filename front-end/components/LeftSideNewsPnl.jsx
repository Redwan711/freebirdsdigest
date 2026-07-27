import Image from "next/image";
import Link from "next/link";
import { fetchSidePanelNews } from "@/lib/side-panel-news";

const fallbackImage = "/prothomalo-bangla_2026-07-09_nxgtx74x_bbm.avif";

function cleanText(htmlString = "") {
    return htmlString.replace(/<[^>]*>/g, "").trim();
}

function truncateText(text, maxLength = 110) {
    if (!text || text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength).trimEnd()}...`;
}

function formatSidebarDate(dateString) {
    if (!dateString) {
        return "";
    }

    return new Intl.DateTimeFormat("bn-BD", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(dateString));
}

const LeftSideNewsPnl = async () => {
    const posts = await fetchSidePanelNews();

    return (
        <aside className="leftSideNewsPnl flex flex-col gap-4 font-bangali">
            <section className="sidebarCard bg-white p-4 shadow-sm">
                {/* <div className="mb-4 flex items-center justify-between gap-3 border-b border-gray-200 pb-3">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Side Panel News</p>
                        <h3 className="mt-1 text-xl font-bold text-gray-900">সাইড প্যানেল নিউজ</h3>
                    </div>
                    <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                        {posts.length}
                    </span>
                </div> */}

                {posts.length === 0 ? (
                    <p className="text-sm text-gray-500">এই ক্যাটাগরিতে এখনো কোনো পোস্ট নেই।</p>
                ) : (
                    <div className="grid gap-4">
                        {posts.map((post) => {
                            const imageUrl = post.featuredImage?.node?.sourceUrl || fallbackImage;
                            const imageAlt = post.featuredImage?.node?.altText || post.title;

                            return (
                                <Link
                                    key={post.id}
                                    href={`/news/${post.slug}?pid=${post.databaseId}`}
                                    className="group grid grid-cols-[96px_minmax(0,1fr)] gap-3 rounded-xl border border-gray-100 p-2 transition-colors hover:border-brand/30 hover:bg-brand/5"
                                >
                                    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                                        <Image
                                            src={imageUrl}
                                            alt={imageAlt}
                                            fill
                                            sizes="96px"
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="flex min-w-0 flex-col justify-between gap-2 py-1">
                                        <div className="space-y-1">
                                            <h4 className="line-clamp-2 text-[15px] font-bold leading-snug text-gray-900 group-hover:text-brand">
                                                {post.title}
                                            </h4>
                                            <p className="line-clamp-2 text-sm leading-6 text-gray-600">
                                                {truncateText(cleanText(post.excerpt || ""), 100)}
                                            </p>
                                        </div>

                                        <span className="text-xs text-gray-400">
                                            {formatSidebarDate(post.date)}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </section>
        </aside>
    );
};

export default LeftSideNewsPnl