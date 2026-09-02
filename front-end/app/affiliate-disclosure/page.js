import React from "react";
import Link from "next/link";
import FaqSection from "@/components/FaqSection";
import {
  ShieldCheck,
  BookOpen,
  Heart,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  FileText,
  Eye,
  DollarSign,
  Star,
  Scale,
  Users,
  Search,
  Settings,
  Lock,
  Headphones,
  UserCheck,
  Megaphone,
  Handshake,
  BarChart3,
  Globe,
} from "lucide-react";

export const metadata = {
  title: "Affiliate Disclosure | FreeBirds Digest Transparency Policy",
  description:
    "Learn how FreeBirds Digest uses affiliate links, maintains editorial independence, evaluates products, and supports transparent recommendations.",
  alternates: {
    canonical: "/affiliate-disclosure",
  },
  openGraph: {
    title:
      "Affiliate Disclosure | How FreeBirds Digest Maintains Transparency",
    description:
      "Understand FreeBirds Digest's affiliate relationships, product evaluation process, and commitment to honest, independent recommendations.",
    url: "https://freebirdsdigest.com/affiliate-disclosure",
    siteName: "FreeBirds Digest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Affiliate Disclosure | FreeBirds Digest",
    description:
      "Discover how FreeBirds Digest handles affiliate links, reviews, sponsorships, and editorial independence.",
  },
};

const faqs = [
  {
    question: "What is an affiliate disclosure?",
    answer:
      "An affiliate disclosure explains when a website may earn a commission from affiliate links. It helps readers understand the relationship between the publisher and recommended products or services.",
  },
  {
    question: "Does FreeBirds Digest earn money from affiliate links?",
    answer:
      "Yes. FreeBirds Digest may earn commissions when readers purchase products or services through selected affiliate links. These commissions help support our content creation and website operations.",
  },
  {
    question: "Do affiliate links cost readers extra money?",
    answer:
      "No. Affiliate links do not increase the price paid by readers. The product or service generally costs the same whether you use our affiliate link or visit the company directly.",
  },
  {
    question: "Are FreeBirds Digest reviews influenced by companies?",
    answer:
      "No. Our reviews and recommendations are based on research, evaluation, and reader value. Companies cannot pay for positive reviews or guaranteed rankings.",
  },
  {
    question: "How does FreeBirds Digest choose products to recommend?",
    answer:
      "We evaluate products based on factors such as features, pricing, usability, performance, security, customer support, and suitability for our audience.",
  },
  {
    question: "Are affiliate recommendations trustworthy?",
    answer:
      "Affiliate recommendations can be trustworthy when they are supported by transparent research and honest evaluation. FreeBirds Digest clearly separates affiliate relationships from editorial decisions.",
  },
  {
    question: "Why does FreeBirds Digest use affiliate links?",
    answer:
      "Affiliate links help us maintain a reader-supported publication by contributing revenue toward research, content creation, and website improvements.",
  },
  {
    question: "Can brands pay for positive reviews on FreeBirds Digest?",
    answer:
      "No. Brands cannot purchase positive reviews, rankings, or editorial approval. Our opinions remain independent.",
  },
  {
    question: "How often are reviews updated?",
    answer:
      "We update content when important information changes, including pricing updates, product changes, market developments, or new alternatives.",
  },
  {
    question:
      "How can readers contact the FreeBirds Digest editorial team?",
    answer:
      "Readers can contact our editorial team through the official Contact Page for questions, feedback, corrections, or partnership inquiries.",
  },
];

