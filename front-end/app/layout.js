import { Noto_Serif_Bengali, Poppins } from "next/font/google";
import "./globals.css";
import Navber from "@/components/Navber";
import Footer from "@/components/Footer";
import { defaultDescription, siteName, siteUrl } from "@/lib/site";


const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali'], 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-bengali',
  display: 'swap',
});
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | সর্বশেষ বাংলা সংবাদ`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "/",
    siteName,
    title: `${siteName} | সর্বশেষ বাংলা সংবাদ`,
    description: defaultDescription,
    images: [{ url: "/astha-logo.png", alt: siteName }],
  },
  twitter: {
    card: "summary",
    title: `${siteName} | সর্বশেষ বাংলা সংবাদ`,
    description: defaultDescription,
    images: ["/astha-logo.png"],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn-BD"
      className={`${notoSerifBengali.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header>
          <Navber />
        </header>
        <main>
          {children}
        </main>
        <footer className="mt-12">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
