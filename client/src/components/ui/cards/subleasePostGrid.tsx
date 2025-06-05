'use client';

import { HouseType, PlaceType } from '@/lib/types/enums';
import LeasePostingCard from './subleasePostCard';
import { StaticImageData } from 'next/image';

export const samplePosts = [
    {
      id: '1',
      title: 'Cozy 1 Bedroom Apartment',
      description: 'A cozy one-bedroom apartment in the heart of the city.',
      price: 1200,
      location: 'New York, NY',
      imageUrl: '/images/apartment1.jpg',
      isFavorite: false,
    },
    {
      id: '2',
      title: 'Spacious Studio in Downtown',
      description: 'A spacious studio with modern amenities and great views.',
      price: 1500,
      location: 'San Francisco, CA',
      imageUrl: '/images/studio1.jpg',
      isFavorite: false,
    },
    {
      id: '3',
      title: 'Charming House in Suburbs',
      description: 'A charming house with a large backyard and quiet neighborhood.',
      price: 2000,
      location: 'Austin, TX',
      imageUrl: '/images/house1.jpg',
      isFavorite: false,
    },
    {
      id: '3',
      title: 'Charming House in Suburbs',
      description: 'A charming house with a large backyard and quiet neighborhood.',
      price: 2000,
      location: 'Austin, TX',
      imageUrl: '/images/house1.jpg',
      isFavorite: false,
    },
    {
      id: '3',
      title: 'Charming House in Suburbs',
      description: 'A charming house with a large backyard and quiet neighborhood.',
      price: 2000,
      location: 'Austin, TX',
      imageUrl: '/images/house1.jpg',
      isFavorite: false,
    },
    {
      id: '3',
      title: 'Charming House in Suburbs',
      description: 'A charming house with a large backyard and quiet neighborhood.',
      price: 2000,
      location: 'Austin, TX',
      imageUrl: '/images/house1.jpg',
      isFavorite: false,
    },
    {
      id: '3',
      title: 'Charming House in Suburbs',
      description: 'A charming house with a large backyard and quiet neighborhood.',
      price: 2000,
      location: 'Austin, TX',
      imageUrl: '/images/house1.jpg',
      isFavorite: false,
    }
  ]

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
