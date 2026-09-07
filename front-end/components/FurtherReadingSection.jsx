"use client";

import React from "react";
import { BookOpen, ExternalLink, ShieldCheck } from "lucide-react";
import ParsedContent from "@/components/ParsedContent";

/**
 * FurtherReadingSection Component
 * Renders the ACF "Further Reading & Trusted Resources" section under the FAQ section.
 *
 * @param {Object} props
 * @param {string} props.content - HTML string from ACF WYSIWYG editor
 * @param {string} [props.title="Further Reading & Trusted Resources"] - Section heading
 * @param {string} [props.subtitle="Verified external links, guides & official documentation"] - Subtitle
 * @param {string} [props.className] - Additional wrapper CSS classes
 */
export default function FurtherReadingSection({
  content,
  title = "Further Reading & Trusted Resources",
  subtitle = "Verified external links, guides & official documentation",
  className = "",
}) {
  if (!content || typeof content !== "string" || !content.trim()) {
    return null;
  }

  return (
    <section className={`w-full py-6 ${className}`}>
      <div className="rounded-3xl border border-brandborder bg-bg-surface p-6 sm:p-8 shadow-xs">
        {/* Section Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brandborder/60 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Trusted Resources</span>
            </div>
            <h2 className="mt-3 text-xl font-bold tracking-tight text-text-main sm:text-2xl font-heading">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-xs sm:text-sm text-text-muted">
                {subtitle}
              </p>
            )}
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-text-muted bg-bg-subtle px-3 py-1.5 rounded-xl border border-brandborder/60 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Verified Sources</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert text-text-main prose-p:leading-relaxed prose-p:text-text-main prose-a:text-brand prose-a:font-semibold prose-a:underline hover:prose-a:text-brand-dark prose-strong:text-text-main prose-ul:my-4 prose-ul:pl-5 prose-ul:list-disc prose-li:my-1.5 prose-li:leading-relaxed text-sm sm:text-base">
          <ParsedContent html={content} />
        </div>
      </div>
    </section>
  );
}
