"use client";

import Link from "next/link";
import { Calculator, ShieldCheck, Sparkles, ArrowRight, Wrench } from "lucide-react";

export default function ToolsWidget({ className = "" }) {
  return (
    <aside className={`toolsWidget flex flex-col gap-4 font-inter ${className}`}>
      <section className="bg-bg-surface p-4 sm:p-5 rounded-3xl border border-brandborder shadow-2xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-brandborder pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand/10 text-brand text-[10px] font-bold uppercase border border-brand/20">
              <Sparkles className="w-3 h-3 text-brand" />
              <span>Interactive Toolkit</span>
            </div>
            <h3 className="mt-1.5 text-base font-extrabold text-text-main font-heading">
              Freebirds Tools
            </h3>
          </div>
          <Link
            href="/tools"
            className="text-[11px] font-bold text-brand hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Tools List */}
        <div className="space-y-3">
          {/* Tool 1: Freelance Rate Calculator */}
          <Link
            href="/freelance-rate-calculator"
            className="group block p-3.5 rounded-2xl border border-brandborder/70 bg-bg-subtle/50 hover:border-brand/40 hover:bg-bg-subtle transition-all shadow-2xs"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-brand/10 text-brand shrink-0">
                  <Calculator className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-text-main group-hover:text-brand transition-colors font-heading">
                  Rate Calculator
                </span>
              </div>
              <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded-md bg-brand/10 text-brand border border-brand/20 shrink-0">
                Calculator
              </span>
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed line-clamp-2">
              Determine your ideal target hourly rate, tax buffer, & monthly billable targets.
            </p>
            <div className="mt-2.5 flex items-center gap-1 text-xs font-bold text-brand group-hover:translate-x-0.5 transition-transform">
              <span>Calculate Rate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Tool 2: Smart VPN Finder */}
          <Link
            href="/vpn-finder"
            className="group block p-3.5 rounded-2xl border border-brandborder/70 bg-bg-subtle/50 hover:border-teal-500/40 hover:bg-bg-subtle transition-all shadow-2xs"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-text-main group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors font-heading">
                  Smart VPN Finder
                </span>
              </div>
              <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 shrink-0">
                Security
              </span>
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed line-clamp-2">
              Answer 5 quick questions to match the best VPN for your remote setup.
            </p>
            <div className="mt-2.5 flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-0.5 transition-transform">
              <span>Find Best VPN</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>

        {/* Footer Hub Banner Link */}
        <Link
          href="/tools"
          className="w-full py-2.5 px-3 rounded-xl bg-bg-subtle hover:bg-brand/10 hover:text-brand border border-brandborder/60 text-text-main font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer group"
        >
          <Wrench className="w-3.5 h-3.5 text-brand" />
          <span>Explore Solopreneur Toolkit</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-brand" />
        </Link>
      </section>
    </aside>
  );
}
