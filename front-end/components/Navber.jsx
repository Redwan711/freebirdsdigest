import Image from 'next/image'
import Link from 'next/link';
import { fetchNavigationCategories } from '@/lib/categories';
import { fetchHeaderNews } from '@/lib/headerNews';
import BottomHeader from './BottomHeader';

const Navber = async () => {

  const activeCategories = await fetchNavigationCategories();
  const { headerNews } = await fetchHeaderNews();

  return (
    <div>
      {/* top navber section */}
      <section className='topHeader container mx-auto flex gap-y-1 px-4 py-2.5 justify-between md:gap-y-0 md:px-6'>
        <div className="logoSec col-span-2 row-start-1 justify-self-center md:col-span-1 md:row-auto">
          <a href="/" className='flex items-center gap-2 text-black hover:text-red-500 transition-colors'>
            <Image src="/astha-logo.png" alt="Logo" width={90} height={90} />
          </a>
        </div>

        <div className="gap-10 hidden md:flex">
          {headerNews.map((post) => (
            <div key={post.id} className="headerNews">
              <Link href={`/news/${post.slug}?pid=${post.databaseId}`} className='flex items-center font-bangali text-gray-700 hover:text-red-500 transition-colors gap-2'>
                <h3 className='line-clamp-2 max-w-[150px] flex-1 font-semibold'>{post.title}</h3>
                <Image
                  src={post.featuredImage?.node?.sourceUrl || '/default-image.jpg'}
                  alt={post.title}
                  width={180}
                  height={180}
                  className="object-cover rounded-sm w-[80px] h-[80px]"
                />
              </Link>
            </div>
          ))}
        </div>


        {/* for mobile */}
        {headerNews[0] && (
          <div className="gap-10 flex md:hidden">
            <div key={headerNews[0].id} className="headerNews">
              <Link
                href={`/news/${headerNews[0].slug}?pid=${headerNews[0].databaseId}`}
                className='flex items-center font-bangali text-gray-700 hover:text-red-500 transition-colors gap-2'
              >
                <h3 className='line-clamp-2 max-w-[150px] flex-1 font-semibold'>{headerNews[0].title}</h3>
                <Image
                  src={headerNews[0].featuredImage?.node?.sourceUrl || '/default-image.jpg'}
                  alt={headerNews[0].title}
                  width={80}
                  height={80}
                  className="object-cover rounded-sm w-[60px] h-[60px]"
                />
              </Link>
            </div>
          </div>
        )}







      </section>

      {/* bottom navber — handles its own pin/fixed behavior */}
      <BottomHeader activeCategories={activeCategories} />
    </div>
  )
}

export default Navber