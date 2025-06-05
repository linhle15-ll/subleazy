'use client';

import Image from 'next/image';
import {
  Heart,
  MapPin,
  Star,
  Wifi,
  Utensils,
  Dog,
  Wind,
  Clock,
  Users,
  BedDouble,
  Bath,
  Home,
  Building2,
  Car,
  Train,
  ShoppingCart,
  Accessibility,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import postService from '@/services/post.service';
import { Map, Marker } from '@vis.gl/react-google-maps';

export default function PostingPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const postId = searchParams.get('id');

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => postService.getPostById(postId!),
    enabled: !!postId,
  });

  useEffect(() => {
    if (!postId) {
      router.push('/');
    }
  }, [postId, router]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-4 gap-2 mb-8">
            <div className="col-span-2 row-span-2 h-96 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {error ? 'Error loading post' : 'Post not found'}
          </h2>
          <button
            onClick={() => router.push('/')}
            className="text-primaryOrange hover:text-orange-600"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  // Transform post data to match the UI structure
  const transformedPost = {
    id: post._id,
    title: post.title,
    address: `${post.city}, ${post.state} ${post.zip}`,
    price: `$${post.price}`,
    rating: 4.8, // TODO: Add rating to post model
    images: post.media.map((url, index) => ({
      url,
      alt: `Image ${index + 1}`,
    })),
    description: post.description,
    amenities: [
      { icon: Wifi, label: post.amenities.wifi ? 'High-speed internet' : '' },
      { icon: Utensils, label: post.amenities.kitchen ? 'Kitchen' : '' },
      { icon: Dog, label: post.rules.noPet ? 'No pets' : 'Pets allowed' },
      { icon: Wind, label: post.amenities.laundry ? 'Laundry' : '' },
      {
        icon: Wind,
        label: post.amenities.airConditioning ? 'Air conditioning' : '',
      },
      { icon: Car, label: post.amenities.parking ? 'Parking available' : '' },
    ].filter((amenity) => amenity.label),
    convenience: [
      {
        icon: Train,
        label: post.convenience.publicTransport ? 'Near public transport' : '',
      },
      {
        icon: ShoppingCart,
        label: post.convenience.supermarket ? 'Near supermarket' : '',
      },
      {
        icon: Accessibility,
        label: post.convenience.disabilityFriendly ? 'Disability friendly' : '',
      },
    ].filter((item) => item.label),
    roomInfo: [
      {
        icon: Home,
        label: `${post.houseInfo.houseType.charAt(0).toUpperCase() + post.houseInfo.houseType.slice(1)}`,
      },
      {
        icon: Building2,
        label: `${post.houseInfo.placeType.charAt(0).toUpperCase() + post.houseInfo.placeType.slice(1)} living space`,
      },
      {
        icon: Users,
        label: `Max ${post.bedroomInfo.maxGuests} guest${post.bedroomInfo.maxGuests > 1 ? 's' : ''}`,
      },
      {
        icon: BedDouble,
        label: `${post.bedroomInfo.beds} bed${post.bedroomInfo.beds > 1 ? 's' : ''}`,
      },
      {
        icon: Bath,
        label: `${post.bathroomInfo.privateAttached + post.bathroomInfo.privateAccessible} private, ${post.bathroomInfo.shared} shared bathroom`,
      },
    ],
    rules: [
      {
        icon: Clock,
        label: post.rules.quietHours
          ? `Quiet hours: ${post.rules.quietHours.from} - ${post.rules.quietHours.to}`
          : 'No quiet hours specified',
      },
      {
        icon: Users,
        label: post.rules.noGuest ? 'No guests allowed' : 'Guests allowed',
      },
      {
        icon: Dog,
        label: post.rules.noPet ? 'No pets allowed' : 'Pets allowed',
      },
    ],
    availability: {
      startDate: new Date(post.availability.startDate).toLocaleDateString(),
      endDate: new Date(post.availability.endDate).toLocaleDateString(),
      checkinTime: post.availability.checkinTime,
      checkoutTime: post.availability.checkoutTime,
    },
    whoElse: post.whoElse
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(', '),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">
            {transformedPost.title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm">{transformedPost.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{transformedPost.address}</span>
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
      <div className="grid grid-cols-4 gap-2 mb-8 rounded-xl overflow-hidden">
        {transformedPost.images.map((image, index) => (
          <div
            key={index}
            className={`relative ${index === 0 ? 'col-span-2 row-span-2' : ''} group cursor-pointer overflow-hidden`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              width={800}
              height={600}
            />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2">
          {/* Room Info */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">About this place</h2>
            <div className="grid grid-cols-2 gap-4">
              {transformedPost.roomInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <Icon className="w-6 h-6 text-gray-600" />
                    <span>{info.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p>{transformedPost.description}</p>
          </div>

          {/* Who else lives here */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Who else lives here</h2>
            <p>{transformedPost.whoElse}</p>
          </div>

          {/* What this place offers */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              What this place offers
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {(showAllAmenities
                ? transformedPost.amenities
                : transformedPost.amenities.slice(0, 8)
              ).map((amenity, index) => {
                const Icon = amenity.icon;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <Icon className="w-6 h-6 text-gray-600" />
                    <span>{amenity.label}</span>
                  </div>
                );
              })}
            </div>
            {transformedPost.amenities.length > 8 && (
              <button
                onClick={() => setShowAllAmenities(!showAllAmenities)}
                className="mt-4 text-primaryOrange hover:text-orange-600 font-medium"
              >
                Show{' '}
                {showAllAmenities
                  ? 'fewer'
                  : `all ${transformedPost.amenities.length}`}{' '}
                amenities
              </button>
            )}
          </section>

          {/* Convenience */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Convenience</h2>
            <div className="grid grid-cols-2 gap-4">
              {transformedPost.convenience.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <Icon className="w-6 h-6 text-gray-600" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* House Rules */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">House Rules</h2>
            <div className="grid grid-cols-2 gap-4">
              {transformedPost.rules.map((rule, index) => {
                const Icon = rule.icon;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <Icon className="w-6 h-6 text-gray-600" />
                    <span>{rule.label}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Location */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Where you'll be</h2>
            <div className="mb-4">
              <div>
                <h3 className="font-medium text-lg mb-2">
                  {transformedPost.address}
                </h3>
                <p>{transformedPost.description}</p>
              </div>
            </div>
            <div className="h-[400px] w-full rounded-lg overflow-hidden">
              <Map
                defaultCenter={{ lat: post.lat, lng: post.long }}
                defaultZoom={15}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                mapId="posting-map"
              >
                <Marker position={{ lat: post.lat, lng: post.long }} />
              </Map>
            </div>
          </section>
        </div>

        {/* Right Column - Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold">
                {transformedPost.price}
                <span className="text-sm font-normal">/ month</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm">{transformedPost.rating}</span>
              </div>
            </div>

            {/* Availability */}
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primaryOrange" />
                Availability
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-xs text-gray-500">Available from</p>
                    <p className="font-medium">
                      {transformedPost.availability.startDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div>
                    <p className="text-xs text-gray-500">Until</p>
                    <p className="font-medium">
                      {transformedPost.availability.endDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-xs text-gray-500">Check-in time</p>
                    <p className="font-medium">
                      {transformedPost.availability.checkinTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-xs text-gray-500">Check-out time</p>
                    <p className="font-medium">
                      {transformedPost.availability.checkoutTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button className="btn-primary">Contact Host</button>
          </div>
        </div>
      </div>
    </div>
  );
}
