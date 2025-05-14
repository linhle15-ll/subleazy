'use client';

import Image from 'next/image';
import { Heart, Star, MapPinHouse } from 'lucide-react';

interface LeasePostingCardProps {
  title: string;
  location: string;
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
  price,
  rating,
  imageUrl,
  onViewDetails,
  onToggleFavorite,
  isFavorite = false,
}: LeasePostingCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
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
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center gap-1">
            <span>
              <Star className="w-4 h-4 fill-orange-300 stroke-orange-300" />
            </span>
            <span className="text-sm text-gray-600">{rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <MapPinHouse className="w-4 h-4 fill-gray-600 stroke-gray-600" />
          <span className="text-sm text-gray-600">{location}</span>
        </div>
      </div>
      <div className="px-4 pb-4 flex items-center justify-between">
        <span className="font-bold text-lg text-gray-900">
          {price}
          <span className="text-sm font-normal text-gray-500"> / month</span>
        </span>
        <button
          className="text-orange-500 text-sm font-medium hover:underline focus:outline-none"
          onClick={onViewDetails}
        >
          View details
        </button>
      </div>
    </div>
  );
}
