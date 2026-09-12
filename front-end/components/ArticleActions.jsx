'use client'

import { useState, useEffect } from 'react'
import { Share2, Check, Copy, X, ExternalLink } from 'lucide-react'

export default function ArticleActions({ title = '' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copiedForInsta, setCopiedForInsta] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
    }
  }, [])

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleCopyLink = () => {
    if (typeof window !== 'undefined' && currentUrl) {
      navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleInstagramClick = () => {
    if (typeof window !== 'undefined' && currentUrl) {
      navigator.clipboard.writeText(currentUrl)
      setCopiedForInsta(true)
      setTimeout(() => setCopiedForInsta(false), 3000)
      window.open('https://www.instagram.com/freebirdsdigest/', '_blank', 'noopener,noreferrer')
    }
  }

  const handleNativeShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: title || 'Freebirds Digest',
          url: currentUrl,
        })
        .catch(() => {})
    }
  }

  const publicUrl = currentUrl.includes('localhost')
    ? currentUrl.replace(/http:\/\/localhost:\d+/, 'https://freebirdsdigest.com')
    : currentUrl

  const encodedUrl = encodeURIComponent(publicUrl || 'https://freebirdsdigest.com')
  const encodedTitle = encodeURIComponent(title || 'Freebirds Digest')

  const socialChannels = [
    {
      name: 'X',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      iconColor: 'text-text-main group-hover:text-brand',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
      iconColor: 'text-[#0A66C2]',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      iconColor: 'text-[#1877F2]',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      iconColor: 'text-[#E1306C]',
      onClick: handleInstagramClick,
    },
  ]

  return (
    <div className="flex items-center gap-2">
      {/* Trigger Button: Share */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-bg-subtle border border-brandborder text-text-muted hover:text-brand hover:border-brand/40 transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
        title="Share this article"
      >
        <Share2 className="w-3.5 h-3.5 text-brand" />
        <span>Share</span>
      </button>

      {/* Share Modal Popup */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl bg-bg-surface border border-brandborder p-5 sm:p-6 shadow-2xl space-y-5 text-text-main animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-brandborder/60">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-brand/10 text-brand">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-text-main font-heading">
                    Share Article
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-text-muted hover:text-text-main hover:bg-bg-subtle transition cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Truncated Article Title Preview */}
            {title && (
              <p className="text-xs font-semibold text-text-muted line-clamp-2 leading-relaxed bg-bg-subtle/50 p-2.5 rounded-xl border border-brandborder/50">
                "{title}"
              </p>
            )}

            {/* Social Media Share: 1 Single Row */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block">
                Share on Social Media
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  width: '100%',
                }}
              >
                {socialChannels.map((item) =>
                  item.href ? (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-1 flex flex-col items-center justify-center gap-1.5 py-3 px-1 rounded-2xl border border-brandborder bg-bg-subtle hover:bg-bg-surface hover:border-brand/50 transition-all duration-200 hover:scale-105 shadow-2xs"
                      title={`Share on ${item.name}`}
                      style={{
                        flex: '1 1 0%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                      }}
                    >
                      <span className={`${item.iconColor} transition-transform group-hover:scale-110`}>
                        {item.icon}
                      </span>
                      <span className="text-[10px] font-bold text-text-muted group-hover:text-text-main truncate max-w-full">
                        {item.name}
                      </span>
                    </a>
                  ) : (
                    <button
                      key={item.name}
                      type="button"
                      onClick={item.onClick}
                      className="group flex-1 flex flex-col items-center justify-center gap-1.5 py-3 px-1 rounded-2xl border border-brandborder bg-bg-subtle hover:bg-bg-surface hover:border-brand/50 transition-all duration-200 hover:scale-105 shadow-2xs cursor-pointer"
                      title={`Share on ${item.name}`}
                      style={{
                        flex: '1 1 0%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span className={`${item.iconColor} transition-transform group-hover:scale-110`}>
                        {item.icon}
                      </span>
                      <span className="text-[10px] font-bold text-text-muted group-hover:text-text-main truncate max-w-full">
                        {item.name}
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Instagram Notice Toast */}
            {copiedForInsta && (
              <div className="p-2.5 rounded-xl bg-brand/10 border border-brand/30 text-brand text-[11px] font-bold text-center animate-in fade-in duration-150">
                ✓ Link copied to clipboard for Instagram!
              </div>
            )}

            {/* Copy Link Section */}
            <div className="space-y-2 pt-1 border-t border-brandborder/60">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block">
                Or copy link
              </span>
              <div className="flex items-center gap-1.5 bg-bg-subtle border border-brandborder rounded-2xl p-1 pl-3">
                <input
                  type="text"
                  readOnly
                  value={currentUrl}
                  className="bg-transparent text-xs text-text-main font-medium focus:outline-none w-full truncate select-all"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-2xs cursor-pointer ${
                    copied
                      ? 'bg-emerald-500 text-white'
                      : 'bg-brand hover:bg-brand-dark text-white active:scale-95'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Native device share option (if browser supports Web Share API) */}
            {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="w-full text-center text-xs font-semibold text-text-muted hover:text-brand transition flex items-center justify-center gap-1 pt-1"
              >
                <span>More sharing options</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
