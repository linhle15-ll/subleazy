'use client';

import Image from 'next/image';
import {
  Heart,
  MapPin,
  Star,
  Wifi,
  Leaf,
  Utensils,
  Dog,
  Wind,
  Camera,
  Bike,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { StaticImageData } from 'next/image';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import demoAmenities from '@/public/demoAmenities.jpg';

interface PostType {
  id: string;
  title: string;
  address: string;
  price: string;
  rating: number;
  images: Array<{ url: StaticImageData; alt: string }>;
  description: string;
  amenities: Array<{ icon: LucideIcon; label: string }>;
  location: {
    address: string;
    description: string;
    exactLocationAfterBooking: boolean;
  };
  host: {
    name: string;
    rating: number;
    responseTime: string;
    memberSince: string;
  };
}

export default function PostingPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  // TODO: Replace with actual data fetching
  const post: PostType = {
    id: postId || '',
    title: 'Single Room in Quincy, LA',
    address: 'Quincy, Los Angeles',
    price: '$30',
    rating: 4.8,
    images: [
      { url: demoAmenities, alt: 'Living Room' },
      { url: demoAmenities, alt: 'Kitchen' },
      { url: demoAmenities, alt: 'Bedroom' },
      { url: demoAmenities, alt: 'Bathroom' },
      { url: demoAmenities, alt: 'Balcony' },
    ],
    description:
      'Cozy single bedroom in a quiet building, perfect for students or young professionals. Utilities included.',
    amenities: [
      { icon: Wifi, label: 'Garden view' },
      { icon: Utensils, label: 'Kitchen' },
      { icon: Dog, label: 'Pets allowed' },
      { icon: Wind, label: 'Free washer - in building' },
      { icon: Wind, label: 'Dryer' },
      { icon: Wind, label: 'Central air conditioning' },
      { icon: Utensils, label: 'Refrigerator' },
      { icon: Camera, label: 'Security cameras on property' },
      { icon: Bike, label: 'Bicycles' },
      { icon: Leaf, label: 'Garden access' },
      { icon: Wifi, label: 'High-speed internet' },
      { icon: Utensils, label: 'Dishwasher' },
    ],
    location: {
      address: '50 Quincy Street, LA, 01075',
      description:
        'Very dynamic and appreciated district by the people of Bordeaux thanks to rue St James and place Fernand Lafargue. Home to many historical monuments such as the Grosse Cloche, the Porte de Bourgogne and the Porte Cailhau, and cultural sites such as the Aquitaine Museum.',
      exactLocationAfterBooking: true,
    },
    host: {
      name: 'John Doe',
      rating: 4.7,
      responseTime: '2 hours',
      memberSince: 'March 2023',
    },
  };

  useEffect(() => {
    if (!postId) {
      // Handle missing post ID, e.g., redirect to home
      console.error('No post ID provided');
    }
  }, [postId]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            {post.title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-gray-600">post.rating</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">post.location</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="p-2 rounded-full hover:bg-gray-100"
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`w-6 h-6 ${
              isFavorite ? 'fill-orange-500 text-orange-500' : 'text-gray-400'
            }`}
          />
        </button>
      </div>

      {/* Image Gallery */}
      <div className="mb-8 grid grid-cols-4 gap-4">
        {post.images.map((image, index) => (
          <div
            key={index}
            className={`relative rounded-lg overflow-hidden ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
          >
            <div
              className={`${index === 0 ? 'aspect-square' : 'aspect-video'} relative`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover hover:opacity-90 transition-opacity"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Description */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">About this place</h2>
            <p className="text-gray-600">{post.description}</p>
          </section>

          {/* Amenities */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              What this place offers
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {post.amenities
                .slice(0, showAllAmenities ? undefined : 8)
                .map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      {<amenity.icon className="w-5 h-5 text-gray-600" />}
                    </div>
                    <span className="text-gray-600">{amenity.label}</span>
                  </div>
                ))}
            </div>
            {post.amenities.length > 8 && (
              <button
                onClick={() => setShowAllAmenities(!showAllAmenities)}
                className="mt-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Show{' '}
                {showAllAmenities ? 'fewer' : `all ${post.amenities.length}`}{' '}
                amenities
              </button>
            )}
          </section>

          {/* Location */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Where you'll be</h2>
            <div className="mb-4">
              <div className="aspect-[16/9] bg-gray-100 rounded-lg mb-4">
                {/* Google Maps will be integrated here */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Google Maps placeholder
                </div>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">
                  {post.location.address}
                </h3>
                <p className="text-gray-600">{post.location.description}</p>
                {post.location.exactLocationAfterBooking && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">
                      Exact location provided after booking
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-gray-900">
                {post.price}
                <span className="text-sm font-normal text-gray-500">
                  / night
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-gray-600">{post.rating}</span>
              </div>
            </div>
            <button className="w-full bg-primaryOrange text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
              Contact Host
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