export default function AffiliateDisclosurePage() {
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FreeBirds Digest",
    url: "https://freebirdsdigest.com",
    logo: "https://freebirdsdigest.com/freeBird-logo-new.png",
    description:
      "A digital knowledge platform helping freelancers and independent professionals build smarter digital careers.",
    sameAs: [
      "https://www.facebook.com",
      "https://www.x.com",
      "https://www.instagram.com",
      "https://www.linkedin.com",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@freebirdsdigest.com",
      contactType: "Editorial Office",
    },
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
        name: "Affiliate Disclosure",
        item: "https://freebirdsdigest.com/affiliate-disclosure",
      },
    ],
  };

  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Affiliate Disclosure",
    description:
      "FreeBirds Digest affiliate partnerships, recommendations policy, and editorial independence.",
    url: "https://freebirdsdigest.com/affiliate-disclosure",
    about: "Affiliate transparency and editorial disclosure",
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
          <span className="text-text-main font-bold">
            Affiliate Disclosure
          </span>
        </nav>

        {/* ═══════════════════════════════════════════════════════════
            HERO — Dark Gradient Banner
        ═══════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 sm:p-12 md:p-16 shadow-xl border border-slate-800">
          {/* Ambient Background Gradients */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-brand/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-extrabold tracking-widest text-white/90 uppercase backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-brand" />
              <span>Transparency Policy</span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl font-jakarta">
              Affiliate Disclosure
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Transparency is one of the foundations of FreeBirds Digest. This
              page explains what affiliate links mean, how they support our
              publication, and how we maintain editorial independence.
            </p>

            <div className="pt-2">
              <a
                href="#our-affiliate-relationship"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-dark hover:scale-105 active:scale-95"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            INTRO CONTEXT — Two-card grid
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-brandborder bg-bg-surface p-8 sm:p-10 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
                <Globe className="h-4 w-4" />
                <span>Who We Are</span>
              </div>
              <h2 className="text-2xl font-extrabold text-text-main sm:text-3xl font-jakarta">
                A Digital Knowledge Platform
              </h2>
              <p className="text-base leading-relaxed text-text-muted">
                FreeBirds Digest is a digital knowledge platform created to help
                freelancers, remote workers, solopreneurs, digital nomads,
                creators, and independent professionals make smarter decisions
                about technology, finance, productivity, and digital work.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-brandborder bg-gradient-to-br from-bg-surface to-brand/5 p-8 sm:p-10 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
                <Heart className="h-4 w-4" />
                <span>Our Commitment</span>
              </div>
              <h2 className="text-2xl font-extrabold text-text-main sm:text-3xl font-jakarta">
                Reader Value First
              </h2>
              <p className="text-base leading-relaxed text-text-muted">
                We recommend tools, platforms, and resources because we believe
                they can provide value to our readers, not because a company
                pays us to mention them.
              </p>
            </div>
            <div className="mt-8 rounded-2xl border border-brand/20 bg-brand/5 p-4">
              <p className="text-xs font-semibold italic text-brand">
                &ldquo;Some articles on FreeBirds Digest may include affiliate
                links. This disclosure explains what those links mean, how they
                support our publication, and how we maintain editorial
                independence while recommending products and services.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            OUR AFFILIATE RELATIONSHIP
        ═══════════════════════════════════════════════════════════ */}
        <section
          id="our-affiliate-relationship"
          className="my-16 scroll-mt-10"
        >
          <div className="max-w-2xl space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Understanding Affiliate Links
            </span>
            <h2 className="text-3xl font-extrabold text-text-main sm:text-4xl font-jakarta">
              Our Affiliate Relationship
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* What Are Affiliate Links? */}
            <div className="rounded-2xl border border-brandborder bg-bg-surface p-6 shadow-2xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-text-main font-jakarta">
                  What Are Affiliate Links?
                </h3>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                Affiliate links are special tracking links that allow companies
                to understand when a customer discovers their product or service
                through a publisher like FreeBirds Digest.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                When you click an affiliate link and decide to purchase a
                product or sign up for a service, FreeBirds Digest may receive
                a commission from that company.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-text-muted font-semibold">
                This commission comes directly from the business and does not
                increase the price you pay. The cost remains the same whether
                you use our affiliate link or visit the company directly.
              </p>
            </div>

            {/* Why Does FreeBirds Digest Use Affiliate Links? */}
            <div className="rounded-2xl border border-brandborder bg-bg-surface p-6 shadow-2xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <DollarSign className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-text-main font-jakarta">
                  Why We Use Affiliate Links
                </h3>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                Creating high-quality digital content requires significant time
                and resources, including:
              </p>
              <ul className="space-y-1.5">
                {[
                  "Industry research",
                  "Product comparisons",
                  "Editorial planning",
                  "Content updates",
                  "Website development and maintenance",
                  "Technology infrastructure",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs sm:text-sm text-text-muted"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                Affiliate partnerships help us continue producing free,
                practical, and research-driven content for our community.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                Affiliate revenue allows FreeBirds Digest to remain accessible
                while investing in deeper research and better educational
                resources.
              </p>
            </div>

            {/* How Affiliate Links Support FreeBirds Digest */}
            <div className="rounded-2xl border border-brandborder bg-bg-surface p-6 shadow-2xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Handshake className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-text-main font-jakarta">
                  How Affiliate Links Support Us
                </h3>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                FreeBirds Digest operates as a reader-supported publication.
                Affiliate partnerships are one of the ways we sustain our
                platform while continuing to create useful resources.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-text-muted font-medium">
                Revenue generated through affiliate relationships helps support:
              </p>
              <div className="space-y-3 pt-1">
                <div>
                  <h4 className="text-xs font-bold text-text-main uppercase tracking-wider">
                    Content Creation
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                    Our editorial team researches topics, analyzes solutions, and creates practical guides designed for independent professionals.
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-main uppercase tracking-wider">
                    Research and Evaluation
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                    We spend time reviewing product features, pricing structures, user experience, business suitability, advantages, and limitations.
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-main uppercase tracking-wider">
                    Website Operations
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                    Affiliate revenue contributes to maintaining and improving website performance, content management systems, publishing tools, security, and technical infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-brand/20 bg-brand/5 p-5 max-w-2xl">
            <p className="text-sm font-medium text-text-muted">
              Our goal is to create a sustainable publication that continues
              delivering valuable information without compromising reader
              trust.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            EDITORIAL INDEPENDENCE
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-16 rounded-3xl border border-brandborder bg-bg-subtle/50 p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Editorial Standards
            </span>
            <h2 className="text-2xl font-extrabold text-text-main sm:text-3xl font-jakarta">
              Our Commitment to Editorial Independence
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Independent Recommendations Come First */}
            <div className="rounded-2xl border border-brandborder bg-bg-surface p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-text-main font-jakarta">
                  Independent Recommendations Come First
                </h3>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                Affiliate relationships do not determine what we publish, which
                products we recommend, or how we evaluate services.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                Our editorial decisions are based on:
              </p>
              <ul className="space-y-1.5">
                {[
                  "Research and analysis",
                  "Practical usefulness",
                  "Reader needs",
                  "Product quality",
                  "Market relevance",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs sm:text-sm text-text-muted"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs sm:text-sm leading-relaxed text-text-muted font-semibold">
                A company cannot purchase a positive review, guaranteed ranking,
                or favorable recommendation on FreeBirds Digest.
              </p>
            </div>

            {/* We Evaluate Both Strengths and Limitations */}
            <div className="rounded-2xl border border-brandborder bg-bg-surface p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Scale className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-text-main font-jakarta">
                  We Evaluate Both Strengths and Limitations
                </h3>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                Responsible recommendations require a balanced perspective. Our
                content may highlight:
              </p>
              <ul className="space-y-1.5">
                {[
                  "Key features",
                  "Benefits",
                  "Potential drawbacks",
                  "Pricing considerations",
                  "Alternative options",
                  "Who the product may or may not be suitable for",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs sm:text-sm text-text-muted"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                We believe honest reviews help readers make better decisions.
              </p>
            </div>

            {/* Advertising Relationships Do Not Control Editorial Decisions */}
            <div className="rounded-2xl border border-brandborder bg-bg-surface p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Eye className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-text-main font-jakarta">
                  Advertising Does Not Control Editorial
                </h3>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                Our editorial team separates commercial relationships from
                content decisions.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                Affiliate partnerships, advertising opportunities, and
                sponsorship arrangements are handled separately from our
                research and editorial evaluation process.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            HOW WE REVIEW PRODUCTS AND SERVICES
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-16">
          <div className="max-w-2xl space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Our Process
            </span>
            <h2 className="text-3xl font-extrabold text-text-main sm:text-4xl font-jakarta">
              How We Review Products and Services
            </h2>
            <p className="text-sm text-text-muted sm:text-base">
              FreeBirds Digest follows a research-based product evaluation
              process when creating reviews, comparisons, and recommendations.
              Depending on the topic, we may consider:
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Settings,
                title: "Features and Capabilities",
                description:
                  "We analyze whether a product provides useful functionality for freelancers, remote workers, entrepreneurs, and digital professionals.",
              },
              {
                icon: DollarSign,
                title: "Pricing and Value",
                description:
                  "We evaluate subscription costs, pricing flexibility, available plans, and overall value compared with alternatives.",
              },
              {
                icon: BarChart3,
                title: "Performance and User Experience",
                description:
                  "We consider how practical and easy a product is to use in real-world situations.",
              },
              {
                icon: Lock,
                title: "Security and Privacy",
                description:
                  "For digital tools and platforms, we consider available security features, privacy practices, and data handling considerations.",
              },
              {
                icon: Headphones,
                title: "Customer Support",
                description:
                  "We evaluate available support options and the overall customer experience.",
              },
              {
                icon: UserCheck,
                title: "Suitability for Different Users",
                description:
                  "A product that works well for one person may not be the right choice for another. Our recommendations consider different professional needs, budgets, and workflows.",
              },
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-brandborder bg-bg-surface p-6 shadow-2xs space-y-3 transition-all duration-300 hover:border-brand/40 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-text-main font-jakarta">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            OUR RECOMMENDATIONS POLICY
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-brandborder bg-bg-surface p-8 sm:p-10 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
                <Star className="h-4 w-4" />
                <span>Recommendations</span>
              </div>
              <h2 className="text-2xl font-extrabold text-text-main sm:text-3xl font-jakarta">
                Who Do We Recommend Products For?
              </h2>
              <p className="text-base leading-relaxed text-text-muted">
                FreeBirds Digest recommends products and services that may help:
              </p>
              <ul className="space-y-2">
                {[
                  "Freelancers improve their workflow",
                  "Remote workers increase productivity",
                  "Entrepreneurs build sustainable businesses",
                  "Creators manage digital operations",
                  "Independent professionals make informed decisions",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-text-muted"
                  >
                    <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-brandborder bg-gradient-to-br from-bg-surface to-brand/5 p-8 sm:p-10 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
                <Users className="h-4 w-4" />
                <span>Multiple Options</span>
              </div>
              <h2 className="text-2xl font-extrabold text-text-main sm:text-3xl font-jakarta">
                Why We May Recommend Alternatives
              </h2>
              <p className="text-base leading-relaxed text-text-muted">
                There is rarely one perfect solution for everyone. Our articles
                may include multiple options because different users have
                different:
              </p>
              <ul className="space-y-2">
                {[
                  "Budgets",
                  "Goals",
                  "Technical skills",
                  "Business requirements",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-text-muted"
                  >
                    <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-brand/20 bg-brand/5 p-4">
              <p className="text-xs font-semibold italic text-brand">
                A recommendation should help readers choose the right solution
                for their situation, not simply the most popular product.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            ADVERTISING AND SPONSORSHIP TRANSPARENCY
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-16 rounded-3xl border border-brandborder bg-gradient-to-b from-bg-surface to-bg-subtle/30 p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Commercial Partnerships
            </span>
            <h2 className="text-2xl font-extrabold text-text-main sm:text-3xl font-jakarta">
              Advertising and Sponsorship Transparency
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              FreeBirds Digest may participate in different forms of commercial
              partnerships. We clearly distinguish between them.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: FileText,
                title: "Affiliate Links",
                description:
                  "Affiliate links appear in selected content. If readers purchase through these links, we may earn a commission at no additional cost to them.",
              },
              {
                icon: Megaphone,
                title: "Sponsored Content",
                description:
                  "Sponsored content refers to content created through a paid partnership with a brand. Any sponsored content will be clearly identified so readers understand the relationship.",
              },
              {
                icon: BarChart3,
                title: "Advertising",
                description:
                  "Advertising refers to promotional placements where companies pay for visibility. Advertising does not guarantee editorial approval, positive reviews, or recommendations.",
              },
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-brandborder bg-bg-surface p-6 shadow-2xs space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-text-main font-jakarta">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-text-muted max-w-2xl">
            We believe transparency helps readers understand the difference
            between editorial content and commercial relationships.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            OUR READER-FIRST PROMISE
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-16 rounded-3xl border border-brandborder bg-bg-surface p-8 sm:p-12 text-center shadow-xs space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
              <Heart className="h-4 w-4" />
              <span>Our Promise</span>
            </div>
            <h2 className="text-2xl font-extrabold text-text-main sm:text-3xl font-jakarta">
              Our Reader-First Promise
            </h2>
            <p className="text-sm text-text-muted sm:text-base leading-relaxed">
              The trust of our readers is more valuable than any individual
              partnership. FreeBirds Digest exists to help independent
              professionals navigate the digital world with confidence. Our
              responsibility is to provide useful information, explain options
              clearly, and maintain honest communication.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
            {[
              "Recommendations are based on research",
              "Reviews remain balanced",
              "Affiliate relationships are disclosed",
              "Reader interests come before commercial interests",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-brandborder bg-bg-subtle px-4 py-2 text-xs font-bold text-text-main transition-colors hover:border-brand hover:text-brand"
              >
                {item}
              </span>
            ))}
          </div>

          <p className="text-sm text-text-muted max-w-xl mx-auto">
            Thank you for trusting FreeBirds Digest as a source of practical
            knowledge and independent guidance.
          </p>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS (FAQ) */}
        <FaqSection
          faqs={faqs}
          title="Frequently Asked Questions (FAQs)"
          subtitle="Clear answers about our affiliate relationships and financial disclosures."
          className="my-16"
        />

        {/* ═══════════════════════════════════════════════════════════
            INTERNAL LINKS — Related Pages
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-16 rounded-3xl border border-brandborder bg-bg-subtle/50 p-8 sm:p-10 space-y-6">
          <h2 className="text-xl font-extrabold text-text-main font-jakarta">
            Related Pages
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: "/about",
                label: "About Us",
                description:
                  "Learn more about the FreeBirds Digest editorial team",
              },
              {
                href: "/privacy-policy",
                label: "Privacy Policy",
                description:
                  "Read our privacy and data protection practices",
              },
              {
                href: "/advertising",
                label: "Advertising",
                description:
                  "Explore advertising and partnership opportunities",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-2xl border border-brandborder bg-bg-surface p-5 shadow-2xs transition-all duration-300 hover:border-brand/40 hover:shadow-md hover:-translate-y-0.5 block"
              >
                <h3 className="text-sm font-bold text-text-main group-hover:text-brand transition-colors font-jakarta">
                  {link.label}
                </h3>
                <p className="mt-1 text-xs text-text-muted">
                  {link.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand">
                  <span>Read more</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
