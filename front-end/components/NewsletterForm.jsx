'use client'

import { useState } from 'react'
import { Mail, Check, ArrowRight, Loader2 } from 'lucide-react'
import { subscribeNewsletter } from '@/app/actions'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setErrorMsg('')

    try {
      const formData = new FormData()
      formData.append('userEmail', email)
      const res = await subscribeNewsletter(formData)

      if (res?.success) {
        setSubmitted(true)
        setEmail('')
      } else {
        setErrorMsg(res?.error || 'Subscription failed. Please try again.')
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      {submitted ? (
        <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 font-semibold text-sm">
          <Check className="w-5 h-5 text-emerald-600" />
          <span>Thank you for subscribing! Check your inbox soon.</span>
        </div>
      ) : (
        <div className="space-y-2">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            {/* Honeypot for Bot Prevention */}
            <input type="text" name="company_website_url" className="hidden" tabIndex={-1} autoComplete="off" />

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
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer flex-shrink-0 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          {errorMsg && (
            <p className="text-xs text-red-500 font-medium">{errorMsg}</p>
          )}
        </div>
      )}
    </div>
  )
}
