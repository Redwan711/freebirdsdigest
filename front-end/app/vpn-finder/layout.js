import { siteName } from "@/lib/site";

export const metadata = {
  title: "Smart VPN Finder & Match Quiz",
  description:
    "Take our interactive VPN quiz to find the perfect VPN for streaming, remote work, security, and torrenting.",
  alternates: {
    canonical: "/vpn-finder",
  },
  openGraph: {
    type: "website",
    url: "/vpn-finder",
    siteName,
    title: `Smart VPN Finder & Match Quiz | ${siteName}`,
    description:
      "Take our interactive VPN quiz to find the perfect VPN for streaming, remote work, security, and torrenting.",
    images: [
      {
        url: "/freeBird-logo-new.png",
        width: 1200,
        height: 630,
        alt: `Smart VPN Finder & Match Quiz | ${siteName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Smart VPN Finder & Match Quiz | ${siteName}`,
    description:
      "Take our interactive VPN quiz to find the perfect VPN for streaming, remote work, security, and torrenting.",
    images: ["/freeBird-logo-new.png"],
  },
};

export default function VpnFinderLayout({ children }) {
  return children;
}
