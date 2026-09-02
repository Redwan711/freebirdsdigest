import { Inter, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navber from "@/components/Navber";
import Footer from "@/components/Footer";
import { defaultDescription, siteName, siteUrl } from "@/lib/site";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Freelance & Remote Work Insights`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName,
    title: `${siteName} | Freelance & Remote Work Insights`,
    description: defaultDescription,
    images: [{ url: "/freeBird-logo-new.png", alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Freelance & Remote Work Insights`,
    description: defaultDescription,
    images: ["/freeBird-logo-new.png"],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg-base text-text-main font-inter selection:bg-brand selection:text-white overflow-x-hidden w-full max-w-full">
        <header>
          <Navber />
        </header>
        <div className="flex-1">
          {children}
        </div>
        <footer className="mt-16">
          <Footer />
        </footer>
        <Analytics />
      </body>
    </html>
  );
}


