import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PenTool,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Target,
  TrendingUp,
  Coins,
  Cpu,
  Zap,
  Heart,
  Newspaper,
  Briefcase,
  Users,
  CheckCircle2,
  Globe,
  Award,
  Search,
  FileEdit,
  FileCheck,
  RefreshCw,
  UserCheck,
  Check,
  Share2,
  XCircle,
  HelpCircle,
  Mail,
  Send,
} from "lucide-react";
import ContributeForm from "@/components/ContributeForm";

export const metadata = {
  title: "Write for Us & Contribute | FreeBirds Digest",
  description:
    "Share your expertise with freelancers, remote workers, and solo professionals worldwide. Learn about editorial guidelines, topic areas, and submit your pitch to FreeBirds Digest.",
  alternates: {
    canonical: "/contribute",
  },
  openGraph: {
    title: "Write for Us | Contribute to FreeBirds Digest",
    description:
      "Become a contributor at FreeBirds Digest. We publish practical, research-backed guides, career strategies, and tech insights for the global independent workforce.",
    url: "https://freebirdsdigest.com/contribute",
    siteName: "FreeBirds Digest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Write for Us | FreeBirds Digest",
    description:
      "Share practical wisdom with 15,000+ freelancers, creators, and remote professionals.",
  },
};

const contributionBenefits = [
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Get your work in front of 15,000+ freelancers, remote workers, digital nomads, and solopreneurs.",
  },
  {
    icon: Award,
    title: "Author Byline & Authority",
    description:
      "Build your personal brand with a permanent author profile, bio, and links to your personal portfolio.",
  },
  {
    icon: RefreshCw,
    title: "Professional Editorial Support",
    description:
      "Work closely with our experienced editors to polish your draft, refine your structure, and maximize impact.",
  },
  {
    icon: Share2,
    title: "Multi-Channel Promotion",
    description:
      "Published articles are featured across our weekly email newsletter and official social channels.",
  },
];

const contentPillars = [
  {
    icon: Coins,
    title: "Personal & Business Finance",
    description:
      "Tax strategies, retainer models, pricing, client invoicing, cash flow management, and retirement for the self-employed.",
  },
  {
    icon: Cpu,
    title: "Technology & Tools",
    description:
      "Practical reviews of AI assistants, automation workflows, cybersecurity for remote workers, and essential software suites.",
  },
  {
    icon: Zap,
    title: "Productivity & Systems",
    description:
      "Time blocking, deep work habits, async communication systems, task management, and sustainable performance.",
  },
  {
    icon: Heart,
    title: "Lifestyle & Wellbeing",
    description:
      "Managing digital fatigue, preventing burnout, ergonomic remote setups, and maintaining work-life integration.",
  },
  {
    icon: TrendingUp,
    title: "Career & Client Growth",
    description:
      "Client acquisition, proposal writing, contract negotiation, portfolio optimization, and scaling solo services.",
  },
  {
    icon: Newspaper,
    title: "Industry Trends & Analysis",
    description:
      "Remote work legislation, freelance platform shifts, economic trends, and future-of-work developments.",
  },
  {
    icon: Briefcase,
    title: "Digital Solopreneurship",
    description:
      "Building info products, newsletters, digital agency operations, and transitioning from traditional job to solo practice.",
  },
];

const editorialProcess = [
  {
    step: "01",
    title: "Submit Pitch",
    description: "Send your proposed topic, target audience takeaway, and brief outline using our pitch form below.",
    icon: Search,
  },
  {
    step: "02",
    title: "Editorial Evaluation",
    description: "Our editorial team evaluates your proposal within 3 business days for relevance and freshness.",
    icon: FileCheck,
  },
  {
    step: "03",
    title: "Draft & Feedback",
    description: "If accepted, draft your article following our style guide and collaborate with editors on revisions.",
    icon: FileEdit,
  },
  {
    step: "04",
    title: "Publication & Reach",
    description: "Your article goes live with a custom author box and gets shared across our newsletter and socials.",
    icon: Send,
  },
];

const guidelinesDo = [
  "Comprehensive length (1,200 – 2,500 words of actionable value)",
  "Rooted in real experience, case studies, or backed by reputable data",
  "Clear structure with descriptive subheadings, bullet lists, and key takeaways",
  "Actionable advice readers can implement immediately in their workflow",
  "100% original content never published elsewhere before",
];

