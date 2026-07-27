import Image from 'next/image'
import Link from 'next/link';
import { fetchNavigationCategories } from '@/lib/categories';
import { fetchHeaderNews } from '@/lib/headerNews';
import BottomHeader from './BottomHeader';

const Navber = async () => {

  const activeCategories = await fetchNavigationCategories();
  const { headerNews } = await fetchHeaderNews();

  return (
    <div className="bg-bg-surface border-b border-brandborder shadow-2xs">
      {/* top navbar section */}
      <section className='topHeader container mx-auto flex items-center justify-between gap-y-1 px-4 py-3.5 md:gap-y-0 md:px-6'>
        <div className="logoSec col-span-2 row-start-1 justify-self-center md:col-span-1 md:row-auto">
          <Link href="/" className='flex items-center gap-2 group transition-transform hover:scale-[1.01]'>
            <Image src="/freeBird-logo.png" alt="Freebirds Digest Logo" width={170} height={55} priority className="w-auto h-[48px] object-contain" />
          </Link>
        </div>

        <div className="gap-8 hidden md:flex items-center">
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

        {/* for mobile */}
        {headerNews[0] && (
          <div className="flex md:hidden items-center">
            <Link
              href={`/news/${headerNews[0].slug}?pid=${headerNews[0].databaseId}`}
              className='flex items-center font-inter text-text-muted hover:text-brand transition-colors gap-2 group'
            >
              <h3 className='line-clamp-2 max-w-[130px] text-xs font-semibold group-hover:text-brand transition-colors'>
                {headerNews[0].title}
              </h3>
              <div className="relative overflow-hidden rounded-md w-[50px] h-[40px] bg-bg-subtle flex-shrink-0 border border-brandborder">
                <Image
                  src={headerNews[0].featuredImage?.node?.sourceUrl || '/freeBird-logo.png'}
                  alt={headerNews[0].title}
                  fill
                  sizes="50px"
                  className="object-cover"
                />
              </div>
            </Link>
          </div>
        )}
      </section>

      {/* bottom navbar — handles sticky header behavior */}
      <BottomHeader activeCategories={activeCategories} />
    </div>
  )
}

export default Navber