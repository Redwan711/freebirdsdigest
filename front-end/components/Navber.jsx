import Image from 'next/image'
import Link from 'next/link';
import { fetchNavigationCategories, fetchReviewSubcategories } from '@/lib/categories';
import { fetchHeaderNews } from '@/lib/headerNews';
import { getHeaderLogoClass } from '@/lib/logoTheme';
import BottomHeader from './BottomHeader';
import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';
import SearchButton from './SearchButton';

const Navber = async () => {

  const activeCategories = await fetchNavigationCategories();
  const reviewSubcategories = await fetchReviewSubcategories();
  const { headerNews } = await fetchHeaderNews();

  return (
    <div className="bg-bg-surface border-b border-brandborder shadow-2xs">
      {/* Fixed top header bar on mobile (< lg), normal static layout on desktop (lg+) */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-bg-surface/95 backdrop-blur-md border-b border-brandborder/60 shadow-2xs lg:static lg:bg-transparent lg:border-b-0 lg:shadow-none">
        <section className="topHeader container mx-auto px-4 py-2.5 sm:py-3 md:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="logoSec shrink-0">
              <a href="/" className='flex items-center gap-2 group transition-transform hover:scale-[1.01]'>
                <Image src="/freeBird-logo-new.png" alt="Freebirds Digest Logo" width={170} height={55} priority className={getHeaderLogoClass("w-auto h-[38px] sm:h-[48px] object-contain max-w-full")} />
              </a>
            </div>

            {/* Desktop News Posts & Theme Toggle */}
            <div className="gap-6 hidden lg:flex items-center">
              {headerNews.slice(0, 2).map((post) => (
                <div key={post.id} className="headerNews">
                  <Link
                    href={`/news/${post.slug}?pid=${post.databaseId}`}
                    className='flex items-center font-inter text-text-muted hover:text-brand transition-colors gap-3 group'
                  >
                    <h3 className='line-clamp-2 max-w-[170px] text-xs font-semibold leading-snug group-hover:text-brand transition-colors'>
                      {post.title}
                    </h3>
                    <div className="relative overflow-hidden rounded-lg w-[65px] h-[50px] bg-bg-subtle flex-shrink-0 border border-brandborder">
                      <Image
                        src={post.featuredImage?.node?.sourceUrl || '/freeBird-logo-new.png'}
                        alt={post.title}
                        fill
                        sizes="65px"
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </div>
              ))}

              {/* Desktop Theme Toggle */}
              <ThemeToggle />
            </div>

            {/* Mobile & Tablet Menu Controls — Right Top on Non-Desktop Screens */}
            <div className="flex lg:hidden items-center gap-1 sm:gap-1.5">
              <SearchButton variant="icon" />
              <ThemeToggle />
              <MobileNav categories={activeCategories} reviewSubcategories={reviewSubcategories} />
            </div>
          </div>
        </section>
      </div>

      {/* Spacer placeholder for fixed mobile top header (< lg) to prevent content overlap */}
      <div className="h-[57px] sm:h-[72px] lg:hidden" />

      {/* Mobile & Tablet 2 News Posts Row (Normal flow, non-sticky) */}
      {headerNews.length > 0 && (
        <div className="container mx-auto px-4 pb-3 md:px-6 lg:hidden">
          <div className="grid grid-cols-2 gap-4 pt-2.5 border-t border-brandborder/60 items-center">
            {headerNews.slice(0, 2).map((post) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}?pid=${post.databaseId}`}
                className='flex items-center justify-start gap-2.5 font-inter text-text-muted hover:text-brand transition-colors group min-w-0'
              >
                <h3 className='line-clamp-2 text-[11px] sm:text-xs font-semibold leading-tight group-hover:text-brand transition-colors max-w-[150px] sm:max-w-[240px]'>
                  {post.title}
                </h3>
                <div className="relative overflow-hidden rounded-md w-[45px] h-[36px] sm:w-[52px] sm:h-[40px] bg-bg-subtle shrink-0 border border-brandborder">
                  <Image
                    src={post.featuredImage?.node?.sourceUrl || '/freeBird-logo-new.png'}
                    alt={post.title}
                    fill
                    sizes="52px"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* bottom navbar — handles sticky header behavior for desktop */}
      <BottomHeader activeCategories={activeCategories} reviewSubcategories={reviewSubcategories} />
    </div>
  )
}

export default Navber