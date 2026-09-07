import FreelanceRateCalculator from "@/components/FreelanceRateCalculator";
import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";

export const metadata = {
  title: "Calculate Your Freelance Rate - Free Birds Digest",
  description:
    "A simple and clean freelance hourly rate calculator. Easily calculate your target hourly rate, day rate, and monthly revenue.",
};

export default function FreelanceRateCalculatorPage() {
  return (
    <main className="min-h-screen bg-bg-base text-text-main py-10 px-4 sm:px-6 font-inter">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-muted hover:text-brand transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/news/calculate-freelance-rate?pid=195"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg-subtle border border-brandborder text-text-muted hover:text-brand text-xs font-semibold transition"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Read Full Article</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple Calculator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-main font-heading tracking-tight">
            Calculate Your Freelance Rate
          </h1>
          <p className="text-text-muted text-sm max-w-md mx-auto">
            Input your income goal, optional expenses, taxes, and billable hours to calculate your rate instantly.
          </p>
        </div>

        {/* Simplified Calculator Component */}
        <FreelanceRateCalculator />

        {/* Footer info */}
        <div className="text-center text-xs text-text-muted pt-4 border-t border-brandborder">
          <p>
            Formula:{" "}
            <code className="bg-bg-subtle px-2 py-0.5 rounded border border-brandborder text-text-main">
              (Income + Expenses + Taxes) ÷ Billable Hours
            </code>
          </p>
        </div>
      </div>
    </main>
  );
}
