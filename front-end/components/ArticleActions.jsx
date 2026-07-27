'use client'

import { useState } from 'react'
import { Share2, Bookmark, Check, Copy } from 'lucide-react'

export default function ArticleActions({ title }) {
  const [copied, setCopied] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const handleShare = async () => {
    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href })
      } catch (err) {
        // Share cancelled
      }
    } else {
      handleCopy()
    }
  }

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
        onClick={() => setBookmarked(!bookmarked)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer ${
          bookmarked
            ? 'bg-brand/10 border-brand/30 text-brand'
            : 'bg-bg-subtle border-brandborder text-text-muted hover:text-text-main hover:border-brand/30'
        }`}
        title={bookmarked ? 'Saved to bookmarks' : 'Save article'}
      >
        <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-brand text-brand' : ''}`} />
        <span>{bookmarked ? 'Saved' : 'Save'}</span>
      </button>

      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-bg-subtle border border-brandborder text-text-muted hover:text-brand hover:border-brand/30 transition-all duration-200 cursor-pointer"
        title="Share article"
      >
        <Share2 className="w-3.5 h-3.5 text-brand" />
        <span>Share</span>
      </button>

      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-bg-subtle border border-brandborder text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-200 cursor-pointer relative"
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