const guidelinesDont = [
  "Generic AI-generated text or unedited synthetic summaries",
  "Promotional pitches, hidden affiliate links, or advertorial content",
  "Vague, surface-level lists without real depth or concrete examples",
  "Plagiarized ideas or previously published blog posts",
  "Overly technical jargon without clear explanations for readers",
];

const faqs = [
  {
    question: "Who can contribute to FreeBirds Digest?",
    answer:
      "We welcome experienced freelancers, remote leaders, solopreneurs, financial advisors, tech reviewers, and subject-matter experts who have real-world insights to share with independent professionals.",
  },
  {
    question: "Do you pay guest contributors?",
    answer:
      "We offer featured author bylines, permanent bio links to your personal portfolio or newsletter, and dedicated social/newsletter distribution. Select commissioned deep-dive guides are paid based on prior arrangement.",
  },
  {
    question: "What length should articles be?",
    answer:
      "We focus on depth and substance over short news snippets. Standard guest articles typically range between 1,200 and 2,500 words.",
  },
  {
    question: "Can I republish my article elsewhere after it appears on FreeBirds Digest?",
    answer:
      "To maintain high search ranking for your piece and avoid duplicate content penalties, all articles must remain exclusive to FreeBirds Digest. You are encouraged to share snippets and link back to the full article.",
  },
  {
    question: "How long does the review process take?",
    answer:
      "Our team reviews incoming pitches within 3 to 5 business days. You will receive an email confirmation regarding your submission status.",
  },
  {
    question: "Can I include links back to my website?",
    answer:
      "Yes! You will receive a dedicated author bio with links to your website, newsletter, or primary social profile. Within the body text, relevant non-promotional contextual links are permitted subject to editorial approval.",
  },
];

