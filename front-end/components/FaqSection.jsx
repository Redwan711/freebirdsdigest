"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { parseFaqs } from "@/lib/faq-parser";

/**
 * FaqSection Component
 * Renders an accessible, interactive FAQ accordion UI and embeds valid schema.org/FAQPage JSON-LD.
 *
 * @param {Object} props
 * @param {Array<{question: string, answer: string}>|string} props.faqs - FAQ items or raw ACF string
 * @param {string} [props.title="Frequently Asked Questions"] - Section heading
 * @param {string} [props.subtitle] - Section subtitle
 * @param {boolean} [props.showSchema=true] - Embed JSON-LD structured data script tag
 * @param {string} [props.className] - Additional wrapper CSS classes
 * @param {boolean} [props.allowMultiple=false] - Allow multiple items open at once
 */
function renderFaqAnswer(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-text-main">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function FaqSection({
  faqs,
  title = "Frequently Asked Questions",
  subtitle = "Clear answers to help you navigate your journey.",
  showSchema = true,
  className = "",
  allowMultiple = false,
}) {
  const parsedFaqs = parseFaqs(faqs);

  const [openIndexes, setOpenIndexes] = useState([0]); // Open first by default

  if (!parsedFaqs || parsedFaqs.length === 0) {
    return null;
  }

  const toggleIndex = (index) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  // Build schema.org FAQPage payload
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: parsedFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className={`w-full py-8 scroll-mt-24 ${className}`}>
      {/* Schema.org FAQPage JSON-LD Payload */}
      {showSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ</span>
          </div>
          {title && (
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-text-main sm:text-3xl font-heading">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 text-sm text-text-muted sm:text-base">
              {subtitle}
            </p>
          )}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {parsedFaqs.map((faq, index) => {
            const isOpen = openIndexes.includes(index);
            const questionId = `faq-q-${index}`;
            const answerId = `faq-a-${index}`;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-brandborder bg-bg-surface shadow-xs transition-all duration-200 hover:border-brand/40"
              >
                <button
                  id={questionId}
                  aria-controls={answerId}
                  aria-expanded={isOpen}
                  onClick={() => toggleIndex(index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium text-text-main transition-colors hover:text-brand focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <span className="text-base font-semibold sm:text-lg">
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 bg-brand/10 text-brand border-brand/30"
                        : "border-brandborder bg-bg-subtle text-text-muted"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  hidden={!isOpen}
                  className={`border-t border-brandborder/60 px-5 pb-6 pt-4 text-sm leading-relaxed text-text-muted sm:text-base whitespace-pre-line ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  {renderFaqAnswer(faq.answer)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

