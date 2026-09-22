import Link from "next/link";
import { siteName } from "@/lib/site";
import {
  FileQuestion,
  Home,
  Compass,
  ArrowRight,
  ShieldCheck,
  Calculator,
} from "lucide-react";

export const metadata = {
  title: `Page Not Found | ${siteName}`,
  description: "The page you are looking for could not be found on Freebirds Digest.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  const quickLinks = [
    { title: "VPN Finder", href: "/vpn-finder", icon: ShieldCheck, desc: "Find top-rated secure VPNs" },
    { title: "Rate Calculator", href: "/freelance-rate-calculator", icon: Calculator, desc: "Calculate freelance hourly rates" },
    // TEMPORARILY DISABLED: Tools Directory link
    // { title: "Tools Directory", href: "/tools", icon: Compass, desc: "Explore remote work tools" },
  ];

  const popularCategories = [
    { name: "Finance", href: "/finance" },
    { name: "Technology", href: "/technology" },
    { name: "Lifestyle", href: "/lifestyle" },
    { name: "News", href: "/news" },
    { name: "VPN Reviews", href: "/vpn-reviews" },
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 md:py-24 font-inter">
      <div className="rounded-3xl border border-brandborder bg-bg-surface p-8 sm:p-14 shadow-sm text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-brand/10 text-brand">
          <FileQuestion className="h-10 w-10" />
        </div>

        <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand mb-3">
          404 Error
        </span>

        <h1 className="font-jakarta text-3xl font-extrabold text-text-main sm:text-4xl md:text-5xl tracking-tight">
          Page Not Found
        </h1>

        <p className="mt-4 text-base leading-relaxed text-text-muted max-w-lg mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-brand-dark hover:scale-[1.02]"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          {/* TEMPORARILY DISABLED: Explore Tools button
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-xl border border-brandborder bg-bg-subtle px-6 py-3 text-sm font-semibold text-text-main transition-colors hover:border-brand/40 hover:text-brand"
          >
            <Compass className="h-4 w-4" />
            Explore Tools
          </Link>
          */}
        </div>

        {/* Quick Links */}
        <div className="mt-12 border-t border-brandborder pt-10 text-left">
          <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4 text-center">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col justify-between rounded-2xl border border-brandborder p-4 bg-bg-base/60 hover:border-brand/40 transition-all hover:bg-bg-subtle"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-text-main group-hover:text-brand transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-text-muted">{item.desc}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Categories Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-text-muted mr-1 font-medium">Categories:</span>
          {popularCategories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="rounded-lg border border-brandborder bg-bg-subtle px-3 py-1 text-xs font-medium text-text-main hover:border-brand hover:text-brand transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
