import Image from "next/image";
import Link from "next/link";
import { fetchMainNewPreview } from "@/lib/main-new-preview";

const fallbackImage = "/prothomalo-bangla_2026-07-09_nxgtx74x_bbm.avif";

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

const RightSideNewsPnl = async () => {
    const posts = await fetchMainNewPreview();
    const mainStory = posts[0];
    const splitStories = posts.slice(1, 3);
    const gridStories = posts.slice(3, 9);

    return (
        <div className='rightSideNewsPnl font-bangali grid gap-6'>

            <section className="top1sec grid grid-cols-1 items-center gap-4 border-b border-brandborder pb-4 font-bangali sm:grid-cols-2 sm:max-h-100">
                <Link href={mainStory ? `/news/${mainStory.slug}?pid=${mainStory.databaseId}` : "#"} className="leftt h-full">
                    <Image
                        src={mainStory?.featuredImage?.node?.sourceUrl || fallbackImage}
                        alt={mainStory?.featuredImage?.node?.altText || mainStory?.title || "main new preview"}
                        width={350}
                        height={250}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
                <div className="right">
                    <h3 className="text-2xl font-bold text-gray-900 md:text-[38px]">
                        {mainStory?.title || "Main new preview is not available right now."}
                    </h3>
                    <p>
                        {truncateText(cleanText(mainStory?.excerpt || ""), 220)}
                    </p>
                    <p className="mt-4 text-[16px] text-gray-500">
                        {formatPostDate(mainStory?.date)}
                    </p>
                </div>
            </section>

            <section className="top2sec grid grid-cols-1 gap-4 border-b border-brandborder pb-4 font-bangali 2xl:grid-cols-2">

                <div className="lefttNews grid grid-cols-1 gap-4 border-b border-brandborder pb-4 sm:grid-cols-2 2xl:border-b-0 2xl:border-r 2xl:pb-0 2xl:pr-4">
                    <Link href={splitStories[0] ? `/news/${splitStories[0].slug}?pid=${splitStories[0].databaseId}` : "#"} className="image">
                        <Image
                            src={splitStories[0]?.featuredImage?.node?.sourceUrl || fallbackImage}
                            alt={splitStories[0]?.featuredImage?.node?.altText || splitStories[0]?.title || "main new preview"}
                            width={350}
                            height={250}
                            className="object-cover size-full transition-transform duration-300 group-hover:scale-105"
                        />
                    </Link>
                    <div className="text">
                        <h3 className="text-[20px] font-bold text-gray-900">
                            {splitStories[0]?.title || "No post available"}
                        </h3>
                        <p>
                            {truncateText(cleanText(splitStories[0]?.excerpt || ""), 180)}
                        </p>
                        <p className="mt-2 text-[16px] text-gray-500">
                            {formatPostDate(splitStories[0]?.date)}
                        </p>
                    </div>

                </div>

                <div className="righttNews grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Link href={splitStories[1] ? `/news/${splitStories[1].slug}?pid=${splitStories[1].databaseId}` : "#"} className="image">
                        <Image
                            src={splitStories[1]?.featuredImage?.node?.sourceUrl || fallbackImage}
                            alt={splitStories[1]?.featuredImage?.node?.altText || splitStories[1]?.title || "main new preview"}
                            width={350}
                            height={250}
                            className="object-cover size-full transition-transform duration-300 group-hover:scale-105"
                        />
                    </Link>
                    <div className="text">
                        <h3 className="text-[20px] font-bold text-gray-900">
                            {splitStories[1]?.title || "No post available"}
                        </h3>
                        <p>
                            {truncateText(cleanText(splitStories[1]?.excerpt || ""), 180)}
                        </p>
                        <p className="mt-2 text-[16px] text-gray-500">
                            {formatPostDate(splitStories[1]?.date)}
                        </p>
                    </div>
                </div>

            </section>

            <section className="grid6sec grid grid-cols-1 gap-6 font-bangali sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
                <Link href={gridStories[0] ? `/news/${gridStories[0].slug}?pid=${gridStories[0].databaseId}` : "#"} className="one flex flex-col gap-2">
                    <div className="image">
                        <Image
                            src={gridStories[0]?.featuredImage?.node?.sourceUrl || fallbackImage}
                            alt={gridStories[0]?.featuredImage?.node?.altText || gridStories[0]?.title || "main new preview"}
                            width={350}
                            height={250}
                            className="object-cover aspect-[16/9] transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <div className="text">
                        <h3 className="text-[20px] font-bold text-gray-900">
                            {gridStories[0]?.title || "No post available"}
                        </h3>
                        <p>
                            {truncateText(cleanText(gridStories[0]?.excerpt || ""), 180)}
                        </p>
                        <p className="mt-2 text-[16px] text-gray-500">
                            {formatPostDate(gridStories[0]?.date)}
                        </p>
                    </div>
                </Link>
                <Link href={gridStories[1] ? `/news/${gridStories[1].slug}?pid=${gridStories[1].databaseId}` : "#"} className="two flex flex-col gap-2">
                    <div className="image">
                        <Image
                            src={gridStories[1]?.featuredImage?.node?.sourceUrl || fallbackImage}
                            alt={gridStories[1]?.featuredImage?.node?.altText || gridStories[1]?.title || "main new preview"}
                            width={350}
                            height={250}
                            className="object-cover aspect-[16/9] transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <div className="text">
                        <h3 className="text-[20px] font-bold text-gray-900">
                            {gridStories[1]?.title || "No post available"}
                        </h3>
                        <p>
                            {truncateText(cleanText(gridStories[1]?.excerpt || ""), 180)}
                        </p>
                        <p className="mt-2 text-[16px] text-gray-500">
                            {formatPostDate(gridStories[1]?.date)}
                        </p>
                    </div>
                </Link>
                <Link href={gridStories[2] ? `/news/${gridStories[2].slug}?pid=${gridStories[2].databaseId}` : "#"} className="three flex flex-col gap-2">
                    <div className="image">
                        <Image
                            src={gridStories[2]?.featuredImage?.node?.sourceUrl || fallbackImage}
                            alt={gridStories[2]?.featuredImage?.node?.altText || gridStories[2]?.title || "main new preview"}
                            width={350}
                            height={250}
                            className="object-cover aspect-[16/9] transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <div className="text">
                        <h3 className="text-[20px] font-bold text-gray-900">
                            {gridStories[2]?.title || "No post available"}
                        </h3>
                        <p>
                            {truncateText(cleanText(gridStories[2]?.excerpt || ""), 180)}
                        </p>
                        <p className="mt-2 text-[16px] text-gray-500">
                            {formatPostDate(gridStories[2]?.date)}
                        </p>
                    </div>
                </Link>
                <Link href={gridStories[3] ? `/news/${gridStories[3].slug}?pid=${gridStories[3].databaseId}` : "#"} className="four flex flex-col gap-2">
                    <div className="image">
                        <Image
                            src={gridStories[3]?.featuredImage?.node?.sourceUrl || fallbackImage}
                            alt={gridStories[3]?.featuredImage?.node?.altText || gridStories[3]?.title || "main new preview"}
                            width={350}
                            height={250}
                            className="object-cover aspect-[16/9] transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <div className="text">
                        <h3 className="text-[20px] font-bold text-gray-900">
                            {gridStories[3]?.title || "No post available"}
                        </h3>
                        <p>
                            {truncateText(cleanText(gridStories[3]?.excerpt || ""), 180)}
                        </p>
                        <p className="mt-2 text-[16px] text-gray-500">
                            {formatPostDate(gridStories[3]?.date)}
                        </p>
                    </div>
                </Link>
                <Link href={gridStories[4] ? `/news/${gridStories[4].slug}?pid=${gridStories[4].databaseId}` : "#"} className="five flex flex-col gap-2">
                    <div className="image">
                        <Image
                            src={gridStories[4]?.featuredImage?.node?.sourceUrl || fallbackImage}
                            alt={gridStories[4]?.featuredImage?.node?.altText || gridStories[4]?.title || "main new preview"}
                            width={350}
                            height={250}
                            className="object-cover aspect-[16/9] transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <div className="text">
                        <h3 className="text-[20px] font-bold text-gray-900">
                            {gridStories[4]?.title || "No post available"}
                        </h3>
                        <p>
                            {truncateText(cleanText(gridStories[4]?.excerpt || ""), 180)}
                        </p>
                        <p className="mt-2 text-[16px] text-gray-500">
                            {formatPostDate(gridStories[4]?.date)}
                        </p>
                    </div>
                </Link>
                <Link href={gridStories[5] ? `/news/${gridStories[5].slug}?pid=${gridStories[5].databaseId}` : "#"} className="six flex flex-col gap-2">
                    <div className="image">
                        <Image
                            src={gridStories[5]?.featuredImage?.node?.sourceUrl || fallbackImage}
                            alt={gridStories[5]?.featuredImage?.node?.altText || gridStories[5]?.title || "main new preview"}
                            width={350}
                            height={250}
                            className="object-cover aspect-[16/9] transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <div className="text">
                        <h3 className="text-[20px] font-bold text-gray-900">
                            {gridStories[5]?.title || "No post available"}
                        </h3>
                        <p>
                            {truncateText(cleanText(gridStories[5]?.excerpt || ""), 180)}
                        </p>
                        <p className="mt-2 text-[16px] text-gray-500">
                            {formatPostDate(gridStories[5]?.date)}
                        </p>
                    </div>
                </Link>

                
            </section>



        </div>
    )
}

export default RightSideNewsPnl
