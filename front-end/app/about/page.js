import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
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
  ArrowRight,
  Mail,
  Sparkles,
  HelpCircle,
  Globe,
  Award,
  ChevronDown,
  Search,
  FileEdit,
  FileCheck,
  RefreshCw,
  UserCheck,
  Check,
  Layers,
} from "lucide-react";

export const metadata = {
  title:
    "About FreeBirds Digest | Trusted Knowledge for Freelancers & Solo Professionals",
  description:
    "Learn about FreeBirds Digest, a digital knowledge platform helping freelancers, remote workers, solopreneurs, creators, and independent professionals build healthier, smarter, and more sustainable careers.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title:
      "About FreeBirds Digest | Trusted Knowledge for Solo Professionals",
    description:
      "Discover our mission, editorial principles, and commitment to publishing trusted, research-backed content for independent professionals worldwide.",
    url: "https://freebirdsdigest.com/about",
    siteName: "FreeBirds Digest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About FreeBirds Digest",
    description:
      "Trusted knowledge for freelancers, creators, remote workers, and solo professionals.",
  },
};

const contentPillars = [
  {
    icon: Coins,
    title: "Personal Finance",
    image: "/about-pillar-finance.jpg",
    description:
      "Budgeting, taxes, savings, investing, retirement planning, and long-term wealth building.",
  },
  {
    icon: Cpu,
    title: "Technology",
    image: "/about-pillar-technology.jpg",
    description:
      "AI tools, cybersecurity, automation, digital workflows, and emerging technologies.",
  },
  {
    icon: Zap,
    title: "Productivity",
    image: "/about-pillar-productivity.jpg",
    description:
      "Time management, focus, workflow optimization, goal setting, and sustainable performance.",
  },
  {
    icon: Heart,
    title: "Lifestyle",
    image: "/about-pillar-lifestyle.jpg",
    description:
      "Mental wellbeing, physical health, work-life balance, and healthy professional habits.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    image: "/about-pillar-career.jpg",
    description:
      "Client management, pricing, negotiation, personal branding, and career development.",
  },
  {
    icon: Newspaper,
    title: "Industry News",
    image: "/about-pillar-news.jpg",
    description:
      "Platform changes, regulations, market trends, and developments affecting professionals.",
  },
  {
    icon: Briefcase,
    title: "Digital Work",
    image: "/about-pillar-digital.jpg",
    description:
      "Remote work practices, online business, digital entrepreneurship, and the future of work.",
  },
];

const targetAudiences = [
  "Freelancers",
  "Remote Workers",
  "Solopreneurs",
  "Digital Nomads",
  "Independent Consultants",
  "Content Creators",
  "Online Entrepreneurs",
  "Side Hustlers",
  "Self-Employed Professionals",
  "Career Transitioners",
];

const editorialPrinciples = [
  {
    title: "Accuracy First",
    description:
      "We prioritize factual accuracy and responsible reporting over speed.",
    icon: ShieldCheck,
  },
  {
    title: "Evidence-Based",
    description:
      "Articles are informed by reputable research, official documentation, and real-world experience.",
    icon: BookOpen,
  },
  {
    title: "Practical Advice",
    description:
      "Our focus is actionable knowledge that readers can apply immediately.",
    icon: Target,
  },
  {
    title: "Editorial Independence",
    description:
      "We do not publish content designed to mislead or favor specific organizations.",
    icon: Award,
  },
  {
    title: "Transparency",
    description:
      "Opinions, interpretations, and recommendations are presented clearly and responsibly.",
    icon: Globe,
  },
  {
    title: "Continuous Improvement",
    description:
      "We regularly review and update content to keep it relevant and accurate.",
    icon: RefreshCw,
  },
];

const creationProcess = [
  {
    step: "01",
    title: "Topic Research",
    description: "Identifying core questions that matter to solo professionals.",
    icon: Search,
  },
  {
    step: "02",
    title: "Information Gathering",
    description: "Reviewing reputable sources, documentation, and research.",
    icon: Layers,
  },
  {
    step: "03",
    title: "Writing",
    description: "Drafting in clear, accessible language for complex topics.",
    icon: FileEdit,
  },
  {
    step: "04",
    title: "Editorial Review",
    description: "Evaluating clarity, accuracy, readability, and usefulness.",
    icon: FileCheck,
  },
  {
    step: "05",
    title: "Fact Checking",
    description: "Verifying claims against authoritative primary sources.",
    icon: UserCheck,
  },
  {
    step: "06",
    title: "Ongoing Updates",
    description: "Reviewing existing articles as industries evolve.",
    icon: RefreshCw,
  },
];

