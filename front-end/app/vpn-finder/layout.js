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
    title: `Smart VPN Finder & Match Quiz | ${siteName}`,
    description:
      "Take our interactive VPN quiz to find the perfect VPN for streaming, remote work, security, and torrenting.",
  },
};

export default function VpnFinderLayout({ children }) {
  return children;
}
