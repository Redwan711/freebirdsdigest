'use client'

import { useState } from 'react'
import { Mail, Check, ArrowRight } from 'lucide-react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <div className="w-full">
      {submitted ? (
        <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 font-semibold text-sm">
          <Check className="w-5 h-5 text-emerald-600" />
          <span>Thank you for subscribing! Check your inbox soon.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <div className="relative flex-1">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-brandborder bg-bg-surface text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer flex-shrink-0"
          >
            <span>Subscribe</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  )
}
