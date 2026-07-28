'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export default function ArticleActions() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-bg-subtle border border-brandborder text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-200 cursor-pointer relative"
        title="Copy link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-600 font-bold">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  )
}