const trustPoints = [
  "Publishing practical, research-informed content",
  "Clearly distinguishing facts from opinions",
  "Updating articles when information changes",
  "Writing for readers rather than search engines",
  "Avoiding sensational headlines and misleading claims",
  "Focusing on long-term value instead of short-term trends",
  "Maintaining complete editorial independence",
  "Explaining complex topics in simple, accessible language",
];

const faqs = [
  {
    question: "What is FreeBirds Digest?",
    answer:
      "FreeBirds Digest is a digital knowledge platform that publishes trusted, practical, and research-backed content for freelancers, remote workers, solopreneurs, creators, and other independent professionals.",
  },
  {
    question: "Who is FreeBirds Digest for?",
    answer:
      "Our content is designed for freelancers, remote workers, digital nomads, consultants, creators, online entrepreneurs, and anyone pursuing or transitioning into an independent career.",
  },
  {
    question: "What topics do you publish?",
    answer:
      "We cover personal finance, technology, productivity, lifestyle, career growth, industry news, and digital work practices.",
  },
  {
    question: "Is FreeBirds Digest a news website?",
    answer:
      "No. While we report on relevant industry developments, our primary focus is creating evergreen, practical knowledge that helps readers make better decisions throughout their professional journey.",
  },
  {
    question: "How do you ensure content quality?",
    answer:
      "Articles are thoroughly researched, written by knowledgeable professionals, reviewed, fact-checked where appropriate, and periodically updated to maintain strict accuracy and relevance.",
  },
  {
    question: "Do you accept guest contributions?",
    answer:
      "Yes. We welcome qualified contributors, researchers, and experienced solo professionals whose work aligns with our editorial standards and mission.",
  },
  {
    question: "Do you recommend specific products or services?",
    answer:
      "Any recommendations are based solely on editorial judgment and genuine practical relevance. We strive to remain completely transparent and independent in all evaluations.",
  },
  {
    question: "How often is content updated?",
    answer:
      "We review and update content whenever meaningful industry changes occur or when additional information improves an article's accuracy and usefulness.",
  },
  {
    question: "Where is FreeBirds Digest based?",
    answer:
      "FreeBirds Digest operates as a remote-first digital publication serving readers worldwide. We do not operate from a physical office.",
  },
  {
    question: "How can I stay updated?",
    answer:
      "You can regularly visit FreeBirds Digest, subscribe to our newsletter, and follow our official social channels to explore newly published articles and updated guides.",
  },
];

