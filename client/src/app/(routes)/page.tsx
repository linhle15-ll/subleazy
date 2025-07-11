'use client';

import Image from 'next/image';
import bannerImage from '@/public/bannerImg.jpg';
import { PostingGrid } from '@/components/ui/posting/posting-grid';
import { SearchBarLg } from '@/components/ui/search/search-bar';
import Loading from '@/components/ui/commons/loading';
import { usePosts } from '@/hooks/use-posts';
import { useUserStore } from '@/stores/user.store';

export default function LandingPage() {
  const { posts, loading, error, total, loadMore, hasMore, initialLoaded } =
    usePosts();
  const { user } = useUserStore();

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
            We make it easy to connect with the right sublessors and sublessees
            and find the perfect place to stay.
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
      </section>

      {/* Featured Listings Section */}
      <section className="px-6 lg:px-12">
        {loading && !initialLoaded ? (
          <div>
            {' '}
            <Loading />{' '}
          </div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : posts && posts.length > 0 ? (
          <div>
            <p className="flex justify-end mb-10 mr-3 pb-4 text-sm">
              Showing {posts.length} of {total} listings
            </p>
            <PostingGrid isVertical={true} posts={posts} />
            <div className="flex flex-col justify-center items-center m-11">
              <p className="mb-10 mr-3 pb-4 text-sm">
                Showing {posts.length} of {total} listings
              </p>
              {hasMore && (
                <button
                  className="btn-secondary"
                  onClick={loadMore}
                  disabled={loading}
                >
                  {user ? 'Load More' : 'Sign in to view more listings'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="font-medium text-2xl text-grey">
            No posts available
          </div>
        )}
      </section>
    </div>
  );
}
