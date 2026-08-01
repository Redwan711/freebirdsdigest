import React from "react";
import Link from "next/link";
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
  Layers,
  Search,
  FileEdit,
  FileCheck,
  RefreshCw,
  UserCheck,
} from "lucide-react";

export const metadata = {
  title: "About FreeBirds Digest | Trusted Knowledge for Freelancers & Solo Professionals",
  description:
    "Learn about FreeBirds Digest, a digital knowledge platform helping freelancers, remote workers, solopreneurs, creators, and independent professionals build healthier, smarter, and more sustainable careers.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About FreeBirds Digest | Trusted Knowledge for Solo Professionals",
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
    description:
      "Managing income, budgeting, taxes, savings, investing, retirement planning, financial security, and long-term wealth building.",
  },
  {
    icon: Cpu,
    title: "Technology",
    description:
      "Software, AI tools, cybersecurity, automation, digital workflows, productivity apps, and emerging technologies that help professionals work efficiently.",
  },
  {
    icon: Zap,
    title: "Productivity",
    description:
      "Time management, focus, workflow optimization, goal setting, habit building, and sustainable performance.",
  },
  {
    icon: Heart,
    title: "Lifestyle",
    description:
      "Mental wellbeing, physical health, work-life balance, remote work routines, and healthy professional habits.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description:
      "Freelancing, consulting, client management, pricing, negotiation, personal branding, continuous learning, and career development.",
  },
  {
    icon: Newspaper,
    title: "Industry News",
    description:
      "Important updates, platform changes, regulations, market trends, and developments affecting independent professionals.",
  },
  {
    icon: Briefcase,
    title: "Digital Work",
    description:
      "Remote work practices, online business, digital entrepreneurship, collaboration, communication, and the evolving future of work.",
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
    description: "We prioritize factual accuracy and responsible reporting over speed.",
    icon: ShieldCheck,
  },
  {
    title: "Evidence-Based Content",
    description:
      "Articles are informed by reputable research, publicly available data, industry publications, official documentation, and real-world experience.",
    icon: BookOpen,
  },
  {
    title: "Practical Advice",
    description: "Our focus is actionable knowledge that readers can apply immediately to their work and lives.",
    icon: Target,
  },
  {
    title: "Editorial Independence",
    description:
      "Decisions are made independently. We do not publish content designed to mislead readers or favor specific organizations without clear disclosure.",
    icon: Award,
  },
  {
    title: "Transparency",
    description: "When content includes opinions, interpretations, or recommendations, we present them clearly and responsibly.",
    icon: Globe,
  },
  {
    title: "Continuous Improvement",
    description: "Knowledge evolves, and so do we. We regularly review and update content to keep it relevant and accurate.",
    icon: RefreshCw,
  },
];