export default function AboutPage() {
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FreeBirds Digest",
    url: "https://freebirdsdigest.com",
    logo: "https://freebirdsdigest.com/freeBird-logo-new.png",
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
        name: "About",
        item: "https://freebirdsdigest.com/about",
      },
    ],
  };

  const jsonLdAboutPage = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About FreeBirds Digest",
    description:
      "FreeBirds Digest is a digital knowledge platform dedicated to helping freelancers, remote workers, solopreneurs, digital nomads, and creators build sustainable careers.",
    url: "https://freebirdsdigest.com/about",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAboutPage) }}
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
          <span className="text-text-main font-bold">About</span>
        </nav>

        {/* ═══════════════════════════════════════════════════════════
            HERO — Styled Dark Gradient Banner Card
        ═══════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 sm:p-12 md:p-16 shadow-xl border border-slate-800">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-brand/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-extrabold tracking-widest text-white/90 uppercase backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              <span>About FreeBirds Digest</span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl font-jakarta">
              Helping Solo Professionals Build Better Careers.
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              A digital knowledge platform dedicated to delivering curated
              news, career strategies, tool reviews, and productivity insights
              for independent workers around the globe.
            </p>

            <div className="pt-2">
              <a
                href="#what-we-cover"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-dark hover:scale-105 active:scale-95"
              >
                <span>Explore Content Pillars</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            QUICK STATS — Floating ribbon below hero
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-8 rounded-2xl border border-brandborder bg-bg-surface p-6 shadow-xs">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:divide-x sm:divide-brandborder/60">
            {[
              { label: "Founded", value: "2026" },
              { label: "Team Model", value: "100% Remote" },
              { label: "Focus", value: "Evidence First" },
              { label: "Readership", value: "Global" },
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
            MISSION & PHILOSOPHY — Two-card grid (no forced images)
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-brandborder bg-bg-surface p-8 sm:p-10 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
                <Target className="h-4 w-4" />
                <span>Our Philosophy</span>
              </div>
              <h2 className="text-2xl font-extrabold text-text-main sm:text-3xl font-jakarta">
                More Than Increasing Income
              </h2>
              <p className="text-base leading-relaxed text-text-muted">
                We believe long-term professional success is about far more than
                increasing income. It comes from making better financial
                decisions, protecting your health, embracing the right
                technology, developing productive habits, and continuously
                learning in a rapidly changing digital world.
              </p>
            </div>
            <div className="mt-8 rounded-2xl border border-brand/20 bg-brand/5 p-4">
              <p className="text-xs font-semibold italic text-brand">
                &ldquo;Every article we publish is created to help independent
                professionals make informed decisions that improve both their
                work and their lives.&rdquo;
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-brandborder bg-gradient-to-br from-bg-surface to-brand/5 p-8 sm:p-10 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
                <ShieldCheck className="h-4 w-4" />
                <span>Our Mission</span>
              </div>
              <h2 className="text-2xl font-extrabold text-text-main sm:text-3xl font-jakarta">
                Trusted & Practical Guidance
              </h2>
              <p className="text-base leading-relaxed text-text-muted">
                To improve the wellbeing of solo professionals by publishing
                trusted, practical, research-backed, and experience-driven
                knowledge that cuts through noise and hype.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-brandborder/60 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Globe className="h-5 w-5" />
              </div>
              <p className="text-xs text-text-muted font-medium leading-snug">
                Serving freelancers, digital nomads, remote workers, creators,
                and solopreneurs worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            WHO WE ARE — Text-left + sidebar image card (like category page)
            Image fills a natural card, same as news article thumbnails.
            Drop your image at /public/about-team.jpg
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Who We Are
            </span>
            <h2 className="text-2xl font-extrabold text-text-main sm:text-4xl font-jakarta leading-tight">
              A digital-first publication built for today&apos;s independent
              workforce.
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-muted">
              <p>
                As more people choose freelancing, remote work, consulting,
                online business, and creator-led careers, the need for reliable,
                practical information has never been greater.
              </p>
              <p>
                Unfortunately, much of the content available online prioritizes
                clicks over accuracy, trends over evidence, and opinions over
                research. We take a different approach.
              </p>
              <p>
                Our goal is to create an evolving knowledge library that helps
                solo professionals make better decisions throughout every stage
                of their careers. Our editorial team works remotely, allowing us
                to serve readers worldwide.
              </p>
            </div>
          </div>

          {/* Sidebar — image card + key facts (natural card like news thumbnails) */}
          <aside className="rounded-3xl border border-brandborder bg-bg-surface overflow-hidden shadow-xs">
            {/* Image sits at top of card, same as article cards */}
            <div className="relative aspect-16/10 overflow-hidden bg-bg-subtle">
              <Image
                src="/about-team.jpg"
                alt="FreeBirds Digest editorial team"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover"
              />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-text-main border-b border-brandborder pb-2">
                Key Snapshot
              </h3>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-[11px] font-semibold uppercase text-text-muted">
                    Publication
                  </dt>
                  <dd className="mt-0.5 text-sm font-bold text-text-main">
                    Digital-First
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase text-text-muted">
                    Team
                  </dt>
                  <dd className="mt-0.5 text-sm font-bold text-text-main">
                    100% Remote
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase text-text-muted">
                    Philosophy
                  </dt>
                  <dd className="mt-0.5 text-sm font-bold text-brand">
                    Research & Evidence
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase text-text-muted">
                    Audience
                  </dt>
                  <dd className="mt-0.5 text-sm font-bold text-text-main">
                    Solo Professionals
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            WHY WE EXIST — Full-width section (no image, content-driven)
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-14 rounded-3xl border border-brandborder bg-bg-subtle/50 p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Why We Exist
            </span>
            <h2 className="text-2xl font-extrabold text-text-main sm:text-3xl font-jakarta">
              Bridging the Knowledge Gap in Modern Work
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              Millions of professionals now build careers outside traditional
              employment, yet resources remain fragmented, outdated, or overly
              promotional. Solo professionals need practical guidance on:
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {[
              "Managing personal finances & taxes",
              "Choosing reliable productivity tools",
              "Protecting mental & physical wellbeing",
              "Building sustainable work habits",
              "Navigating AI & new technologies",
              "Growing long-term solo careers",
              "Staying informed on industry trends",
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-2xl border border-brandborder/60 bg-bg-surface p-4 text-sm font-semibold text-text-main shadow-2xs"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            WHAT WE COVER — 7 Content Pillars grid
        ═══════════════════════════════════════════════════════════ */}
        <section id="what-we-cover" className="my-16 scroll-mt-10">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              What We Cover
            </span>
            <h2 className="text-3xl font-extrabold text-text-main sm:text-4xl font-jakarta">
              Seven Pillars of Independent Success
            </h2>
            <p className="text-sm text-text-muted sm:text-base">
              Actionable, evergreen knowledge across key career verticals.
            </p>
          </div>

          {/* Row 1 — 4 cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contentPillars.slice(0, 4).map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="group rounded-2xl border border-brandborder bg-bg-surface overflow-hidden shadow-2xs transition-all duration-300 hover:border-brand/40 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="relative aspect-16/10 overflow-hidden bg-bg-subtle">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-text-main font-jakarta">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {pillar.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Row 2 — 3 cards, full width */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-5">
            {contentPillars.slice(4).map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="group rounded-2xl border border-brandborder bg-bg-surface overflow-hidden shadow-2xs transition-all duration-300 hover:border-brand/40 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="relative aspect-16/10 overflow-hidden bg-bg-subtle">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-text-main font-jakarta">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {pillar.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            WHO WE HELP — Audience pill badges
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-16 rounded-3xl border border-brandborder bg-bg-surface p-8 sm:p-12 text-center shadow-xs space-y-6">
          <div className="max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
              <Users className="h-4 w-4" />
              <span>Who We Help</span>
            </div>
            <h2 className="text-2xl font-extrabold text-text-main sm:text-3xl font-jakarta">
              Built for Everyone Pursuing an Independent Path
            </h2>
            <p className="text-sm text-text-muted">
              Whether you are just beginning your journey or have years of
              experience.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {targetAudiences.map((audience) => (
              <span
                key={audience}
                className="rounded-full border border-brandborder bg-bg-subtle px-4 py-2 text-xs font-bold text-text-main transition-colors hover:border-brand hover:text-brand"
              >
                {audience}
              </span>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            EDITORIAL PRINCIPLES — 6 cards
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-16">
          <div className="max-w-2xl space-y-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Our Standards
            </span>
            <h2 className="text-3xl font-extrabold text-text-main sm:text-4xl font-jakarta">
              Our Editorial Principles
            </h2>
            <p className="text-sm text-text-muted sm:text-base">
              Everything we publish is guided by strict standards of
              independence, clarity, and factual accuracy.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {editorialPrinciples.map((principle) => {
              const IconComp = principle.icon;
              return (
                <div
                  key={principle.title}
                  className="rounded-2xl border border-brandborder bg-bg-surface p-6 shadow-2xs space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-text-main font-jakarta">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            HOW WE CREATE CONTENT — 6-step process
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-16 rounded-3xl border border-brandborder bg-gradient-to-b from-bg-surface to-bg-subtle/30 p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Workflow
            </span>
            <h2 className="text-2xl font-extrabold text-text-main sm:text-3xl font-jakarta">
              How We Create Content
            </h2>
            <p className="text-sm text-text-muted">
              Every published guide undergoes a rigorous 6-step editorial
              process.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {creationProcess.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-brandborder bg-bg-surface p-6 shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-brand/30 font-jakarta">
                    {item.step}
                  </span>
                  <item.icon className="h-5 w-5 text-brand" />
                </div>
                <h3 className="text-base font-bold text-text-main font-jakarta">
                  {item.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            TRUST + VISION + CONTRIBUTOR — Three-panel layout
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-16 grid gap-6 lg:grid-cols-12 items-stretch">
          {/* Trust */}
          <div className="lg:col-span-7 rounded-3xl border border-brandborder bg-bg-surface p-8 sm:p-10 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
                <ShieldCheck className="h-4 w-4" />
                <span>Earned Trust</span>
              </div>
              <h2 className="text-2xl font-extrabold text-text-main sm:text-3xl font-jakarta">
                Why Trust FreeBirds Digest
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Trust is earned through consistency, transparency, and quality.
                We build that trust by:
              </p>
              <ul className="grid gap-3 sm:grid-cols-2 text-xs font-medium text-text-main">
                {trustPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand mt-0.5">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-brandborder bg-bg-subtle p-4 text-xs font-semibold text-text-muted">
              Our objective is not to tell readers what to think. Our objective
              is to provide the information they need to make better decisions.
            </div>
          </div>

          {/* Vision + Contributor */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-3xl border border-brandborder bg-slate-950 p-7 text-white shadow-xl space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand">
                Our Vision
              </span>
              <h3 className="text-xl font-extrabold font-jakarta">
                A Future of Trusted Knowledge
              </h3>
              <p className="text-xs leading-relaxed text-slate-300">
                We envision a future where every solo professional has access to
                trustworthy, practical, and unbiased knowledge. Our goal is to
                become one of the world&apos;s most trusted digital publications
                for independent professionals.
              </p>
            </div>

            <div className="flex-1 rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/10 via-bg-surface to-bg-surface p-7 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand">
                  Join Our Team
                </span>
                <h3 className="mt-1 text-xl font-extrabold text-text-main font-jakarta">
                  Become a Contributor
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-text-muted">
                  We welcome knowledgeable writers, researchers, and experienced
                  professionals who share our commitment to accuracy,
                  transparency, and practical education.
                </p>
              </div>

              <a
                href="mailto:hello@freebirdsdigest.com?subject=Contributor%20Inquiry"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-brand-dark hover:scale-102"
              >
                <Mail className="h-4 w-4" />
                <span>Submit a Pitch or Article</span>
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            FAQ — Accordions
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-16 scroll-mt-10">
          <div className="max-w-2xl space-y-2 mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
              <HelpCircle className="h-4 w-4" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl font-extrabold text-text-main sm:text-4xl font-jakarta">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-text-muted">
              Learn more about FreeBirds Digest, our scope, and how we operate.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-2xl border border-brandborder bg-bg-surface p-5 transition-all shadow-2xs open:border-brand/40 open:shadow-md"
              >
                <summary className="flex cursor-pointer items-center justify-between font-bold text-text-main list-none select-none text-base sm:text-lg font-jakarta">
                  <span>{faq.question}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-text-muted transition-transform duration-300 group-open:rotate-180 group-open:text-brand" />
                </summary>
                <div className="mt-3 text-sm text-text-muted leading-relaxed border-t border-brandborder/50 pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            INTERNAL NAVIGATION LINKS
        ═══════════════════════════════════════════════════════════ */}
        <section className="my-12 rounded-3xl border border-brandborder bg-bg-surface p-8 shadow-xs space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-brand">
            Continue Exploring FreeBirds Digest
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
            <Link
              href="/"
              className="rounded-xl border border-brandborder px-4 py-2 text-text-main hover:border-brand hover:text-brand transition-colors"
            >
              Home Page
            </Link>
            <Link
              href="/advertising"
              className="rounded-xl border border-brandborder px-4 py-2 text-text-main hover:border-brand hover:text-brand transition-colors"
            >
              Advertise With Us
            </Link>
            <Link
              href="/newsletter"
              className="rounded-xl border border-brandborder px-4 py-2 text-text-main hover:border-brand hover:text-brand transition-colors"
            >
              Weekly Newsletter
            </Link>
            <Link
              href="/privacy-policy"
              className="rounded-xl border border-brandborder px-4 py-2 text-text-main hover:border-brand hover:text-brand transition-colors"
            >
              Privacy Policy & Terms
            </Link>
            <a
              href="mailto:hello@freebirdsdigest.com"
              className="rounded-xl border border-brandborder px-4 py-2 text-brand hover:bg-brand hover:text-white transition-colors"
            >
              Contact Editorial Office
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
