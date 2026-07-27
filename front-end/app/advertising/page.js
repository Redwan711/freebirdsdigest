import React from 'react';

const page = () => {
  return (
    <div className="advertising-page font-inter">
      <section className="container mx-auto px-4 py-12 md:px-6 max-w-4xl">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-text-main sm:text-4xl font-jakarta">
          Advertise with Freebirds Digest
        </h1>

        <p className="text-base mb-8 sm:text-lg text-text-muted leading-relaxed font-inter">
          Reach a highly engaged, diverse, and growing audience by partnering with Freebirds Digest. We offer brands a unique opportunity to connect with freelancers, digital nomads, and remote workers worldwide.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-text-main font-jakarta">Why Partner With Us?</h2>
        <p className="text-base mb-4 sm:text-lg text-text-muted leading-relaxed font-inter">
          Freebirds Digest is committed to delivering high-quality career strategies, remote work guides, and tech tool reviews.
        </p>
        <ul className="list-disc pl-8 mb-8 text-base sm:text-lg text-text-muted font-inter space-y-2">
          <li><strong>Broad Reach:</strong> Connect with thousands of active remote professionals across our web and newsletter channels.</li>
          <li><strong>Targeted Demographics:</strong> Engage with developers, designers, content creators, and remote business owners.</li>
          <li><strong>Brand Safety:</strong> Your advertisements will be displayed in a trusted, premium publication environment.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-text-main font-jakarta">Get in Touch</h2>
        <p className="text-base mb-4 sm:text-lg text-text-muted leading-relaxed font-inter">
          Ready to elevate your brand? For media kits, rate cards, and advertising inquiries, reach out to our team:
        </p>
        
        <div className="bg-bg-surface p-6 rounded-2xl border border-brandborder mt-6 shadow-xs space-y-2">
          <p className="text-base sm:text-lg font-inter">
            <strong>Email:</strong> <a href="mailto:hello@freebirdsdigest.com" className="text-brand hover:underline font-bold">hello@freebirdsdigest.com</a>
          </p>
          <p className="text-sm text-text-muted font-inter">
            <strong>Response Time:</strong> Within 24 business hours
          </p>
        </div>
      </section>
    </div>
  );
};

export default page;