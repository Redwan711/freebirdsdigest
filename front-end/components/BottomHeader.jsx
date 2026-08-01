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
