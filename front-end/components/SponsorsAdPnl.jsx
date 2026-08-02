import Image from "next/image";
import Link from "next/link";
import { fetchSponsors } from "@/lib/sponsors";
import { Megaphone, Sparkles } from "lucide-react";

export default async function SponsorsAdPnl() {
  const showSponsorsAd = true;

  if (!showSponsorsAd) {
    return null;
  }

  const sponsors = await fetchSponsors();
  const displaySponsors = sponsors.slice(0, 3);

  return (
    <aside className="sponsorsAdPnl flex flex-col gap-4 font-inter 2xl:sticky 2xl:top-24 self-start">
      <section className="bg-bg-surface p-5 rounded-3xl border border-brandborder shadow-2xs space-y-4">
        {/* Sponsored Parent Header
        <div className="flex items-center justify-between border-b border-brandborder pb-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand flex items-center gap-1.5">
              <Megaphone className="w-3.5 h-3.5 text-brand" /> Sponsored
            </p>
            <h3 className="mt-0.5 text-base font-extrabold text-text-main">
              Featured Partners
            </h3>
          </div>
          <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold text-brand uppercase border border-brand/20">
            Ad
          </span>
        </div>
        */}

        {displaySponsors.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-brandborder p-5 text-center space-y-2 bg-bg-subtle/50">
            <Sparkles className="w-6 h-6 text-brand mx-auto" />
            <h4 className="text-xs font-bold text-text-main">Partner With Us</h4>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Reach thousands of remote professionals and digital nomads.
            </p>
            <Link
              href="/advertising"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline pt-1"
            >
              Learn More
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {displaySponsors.map((post) => {
              const sponsoreData = post.sponsore || post.sponsors || {};
              const { redirectionLink, adTitleIfAny, adImage } = sponsoreData;

              const imageUrl =
                adImage?.node?.sourceUrl ||
                adImage?.sourceUrl ||
                (typeof adImage === "string" ? adImage : null) ||
                post.featuredImage?.node?.sourceUrl;

              const imageAlt =
                adImage?.node?.altText ||
                post.featuredImage?.node?.altText ||
                adTitleIfAny ||
                post.title;

              const titleText = adTitleIfAny || post.title || "Featured Partner";

              if (!imageUrl) return null;

              return (
                <a
                  key={post.id}
                  href={redirectionLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col overflow-hidden rounded-2xl border border-brandborder/70 bg-bg-subtle/50 hover:border-brand/40 hover:bg-bg-subtle transition-all shadow-2xs"
                >
                  {/* Ad Image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-bg-surface">
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      sizes="320px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Title Section with Padding & Subtle Background */}
                  <div className="p-3.5">
                    <h4 className="text-xs font-bold text-text-main group-hover:text-brand transition-colors line-clamp-2">
                      {titleText}
                    </h4>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>
    </aside>
  );
}
