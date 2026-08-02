'use client'

import { useState } from 'react'
import { Send, CheckCircle2, Sparkles, User, Mail, Link as LinkIcon, FileText, Tag, MessageSquare, Loader2 } from 'lucide-react'
import { sendContributePitchEmail } from '@/app/actions'

export default function ContributeForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    portfolio: '',
    category: 'Career Growth',
    title: '',
    pitch: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.title || !formData.pitch) return

    setLoading(true)
    setErrorMsg('')

    try {
      const payload = new FormData()
      payload.append('name', formData.name)
      payload.append('email', formData.email)
      payload.append('portfolio', formData.portfolio)
      payload.append('category', formData.category)
      payload.append('title', formData.title)
      payload.append('pitch', formData.pitch)

      const res = await sendContributePitchEmail(payload)

      if (res?.success) {
        setSubmitted(true)
      } else {
        setErrorMsg(res?.error || 'Failed to submit pitch. Please try again.')
      }
    } catch (err) {
      setErrorMsg('An error occurred while dispatching email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      portfolio: '',
      category: 'Career Growth',
      title: '',
      pitch: '',
    })
    setSubmitted(false)
    setErrorMsg('')
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8 sm:p-12 text-center shadow-lg transition-all duration-300">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-6">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="text-2xl font-extrabold text-text-main font-jakarta mb-3">
          Pitch Proposal Received!
        </h3>
        <p className="text-base text-text-muted max-w-lg mx-auto mb-6 leading-relaxed">
          Thank you, <span className="font-bold text-text-main">{formData.name}</span>. Our editorial team will review your pitch titled <span className="italic text-brand font-semibold">&ldquo;{formData.title}&rdquo;</span> and get back to you within 3 business days at <span className="font-semibold text-text-main">{formData.email}</span>.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-brand-dark transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Submit Another Pitch</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot for Bot Prevention */}
      <input type="text" name="company_website_url" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-text-main mb-2">
            Your Name <span className="text-brand">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex Morgan"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-brandborder bg-bg-surface text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-text-main mb-2">
            Email Address <span className="text-brand">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-brandborder bg-bg-surface text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Portfolio / Website URL */}
        <div>
          <label htmlFor="portfolio" className="block text-xs font-bold uppercase tracking-wider text-text-main mb-2">
            Portfolio / LinkedIn / X <span className="text-text-muted font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              id="portfolio"
              name="portfolio"
              type="url"
              value={formData.portfolio}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-brandborder bg-bg-surface text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all"
            />
          </div>
        </div>

        {/* Primary Category */}
        <div>
          <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wider text-text-main mb-2">
            Target Content Category <span className="text-brand">*</span>
          </label>
          <div className="relative">
            <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-brandborder bg-bg-surface text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all appearance-none cursor-pointer"
            >
              <option value="Career Growth">Career Growth & Client Acquisition</option>
              <option value="Personal Finance">Personal Finance & Business Money</option>
              <option value="Technology">Tech, AI & Work Tools</option>
              <option value="Productivity">Productivity & Workflows</option>
              <option value="Lifestyle">Lifestyle & Health Wellbeing</option>
              <option value="Industry News">Industry Trends & Market News</option>
              <option value="Digital Work">Digital Work & Solopreneurship</option>
            </select>
          </div>
        </div>
      </div>

      {/* Proposed Title */}
      <div>
        <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-text-main mb-2">
          Proposed Article Title <span className="text-brand">*</span>
        </label>
        <div className="relative">
          <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. How to Structure Client Retainers for Predictable Monthly Income"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-brandborder bg-bg-surface text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all"
          />
        </div>
      </div>

      {/* Article Pitch / Outline Summary */}
      <div>
        <label htmlFor="pitch" className="block text-xs font-bold uppercase tracking-wider text-text-main mb-2">
          Pitch Summary & Key Takeaways <span className="text-brand">*</span>
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3.5 top-4 w-4 h-4 text-text-muted" />
          <textarea
            id="pitch"
            name="pitch"
            rows={5}
            required
            value={formData.pitch}
            onChange={handleChange}
            placeholder="Briefly outline your proposed article: 1) What core problem does it solve? 2) What practical steps or data will you include? 3) Why are you uniquely qualified to write it?"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-brandborder bg-bg-surface text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all leading-relaxed"
          />
        </div>
      </div>

      {errorMsg && (
        <p className="text-xs text-red-500 font-semibold">{errorMsg}</p>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-8 py-3.5 text-base font-extrabold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-dark hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting Proposal...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Pitch Proposal</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
