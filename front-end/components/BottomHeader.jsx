'use client'

import { useEffect, useRef, useState } from 'react'
import { Home } from 'lucide-react'
import Link from 'next/link'
import MobileNav from './MobileNav'

const BottomHeader = ({ activeCategories }) => {
  const sentinelRef = useRef(null)
  const headerRef = useRef(null)
  const [isPinned, setIsPinned] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  }, [])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsPinned(!entry.isIntersecting),
      { threshold: 0 }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* invisible marker sitting right where bottomHeader normally starts */}
      <div ref={sentinelRef} />

      {/* placeholder prevents page content from jumping when header goes fixed */}
      {isPinned && <div style={{ height: headerHeight }} />}

      <section
        ref={headerRef}
        className={`w-full z-50 bg-white transition-shadow ${
          isPinned ? 'fixed top-0 left-0 right-0 shadow-md' : 'relative'
        }`}
      >
        <div className="bottomHeader container mx-auto flex items-center justify-between px-4 py-4 md:px-6 border-b border-brandborder">
          <div className="homeBtn hidden lg:block">
            <Link href="/" className='flex items-center gap-2 text-black hover:text-red-500 transition-colors'>
              <Home />
            </Link>
          </div>
          <div className="navberMenu hidden lg:block">
            <nav className='flex gap-10 justify-between'>
              {activeCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className="text-black hover:text-red transition-colors font-poppins"
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/about"
                className="text-black hover:text-red transition-colors font-poppins"
              >
                About Us
              </Link>
            </nav>
          </div>
          <MobileNav categories={activeCategories} />
        </div>
      </section>
    </>
  )
}

export default BottomHeader