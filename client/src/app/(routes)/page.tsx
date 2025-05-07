'use client';

import Image from 'next/image';
import { useState } from 'react';
import bannerImage from '@/public/bannerImg.jpg';
import SearchFilterBar from '@/components/ui/searchFilterbar/searchFilterBarLg';
import LeasePostingGrid from '@/components/ui/cards/LeasePostingGrid';
import postingDemo from '@/public/postingDemo.jpg';

// Sample data - replace with actual data from your API
const samplePosts = [
  {
    id: '1',
    title: 'Entire Studio Apartment',
    location: 'Downtown San Francisco',
    price: '$50',
    rating: 4.8,
    imageUrl: postingDemo,
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Cozy Studio Near Campus',
    location: 'Berkeley',
    price: '$45',
    rating: 4.6,
    imageUrl: postingDemo,
    isFavorite: true,
  },
  {
    id: '3',
    title: 'Modern Studio with View',
    location: 'San Jose',
    price: '$55',
    rating: 4.9,
    imageUrl: postingDemo,
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Furnished Studio',
    location: 'Palo Alto',
    price: '$60',
    rating: 4.7,
    imageUrl: postingDemo,
    isFavorite: false,
  },
];

export default function LandingPage() {
  const [posts, setPosts] = useState(samplePosts);
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
            <SearchFilterBar />
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
      <section className="px-6 lg:px-12">
        <h2 className="text-2xl lg:text-3xl font-semibold mb-6">
          Featured Listings
        </h2>
        <LeasePostingGrid
          posts={posts}
          onViewDetails={(id) => {
            // TODO: Implement view details navigation
            console.log('View details:', id);
          }}
          onToggleFavorite={(id) => {
            setPosts(
              posts.map((post) =>
                post.id === id
                  ? { ...post, isFavorite: !post.isFavorite }
                  : post
              )
            );
          }}
        />
      </section>
    </div>
  );
}
