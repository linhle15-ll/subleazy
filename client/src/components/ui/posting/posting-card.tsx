'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, SquarePen, Star } from 'lucide-react';
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
      className={`bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-700 flex shadow-md ${isVertical ? 'flex-col' : 'flex-row h-[220px]'}`}
    >
      <div className={`relative ${isVertical ? '' : 'w-2/5'}`}>
        <Image
          src={imageUrl}
          alt={title || 'Post image'}
          fill={!isVertical}
          width={isVertical ? 278 : undefined}
          height={isVertical ? 227 : undefined}
          className={`object-cover rounded-lg w-full ${isVertical ? 'h-48' : 'h-full'}`}
          style={!isVertical ? { objectFit: 'cover' } : {}}
          onError={(e) => {
            // Handle image loading error
            const target = e.target as HTMLImageElement;
            target.src = '/public/placeholder.webp';
          }}
        />
        {isOwner ? (
          <Button
            asChild
            className="absolute top-3 right-3 transition-colors hover:scale-110"
          >
            <Link href={`/posts/edit/${post._id}`}>
              <SquarePen className="text-white" size={60} />
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
            className="absolute top-3 right-3 transition-colors hover:scale-110"
            title={isFavorite ? 'Remove from wish list' : 'Add to wish list'}
            aria-label={
              isFavorite ? 'Remove from wish list' : 'Add to wish list'
            }
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Heart
                  className={`${isFavorite && 'fill-primaryOrange text-primaryOrange text-transparent'} text-white`}
                  size={30}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Love this? Click to add post to your Wishlist!</p>
              </TooltipContent>
            </Tooltip>
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow px-4 pt-3 pb-0">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-lg line-clamp-2">
            {title || 'Untitled Post'}
          </h3>
          {pathname === '/posts/search' &&
            post.bedroomInfo.maxGuests >
              (useFilterStore.getState().filters.bedroomInfo?.maxGuests ||
                1) && (
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-orange-300 stroke-orange-300" />
              </div>
            )}
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-pink-500 flex items-center justify-center">
            <HouseTypeIcon className="w-4 h-4 stroke-white" />
          </div>
          <span>{houseType.charAt(0).toUpperCase() + houseType.slice(1)}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
            <PlaceTypeIcon className="w-4 h-4 stroke-white" />
          </div>
          <span>
            {placeType.charAt(0).toUpperCase() + placeType.slice(1)} living
            space
          </span>
        </div>

        {/* Spacer to push price/details to bottom */}
        <div className="flex-grow" />
        <div className="flex items-center justify-between pt-2 pb-3">
          <span className="font-medium">${price || 0}/ month</span>
          <Button
            asChild
            className="text-primaryOrange hover:font-medium focus:outline-none"
            title={'View details'}
            aria-label={'View details'}
          >
            <Link href={viewDetailsLink}>
              <SquarePen className="text-white" size={30} /> View details{' '}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
