import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navber from "@/components/Navber";
import Footer from "@/components/Footer";
import { defaultDescription, siteName, siteUrl } from "@/lib/site";

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
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
    images: [{ url: "/freeBird-logo.png", alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Freelance & Remote Work Insights`,
    description: defaultDescription,
    images: ["/freeBird-logo.png"],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-text-main font-inter selection:bg-brand selection:text-white">
        <header>
          <Navber />
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="mt-16">
          <Footer />
        </footer>
      </body>
    </html>
  );
}


