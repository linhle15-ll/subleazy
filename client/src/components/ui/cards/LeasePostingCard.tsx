'use client';

import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { PlaceType, getPlaceTypeIcon } from '@/lib/utils/icons';

interface LeasePostingCardProps {
  title: string;
  location: string;
  roomType: PlaceType;
  price: string;
  rating: number;
  imageUrl: string;
  onViewDetails: () => void;
  onToggleFavorite: () => void;
  isFavorite?: boolean;
}

export default function LeasePostingCard({
  title,
  location,
  roomType,
  price,
  rating,
  imageUrl,
  onViewDetails,
  onToggleFavorite,
  isFavorite = false,
}: LeasePostingCardProps) {
  const PlaceTypeIcon = getPlaceTypeIcon(roomType);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-700">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={title}
          width={278}
          height={227}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 bg-white hover:opacity-100 rounded-full p-2 hover:bg-white transition-colors"
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? 'fill-orange-500 text-orange-500' : 'text-gray-600'
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-medium line-clamp-2 min-h-[3rem]">
            {title}
          </h3>
          <div className="flex  items-center gap-1">
            <span>
              <Star className="w-4 h-4 fill-orange-300 stroke-orange-300" />
            </span>
            <span className="text-base">{rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-base">{location}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center">
            <PlaceTypeIcon className="w-4 h-4 stroke-gray-600" />
          </div>
          <span className="text-base">{roomType}</span>
        </div>
      </div>
      <div className="px-4 pb-4 flex items-center justify-between">
        <span className="text-base font-medium">{price} / month</span>
        <button
          className="text-orange-500 text-base hover:underline focus:outline-none"
          onClick={onViewDetails}
        >
          View details
        </button>
      </div>
    </div>
  );
}
