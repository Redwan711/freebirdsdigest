import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { fetchNavigationCategories } from '@/lib/categories'
import { Mail, Heart, Globe } from 'lucide-react'
import NewsletterForm from './NewsletterForm'

const Footer = async () => {
    const activeCategories = await fetchNavigationCategories();

    return (
        <footer className="bg-slate-950 text-slate-200 border-t border-slate-800 font-inter relative overflow-hidden">
            {/* Top Newsletter CTA Section */}
            <div className="border-b border-slate-800/80 bg-slate-900/60 py-12">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800/80 border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-xl">
                        <div className="space-y-2 text-center lg:text-left max-w-xl">
                            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand bg-brand/10 border border-brand/20 px-3 py-1 rounded-full">
                                <Mail className="w-3.5 h-3.5" />
                                <span>Weekly Remote Digest</span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                Stay Ahead in Remote Work & Freelancing
                            </h3>
                            <p className="text-sm text-slate-400">
                                Join 15,000+ digital nomads and remote professionals receiving curated career strategies, tool guides, and market updates every week.
                            </p>
                        </div>
                        <div className="w-full lg:max-w-md">
                            <NewsletterForm />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main 4-Column Footer Navigation Grid */}
            <div className="py-14">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

                        {/* Column 1: Brand & Bio (4/12) */}
                        <div className="lg:col-span-4 space-y-4">
                            {/* White Background Pill Container to make dark logo 100% visible */}
                            <Link href="/" className="inline-block transition-transform hover:scale-[1.01]">
                                <div className="bg-white/95 px-4 py-2.5 rounded-2xl border border-slate-700/60 inline-block shadow-sm">
                                    <Image
                                        src="/freeBird-logo-new.png"
                                        alt="Freebirds Digest Logo"
                                        width={180}
                                        height={55}
                                        className="w-auto h-[42px] object-contain"
                                    />
                                </div>
                            </Link>
                            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                                Freebirds Digest is the premier digital publication for freelancers, remote workers, and WFH professionals worldwide.
                            </p>
                            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-slate-400">
                                <Globe className="w-4 h-4 text-brand" />
                                <span>Global Remote Work Community</span>
                            </div>
                        </div>

                        {/* Column 2: Categories (3/12) */}
                        <div className="lg:col-span-3 space-y-4">
                            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-300 border-b border-slate-800 pb-2">
                                Digest Categories
                            </h4>
                            <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
                                {activeCategories.map((category) => (
                                    <li key={category.id}>
                                        <Link
                                            href={`/${category.slug}`}
                                            className="hover:text-brand transition-colors flex items-center gap-1.5 group"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-brand transition-colors" />
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Quick Links & Legal (2/12) */}
                        <div className="lg:col-span-2 space-y-4">
                            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-300 border-b border-slate-800 pb-2">
                                Company & Legal
                            </h4>
                            <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
                                <li>
                                    <Link href="/about" className="hover:text-brand transition-colors">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/author" className="hover:text-brand transition-colors">
                                        Our Authors
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contribute" className="hover:text-brand transition-colors">
                                        Write for Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/privacy-policy" className="hover:text-brand transition-colors">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/affiliate-disclosure" className="hover:text-brand transition-colors">
                                        Affiliate Disclosure
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/advertising" className="hover:text-brand transition-colors">
                                        Advertising
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/newsletter" className="hover:text-brand transition-colors">
                                        Newsletter
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: Community & Social Connect (3/12) */}
                        <div className="lg:col-span-3 space-y-4">
                            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-300 border-b border-slate-800 pb-2">
                                Follow & Connect
                            </h4>
                            <p className="text-xs text-slate-400">
                                Join our social channels to get instant updates on remote jobs and freelance guides.
                            </p>

                            {/* Social Icons — Inverted & styled white pills so icons are 100% visible */}
                            <div className="flex items-center gap-3">
                                <a href="https://www.facebook.com" target='_blank' rel="noreferrer" className='p-2.5 rounded-xl bg-white/10 hover:bg-brand border border-slate-700 text-white transition-all hover:scale-110 shadow-xs'>
                                    <Image src='/facebook.png' width={22} height={22} alt='facebook' className="w-5 h-5 invert brightness-200" />
                                </a>
                                <a href="https://www.x.com" target='_blank' rel="noreferrer" className='p-2.5 rounded-xl bg-white/10 hover:bg-brand border border-slate-700 text-white transition-all hover:scale-110 shadow-xs'>
                                    <Image src='/x.png' width={22} height={22} alt='x' className="w-5 h-5 invert brightness-200" />
                                </a>
                                <a href="https://www.instagram.com" target='_blank' rel="noreferrer" className='p-2.5 rounded-xl bg-white/10 hover:bg-brand border border-slate-700 text-white transition-all hover:scale-110 shadow-xs'>
                                    <Image src='/insta.png' width={22} height={22} alt='instagram' className="w-5 h-5 invert brightness-200" />
                                </a>
                                <a href="https://www.linkedin.com" target='_blank' rel="noreferrer" className='p-2.5 rounded-xl bg-white/10 hover:bg-brand border border-slate-700 text-white transition-all hover:scale-110 shadow-xs'>
                                    <Image src='/linkedin.png' width={22} height={22} alt='linkedin' className="w-5 h-5 invert brightness-200" />
                                </a>
                            </div>

                            <div className="pt-2 text-xs text-slate-400 space-y-1">
                                <span className="block font-semibold text-slate-300">Editorial Office:</span>
                                <a href="mailto:hello@freebirdsdigest.com" className="text-brand font-medium hover:underline">
                                    hello@freebirdsdigest.com
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Copyright & Footer Bar */}
            <div className="border-t border-slate-800/80 py-6 bg-slate-950">
                <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 px-4 text-xs text-slate-400 md:px-6">
                    <p>© 2026 Freebirds Digest. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Empowering remote professionals worldwide <Heart className="w-3 h-3 text-brand fill-brand" />
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
