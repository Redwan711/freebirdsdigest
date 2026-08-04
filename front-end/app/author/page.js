import Image from "next/image";
import Link from "next/link";
import { getAllAuthors } from "@/lib/authors";
import { siteName } from "@/lib/site";
import {
  Users,
  MapPin,
  CheckCircle2,
  Globe,
  ArrowRight,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { TwitterIcon, LinkedinIcon, GithubIcon } from "@/components/SocialIcons";

export const metadata = {
  title: `Our Editorial Team & Authors | ${siteName}`,
  description:
    "Meet the remote work strategists, tech analysts, and digital nomad columnists behind Freebirds Digest.",
};

export default function AuthorsPage() {
  const authors = getAllAuthors();

  return (
    <main className="mx-auto max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1536px] px-4 py-10 md:px-6 font-inter space-y-10">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-brandborder bg-gradient-to-br from-brand/10 via-bg-surface to-accent/10 p-8 sm:p-12 shadow-xs space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-brand border border-brand/20">
          <Users className="w-4 h-4" />
          <span>Editorial Collective</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-main tracking-tight font-jakarta">
          Meet Our Writers & Analysts
        </h1>
        <p className="text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed">
          The voices shaping the future of work. Our global team delivers actionable insights, technical reviews, and tax strategies for remote professionals.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-6 text-xs font-semibold text-text-muted">
          <span className="flex items-center gap-2 bg-bg-surface px-4 py-2 rounded-full border border-brandborder">
            <Sparkles className="w-4 h-4 text-brand" /> {authors.length} Verified Contributors
          </span>
          <span className="flex items-center gap-2 bg-bg-surface px-4 py-2 rounded-full border border-brandborder">
            <BookOpen className="w-4 h-4 text-accent" /> 100+ Published Guides
          </span>
        </div>
      </section>

      {/* Authors Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {authors.map((author) => {
          const {
            id,
            slug,
            name,
            role,
            location,
            bio,
            description,
            avatar,
            socials,
            topics,
          } = author;

          return (
            <div
              key={id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-brandborder bg-bg-surface p-6 shadow-xs transition-all duration-300 hover:border-brand/40 hover:shadow-md"
            >
              <div className="space-y-5">
                {/* Author Avatar & Header Info */}
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 shrink-0 aspect-square overflow-hidden rounded-full border-2 border-brand/30 bg-bg-subtle shadow-sm">
                    {avatar ? (
                      <Image
                        src={avatar}
                        alt={name}
                        fill
                        className="object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-brand/10 text-brand">
                        <Image
                          src="/free_Bird icon-.png"
                          alt={name}
                          width={36}
                          height={36}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Link
                        href={`/author/${slug}`}
                        className="text-lg font-extrabold text-text-main hover:text-brand transition-colors font-jakarta truncate"
                      >
                        {name}
                      </Link>
                      <CheckCircle2 className="w-4 h-4 text-accent fill-accent/20 shrink-0" />
                    </div>
                    <p className="text-xs text-text-muted font-bold line-clamp-1">
                      {role}
                    </p>
                    {location && (
                      <p className="text-[11px] text-text-muted flex items-center gap-1 font-medium">
                        <MapPin className="w-3 h-3 text-brand shrink-0" />
                        <span>{location}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Bio / Description */}
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3">
                  {description || bio}
                </p>

                {/* Topics */}
                {topics && topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {topics.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-bg-subtle border border-brandborder px-2.5 py-0.5 text-[11px] font-semibold text-text-muted"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Socials & Profile Button */}
              <div className="mt-6 pt-4 border-t border-brandborder/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-text-muted">
                  {socials?.twitter && (
                    <a
                      href={socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full hover:bg-bg-subtle hover:text-brand transition-colors"
                      title="Twitter"
                    >
                      <TwitterIcon className="w-4 h-4" />
                    </a>
                  )}
                  {socials?.linkedin && (
                    <a
                      href={socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full hover:bg-bg-subtle hover:text-brand transition-colors"
                      title="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {socials?.github && (
                    <a
                      href={socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full hover:bg-bg-subtle hover:text-brand transition-colors"
                      title="GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {socials?.website && (
                    <a
                      href={socials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full hover:bg-bg-subtle hover:text-brand transition-colors"
                      title="Website"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <Link
                  href={`/author/${slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 border border-brand/20 px-3.5 py-1.5 text-xs font-bold text-brand transition-all hover:bg-brand hover:text-white"
                >
                  View Profile <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
