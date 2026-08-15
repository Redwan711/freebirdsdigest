'use client'

import { useEffect, useRef, useState } from 'react'
import { Home, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import MobileNav from './MobileNav'

const BottomHeader = ({ activeCategories = [], reviewSubcategories = [] }) => {
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
        className={`w-full z-50 bg-bg-surface/95 backdrop-blur-md transition-all duration-300 hidden lg:block ${
          isPinned ? 'fixed top-0 left-0 right-0 shadow-sm border-b border-brandborder' : 'relative'
        }`}
      >
        <div className="bottomHeader container mx-auto flex items-center justify-between px-4 py-3 md:px-6">
          <div className="homeBtn">
            <a 
              href="/" 
              className='flex items-center justify-center h-9 w-9 rounded-lg bg-bg-subtle text-text-main hover:bg-brand/10 hover:text-brand transition-colors'
              aria-label="Home"
            >
              <Home className="w-4 h-4" />
            </a>
          </div>

          <div className="navberMenu">
            <nav className='flex items-center gap-8 justify-between'>
              {activeCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className="text-sm font-medium text-text-main hover:text-brand transition-colors relative group py-1"
                >
                  {category.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand transition-all duration-200 group-hover:w-full" />
                </Link>
              ))}

              {/* Reviews Dropdown */}
              <div className="relative group py-1">
                <Link
                  href="/reviews"
                  className="flex items-center gap-1 text-sm font-medium text-text-main hover:text-brand transition-colors relative"
                >
                  <span>Reviews</span>
                  <ChevronDown className="w-3.5 h-3.5 text-text-muted group-hover:text-brand group-hover:rotate-180 transition-transform duration-200" />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand transition-all duration-200 group-hover:w-full" />
                </Link>

                {reviewSubcategories.length > 0 && (
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-1 z-50">
                    <div className="w-52 rounded-xl border border-brandborder bg-bg-surface p-1.5 shadow-lg backdrop-blur-md">
                      {reviewSubcategories.map((subCat) => (
                        <Link
                          key={subCat.id || subCat.slug}
                          href={`/${subCat.slug}`}
                          className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold text-text-main hover:bg-brand/10 hover:text-brand transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand/40 group-hover:bg-brand transition-colors" />
                          {subCat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link
                href="/contribute"
                className="text-sm font-medium text-text-main hover:text-brand transition-colors relative group py-1"
              >
                Contribute
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand transition-all duration-200 group-hover:w-full" />
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-text-main hover:text-brand transition-colors relative group py-1"
              >
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand transition-all duration-200 group-hover:w-full" />
              </Link>
            </nav>
          </div>
        </div>
      </section>
    </>
  )
}

export default BottomHeader
