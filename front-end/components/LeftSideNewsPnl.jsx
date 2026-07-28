import Image from "next/image";
import Link from "next/link";
import { fetchSidePanelNews } from "@/lib/side-panel-news";

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

function truncateText(text, maxLength = 110) {
    if (!text || text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength).trimEnd()}...`;
}

function formatSidebarDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
}

const LeftSideNewsPnl = async () => {
    const posts = await fetchSidePanelNews();

    return (
        <aside className="leftSideNewsPnl flex flex-col gap-4 font-inter xl:sticky xl:top-24 self-start">
            <section className="sidebarCard bg-bg-surface p-5 rounded-3xl border border-brandborder shadow-2xs">
                <div className="mb-4 flex items-center justify-between gap-3 border-b border-brandborder pb-3">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-brand">Latest Reads</p>
                        <h3 className="mt-0.5 text-base font-extrabold text-text-main">Recent Digests</h3>
                    </div>
                    {posts.length > 0 && (
                        <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-bold text-brand">
                            {posts.length}
                        </span>
                    )}
                </div>

                {posts.length === 0 ? (
                    <p className="text-sm text-text-muted">No recent posts available.</p>
                ) : (
                    <div className="grid gap-3">
                        {posts.map((post) => {
                            const imageUrl = post.featuredImage?.node?.sourceUrl || fallbackImage;
                            const imageAlt = post.featuredImage?.node?.altText || post.title;

                            return (
                                <Link
                                    key={post.id}
                                    href={`/news/${post.slug}?pid=${post.databaseId}`}
                                    className="group grid grid-cols-[80px_minmax(0,1fr)] gap-3 rounded-xl border border-brandborder p-2 transition-all hover:border-brand/40 hover:bg-bg-subtle/60"
                                >
                                    <div className="relative aspect-square overflow-hidden rounded-lg bg-bg-subtle">
                                        <Image
                                            src={imageUrl}
                                            alt={imageAlt}
                                            fill
                                            sizes="80px"
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="flex min-w-0 flex-col justify-between gap-1 py-0.5">
                                        <div className="space-y-1">
                                            <h4 className="line-clamp-2 text-xs font-bold leading-snug text-text-main group-hover:text-brand transition-colors">
                                                {post.title}
                                            </h4>
                                            <p className="line-clamp-1 text-xs text-text-muted">
                                                {truncateText(cleanText(post.excerpt || ""), 80)}
                                            </p>
                                        </div>

                                        <span className="text-[11px] font-medium text-text-muted">
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

export default LeftSideNewsPnl;