export default function ContributePage() {
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FreeBirds Digest",
    url: "https://freebirdsdigest.com",
    logo: "https://freebirdsdigest.com/freeBird-logo-new.png",
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://freebirdsdigest.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contribute",
        item: "https://freebirdsdigest.com/contribute",
      },
    ],
  };

  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Write for FreeBirds Digest | Editorial Pitch & Submission Guidelines",
    description:
      "Contribute your expert insights to FreeBirds Digest. Guidelines, topics, and pitch submission form for authors, freelancers, and industry experts.",
    url: "https://freebirdsdigest.com/contribute",
    publisher: jsonLdOrg,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
      />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12 md:px-6 font-inter text-text-main">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-xs font-semibold text-text-muted"
        >
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-text-main font-bold">Contribute</span>
        </nav>

        {/* ═══════════════════════════════════════════════════════════
            HERO — Styled Banner Card for Write for Us
        ═══════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 sm:p-12 md:p-16 shadow-xl border border-slate-800">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-brand/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-extrabold tracking-widest text-white/90 uppercase backdrop-blur-sm">
              <PenTool className="h-3.5 w-3.5 text-brand" />
              <span>Write For FreeBirds Digest</span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl font-jakarta">
              Share Your Knowledge With The Global Solo Community.
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Have real-world experience, actionable career strategies, or deep technical insights? Join our roster of guest contributors and inspire over 15,000 freelancers, digital nomads, and solo professionals worldwide.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#pitch-form"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-dark hover:scale-105 active:scale-95"
              >
                <span>Submit Your Pitch</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#guidelines"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-bold text-slate-200 transition-all hover:bg-slate-800 hover:text-white"
              >
                <span>Read Editorial Guidelines</span>
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            QUICK STATS RIBBON
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-8 rounded-2xl border border-brandborder bg-bg-surface p-6 shadow-xs">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:divide-x sm:divide-brandborder/60">
            {[
              { label: "Target Length", value: "1.2k – 2.5k words" },
              { label: "Review Window", value: "3-5 Business Days" },
              { label: "Author Perks", value: "Bio & Portfolio Links" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-text-muted">
                  {stat.label}
                </p>
                <p className="mt-1 text-xl font-extrabold text-text-main sm:text-2xl font-jakarta">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            WHY WRITE FOR US — 4 Key Benefits
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-16">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Contributor Benefits
            </span>
            <h2 className="text-3xl font-extrabold text-text-main sm:text-4xl font-jakarta">
              Why Write for FreeBirds Digest?
            </h2>
            <p className="text-sm text-text-muted sm:text-base">
              We empower our writers with platform visibility, editorial feedback, and long-term reach.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contributionBenefits.map((benefit) => {
              const IconComp = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-brandborder bg-bg-surface p-6 shadow-2xs space-y-4 hover:border-brand/40 transition-colors"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-text-main font-jakarta">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CONTENT PILLARS — What Topics We Accept
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-16 rounded-3xl border border-brandborder bg-bg-subtle/40 p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Topic Verticals
            </span>
            <h2 className="text-2xl font-extrabold text-text-main sm:text-3xl font-jakarta">
              What Topics We Are Looking For
            </h2>
            <p className="text-sm text-text-muted">
              We publish research-backed, practical content across our core seven career verticals.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {contentPillars.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-brandborder bg-bg-surface p-6 shadow-2xs space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-text-main font-jakarta">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            EDITORIAL GUIDELINES — DOs & DON'Ts
        ═══════════════════════════════════════════════════════════ */}
        <section id="guidelines" className="my-16 scroll-mt-24">
          <div className="max-w-2xl space-y-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Quality Standards
            </span>
            <h2 className="text-3xl font-extrabold text-text-main sm:text-4xl font-jakarta">
              Editorial Guidelines
            </h2>
            <p className="text-sm text-text-muted sm:text-base">
              To ensure high editorial quality, please review our content criteria before pitching.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* What We Look For */}
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-text-main font-jakarta">
                  What We Accept & Love
                </h3>
              </div>
              <ul className="space-y-3.5">
                {guidelinesDo.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-text-main">
                    <Check className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What We Avoid */}
            <div className="rounded-3xl border border-rose-500/30 bg-rose-500/5 p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  <XCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-text-main font-jakarta">
                  What We Do NOT Accept
                </h3>
              </div>
              <ul className="space-y-3.5">
                {guidelinesDont.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-text-main">
                    <XCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            4-STEP SUBMISSION WORKFLOW
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-16 rounded-3xl border border-brandborder bg-gradient-to-b from-bg-surface to-bg-subtle/30 p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Simple Process
            </span>
            <h2 className="text-2xl font-extrabold text-text-main sm:text-3xl font-jakarta">
              How The Pitching Process Works
            </h2>
            <p className="text-sm text-text-muted">
              From your initial proposal to publication in four straightforward steps.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {editorialProcess.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.step}
                  className="rounded-2xl border border-brandborder bg-bg-surface p-6 shadow-2xs space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-brand/30 font-jakarta">
                      {item.step}
                    </span>
                    <IconComp className="h-5 w-5 text-brand" />
                  </div>
                  <h3 className="text-base font-bold text-text-main font-jakarta">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            PITCH SUBMISSION FORM SECTION
        ═══════════════════════════════════════════════════════════ */}
        <section id="pitch-form" className="my-16 scroll-mt-24">
          <div className="rounded-3xl border border-brandborder bg-bg-surface p-8 sm:p-12 shadow-sm space-y-8">
            <div className="max-w-2xl space-y-2 border-b border-brandborder pb-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
                <Send className="h-4 w-4" />
                <span>Pitch Proposal Form</span>
              </div>
              <h2 className="text-3xl font-extrabold text-text-main sm:text-4xl font-jakarta">
                Submit Your Article Idea
              </h2>
              <p className="text-sm text-text-muted sm:text-base">
                Fill out the form below with your pitch details. Prefer email? Reach our editorial office directly at{" "}
                <a href="mailto:hello@freebirdsdigest.com" className="text-brand font-semibold hover:underline">
                  hello@freebirdsdigest.com
                </a>.
              </p>
            </div>

            {/* Interactive Pitch Form Client Component */}
            <ContributeForm />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            FREQUENTLY ASKED QUESTIONS (FAQ)
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-16">
          <div className="max-w-2xl space-y-2 mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
              <HelpCircle className="h-4 w-4" />
              <span>Questions & Answers</span>
            </div>
            <h2 className="text-3xl font-extrabold text-text-main sm:text-4xl font-jakarta">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-text-muted sm:text-base">
              Got questions about contributing? Here is what prospective writers ask us most.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-brandborder bg-bg-surface p-6 shadow-2xs space-y-2"
              >
                <h3 className="text-base font-bold text-text-main font-jakarta">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
