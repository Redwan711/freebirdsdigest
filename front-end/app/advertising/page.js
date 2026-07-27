// app/advertising/page.js
import React from 'react';

const page = () => {
  return (
    <div className="advertising-page">
      <section className="container mx-auto px-4 py-12 md:px-6 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-brand sm:text-[32px] font-poppins">
          Advertise with Astha News
        </h1>

        <p className="text-base mb-8 sm:text-[18px] font-poppins">
          Reach a highly engaged, diverse, and growing audience by partnering with Astha News. As a trusted source of news and information, we offer brands a unique opportunity to connect with readers across Bangladesh and the global diaspora.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-brand font-poppins">Why Partner With Us?</h2>
        <p className="text-base mb-4 sm:text-[18px] font-poppins">
          Astha News is committed to delivering high-quality journalism, which means your brand will be positioned alongside credible and impactful content.
        </p>
        <ul className="list-disc pl-8 mb-8 text-base sm:text-[18px] font-poppins space-y-2">
          <li><strong>Broad Reach:</strong> Connect with thousands of daily active readers across our web and mobile platforms.</li>
          <li><strong>Targeted Demographics:</strong> Engage with professionals, students, business owners, and decision-makers.</li>
          <li><strong>Brand Safety:</strong> Your advertisements will be displayed in a secure, trusted, and premium news environment.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-brand font-poppins">Advertising Solutions</h2>
        <p className="text-base mb-4 sm:text-[18px] font-poppins">
          We offer a variety of customizable advertising formats to help you achieve your marketing goals:
        </p>
        <ul className="list-disc pl-8 mb-8 text-base sm:text-[18px] font-poppins space-y-2">
          <li><strong>Display Advertising:</strong> Premium banner placements across our homepage, category pages, and within individual articles.</li>
          <li><strong>Sponsored Content:</strong> Native advertorials and branded stories written to resonate with our readership.</li>
          <li><strong>Video Ads:</strong> Engaging video placements for maximum visual impact.</li>
          <li><strong>Social Media Campaigns:</strong> Cross-platform promotions leveraging our dedicated social media following.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-brand font-poppins">Get in Touch</h2>
        <p className="text-base mb-4 sm:text-[18px] font-poppins">
          Ready to elevate your brand? Our dedicated advertising team is here to help you build a custom campaign that fits your budget and objectives.
        </p>
        <p className="text-base mb-4 sm:text-[18px] font-poppins">
          For media kits, rate cards, and all advertising inquiries, please reach out to our team:
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
          <p className="text-base sm:text-[18px] font-poppins mb-2">
            <strong>Email:</strong> <a href="mailto:info@astha.news" className="text-brand hover:underline">info@astha.news</a>
          </p>
          <p className="text-base sm:text-[18px] font-poppins">
            <strong>Business Hours:</strong> Sunday – Thursday, 10:00 AM – 6:00 PM
          </p>
        </div>
      </section>
    </div>
  );
};

export default page;