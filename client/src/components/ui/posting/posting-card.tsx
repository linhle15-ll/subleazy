'use client';

import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { getPlaceTypeIcon, getHouseTypeIcon } from '@/lib/utils/icons';
import { Post } from '@/lib/types/post.types';

interface PostingCardProps {
  post: Post;
  isVertical?: boolean;
  isFavorite?: boolean;
  onViewDetails: () => void;
  onToggleFavorite: () => void;
}

export function PostingCard({
  post,
  onViewDetails,
  onToggleFavorite,
  isVertical,
  isFavorite = false,
}: PostingCardProps) {
  if (!post) {
    return null;
  }

  const placeType = post.houseInfo?.placeType;
  const houseType = post.houseInfo?.houseType;
  const imageUrl = post.media?.[0] || '/placeholder-image.jpg'; // Add a placeholder image
  const location =
    post.city && post.state && post.zip
      ? `${post.city}, ${post.state} ${post.zip}`
      : 'Location not specified';
  const { title, price } = post;

  if (!placeType || !houseType) {
    return null;
  }

  const PlaceTypeIcon = getPlaceTypeIcon(placeType);
  const HouseTypeIcon = getHouseTypeIcon(houseType);

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-700 flex h-full ${isVertical ? 'flex-col' : 'flex-row'}`}
    >
      <div
        className={`relative ${isVertical ? '' : 'h-full min-h-[220px] w-2/5'}`}
      >
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
            target.src = '/placeholder-image.jpg';
          }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-3 right-3 transition-colors hover:scale-110"
          title={isFavorite ? 'Remove from wish list' : 'Add to wish list'}
          aria-label={isFavorite ? 'Remove from wish list' : 'Add to wish list'}
        >
          <Heart
            className={`w-7 h-7 ${isFavorite ? 'fill-red-600 stroke-none' : 'text-white'}`}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow px-4 pt-3 pb-0">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-lg line-clamp-2">
            {title || 'Untitled Post'}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-orange-300 stroke-orange-300" />
            <span>5</span>
          </div>
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
          <span className="font-medium">${price || 0}/month</span>
          <button
            className="text-orange-500 hover:font-medium focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
}