const creationProcess = [
  { step: "01", title: "Topic Research", description: "Identifying core questions & challenges that matter to solo professionals.", icon: Search },
  { step: "02", title: "Information Gathering", description: "Reviewing reputable sources, official documentation, academic research & practical experience.", icon: Layers },
  { step: "03", title: "Writing", description: "Drafting in clear, accessible language focused on explaining complex topics simply.", icon: FileEdit },
  { step: "04", title: "Editorial Review", description: "Evaluating for clarity, accuracy, readability, consistency, and practical usefulness.", icon: FileCheck },
  { step: "05", title: "Fact Checking", description: "Verifying key factual claims against authoritative & reliable primary sources.", icon: UserCheck },
  { step: "06", title: "Ongoing Updates", description: "Periodically reviewing existing articles to update insights as industries evolve.", icon: RefreshCw },
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
      {/* Structured JSON-LD SEO Metadata */}
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
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-text-muted">
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-text-main font-bold">About</span>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-brand-dark p-8 sm:p-12 md:p-16 text-white shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-extrabold tracking-widest text-brand uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>About FreeBirds Digest</span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl font-jakarta">
              Helping Solo Professionals Build Better Careers.
            </h1>

            <p className="text-base leading-relaxed text-slate-200 sm:text-xl">
              FreeBirds Digest is a digital knowledge platform dedicated to helping freelancers, remote workers, solopreneurs, digital nomads, independent consultants, creators, and online entrepreneurs build healthier, smarter, and more sustainable careers.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#what-we-cover"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-brand-dark hover:scale-105 active:scale-95"
              >
                <span>Explore Our Content</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@freebirdsdigest.com"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3 text-sm font-bold text-slate-200 transition-all hover:bg-slate-700 hover:text-white"
              >
                <Mail className="h-4 w-4 text-brand" />
                <span>Contact Editorial Team</span>
              </a>
            </div>
          </div>

          {/* Decorative background glow elements */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-brand/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 right-1/3 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
        </section>

        {/* Core Belief & Mission Section */}
        <section className="my-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-brandborder bg-bg-surface p-7 sm:p-9 shadow-xs flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
                <Target className="h-4 w-4" />
                <span>Our Core Belief</span>
              </div>
              <h2 className="mt-3 text-2xl font-extrabold text-text-main sm:text-3xl font-jakarta">
                More Than Increasing Income
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-muted">
                We believe long-term professional success is about far more than increasing income. It comes from making better financial decisions, protecting your health, embracing the right technology, developing productive habits, and continuously learning in a rapidly changing digital world.
              </p>
            </div>
            <p className="mt-6 text-xs font-semibold italic text-brand/90 border-l-2 border-brand pl-3">
              "Every article we publish is created with one purpose: to help independent professionals make informed decisions that improve both their work and their lives."
            </p>
          </div>

          <div className="rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/5 via-bg-surface to-bg-surface p-7 sm:p-9 shadow-xs flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
                <ShieldCheck className="h-4 w-4" />
                <span>Our Mission</span>
              </div>
              <h2 className="mt-3 text-2xl font-extrabold text-text-main sm:text-3xl font-jakarta">
                Trusted & Practical Guidance
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-muted">
                To improve the wellbeing of solo professionals by publishing trusted, practical, research-backed, and experience-driven knowledge.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-brandborder flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Globe className="h-5 w-5" />
              </div>
              <p className="text-xs text-text-muted leading-tight font-medium">
                Serving independent workers, remote teams, and solopreneurs globally.
              </p>
            </div>
          </div>
        </section>

        {/* Who We Are & Why We Exist Grid */}
        <section className="my-14 space-y-12">
          {/* Who We Are */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand">
                Who We Are
              </span>
              <h2 className="text-2xl font-extrabold text-text-main sm:text-4xl font-jakarta">
                A digital-first publication built for the independent workforce.
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-text-muted">
                <p>
                  As more people choose freelancing, remote work, consulting, online business, and creator-led careers, the need for reliable, practical information has never been greater.
                </p>
                <p>
                  Unfortunately, much of the content available online prioritizes clicks over accuracy, trends over evidence, and opinions over research. We take a different approach.
                </p>
                <p>
                  Our goal is to create an evolving knowledge library that helps solo professionals make better decisions throughout every stage of their careers. Our editorial team works remotely, allowing us to serve readers worldwide while remaining focused on delivering accessible, high-quality information.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-3xl border border-brandborder bg-bg-surface p-7 sm:p-8 shadow-xs">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-text-main mb-6 border-b border-brandborder pb-3">
                Key Snapshot
              </h3>
              <dl className="grid grid-cols-2 gap-6">
                <div>
                  <dt className="text-xs font-semibold uppercase text-text-muted">Publication Type</dt>
                  <dd className="mt-1 text-base font-bold text-text-main">Digital-First Digest</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase text-text-muted">Team Structure</dt>
                  <dd className="mt-1 text-base font-bold text-text-main">100% Remote Editorial</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase text-text-muted">Content Philosophy</dt>
                  <dd className="mt-1 text-base font-bold text-brand">Research & Evidence</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase text-text-muted">Target Audience</dt>
                  <dd className="mt-1 text-base font-bold text-text-main">Solo Professionals</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Why We Exist */}
          <div className="rounded-3xl border border-brandborder bg-bg-subtle/50 p-8 sm:p-12 space-y-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-brand">
                Why We Exist
              </span>
              <h2 className="text-2xl font-extrabold text-text-main sm:text-3xl font-jakarta">
                Bridging the knowledge gap for independent careers.
              </h2>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                The world of work is changing. Millions of professionals now build careers outside traditional employment, yet many of the resources available remain fragmented, outdated, or overly promotional.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[
                "Managing personal finances & taxes",
                "Choosing reliable productivity tools",
                "Protecting mental & physical wellbeing",
                "Building sustainable work habits",
                "Navigating AI & new technologies",
                "Growing long-term solo careers",
                "Staying informed on industry trends",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 rounded-xl border border-brandborder/60 bg-bg-surface p-4 text-sm font-semibold text-text-main shadow-2xs">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Cover (Content Pillars) */}
        <section id="what-we-cover" className="my-16 scroll-mt-10">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              What We Cover
            </span>
            <h2 className="text-3xl font-extrabold text-text-main sm:text-4xl font-jakarta">
              Practical Topics for Modern Solo Professionals
            </h2>
            <p className="text-sm text-text-muted sm:text-base">
              Our content focuses on actionable, evergreen knowledge across seven primary career verticals.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contentPillars.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="group rounded-2xl border border-brandborder bg-bg-surface p-6 shadow-2xs transition-all duration-300 hover:border-brand/40 hover:shadow-md hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-text-main font-jakarta">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {pillar.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Who We Help */}
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
              Whether you are just beginning your journey or have years of experience, FreeBirds Digest provides practical guidance to help you make confident decisions.
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

        {/* Editorial Principles & Process */}
        <section className="my-16 space-y-12">
          {/* Editorial Principles */}
          <div>
            <div className="max-w-2xl space-y-2 mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-brand">
                Our Standards
              </span>
              <h2 className="text-3xl font-extrabold text-text-main sm:text-4xl font-jakarta">
                Our Editorial Principles
              </h2>
              <p className="text-sm text-text-muted sm:text-base">
                Everything we publish is guided by a clear editorial philosophy focused on trust and accuracy.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          </div>

          {/* Creation Process */}
          <div className="rounded-3xl border border-brandborder bg-gradient-to-b from-bg-surface to-bg-subtle/30 p-8 sm:p-12 space-y-8">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-brand">
                Workflow
              </span>
              <h2 className="text-2xl font-extrabold text-text-main sm:text-3xl font-jakarta">
                How We Create Content
              </h2>
              <p className="text-sm text-text-muted">
                Each article follows a structured 6-step editorial process before publication.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {creationProcess.map((item) => (
                <div key={item.step} className="relative rounded-2xl border border-brandborder bg-bg-surface p-6 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-brand/40 font-jakarta">{item.step}</span>
                    <item.icon className="h-5 w-5 text-brand" />
                  </div>
                  <h3 className="text-base font-bold text-text-main font-jakarta">{item.title}</h3>
                  <p className="text-xs text-text-muted leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Trust FreeBirds Digest & Become a Contributor */}
        <section className="my-16 grid gap-8 lg:grid-cols-12 items-stretch">
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
                Trust is earned through consistency, transparency, and quality. We build that trust by:
              </p>
              <ul className="grid gap-3 sm:grid-cols-2 text-xs font-medium text-text-main">
                {trustPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-brandborder bg-bg-subtle p-4 text-xs font-semibold text-text-muted">
              Our objective is not to tell readers what to think. Our objective is to provide the information they need to make better decisions.
            </div>
          </div>

          {/* Vision & Become a Contributor */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-3xl border border-brandborder bg-slate-950 p-7 text-white shadow-md space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand">
                Our Vision
              </span>
              <h3 className="text-xl font-extrabold font-jakarta">
                A Future of Trusted Knowledge
              </h3>
              <p className="text-xs leading-relaxed text-slate-300">
                We envision a future where every solo professional has access to trustworthy, practical, and unbiased knowledge. Our goal is to become one of the world's most trusted digital publications for independent professionals.
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
                  We welcome knowledgeable writers, researchers, and experienced professionals who share our commitment to accuracy, transparency, and practical education.
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

        {/* Frequently Asked Questions */}
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

        {/* Internal Links Navigation Bar */}
        <section className="my-12 rounded-3xl border border-brandborder bg-bg-surface p-8 shadow-xs space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-brand">
            Continue Exploring FreeBirds Digest
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
            <Link href="/" className="rounded-xl border border-brandborder px-4 py-2 text-text-main hover:border-brand hover:text-brand transition-colors">
              Home Page
            </Link>
            <Link href="/advertising" className="rounded-xl border border-brandborder px-4 py-2 text-text-main hover:border-brand hover:text-brand transition-colors">
              Advertise With Us
            </Link>
            <Link href="/newsletter" className="rounded-xl border border-brandborder px-4 py-2 text-text-main hover:border-brand hover:text-brand transition-colors">
              Weekly Newsletter
            </Link>
            <Link href="/privacy-policy" className="rounded-xl border border-brandborder px-4 py-2 text-text-main hover:border-brand hover:text-brand transition-colors">
              Privacy Policy & Terms
            </Link>
            <a href="mailto:hello@freebirdsdigest.com" className="rounded-xl border border-brandborder px-4 py-2 text-brand hover:bg-brand hover:text-white transition-colors">
              Contact Editorial Office
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
