'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LeasePostingCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  rating: number;
  imageUrl: string;
  onToggleFavorite: () => void;
  isFavorite?: boolean;
}

export default function LeasePostingCard({
  id,
  title,
  location,
  price,
  rating,
  imageUrl,
  onToggleFavorite,
  isFavorite = false,
}: LeasePostingCardProps) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600">{rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 text-xs">📍</span>
          </div>
          <span className="text-sm text-gray-600">{location}</span>
        </div>
      </div>
      <div className="px-4 pb-4 flex items-center justify-between">
        <span className="font-bold text-lg text-gray-900">
          {price}
          <span className="text-sm font-normal text-gray-500">/ month</span>
        </span>
        <button
          className="text-orange-500 text-sm font-medium hover:underline focus:outline-none"
          onClick={() => router.push(`/posting?id=${id}`)}
        >
          View details
        </button>
      </div>
    </div>
  );
}
