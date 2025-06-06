'use client';

import LeasePostingCard from './LeasePostingCard';

interface LeasePost {
  id: string;
  title: string;
  location: string;
  price: string;
  rating: number;
  imageUrl: string;
  isFavorite?: boolean;
}

interface LeasePostingGridProps {
  posts: LeasePost[];
  onToggleFavorite: (id: string) => void;
}

export default function LeasePostingGrid({
  posts,
  onToggleFavorite,
}: LeasePostingGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {posts.map((post) => (
        <LeasePostingCard
          key={post.id}
          {...post}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}
