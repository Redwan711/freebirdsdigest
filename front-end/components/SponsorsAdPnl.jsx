import Image from "next/image";
import Link from "next/link";
import { fetchSponsors } from "@/lib/sponsors";
import { ExternalLink, Megaphone, Sparkles } from "lucide-react";

export default async function SponsorsAdPnl() {
  const sponsors = await fetchSponsors();
  const displaySponsors = sponsors.slice(0, 3);

  return (
    <aside className="sponsorsAdPnl flex flex-col gap-4 font-inter 2xl:sticky 2xl:top-24 self-start">
      <section className="bg-bg-surface p-5 rounded-3xl border border-brandborder shadow-2xs space-y-4">
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
              Learn More <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {displaySponsors.map((post) => {
              const sponsoreData = post.sponsore || post.sponsors || {};
              const { redirectionLink, adTitleIfAny, adTextIfAny, adImage } =
                sponsoreData;

              // Image Fallback Chain: ACF adImage -> WP Featured Image
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

              const titleText = adTitleIfAny || post.title || "Featured Sponsor";
              const targetUrl = redirectionLink || "#";

              return (
                <a
                  key={post.id}
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2.5 rounded-2xl border border-brandborder/70 p-3 bg-bg-subtle/60 hover:bg-bg-subtle hover:border-brand/40 transition-all shadow-2xs"
                >
                  {imageUrl ? (
                    <div className="relative aspect-16/9 w-full overflow-hidden rounded-xl bg-bg-surface border border-brandborder/50">
                      <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill
                        sizes="280px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-full rounded-xl bg-gradient-to-r from-brand/10 via-accent/10 to-brand/5 border border-brandborder/40 flex items-center justify-between px-3">
                      <span className="text-xs font-extrabold text-brand uppercase tracking-wider">
                        Sponsor
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-brand" />
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-extrabold text-text-main group-hover:text-brand transition-colors line-clamp-1">
                        {titleText}
                      </h4>
                      <ExternalLink className="w-3 h-3 text-text-muted group-hover:text-brand shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    {adTextIfAny && (
                      <p className="text-[11px] text-text-muted leading-snug line-clamp-2">
                        {adTextIfAny}
                      </p>
                    )}
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
