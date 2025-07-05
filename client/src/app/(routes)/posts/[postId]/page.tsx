'use client';

import Image from 'next/image';
import {
  Heart,
  MapPin,
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
  WashingMachine,
  Lock,
  PartyPopper,
  Cigarette,
  Cannabis,
  SquarePen,
} from 'lucide-react';
import authorAvatar from '@/public/bannerImg.jpg'; // Placeholder for author avatar
import Loading from '@/components/ui/commons/loading';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from '@/lib/types/user.types';
import { House } from '@/lib/types/house.types';
import { PostingMap } from '@/components/ui/map/posting-map';
import { usePost } from '@/hooks/use-post';
import { useUserStore } from '@/stores/user.store';

export default function PostingPage() {
  const { postId } = useParams<{ postId: string }>();
  const { result, isFetching } = usePost(postId);
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const currentUser = useUserStore((state) => state.user);
  // TODO: implement isFavorite/wishlist functionality

  if (isFetching || !result) return <Loading />;
  if (!result.success)
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">
            Post could not be found
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

  const post = result.data!;
  const isOwner = currentUser?._id === (post.author as User)._id;

  const handleAuthorClick = () => {
    const authorId = (post.author as User)._id;
    router.push(`/profile/${authorId}`);
  };

  const transformedData = {
    address: `${(post.house as House).address}, ${post.suites ? `${post.suites},` : ''} ${post.city}, ${post.state} ${post.zip}`,
    author: post.author as User,
    amenities: [
      { icon: Wifi, label: post.amenities.wifi ? 'Wifi' : '' },
      { icon: Utensils, label: post.amenities.kitchen ? 'Kitchen' : '' },
      { icon: WashingMachine, label: post.amenities.laundry ? 'Laundry' : '' },
      {
        icon: Wind,
        label: post.amenities.airConditioning ? 'Air conditioning' : '',
      },
      { icon: Car, label: post.amenities.parking ? 'Parking' : '' },
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
        label: `${post.bedroomInfo.bedrooms} bedroom${post.bedroomInfo.bedrooms > 1 ? 's' : ''}, ${post.bedroomInfo.beds} bed${post.bedroomInfo.beds > 1 ? 's' : ''}`,
      },
      {
        icon: Bath,
        label: `${post.bathroomInfo.privateAttached + post.bathroomInfo.privateAccessible} private, ${post.bathroomInfo.shared} shared bathroom`,
      },
      {
        icon: Lock,
        label: post.bedroomInfo.lock
          ? 'Room has lock'
          : 'Room does not have lock',
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
      {
        icon: PartyPopper,
        label: post.rules.noParty ? 'No parties allowed' : 'Parties allowed',
      },
      {
        icon: Cigarette,
        label: post.rules.noSmoking ? 'No smoking allowed' : 'Smoking allowed',
      },
      {
        icon: Cannabis,
        label: post.rules.noDrug ? 'No drugs allowed' : 'Drugs allowed',
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
          <h1 className="text-2xl font-medium mb-2">{post.title}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span className="text-sm">{transformedData.address}</span>
            </div>
          </div>
        </div>
        {isOwner ? (
          <button
            onClick={() => router.push(`/posts/edit/${postId}`)}
            className="p-2 rounded-full hover:bg-gray-100"
            title={'Edit post'}
            aria-label={'Edit post'}
          >
            <SquarePen className={`w-6 h-6`} />
          </button>
        ) : (
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 rounded-full hover:bg-gray-100"
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-label={
              isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
          >
            <Heart
              className={`w-6 h-6 ${isFavorite && 'fill-orange-500 text-orange-500'}`}
            />
          </button>
        )}
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-4 gap-2 mb-8 rounded-xl overflow-hidden">
        {post.media.map((image, index) => (
          <div
            key={index}
            className={`relative ${index === 0 ? 'col-span-2 row-span-2' : ''} group cursor-pointer overflow-hidden`}
          >
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              width={800}
              height={600}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        ))}
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
              src={transformedData.author.profileImage || authorAvatar}
              alt="Author Avatar"
              className="w-11 h-11 rounded-full"
              width={44}
              height={44}
            />
            <p className="font-medium text-xl">
              Subleased by{' '}
              <span className="text-primaryOrange">
                {`${transformedData.author.firstName} ${transformedData.author.lastName}`}
              </span>
            </p>
          </button>

          {/* Room Info */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">About this place</h2>
            <div className="grid grid-cols-2 gap-4">
              {transformedData.roomInfo.map((info, index) => {
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
            <p>{post.description}</p>
          </div>

          {/* Who else lives here */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">Who else lives here</h2>
            <p>{transformedData.whoElse}</p>
          </div>

          {/* What this place offers */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">What this place offers</h2>
            <div className="grid grid-cols-2 gap-4">
              {transformedData.amenities.map((amenity, index) => {
                const Icon = amenity.icon;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <Icon className="w-6 h-6 text-gray-600" />
                    <span>{amenity.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Convenience */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">Convenience</h2>
            <div className="grid grid-cols-2 gap-4">
              {transformedData.convenience.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <Icon className="w-6 h-6 text-gray-600" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* House Rules */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">House Rules</h2>
            <div className="grid grid-cols-2 gap-4">
              {transformedData.rules.map((rule, index) => {
                const Icon = rule.icon;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <Icon className="w-6 h-6 text-gray-600" />
                    <span>{rule.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">Where you'll be</h2>
            <div className="mb-4 mb-2 flex gap-1">
              <MapPin className="w-5 h-5 text-gray-600" />
              {transformedData.address}
            </div>
            <PostingMap
              post={post}
              className="h-[400px] w-full rounded-lg overflow-hidden"
            />
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 bg-white rounded-lg shadow-lg p-6">
            <div className="text-2xl font-semibold mb-4">
              ${post.price}
              <span className="font-normal">/month</span>
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
                      {transformedData.availability.startDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Until</p>
                    <p className="font-medium">
                      {transformedData.availability.endDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Check-in time</p>
                    <p className="font-medium">
                      {transformedData.availability.checkinTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Check-out time</p>
                    <p className="font-medium">
                      {transformedData.availability.checkoutTime}
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
