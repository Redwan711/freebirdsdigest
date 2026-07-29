import Image from 'next/image'
import Link from 'next/link';
import { fetchNavigationCategories } from '@/lib/categories';
import { fetchHeaderNews } from '@/lib/headerNews';
import { getHeaderLogoClass } from '@/lib/logoTheme';
import BottomHeader from './BottomHeader';
import MobileNav from './MobileNav';

const Navber = async () => {

  const activeCategories = await fetchNavigationCategories();
  const { headerNews } = await fetchHeaderNews();

  return (
    <div className="bg-bg-surface border-b border-brandborder shadow-2xs">
      {/* top navbar section */}
      <section className='topHeader container mx-auto px-4 py-3.5 md:px-6'>
        {/* Top Header Row: Logo on Left, Desktop News Posts / Mobile Menu Toggle on Right */}
        <div className="flex items-center justify-between gap-4">
          <div className="logoSec shrink-0">
            <a href="/" className='flex items-center gap-2 group transition-transform hover:scale-[1.01]'>
              <Image src="/freeBird-logo.png" alt="Freebirds Digest Logo" width={170} height={55} priority className={getHeaderLogoClass("w-auto h-[38px] sm:h-[48px] object-contain max-w-full")} />
            </a>
          </div>

          {/* Desktop News Posts (Hidden on Mobile & Tablet) */}
          <div className="gap-8 hidden lg:flex items-center">
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
                      src={post.featuredImage?.node?.sourceUrl || '/freeBird-logo.png'}
                      alt={post.title}
                      fill
                      sizes="65px"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile & Tablet Menu Toggle — Right Top on Non-Desktop Screens */}
          <div className="flex lg:hidden items-center">
            <MobileNav categories={activeCategories} />
          </div>
        </div>

        {/* Mobile & Tablet 2 News Posts Row */}
        {headerNews.length > 0 && (
          <div className="grid grid-cols-2 gap-4 lg:hidden pt-2.5 border-t border-brandborder/60 mt-2.5 items-center">
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
                    src={post.featuredImage?.node?.sourceUrl || '/freeBird-logo.png'}
                    alt={post.title}
                    fill
                    sizes="52px"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* bottom navbar — handles sticky header behavior for desktop */}
      <BottomHeader activeCategories={activeCategories} />
    </div>
  )
}

export default Navber