import Link from "next/link";
import { Sparkles, ShieldCheck, Wrench, Coins, Cpu, Heart } from "lucide-react";

export default function HomeBrandHero() {
  return (
    <section className="container mx-auto px-4 md:px-6 pt-6 pb-2">
      <div className="relative overflow-hidden rounded-3xl border border-brandborder bg-gradient-to-br from-bg-surface via-bg-surface to-brand/5 p-6 sm:p-8 md:p-10 shadow-xs">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 h-60 w-60 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-brand">
            <Sparkles className="h-3.5 w-3.5 text-brand shrink-0" />
            <span>The Independent Professional's Knowledge Platform</span>
          </div>

          {/* Primary H1 Heading */}
          <h1 className="font-jakarta text-2xl font-extrabold tracking-tight text-text-main sm:text-3xl md:text-4xl lg:text-[42px] leading-tight">
            Helping Solo Professionals Build Smarter Careers.
          </h1>

          {/* Subheading / Value Proposition */}
          <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-text-muted">
            Curated guides, software reviews, finance strategies, and actionable playbooks designed to empower freelancers, solopreneurs, and remote workers worldwide.
          </p>

          {/* Quick Pillar & Tools Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-bold">
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand text-white px-3.5 py-1.5 shadow-xs hover:bg-brand-dark transition-all hover:scale-105 active:scale-95"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Interactive Toolkit</span>
              <span className="rounded-full bg-white/25 px-1.5 py-0.5 text-[10px] font-black uppercase">
                HUB
              </span>
            </Link>

            <Link
              href="/finance"
              className="inline-flex items-center gap-1.5 rounded-full border border-brandborder bg-bg-surface px-3 py-1.5 text-text-main hover:border-brand/40 hover:text-brand transition-colors"
            >
              <Coins className="w-3.5 h-3.5 text-amber-500" />
              <span>Personal Finance</span>
            </Link>

            <Link
              href="/technology"
              className="inline-flex items-center gap-1.5 rounded-full border border-brandborder bg-bg-surface px-3 py-1.5 text-text-main hover:border-brand/40 hover:text-brand transition-colors"
            >
              <Cpu className="w-3.5 h-3.5 text-blue-500" />
              <span>Technology</span>
            </Link>

            <Link
              href="/vpn-reviews"
              className="inline-flex items-center gap-1.5 rounded-full border border-brandborder bg-bg-surface px-3 py-1.5 text-text-main hover:border-brand/40 hover:text-brand transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>VPN Reviews</span>
            </Link>

            <Link
              href="/lifestyle"
              className="inline-flex items-center gap-1.5 rounded-full border border-brandborder bg-bg-surface px-3 py-1.5 text-text-main hover:border-brand/40 hover:text-brand transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Lifestyle</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
