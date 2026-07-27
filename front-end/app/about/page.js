const values = [
  {
    title: "Actionable Insights",
    description:
      "We provide actionable guides, strategy breakdowns, and practical tools to help you thrive in your freelance or remote career.",
  },
  {
    title: "Remote First",
    description:
      "Our coverage is built specifically for freelancers, digital nomads, and work-from-home professionals navigating modern work.",
  },
  {
    title: "Community Driven",
    description:
      "We foster an open digest connecting independent workers worldwide with real stories, market trends, and shared experiences.",
  },
];

export const metadata = {
  title: "About Us",
  description: "Learn about Freebirds Digest, our mission, values, and resources for freelancers and remote workers.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14 md:px-6 font-inter">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-brand to-brand-dark px-6 py-12 text-white sm:px-10 sm:py-16 shadow-md">
        <p className="text-xs font-bold uppercase tracking-widest text-white/80">
          About Freebirds Digest
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">
          Empowering the future of remote & freelance work.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
          Freebirds Digest is an independent publication dedicated to delivering curated news, career strategies, tool reviews, and productivity insights for independent workers around the globe.
        </p>
      </section>

      <section className="grid gap-8 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand">
            Our Mission
          </p>
          <h2 className="mt-3 text-2xl font-extrabold text-text-main sm:text-3xl">
            Clear, practical guides for modern remote professionals.
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-text-muted">
            <p>
              We believe freedom and flexibility in work shouldn't mean figuring everything out alone. Our editorial team covers remote job market trends, freelance business finance, productivity tools, home office setups, and health & balance.
            </p>
            <p>
              Whether you are an experienced software contractor, creative freelancer, agency owner, or transitioning to work-from-home, Freebirds Digest keeps you ahead of the curve.
            </p>
          </div>
        </div>

        <aside className="rounded-3xl border border-brandborder bg-bg-surface p-6 sm:p-8 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">
            At a Glance
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <dt className="text-xs font-medium text-text-muted">Founded</dt>
              <dd className="mt-1 text-2xl font-extrabold text-text-main">2026</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-text-muted">Focus</dt>
              <dd className="mt-1 text-xl font-bold text-text-main">Remote & Freelance</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-text-muted">Topics</dt>
              <dd className="mt-1 text-xl font-bold text-text-main">Career, Tools, WFH</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-text-muted">Readership</dt>
              <dd className="mt-1 text-2xl font-extrabold text-text-main">Global</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="border-t border-brandborder py-12">
        <p className="text-xs font-bold uppercase tracking-widest text-brand">
          What Guides Us
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="rounded-2xl border border-brandborder bg-bg-surface p-6 shadow-xs">
              <h3 className="text-lg font-bold text-text-main">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-bg-surface border border-brandborder p-8 text-text-main sm:p-10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-extrabold sm:text-2xl text-text-main">Have a story or pitch to share?</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-muted">
            Send us your feedback, remote work tips, or guest post ideas. We'd love to connect with fellow freebirds.
          </p>
        </div>
        <a
          href="mailto:hello@freebirdsdigest.com"
          className="flex-shrink-0 rounded-xl bg-brand px-6 py-3 font-bold text-white transition-opacity hover:opacity-90 shadow-md text-sm"
        >
          Contact Freebirds
        </a>
      </section>
    </main>
  );
}

