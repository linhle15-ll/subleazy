'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, SquarePen, Star, MapPin, ArrowRight } from 'lucide-react';
import { getPlaceTypeIcon, getHouseTypeIcon } from '@/lib/utils/icons';
import { Post } from '@/lib/types/post.types';
import { usePathname } from 'next/navigation';
import { useFilterStore } from '@/stores/filter.store';
import { useUserStore } from '@/stores/user.store';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/commons/tooltip';
import placeHolderImg from '@/public/placeholder.webp';
import wishService from '@/services/wish.services';

interface PostingCardProps {
  post: Post;
  isVertical?: boolean;
  isFavorite?: boolean;
}

export function PostingCard({ post, isVertical }: PostingCardProps) {
  const [isFavorite, setIsFavorite] = React.useState(false);
  // If post is not provided, return null to avoid rendering
  if (!post) {
    return null;
  }
  const pathname = usePathname();

  const currentUser = useUserStore((state) => state.user);
  const currentUserId = currentUser?._id;
  const isOwner = currentUser?._id === post.author;

  const placeType = post.houseInfo.placeType;
  const houseType = post.houseInfo.houseType;
  const imageUrl = post.media?.[0] || placeHolderImg;
  const location =
    post.city && post.state && post.zip
      ? `${post.city}, ${post.state} ${post.zip}`
      : 'Location not specified';
  const { title, price } = post;
  const viewDetailsLink = `/posts/${post._id}`;

  const PlaceTypeIcon = getPlaceTypeIcon(placeType);
  const HouseTypeIcon = getHouseTypeIcon(houseType);

  const handleToggleFavorite = async (currentPostId: string) => {
    if (!currentUserId) {
      alert('Sign in to add this post to your Wishlist');
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
      }
    } catch {
      alert('Failed to update favorite');
    }

    if (isFavorite) {
      setIsFavorite(false);
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex shadow-lg border border-gray-100 hover:border-gray-200 ${isVertical ? 'flex-col' : 'flex-row h-[240px]'}`}
    >
      {/* Image Section */}
      <div className={`relative ${isVertical ? '' : 'w-2/5'}`}>
        <Image
          src={imageUrl}
          alt={title || 'Post image'}
          fill={!isVertical}
          width={isVertical ? 278 : undefined}
          height={isVertical ? 227 : undefined}
          className={`object-cover w-full transition-transform duration-300 hover:scale-105 ${isVertical ? 'h-48' : 'h-full'}`}
          style={!isVertical ? { objectFit: 'cover' } : {}}
          onError={(e) => {
            // Handle image loading error
            const target = e.target as HTMLImageElement;
            target.src = '/public/placeholder.webp';
          }}
        />

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          {isOwner ? (
            <Button
              asChild
              className="bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110 shadow-lg"
              size="sm"
            >
              <Link href={`/posts/edit/${post._id}`}>
                <SquarePen className="w-4 h-4 text-gray-700" />
              </Link>
            </Button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (post._id) {
                  handleToggleFavorite(post._id);
                } else {
                  alert('Post ID is missing.');
                }
              }}
              className="bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110 shadow-lg p-2 rounded-lg"
              title={isFavorite ? 'Remove from wish list' : 'Add to wish list'}
              aria-label={
                isFavorite ? 'Remove from wish list' : 'Add to wish list'
              }
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Heart
                    className={`${isFavorite ? 'fill-primaryOrange text-primaryOrange' : 'text-gray-700'} w-4 h-4 transition-all duration-200`}
                    size={16}
                    onClick={() => {
                      if (post._id) {
                        handleToggleFavorite(post._id);
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

        {/* Premium badge for search results */}
        {pathname === '/posts/search' &&
          post.bedroomInfo.maxGuests >
            (useFilterStore.getState().filters.bedroomInfo?.maxGuests || 1) && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" />
              Premium
            </div>
          )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow px-6 py-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-medium text-lg text-gray-800 line-clamp-2 leading-tight">
            {title || 'Untitled Post'}
          </h3>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600 font-medium">{location}</span>
        </div>

        {/* Property details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shadow-sm">
              <HouseTypeIcon className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {houseType.charAt(0).toUpperCase() + houseType.slice(1)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center shadow-sm">
              <PlaceTypeIcon className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {placeType.charAt(0).toUpperCase() + placeType.slice(1)} living
              space
            </span>
          </div>
        </div>

        {/* Spacer to push price/details to bottom */}
        <div className="flex-grow" />

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">
              Monthly Rent
            </span>
            <span className="text-xl font-medium text-gray-800">
              ${price || 0}
            </span>
          </div>

          <Button
            asChild
            className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md border border-orange-200"
            size="sm"
          >
            <Link href={viewDetailsLink} className="flex items-center gap-2">
              View details
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
