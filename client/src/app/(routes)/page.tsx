'use client';

import Image from 'next/image';
import { useState } from 'react';
import bannerImage from '@/public/bannerImg.jpg';
import { SearchBar } from '@/components/ui/search-bar/search-bar';
// import SearchFilterBar from '@/components/ui/searchFilterbar/searchFilterBarLg';
import LeasePostingGrid from '@/components/ui/cards/LeasePostingGrid';
import postingDemo from '@/public/postingDemo.jpg';
import { PlaceType } from '@/lib/utils/icons';

// Sample data - replace with actual data from your API
const samplePosts = [
  {
    id: '1',
    title: 'Entire Studio Apartment',
    location: 'Downtown San Francisco',
    roomType: PlaceType.ENTIRE,
    price: '$50',
    rating: 4.8,
    imageUrl: postingDemo,
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Cozy Studio Near Campus',
    location: 'Berkeley',
    roomType: PlaceType.SHARED,
    price: '$45',
    rating: 4.6,
    imageUrl: postingDemo,
    isFavorite: true,
  },
  {
    id: '3',
    title: 'Modern Studio with View',
    location: 'San Jose',
    roomType: PlaceType.SHARED,
    price: '$55',
    rating: 4.9,
    imageUrl: postingDemo,
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Furnished Studio',
    location: 'Palo Alto',
    roomType: PlaceType.SHARED,
    price: '$60',
    rating: 4.7,
    imageUrl: postingDemo,
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Luxury 1 Bedroom Apartment',
    location: 'Mountain View',
    roomType: PlaceType.SHARED,
    price: '$75',
    rating: 4.9,
    imageUrl: postingDemo,
    isFavorite: true,
  },
  {
    id: '6',
    title: 'Spacious 2 Bedroom Suite',
    location: 'Sunnyvale',
    roomType: PlaceType.SHARED,
    price: '$85',
    rating: 4.5,
    imageUrl: postingDemo,
    isFavorite: false,
  },
  {
    id: '7',
    title: 'Cozy Private Room',
    location: 'Santa Clara',
    roomType: PlaceType.PRIVATE,
    price: '$40',
    rating: 4.4,
    imageUrl: postingDemo,
    isFavorite: false,
  },
  {
    id: '8',
    title: 'Modern Loft Downtown',
    location: 'San Francisco',
    roomType: PlaceType.SHARED,
    price: '$65',
    rating: 4.8,
    imageUrl: postingDemo,
    isFavorite: true,
  },
  {
    id: '9',
    title: 'Shared Room in House',
    location: 'Oakland',
    roomType: PlaceType.SHARED,
    price: '$35',
    rating: 4.3,
    imageUrl: postingDemo,
    isFavorite: false,
  },
  {
    id: '10',
    title: 'Penthouse Studio',
    location: 'San Mateo',
    roomType: PlaceType.SHARED,
    price: '$70',
    rating: 4.9,
    imageUrl: postingDemo,
    isFavorite: false,
  },
  {
    id: '11',
    title: 'Garden View Apartment',
    location: 'Fremont',
    roomType: PlaceType.SHARED,
    price: '$55',
    rating: 4.6,
    imageUrl: postingDemo,
    isFavorite: true,
  },
  {
    id: '12',
    title: 'Student Housing Special',
    location: 'Berkeley',
    roomType: PlaceType.PRIVATE,
    price: '$45',
    rating: 4.5,
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
            <SearchBar />
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
