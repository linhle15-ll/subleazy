'use client';

import { HouseType, PlaceType } from '@/lib/types/enums';
import LeasePostingCard from './subleasePostCard';
import { StaticImageData } from 'next/image';

interface LeasePost {
  id: string;
  title: string;
  location: string;
  price: string;
  imageUrl: StaticImageData | string;
  houseType: HouseType; 
  placeType: PlaceType; 
  isFavorite?: boolean;
  isVertical?: boolean;
}

interface LeasePostingGridProps {
  posts: LeasePost[];
  isVertical?: boolean;
  onViewDetails: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function LeasePostingGrid({
  posts,
  onViewDetails,
  onToggleFavorite,
  isVertical
}: LeasePostingGridProps) {
  return (
    <div className={`grid gap-11 ${isVertical ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1  lg:grid-cols-2'}`}>
      {posts.map((post: LeasePost) => (
        <LeasePostingCard
          key={post.id}
          {...post}
          onViewDetails={() => onViewDetails(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
          isVertical={isVertical}
          isFavorite={post.isFavorite}
        />
      ))}
    </div>
  );
}
