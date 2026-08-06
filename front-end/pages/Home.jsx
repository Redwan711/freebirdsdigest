import HeroNews from '@/components/HeroNews';
import LeftSideNewsPnl from '@/components/LeftSideNewsPnl';
import RightSideNewsPnl from '@/components/RightSideNewsPnl';
import SponsorsAdPnl from '@/components/SponsorsAdPnl';
import BottomPageAd from '@/components/BottomPageAd';
import RecentNewsFeed from '@/components/RecentNewsFeed';
import { fetchHeroNews } from '@/lib/hero-news';
import { fetchMainNewPreview } from '@/lib/main-new-preview';
import { fetchSidePanelNews } from '@/lib/side-panel-news';
import { fetchRecentPosts } from '@/lib/recent-posts';
import React from 'react';

const SPONSORED_SLUGS = new Set([
  'promotional-image',
  'bottom-page-ads',
  'sponsors',
  'sponsored',
  'ads',
  'ad',
  'advertising',
  'sponsor',
]);

function isSponsoredPost(post) {
  if (!post) return false;
  if (post.sponsore || post.sponsors) return true;
  const cats = post.categories?.nodes || [];
  return cats.some(
    (cat) =>
      SPONSORED_SLUGS.has(cat?.slug?.toLowerCase()) ||
      cat?.slug?.toLowerCase().includes('sponsor') ||
      cat?.slug?.toLowerCase().includes('ad')
  );
}

const Home = async () => {
  // Fetch all news sources in parallel
  const [heroData, mainPreviewPosts, sidePanelCandidates, allRecentPosts] = await Promise.all([
    fetchHeroNews(),
    fetchMainNewPreview(),
    fetchSidePanelNews(),
    fetchRecentPosts(),
  ]);

  // Identify Hero section posts & top RightSideNewsPnl posts
  const heroPosts = [...(heroData?.topNews || []), ...(heroData?.trendingNews || [])];
  const rightSideMainPosts = mainPreviewPosts.slice(0, 9);

  // Set to track post identifiers shown in HeroNews & RightSideNewsPnl
  const upperExcludedKeys = new Set();
  const addUpperKey = (p) => {
    if (!p) return;
    if (p.databaseId) upperExcludedKeys.add(String(p.databaseId));
    if (p.id) upperExcludedKeys.add(String(p.id));
    if (p.slug) upperExcludedKeys.add(String(p.slug));
  };

  heroPosts.forEach(addUpperKey);
  rightSideMainPosts.forEach(addUpperKey);

  const isShownInUpperSections = (p) => {
    if (!p) return true;
    if (p.databaseId && upperExcludedKeys.has(String(p.databaseId))) return true;
    if (p.id && upperExcludedKeys.has(String(p.id))) return true;
    if (p.slug && upperExcludedKeys.has(String(p.slug))) return true;
    return false;
  };

  // 1. Left side bar: shows ALL non-sponsored news, even if showing in other sections
  const leftSidePosts = sidePanelCandidates
    .filter((p) => !isSponsoredPost(p));

  // 2. RecentNewsFeed (bottom of center column): shows all recent posts EXCEPT those already showing in HeroNews & RightSideNewsPnl, filtering out sponsored/ad categories
  const extraRecentPosts = allRecentPosts.filter(
    (p) => !isShownInUpperSections(p) && !isSponsoredPost(p)
  );

  return (
    <div>
      <HeroNews heroData={heroData} />

      {/* Main News Preview Panel */}
      <section className="mt-6 mb-12">
        <div className="container mx-auto px-4 md:px-6 grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)] 2xl:grid-cols-[290px_minmax(0,1fr)_290px] items-start">
          {/* Left Column: 24 Recent Reads (Non-sticky, includes all news except sponsored/ads) */}
          <div className="left w-full order-2 xl:order-1 self-start">
            <LeftSideNewsPnl posts={leftSidePosts} />
          </div>

          {/* Center Column: RightSideNewsPnl + In-Between Ad Section + RecentNewsFeed */}
          <div className="right w-full order-1 xl:order-2 space-y-6">
            <RightSideNewsPnl />
            <BottomPageAd />
            <RecentNewsFeed posts={extraRecentPosts} />
          </div>

          {/* Right Sidebar for Ads */}
          <div className="sponsors w-full order-3 2xl:order-3 2xl:sticky 2xl:top-24 self-start">
            <SponsorsAdPnl />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
