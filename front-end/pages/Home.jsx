import HeroNews from '@/components/HeroNews'
import LeftSideNewsPnl from '@/components/LeftSideNewsPnl'
import RightSideNewsPnl from '@/components/RightSideNewsPnl'
import SponsorsAdPnl from '@/components/SponsorsAdPnl'
import React from 'react'

const Home = () => {
  return (
    <div>
      <HeroNews />

      {/* Main News Preview Panel */}
      <section className="mt-6 mb-12">
        <div className="container mx-auto px-4 md:px-6 grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)] 2xl:grid-cols-[290px_minmax(0,1fr)_290px] items-start">
          <div className="left w-full order-2 xl:order-1 xl:sticky xl:top-24 self-start">
            <LeftSideNewsPnl />
          </div>

          <div className="right w-full order-1 xl:order-2">
            <RightSideNewsPnl />
          </div>

          {/* right sidebar for ads */}
          <div className="sponsors w-full order-3 2xl:order-3 2xl:sticky 2xl:top-24 self-start">
            <SponsorsAdPnl />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
