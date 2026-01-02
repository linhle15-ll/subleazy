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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/commons/alert-dialog"

import { ProfileAvatar } from '@/components/ui/commons/avatar';
import { GalleryModal } from '@/components/ui/commons/image-gallery';

export default function PostingPage() {
  const { postId } = useParams<{ postId: string }>();
  const currentUser = useUserStore((state) => state.user);
  const userId = currentUser?._id;
  const { result, isFetching } = usePost(postId);
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavLoading, setIsFavLoading] = useState(false);
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

  // Hydrate isFavorite from server
  useEffect(() => {
    const hydrateFavorite = async () => {
      if (!userId || !postId) return;
      try {
        const res = await wishService.getWishListByUserId(userId);
        if (res.success && Array.isArray(res.data)) {
          const exists = res.data.some((w) => {
            const wishPostId = typeof w.post === 'string' ? w.post : w.post?._id;
            return wishPostId === postId;
          });
          setIsFavorite(exists);
        }
      } catch { }
    };
    hydrateFavorite();
  }, [userId, postId]);

  if (isFetching || !result) return <Loading />;

  if (!result.success) {
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

  const handleAddToFavorite = async (currentPostId: string, currentUserId: string) => {
    if (!currentUserId || isFavLoading) return;
    setIsFavLoading(true);
    try {
      const result = await wishService.createWish({ post: currentPostId, user: currentUserId });
      if (result.success) setIsFavorite(true);
      else alert(result.error || 'Failed to update favorite');
    } catch {
      alert('Failed to update favorite');
    } finally {
      setIsFavLoading(false);
    }
  };

  const handleDeleteFromFavorite = async (currentPostId: string, currentUserId: string) => {
    if (isFavLoading) return;
    setIsFavLoading(true);
    try {
      const result = await wishService.deleteWish({ post: currentPostId, user: currentUserId });
      if (result.success) setIsFavorite(false);
      else alert(result.error || "Failed to delete post from wish list.");
    } catch {
      console.log("Failed to delete post from wish list.");
    } finally {
      setIsFavLoading(false);
    }
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
              <span className="text-sm">{address}</span>
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
          <>
            {!isFavorite ? (
              <button
                disabled={isFavLoading}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                title="Add to favorites"
              >
                <Heart
                  className="text-white"
                  size={30}
                  onClick={() => {
                    if (postId && userId) handleAddToFavorite(postId, userId);
                  }}
                />
              </button>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    disabled={isFavLoading}
                    className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                    title="Remove from favorites"
                  >
                    <Heart className="fill-primaryOrange text-primaryOrange" size={30} />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will delete this post from your wishlist. You may find it and add it back to your wishlist later.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        if (postId && userId) handleDeleteFromFavorite(postId, userId);
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </>
        )}
      </div>

      {/* Image Gallery */}
      <div className="relative mb-8">
        <div className="grid h-[400px] grid-cols-2 grid-rows-2 gap-2 overflow-hidden rounded-xl md:grid-cols-4">
          {/* Main Image */}
          <div className="relative col-span-2 row-span-2 cursor-pointer overflow-hidden group">
            <Image
              src={post.media[0]}
              alt="Main listing image"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* Secondary Images */}
          {post.media.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="relative hidden cursor-pointer overflow-hidden group md:block"
            >
              <Image
                src={image}
                alt={`Listing image ${index + 2}`}
                fill
                sizes="25vw"
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
        {post.media.length > 5 && (
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute px-4 py-2 text-sm font-medium transition bg-white bg-opacity-80 rounded-lg shadow-md bottom-4 right-4 hover:bg-gray-100"
          >
            Show all photos
          </button>
        )}
        {showAllPhotos && (
          <GalleryModal
            data={post.media}
            onClose={() => setShowAllPhotos(false)}
          />
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
            <ProfileAvatar
              src={author.profileImage || authorAvatar}
              alt={author.firstName}
              size={44}
            />
            <p className="font-medium text-xl">
              Subleased by{' '}
              <span className="text-primaryOrange">
                {`${author.firstName} ${author.lastName}`}
              </span>
            </p>
          </button>

          {/* Room Info */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">About this place</h2>
            <div className="grid grid-cols-2 gap-4">
              {roomInfo.map((info, index) => {
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
            <p>{whoElse}</p>
          </div>

          {/* What this place offers */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">What this place offers</h2>
            <div className="grid grid-cols-2 gap-4">
              {amenities.map((amenity, index) => {
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
              {convenience.map((item, index) => {
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
              {rules.map((rule, index) => {
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
              {address}
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
                    <p className="font-medium">{availability.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Until</p>
                    <p className="font-medium">{availability.endDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Check-in time</p>
                    <p className="font-medium">{availability.checkinTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Check-out time</p>
                    <p className="font-medium">{availability.checkoutTime}</p>
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
