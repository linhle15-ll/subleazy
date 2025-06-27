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
import authorAvatar from '@/public/bannerImg.jpg'; // Placeholder for author avatar
import Loading from '@/components/ui/commons/loading';
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
    queryFn: () => postService.getPost(postId!),
    enabled: !!postId,
  });

  console.log('Fetched post:', post);

  // Transform post data to match the UI structure
  const postData = post?.data;

  useEffect(() => {
    if (!postId) {
      router.push('/');
    }
  }, [postId, router]);

  if (isLoading) {
    return (
      <div>
        {' '}
        <Loading />{' '}
      </div>
    );
  }

  if (error || !post || post.success === false) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">
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

  function handleAuthorClick() {
    const author = postData?.author;
    const authorId =
      typeof author === 'object' && author !== null && '_id' in author
        ? (author as { _id: string })._id
        : typeof author === 'string'
          ? author
          : '';
    router.push(`/profile?id=${authorId}`);
  }

  const transformedPost = {
    id: postData?._id,
    title: postData?.title,
    address: `${postData?.city}, ${postData?.state} ${postData?.zip}`,
    price: `$${postData?.price}`,
    rating: 5.0, // TODO: Add rating to post model
    author: {
      firstName:
        typeof postData?.author === 'object' &&
        postData?.author !== null &&
        'firstName' in postData.author
          ? postData.author.firstName
          : 'Unknown',
      lastName:
        typeof postData?.author === 'object' &&
        postData?.author !== null &&
        'lastName' in postData.author
          ? postData.author.lastName
          : 'Unknown',
      profileImage:
        typeof postData?.author === 'object' &&
        postData?.author !== null &&
        'profileImage' in postData.author
          ? (postData.author as { profileImage?: string }).profileImage
          : undefined,
    },
    images: postData?.media.map((url: string, index: number) => {
      const isVideo = url.match(/\.(mp4|mov|webm)$/i);
      return {
        url,
        alt: `Media ${index + 1}`,
        type: isVideo ? 'video' : 'image',
      };
    }),
    description: postData?.description,
    amenities: [
      {
        icon: Wifi,
        label: postData?.amenities.wifi ? 'High-speed internet' : '',
      },
      { icon: Utensils, label: postData?.amenities.kitchen ? 'Kitchen' : '' },
      { icon: Dog, label: postData?.rules.noPet ? 'No pets' : 'Pets allowed' },
      { icon: Wind, label: postData?.amenities.laundry ? 'Laundry' : '' },
      {
        icon: Wind,
        label: postData?.amenities.airConditioning ? 'Air conditioning' : '',
      },
      {
        icon: Car,
        label: postData?.amenities.parking ? 'Parking available' : '',
      },
    ].filter((amenity) => amenity.label),
    convenience: [
      {
        icon: Train,
        label: postData?.convenience.publicTransport
          ? 'Near public transport'
          : '',
      },
      {
        icon: ShoppingCart,
        label: postData?.convenience.supermarket ? 'Near supermarket' : '',
      },
      {
        icon: Accessibility,
        label: postData?.convenience.disabilityFriendly
          ? 'Disability friendly'
          : '',
      },
    ].filter((item) => item.label),
    roomInfo: [
      {
        icon: Home,
        label: `${postData?.houseInfo?.houseType?.charAt(0).toUpperCase() + (postData?.houseInfo?.houseType?.slice(1) ?? '')}`,
      },
      {
        icon: Building2,
        label: `${postData?.houseInfo?.placeType?.charAt(0).toUpperCase() + (postData?.houseInfo?.placeType?.slice(1) ?? '')} living space`,
      },
      {
        icon: Users,
        label: `Max ${postData?.bedroomInfo.maxGuests} guest${(postData?.bedroomInfo?.maxGuests ?? 0) > 1 ? 's' : ''}`,
      },
      {
        icon: BedDouble,
        label: `${postData?.bedroomInfo?.beds ?? 0} bed${(postData?.bedroomInfo?.beds ?? 0) > 1 ? 's' : ''}`,
      },
      {
        icon: Bath,
        label: `${(postData?.bathroomInfo?.privateAttached ?? 0) + (postData?.bathroomInfo?.privateAccessible ?? 0)} private, ${postData?.bathroomInfo?.shared ?? 0} shared bathroom`,
      },
    ],
    rules: [
      {
        icon: Clock,
        label: postData?.rules.quietHours
          ? `Quiet hours: ${postData.rules.quietHours.from} - ${postData.rules.quietHours.to}`
          : 'No quiet hours specified',
      },
      {
        icon: Users,
        label: postData?.rules.noGuest ? 'No guests allowed' : 'Guests allowed',
      },
      {
        icon: Dog,
        label: postData?.rules.noPet ? 'No pets allowed' : 'Pets allowed',
      },
    ],
    availability: {
      startDate: new Date(
        postData?.availability.startDate ?? ''
      ).toLocaleDateString(),
      endDate: new Date(
        postData?.availability.endDate ?? ''
      ).toLocaleDateString(),
      checkinTime: postData?.availability.checkinTime,
      checkoutTime: postData?.availability.checkoutTime,
    },
    whoElse: postData?.whoElse
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(', '),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-medium mb-2">{transformedPost.title}</h1>
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
              isFavorite ? 'fill-orange-500 text-orange-500' : 'text-white'
            }`}
          />
        </button>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-4 gap-2 mb-8 rounded-xl overflow-hidden">
        {transformedPost.images?.map(
          (
            media: { url: string; alt: string; type: string },
            index: number
          ) => (
            <div
              key={index}
              className={`relative ${index === 0 ? 'col-span-2 row-span-2' : ''} group cursor-pointer overflow-hidden`}
            >
              {media.type === 'video' ? (
                <video
                  src={media.url}
                  controls
                  className="object-cover w-full h-full"
                  style={{ maxHeight: index === 0 ? 600 : 300 }}
                />
              ) : (
                <Image
                  src={media.url}
                  alt={media.alt}
                  width={800}
                  height={600}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              )}
            </div>
          )
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2">
          {/* Subleased By */}

          <button
            className="flex gap-2 mb-4 items-center"
            onClick={handleAuthorClick}
          >
            <Image
              src={transformedPost.author.profileImage || authorAvatar}
              alt="Author Avatar"
              className="w-11 h-11 rounded-full"
              width={44}
              height={44}
            />
            <p className="font-medium text-xl">
              Subleased by{' '}
              <span className="text-primaryOrange">
                {transformedPost.author.firstName}{' '}
                {transformedPost.author.lastName}
              </span>
            </p>
          </button>

          {/* Room Info */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">About this place</h2>
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
            <h2 className="text-xl font-medium mb-4">Description</h2>
            <p>{transformedPost.description}</p>
          </div>

          {/* Who else lives here */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">Who else lives here</h2>
            <p>{transformedPost.whoElse}</p>
          </div>

          {/* What this place offers */}
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4">What this place offers</h2>
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
            <h2 className="text-xl font-medium mb-4">Convenience</h2>
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
            <h2 className="text-xl font-medium mb-4">House Rules</h2>
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
            <h2 className="text-xl font-medium mb-4">Where you'll be</h2>
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
                defaultCenter={{
                  lat: postData?.lat || 0,
                  lng: postData?.long || 0,
                }}
                defaultZoom={15}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                mapId="posting-map"
              >
                <Marker
                  position={{
                    lat: postData?.lat || 0,
                    lng: postData?.long || 0,
                  }}
                />
              </Map>
            </div>
          </section>
        </div>

        {/* Right Column - Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-semibold">
                {transformedPost.price}
                <span className="font-normal">/ month</span>
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
                  <div>
                    <p className="text-xs text-gray-500">Available from</p>
                    <p className="font-medium">
                      {transformedPost.availability.startDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Until</p>
                    <p className="font-medium">
                      {transformedPost.availability.endDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Check-in time</p>
                    <p className="font-medium">
                      {transformedPost.availability.checkinTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Check-out time</p>
                    <p className="font-medium">
                      {transformedPost.availability.checkoutTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button className="btn-primary" onClick={handleAuthorClick}>
              Contact Host
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
