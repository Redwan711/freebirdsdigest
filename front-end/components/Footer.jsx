import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { fetchNavigationCategories } from '@/lib/categories'

const Footer = async () => {
    const activeCategories = await fetchNavigationCategories();

    return (
        <>
            <div className='footerSec border-y border-brandborder py-12'>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="secOne flex flex-col">
                        <div className="logoSec mb-[1rem]">
                            <Link href="/" className='flex items-center gap-2'>
                                <Image
                                    src="/name-lg.png"
                                    alt="Logo"
                                    width={200}
                                    height={100}
                                />
                            </Link>
                        </div>
                        <div className="navberMenu mt-8">
                            <nav className='grid max-w-[700px] grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-4 md:gap-x-10'>
                                {activeCategories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/${category.slug}`}
                                        className="text-sm text-black transition-colors hover:text-red sm:text-[18px] font-poppins"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                                <Link
                                    href="/about"
                                    className="text-sm text-black transition-colors hover:text-red sm:text-[18px] font-poppins"
                                >
                                    About Us
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-b border-brandborder py-8">
                <div className="sectwo container mx-auto flex flex-col justify-between gap-8 px-4 sm:flex-row md:px-6">
                    <div className="social">
                        <h4 className="text-2xl font-semibold sm:text-[28px] font-poppins">Follow Us</h4>
                        <div className="icons mt-2 flex gap-3 sm:gap-4">
                            <a href="https://www.facebook.com" target='_blank' className='size-10 object-contain sm:size-[50px]'>
                                <Image
                                    src='/facebook.png'
                                    width={50}
                                    height={50}
                                    alt='facebook icon'
                                />
                            </a>
                            <a href="https://www.x.com" target='_blank' className='size-10 object-contain sm:size-[50px]'>
                                <Image
                                    src='/x.png'
                                    width={50}
                                    height={50}
                                    alt='x icon'
                                />
                            </a>
                            <a href="https://www.instagram.com" target='_blank' className='size-10 object-contain sm:size-[50px]'>
                                <Image
                                    src='/insta.png'
                                    width={50}
                                    height={50}
                                    alt='instagram icon'
                                />
                            </a>
                            <a href="https://www.linkedin.com" target='_blank' className='size-10 object-contain sm:size-[50px]'>
                                <Image
                                    src='/linkedin.png'
                                    width={50}
                                    height={50}
                                    alt='linkedin icon'
                                />
                            </a>
                        </div>
                    </div>

                    <div className="contact">
                        <h4 className="text-2xl font-semibold sm:text-[28px] font-poppins">Contact Us</h4>
                        <div className="contactInfo mt-2">
                            <p className='text-sm sm:text-[18px] font-poppins'>Email: <a href="mailto:info@asthanews.com" className="text-black hover:text-red transition-colors">info@asthanews.com</a></p>
                            <p className='text-sm sm:text-[18px] font-poppins'>Phone: <a href="tel:+88099283993" className="text-black hover:text-red transition-colors">+880 992 839 93</a></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-b border-brandborder py-8">
                <div className="secthree container mx-auto px-4 md:px-6">
                    <div className="brandDeals grid grid-cols-2 gap-x-4 gap-y-3 text-center sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-4">
                        <Link href="/about" className='text-sm font-poppins hover:text-red transition-colors sm:text-[18px]'>
                            About Us
                        </Link>
                        <Link href="/privacy-policy" className='text-sm font-poppins hover:text-red transition-colors sm:text-[18px]'>
                            Privacy Policy
                        </Link>
                        <Link href="/advertising" className='text-sm font-poppins hover:text-red transition-colors sm:text-[18px]'>
                            Advertising Policy
                        </Link>
                        <Link href="/newsletter" className='text-sm font-poppins hover:text-red transition-colors sm:text-[18px]'>
                            News Letter
                        </Link>
                    </div>
                </div>
            </div>

            <div className="copyrightSec py-4">
                <div className="container mx-auto flex flex-col px-4 text-center md:px-6">
                    <p className='text-xs sm:text-[16px] font-poppins'>© 2026 Astha News. All rights reserved.</p>
                    <p className='text-xs sm:text-[16px] font-poppins'>Developed by <a href="https://www.redmun.com" target='_blank' className="text-brand">Redmun Digitech</a></p>

                </div>
            </div>

        </>
    )
}

export default Footer
