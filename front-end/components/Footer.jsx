import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { fetchNavigationCategories } from '@/lib/categories'

const Footer = async () => {
    const activeCategories = await fetchNavigationCategories();

    return (
        <footer className="bg-bg-surface border-t border-brandborder">
            <div className='footerSec py-12'>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="secOne flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                        <div className="logoSec">
                            <Link href="/" className='inline-block transition-transform hover:scale-[1.01]'>
                                <Image src="/freeBird-logo.png" alt="Freebirds Digest Logo" width={180} height={60} className="w-auto h-[50px] object-contain" />
                            </Link>
                            <p className="mt-3 text-sm text-text-muted max-w-md">
                                Empowering freelancers, digital nomads, and work-from-home professionals with curated guides, career strategies, and industry news.
                            </p>
                        </div>
                        <div className="navberMenu">
                            <nav className='flex flex-wrap gap-x-6 gap-y-3 font-medium text-sm text-text-main'>
                                {activeCategories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/${category.slug}`}
                                        className="transition-colors hover:text-brand"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                                <Link
                                    href="/about"
                                    className="transition-colors hover:text-brand"
                                >
                                    About Us
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-brandborder py-8 bg-bg-subtle/50">
                <div className="sectwo container mx-auto flex flex-col justify-between gap-8 px-4 sm:flex-row md:px-6">
                    <div className="social">
                        <h4 className="text-base font-bold text-text-main">Follow Freebirds</h4>
                        <div className="icons mt-3 flex items-center gap-3">
                            <a href="https://www.facebook.com" target='_blank' rel="noreferrer" className='transition-transform hover:scale-110 opacity-90 hover:opacity-100'>
                                <Image
                                    src='/facebook.png'
                                    width={36}
                                    height={36}
                                    alt='facebook icon'
                                />
                            </a>
                            <a href="https://www.x.com" target='_blank' rel="noreferrer" className='transition-transform hover:scale-110 opacity-90 hover:opacity-100'>
                                <Image
                                    src='/x.png'
                                    width={36}
                                    height={36}
                                    alt='x icon'
                                />
                            </a>
                            <a href="https://www.instagram.com" target='_blank' rel="noreferrer" className='transition-transform hover:scale-110 opacity-90 hover:opacity-100'>
                                <Image
                                    src='/insta.png'
                                    width={36}
                                    height={36}
                                    alt='instagram icon'
                                />
                            </a>
                            <a href="https://www.linkedin.com" target='_blank' rel="noreferrer" className='transition-transform hover:scale-110 opacity-90 hover:opacity-100'>
                                <Image
                                    src='/linkedin.png'
                                    width={36}
                                    height={36}
                                    alt='linkedin icon'
                                />
                            </a>
                        </div>
                    </div>

                    <div className="contact">
                        <h4 className="text-base font-bold text-text-main">Get in Touch</h4>
                        <div className="contactInfo mt-2 text-sm text-text-muted space-y-1">
                            <p>Email: <a href="mailto:hello@freebirdsdigest.com" className="text-text-main hover:text-brand transition-colors font-medium">hello@freebirdsdigest.com</a></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-brandborder py-6">
                <div className="secthree container mx-auto px-4 md:px-6">
                    <div className="brandDeals flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-muted">
                        <Link href="/about" className='hover:text-brand transition-colors'>
                            About Us
                        </Link>
                        <span>•</span>
                        <Link href="/privacy-policy" className='hover:text-brand transition-colors'>
                            Privacy Policy
                        </Link>
                        <span>•</span>
                        <Link href="/advertising" className='hover:text-brand transition-colors'>
                            Advertising Policy
                        </Link>
                        <span>•</span>
                        <Link href="/newsletter" className='hover:text-brand transition-colors'>
                            Newsletter
                        </Link>
                    </div>
                </div>
            </div>

            <div className="copyrightSec py-4 bg-bg-surface border-t border-brandborder">
                <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4 text-xs text-text-muted md:px-6">
                    <p>© 2026 Freebirds Digest. All rights reserved.</p>
                    <p>Designed for Remote Workers & Freelancers worldwide</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer

