const values = [
  {
    title: "Reliable reporting",
    description:
      "We aim to share accurate, timely stories and clearly separate facts from opinion.",
  },
  {
    title: "People first",
    description:
      "Our coverage focuses on the issues, voices, and communities that matter every day.",
  },
  {
    title: "Open to everyone",
    description:
      "We want news to feel accessible, understandable, and useful for every reader.",
  },
];

export const metadata = {
  title: "আমাদের সম্পর্কে",
  description: "Astha News-এর লক্ষ্য, মূল্যবোধ এবং আমাদের সম্পর্কে জানুন।",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14 md:px-6">
      <section className="overflow-hidden rounded-2xl bg-brand px-6 py-12 text-white sm:px-10 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
          About Astha News
        </p>
        <h1 className="mt-3 max-w-3xl font-bangali text-4xl font-bold leading-tight sm:text-5xl">
          News that keeps you connected.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
          Astha News is an independent digital news platform bringing readers the
          latest stories from Bangladesh and around the world.
        </p>
      </section>

      <section className="grid gap-8 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Our mission
          </p>
          <h2 className="mt-3 font-bangali text-3xl font-bold text-gray-900 sm:text-4xl">
            Clear, useful journalism for modern readers.
          </h2>
          <div className="mt-5 space-y-4 text-base leading-7 text-gray-600 sm:text-lg">
            <p>
              We believe trustworthy news should be easy to find and easy to
              understand. Our team covers current affairs, business, technology,
              sports, culture, and the stories shaping everyday life.
            </p>
            <p>
              This is demo content for the About page. You can replace this text
              later with your team story, editorial policy, and company details.
            </p>
          </div>
        </div>

        <aside className="rounded-2xl border border-brandborder bg-gray-50 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            At a glance
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <dt className="text-sm text-gray-500">Founded</dt>
              <dd className="mt-1 text-2xl font-bold text-gray-900">2026</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Coverage</dt>
              <dd className="mt-1 text-2xl font-bold text-gray-900">24/7</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Based in</dt>
              <dd className="mt-1 text-2xl font-bold text-gray-900">Dhaka</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Readers</dt>
              <dd className="mt-1 text-2xl font-bold text-gray-900">Global</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="border-t border-brandborder py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          What guides us
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="rounded-xl border border-brandborder p-6">
              <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
              <p className="mt-3 leading-7 text-gray-600">{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-gray-900 px-6 py-10 text-white sm:px-10">
        <h2 className="text-2xl font-bold sm:text-3xl">Have a story to share?</h2>
        <p className="mt-3 max-w-2xl leading-7 text-gray-300">
          Send us your feedback, ideas, or news tips. We would love to hear from
          you.
        </p>
        <a
          href="mailto:info@asthanews.com"
          className="mt-6 inline-flex rounded-md bg-white px-5 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-100"
        >
          Contact Astha News
        </a>
      </section>
    </main>
  );
}
