import Image from "next/image";
import { fetchBottomPageAd } from "@/lib/bottom-page-ads";

function formatRedirectionUrl(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export default async function BottomPageAd({ className = "" }) {
  const adPost = await fetchBottomPageAd();

  if (!adPost) return null;

  // Extract variables for current rendering and future usage
  const sponsoreData = adPost.sponsore || adPost.sponsors || {};
  
  const rawRedirectionLink = sponsoreData.redirectionLink || adPost.redirectionLink;
  const redirectionLink = formatRedirectionUrl(rawRedirectionLink);
  
  const postLink = adPost.slug ? `/news/${adPost.slug}?pid=${adPost.databaseId}` : null;
  const finalLink = redirectionLink || postLink;
  const isExternal = Boolean(redirectionLink);

  // Image source (prefers ACF adImage, falls back to featuredImage)
  const imageUrl =
    sponsoreData.adImage?.node?.sourceUrl ||
    sponsoreData.adImage?.sourceUrl ||
    (typeof sponsoreData.adImage === "string" ? sponsoreData.adImage : null) ||
    adPost.featuredImage?.node?.sourceUrl;

  // Metadata variables stored for future optional use (titles/text)
  const adTitle = sponsoreData.adTitleIfAny || adPost.title || "";
  const adText = sponsoreData.adTextIfAny || "";
  const imageAlt =
    sponsoreData.adImage?.node?.altText ||
    adPost.featuredImage?.node?.altText ||
    adTitle ||
    "Bottom Page Advertisement";

  if (!imageUrl) return null;

  const imageElement = (
    <div className="relative w-full h-[180px] sm:h-[220px] md:h-[250px] overflow-hidden rounded-3xl border border-brandborder bg-bg-surface shadow-xs group">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 720px"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
        priority={false}
      />
    </div>
  );

  return (
    <div className={`bottomPageAd w-full mt-6 ${className}`}>
      {finalLink ? (
        <a
          href={finalLink}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="block w-full h-[180px] sm:h-[220px] md:h-[250px] transition-opacity hover:opacity-95"
          title={adTitle || "Advertisement"}
        >
          {imageElement}
        </a>
      ) : (
        imageElement
      )}
    </div>
  );
}
