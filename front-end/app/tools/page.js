import Link from "next/link";
import {
  Calculator,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  DollarSign,
  Lock,
} from "lucide-react";

export const metadata = {
  title: "Tools & Calculators - Free Birds Digest",
  description:
    "Explore our free interactive tools for freelancers and remote workers, including the Freelance Rate Calculator and Smart VPN Finder.",
};

const TOOLS_LIST = [
  {
    id: "freelance-rate-calculator",
    name: "Freelance Rate Calculator",
    badge: "Financial Tool",
    badgeColor: "bg-brand/10 text-brand border-brand/20",
    icon: Calculator,
    iconBg: "bg-brand/10 text-brand",
    description:
      "Stop guessing your prices. Calculate your target hourly rate, day rate, and monthly revenue based on your income goals, overhead expenses, tax buffer, and real billable hours.",
    features: [
      "Annual & Monthly target income modes",
      "Direct dollar ($) or percentage (%) tax buffer options",
      "Billable vs non-billable time breakdown",
      "Instant copyable rate summary",
    ],
    href: "/freelance-rate-calculator",
    cta: "Launch Rate Calculator",
  },
  {
    id: "vpn-finder",
    name: "Smart VPN Finder",
    badge: "Security & Privacy",
    badgeColor: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
    icon: ShieldCheck,
    iconBg: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
    description:
      "Find the best VPN tailored to your exact needs. Answer 5 quick questions about streaming, public Wi-Fi security, device compatibility, and budget.",
    features: [
      "5-question smart matching quiz",
      "Tailored for freelancers & remote workers",
      "Detailed pros, pricing & security comparison",
      "No sign-up or email required",
    ],
    href: "/vpn-finder",
    cta: "Take VPN Quiz",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-bg-base text-text-main py-10 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-muted hover:text-brand transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          <span className="text-xs font-semibold text-text-muted">
            2 Interactive Tools Available
          </span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Free Solopreneur Toolkit</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-text-main font-heading tracking-tight">
            Freebirds Tools
          </h1>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            Free, interactive web tools engineered to help freelancers, remote professionals, and digital nomads price their services and secure their workflows.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-4">
          {TOOLS_LIST.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="bg-bg-surface border border-brandborder rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md hover:border-brand/40 transition-all duration-200 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className={`p-3 rounded-2xl ${tool.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${tool.badgeColor}`}
                    >
                      {tool.badge}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-text-main font-heading group-hover:text-brand transition-colors">
                      {tool.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-brandborder/60 space-y-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-text-muted">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-text-main">
                      {tool.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href={tool.href}
                  className="w-full py-3 px-4 rounded-xl bg-brand hover:bg-brand-dark text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-brand/20 group-hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  <span>{tool.cta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
