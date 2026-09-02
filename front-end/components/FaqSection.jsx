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
    <section className={`w-full py-10 ${className}`}>
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
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ</span>
          </div>
          {title && (
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
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
                className="overflow-hidden rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xs transition-all duration-200 hover:border-accent/40 hover:shadow-xs"
              >
                <button
                  id={questionId}
                  aria-controls={answerId}
                  aria-expanded={isOpen}
                  onClick={() => toggleIndex(index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium text-foreground transition-colors hover:text-accent focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="text-base font-semibold sm:text-lg">
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-between rounded-full border border-border bg-background transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-accent/10 text-accent border-accent/30" : "text-muted-foreground"
                    }`}
                  >
                    <ChevronDown className="mx-auto w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    className="border-t border-border/40 px-5 pb-6 pt-4 text-sm leading-relaxed text-muted-foreground sm:text-base whitespace-pre-line"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
