import HeroNews from '@/components/HeroNews'
import LeftSideNewsPnl from '@/components/LeftSideNewsPnl'
import RightSideNewsPnl from '@/components/RightSideNewsPnl'
import React from 'react'

const Home = () => {
  return (
    <div>
      <HeroNews />

      {/* Main News Preview Panel */}
      <section className="mt-4">
        <div className="container mx-auto grid gap-4 px-4 xl:grid-cols-[320px_minmax(0,1fr)]">
          <div className="left w-full">
            <LeftSideNewsPnl />
          </div>
          <div className="right w-full">
            <RightSideNewsPnl />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
