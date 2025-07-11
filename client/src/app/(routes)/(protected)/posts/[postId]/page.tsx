'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import { Heart, MapPin, Clock, SquarePen } from 'lucide-react';
import authorAvatar from '@/public/placeholder-image-person.webp';
import Loading from '@/components/ui/commons/loading';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from '@/lib/types/user.types';
import { postData } from '@/lib/utils/post-data';
import { PostingMap } from '@/components/ui/map/posting-map';
import { usePost } from '@/hooks/use-post';
import { useUserStore } from '@/stores/user.store';
import wishService from '@/services/wish.services';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/commons/tooltip';
import { ProfileAvatar } from '@/components/ui/commons/avatar';
import { GalleryModal } from '@/components/ui/commons/image-gallery';

export default function PostingPage() {
  const { postId } = useParams<{ postId: string }>();
  const currentUser = useUserStore((state) => state.user);
  const currentUserId = currentUser?._id;
  const { result, isFetching } = usePost(postId);
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (showAllPhotos) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // store scroll on component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showAllPhotos]);

  if (isFetching || !result) return <Loading />;

  if (!result.success) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Post could not be found
          </h2>
          <button
            onClick={() => router.push('/')}
            className="btn-primary px-8 py-3 text-lg font-medium"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  const post = result.data!;
  const isOwner = currentUser?._id === (post.author as User)._id;

  const {
    address,
    author,
    amenities,
    roomInfo,
    whoElse,
    rules,
    convenience,
    availability,
  } = postData(post);

  const handleAuthorClick = () => {
    const authorId = (post.author as User)._id;
    router.push(`/dashboard/${authorId}`);
  };

  const handleToggleFavorite = async (currentPostId: string) => {
    if (!currentUserId) {
      alert('You must be logged in to add to favorites.');
      setIsFavorite(false);
      return;
    }

    try {
      const result = await wishService.createWish({
        post: currentPostId,
        user: currentUserId,
      });
      if (result.success) {
        setIsFavorite(true);
      } else {
        alert(result.error || 'Failed to update favorite');
      }
    } catch {
      alert('Failed to update favorite');
    }

    if (isFavorite) {
      setIsFavorite(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-medium text-gray-800 mb-3 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full border border-gray-200">
                <MapPin className="w-4 h-4 text-primaryOrange" />
                <span className="text-sm font-medium text-gray-700">
                  {address}
                </span>
              </div>
            </div>
          </div>
          {isOwner ? (
            <button
              onClick={() => router.push(`/posts/edit/${postId}`)}
              className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200 ml-4 border border-gray-200"
              title={'Edit post'}
              aria-label={'Edit post'}
            >
              <SquarePen className="w-6 h-6 text-gray-700" />
            </button>
          ) : (
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200 ml-4 border border-gray-200"
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Heart
                    className={`${isFavorite ? 'fill-primaryOrange text-primaryOrange' : 'text-gray-600'} w-6 h-6 transition-all duration-200 hover:scale-110`}
                    onClick={() => {
                      if (postId) {
                        handleToggleFavorite(postId);
                      }
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Love this? Click to add post to your Wishlist!</p>
                </TooltipContent>
              </Tooltip>
            </button>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative mb-12">
        <div className="grid h-[450px] grid-cols-2 grid-rows-2 gap-3 overflow-hidden rounded-2xl shadow-lg md:grid-cols-4">
          {/* Main Image */}
          <div
            className="relative col-span-2 row-span-2 cursor-pointer overflow-hidden group"
            onClick={() => setShowAllPhotos(true)}
          >
            <Image
              src={post.media[0]}
              alt="Main listing image"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            {/* Click indicator */}
            <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Click to view
            </div>
          </div>

          {/* Secondary Images */}
          {post.media.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="relative hidden cursor-pointer overflow-hidden group md:block"
              onClick={() => setShowAllPhotos(true)}
            >
              <Image
                src={image}
                alt={`Listing image ${index + 2}`}
                fill
                sizes="25vw"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              {/* Click indicator for smaller images */}
              <div className="absolute top-2 right-2 bg-white bg-opacity-90 backdrop-blur-sm rounded px-1.5 py-0.5 text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                View
              </div>
            </div>
          ))}
        </div>

        {/* Show all photos button - only show if there are more than 5 images */}
        {post.media.length > 5 && (
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute px-6 py-3 text-sm font-semibold transition-all duration-200 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg bottom-6 right-6 hover:bg-white hover:shadow-xl hover:scale-105"
          >
            Show all {post.media.length} photos
          </button>
        )}

        {/* Photo count indicator */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm font-medium text-white">
          {post.media.length} photo{post.media.length !== 1 ? 's' : ''}
        </div>

        {showAllPhotos && (
          <GalleryModal
            data={post.media}
            onClose={() => setShowAllPhotos(false)}
          />
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Subleased By */}
          <div className="border-b border-gray-200 pb-8">
            <button
              className="flex gap-4 items-center w-full hover:bg-gray-50 p-4 rounded-xl transition-colors duration-200"
              onClick={handleAuthorClick}
            >
              <ProfileAvatar
                src={author.profileImage || authorAvatar}
                alt={author.firstName}
                size={56}
              />
              <div className="text-left">
                <p className="font-semibold text-xl text-gray-800">
                  Subleased by{' '}
                  <span className="text-primaryOrange">
                    {`${author.firstName} ${author.lastName}`}
                  </span>
                </p>
                <p className="text-gray-600 text-sm">Click to view profile</p>
              </div>
            </button>
          </div>

          {/* Room Info */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-primaryOrange rounded-full"></div>
              About this place
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {roomInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 border border-gray-100"
                  >
                    <div className="p-2 bg-primaryOrange bg-opacity-10 rounded-lg">
                      <Icon className="w-6 h-6 text-primaryOrange" />
                    </div>
                    <span className="font-medium text-gray-700">
                      {info.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-primaryOrange rounded-full"></div>
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {post.description}
            </p>
          </div>

          {/* Who else lives here */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-primaryOrange rounded-full"></div>
              Who else lives here
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{whoElse}</p>
          </div>

          {/* What this place offers */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-primaryOrange rounded-full"></div>
              What this place offers
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {amenities.map((amenity, index) => {
                const Icon = amenity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 border border-gray-100"
                  >
                    <div className="p-2 bg-primaryOrange bg-opacity-10 rounded-lg">
                      <Icon className="w-5 h-5 text-primaryOrange" />
                    </div>
                    <span className="font-medium text-gray-700">
                      {amenity.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Convenience */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-primaryOrange rounded-full"></div>
              Convenience
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {convenience.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 border border-gray-100"
                  >
                    <div className="p-2 bg-primaryOrange bg-opacity-10 rounded-lg">
                      <Icon className="w-5 h-5 text-primaryOrange" />
                    </div>
                    <span className="font-medium text-gray-700">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* House Rules */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-primaryOrange rounded-full"></div>
              House Rules
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {rules.map((rule, index) => {
                const Icon = rule.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 border border-gray-100"
                  >
                    <div className="p-2 bg-primaryOrange bg-opacity-10 rounded-lg">
                      <Icon className="w-5 h-5 text-primaryOrange" />
                    </div>
                    <span className="font-medium text-gray-700">
                      {rule.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location */}
          <div className="pb-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-primaryOrange rounded-full"></div>
              Where you'll be
            </h2>
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex gap-2 items-center">
                <MapPin className="w-5 h-5 text-primaryOrange" />
                <span className="font-medium text-gray-700">{address}</span>
              </div>
            </div>
            <PostingMap
              post={post}
              className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg"
            />
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="text-3xl font-medium text-gray-800 mb-2">
              ${post.price}
              <span className="text-lg font-normal text-gray-600">/month</span>
            </div>

            {/* Availability */}
            <div className="mb-6 p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200">
              <h3 className="font-medium text-lg mb-4 flex items-center gap-3 text-gray-800">
                <div className="p-2 bg-primaryOrange rounded-lg">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                Availability
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                      Available from
                    </p>
                    <p className="font-normal text-gray-800">
                      {availability.startDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                      Until
                    </p>
                    <p className="font-normal text-gray-800">
                      {availability.endDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                      Check-in time
                    </p>
                    <p className="font-semibold text-gray-800">
                      {availability.checkinTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                      Check-out time
                    </p>
                    <p className="font-semibold text-gray-800">
                      {availability.checkoutTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="btn-primary w-full py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onClick={handleAuthorClick}
            >
              Contact Host
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
