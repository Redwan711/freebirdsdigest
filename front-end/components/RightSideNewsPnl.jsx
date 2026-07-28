import Image from "next/image";
import Link from "next/link";
import { fetchMainNewPreview } from "@/lib/main-new-preview";

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

function truncateText(text, maxLength = 180) {
    if (!text || text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength).trimEnd()}...`;
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

const RightSideNewsPnl = async () => {
    const posts = await fetchMainNewPreview();
    const mainStory = posts[0];
    const splitStories = posts.slice(1, 3);
    const gridStories = posts.slice(3, 9);

    return (
        <div className='rightSideNewsPnl font-inter grid gap-6 rounded-3xl border border-brandborder bg-bg-surface p-5 sm:p-8 shadow-2xs'>

            <section className="top1sec grid grid-cols-1 items-center gap-6 border-b border-brandborder pb-6 font-inter sm:grid-cols-2">
                <Link href={mainStory ? `/news/${mainStory.slug}?pid=${mainStory.databaseId}` : "#"} className="group overflow-hidden rounded-2xl bg-bg-subtle aspect-16/10">
                    <Image
                        src={mainStory?.featuredImage?.node?.sourceUrl || fallbackImage}
                        alt={mainStory?.featuredImage?.node?.altText || mainStory?.title || "main digest preview"}
                        width={450}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
                <div className="right space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand">Top Story</span>
                    <h3 className="text-xl font-extrabold text-text-main md:text-3xl leading-snug hover:text-brand transition-colors">
                        <Link href={mainStory ? `/news/${mainStory.slug}?pid=${mainStory.databaseId}` : "#"}>
                            {mainStory?.title || "Main digest preview is currently being prepared."}
                        </Link>
                    </h3>
                    <p className="text-sm leading-relaxed text-text-muted">
                        {truncateText(cleanText(mainStory?.excerpt || ""), 180)}
                    </p>
                    <p className="text-xs text-text-muted pt-2 font-medium">
                        {formatPostDate(mainStory?.date)}
                    </p>
                </div>
            </section>

            <section className="top2sec grid grid-cols-1 gap-6 border-b border-brandborder pb-6 font-inter 2xl:grid-cols-2">

                <div className="lefttNews grid grid-cols-1 gap-4 border-b border-brandborder pb-6 sm:grid-cols-2 2xl:border-b-0 2xl:border-r 2xl:pb-0 2xl:pr-6">
                    {splitStories[0] && (
                        <>
                            <Link href={`/news/${splitStories[0].slug}?pid=${splitStories[0].databaseId}`} className="group overflow-hidden rounded-xl bg-bg-subtle aspect-16/10">
                                <Image
                                    src={splitStories[0]?.featuredImage?.node?.sourceUrl || fallbackImage}
                                    alt={splitStories[0]?.featuredImage?.node?.altText || splitStories[0]?.title}
                                    width={350}
                                    height={220}
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />
                            </Link>
                            <div className="text space-y-1.5">
                                <h3 className="text-base font-bold text-text-main hover:text-brand transition-colors line-clamp-2">
                                    <Link href={`/news/${splitStories[0].slug}?pid=${splitStories[0].databaseId}`}>
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
                            <Link href={`/news/${splitStories[1].slug}?pid=${splitStories[1].databaseId}`} className="group overflow-hidden rounded-xl bg-bg-subtle aspect-16/10">
                                <Image
                                    src={splitStories[1]?.featuredImage?.node?.sourceUrl || fallbackImage}
                                    alt={splitStories[1]?.featuredImage?.node?.altText || splitStories[1]?.title}
                                    width={350}
                                    height={220}
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />
                            </Link>
                            <div className="text space-y-1.5">
                                <h3 className="text-base font-bold text-text-main hover:text-brand transition-colors line-clamp-2">
                                    <Link href={`/news/${splitStories[1].slug}?pid=${splitStories[1].databaseId}`}>
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

            <section className="grid6sec grid grid-cols-1 gap-6 font-inter sm:grid-cols-2 lg:grid-cols-3">
                {gridStories.map((story) => (
                    <Link 
                        key={story.id} 
                        href={`/news/${story.slug}?pid=${story.databaseId}`} 
                        className="group flex flex-col gap-2.5 rounded-xl border border-brandborder/60 p-3 bg-bg-subtle/70 hover:bg-bg-subtle hover:border-brand/40 transition-all shadow-2xs"
                    >
                        <div className="image overflow-hidden rounded-lg bg-bg-subtle aspect-16/10">
                            <Image
                                src={story?.featuredImage?.node?.sourceUrl || fallbackImage}
                                alt={story?.featuredImage?.node?.altText || story?.title}
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
            </section>
        </div>
    )
}

export default RightSideNewsPnl

