import Link from "next/link";
import { Info } from "lucide-react";

const TransparencyNotice = () => {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-amber-300/40 bg-amber-50/60 dark:bg-amber-950/20 dark:border-amber-500/20 p-4 sm:p-5 shadow-2xs">
      <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
        <span className="font-bold text-text-main">Transparency Notice:</span>{" "}
        FreeBirds Digest is reader-supported. Some links in this article are affiliate links, meaning we may receive a small commission if you purchase through them. This helps us continue creating independent reviews and resources for freelancers.{" "}
        <Link href="/affiliate-disclosure" className="text-brand font-semibold hover:underline">Learn more</Link>.
      </p>
    </div>
  );
};

export default TransparencyNotice;
