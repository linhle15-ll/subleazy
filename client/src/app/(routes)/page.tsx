'use client';

import Image from 'next/image';
import bannerImage from '@/public/bannerImg.jpg';
import { PostingGrid } from '@/components/ui/posting/posting-grid';
import { SearchBarLg } from '@/components/ui/search/search-bar';
import Loading from '@/components/ui/commons/loading';
import { usePosts } from '@/hooks/use-posts';

export default function LandingPage() {
  const { posts, loading, error } = usePosts();

  return (
    <div className="flex flex-col gap-12 justify-center pb-5">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row justify-between bg-lightestOrange">
        {/* Left content */}
        <div className="flex flex-col gap-6 lg:gap-3 pt-8 lg:pt-16 max-w-full lg:max-w-2xl px-6 lg:px-12">
          <div className="font-semibold text-3xl lg:text-4xl text-center lg:text-left">
            We make<span className="text-primaryOrange"> Sublease Eazy </span>!
          </div>

          <p className="text-base lg:text-lg text-center lg:text-left">
            Find your next sublease in just a few clicks. <br />
            We make it easy to connect with the right sublessors <br /> and find
            the perfect place to stay.
          </p>

          <a className="btn-primary md:hidden" href="/sublease">
            Sublease your space
          </a>

          <p className="block md:hidden text-base lg:text-lg text-center">
            or <span className="font-medium"> find a sublease. </span>
          </p>

          <div className="relative z-10 mt-6 lg:mt-12">
            <SearchBarLg />
          </div>
        </div>

        {/* Right content */}
        <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
          <Image
            src={bannerImage}
            alt="banner image"
            className="h-64 w-full lg:h-96 lg:w-[35rem] object-cover opacity-90"
          />
        </div>
      </section>

      {/* Discover Section */}
      <section className="flex flex-col items-center justify-center gap-8 lg:gap-11 px-6">
        <div className="flex flex-col items-center font-medium text-2xl lg:text-4xl text-center">
          <span>
            Discover a place of
            <span className="text-primaryOrange"> comfort </span>
          </span>
          <span className="italic"> Wherever you go </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-16 justify-center items-center">
          <a className="btn-primary" href="/sublease">
            Match housemates
          </a>

          <a className="btn-secondary" href="/community">
            Join community
          </a>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="px-6 lg:px-12 mb-11">
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-red-500 screen-message">{error}</div>
        ) : posts && posts.length > 0 ? (
          <PostingGrid isVertical={true} posts={posts} />
        ) : (
          <div className="screen-message">No postings available</div>
        )}
      </section>
    </div>
  );
}
