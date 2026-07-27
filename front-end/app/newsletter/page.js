// app/newsletter/page.js
import React from 'react';
import Link from 'next/link';

const page = () => {
  return (
    <div className="newsletter-page">
      <section className="container mx-auto px-4 py-16 md:px-6 max-w-3xl text-center">
        <h1 className="text-3xl font-bold mb-4 text-brand sm:text-[32px] font-poppins">
          Astha News Newsletter
        </h1>

        <p className="text-base mb-8 sm:text-[18px] font-poppins text-gray-700">
          We are building something exciting! Our daily newsletter is currently under development and will be launching very soon.
        </p>

        {/* Coming Soon Card */}
        <div className="bg-gray-50 p-8 md:p-12 rounded-lg border border-gray-200 mb-10 shadow-sm flex flex-col items-center justify-center">
          
          {/* Badge */}
          <div className="bg-red-100 text-brand px-4 py-1.5 rounded-full font-bold text-sm tracking-widest mb-4 font-poppins uppercase border border-red-200">
            Coming Soon
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 font-poppins mb-3">
            Stay tuned for updates!
          </h2>
          
          <p className="text-gray-600 font-poppins max-w-md mx-auto mb-6">
            Soon, you will be able to get breaking news alerts, daily briefings, and exclusive editorials delivered straight to your inbox. 
          </p>
          
        </div>

        {/* Back to Home Link */}
        <div className="mt-8">
          <Link href="/" className="text-brand font-poppins font-semibold hover:underline inline-flex items-center gap-2">
            <span>&larr;</span> Return to Homepage
          </Link>
        </div>

      </section>
    </div>
  );
};

export default page;