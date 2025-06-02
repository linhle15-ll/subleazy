'use client';

import { PostingCard } from './posting-card';
import { Post } from '@/lib/types/post.types';

interface PostingGridProps {
  posts: Post[];
  isVertical?: boolean;
  onViewDetails: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function PostingGrid({
  posts,
  isVertical,
  onViewDetails,
  onToggleFavorite,
}: PostingGridProps) {
  return (
    <div
      className={`grid gap-11 ${isVertical ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1  lg:grid-cols-2'}`}
    >
      {posts.map((post) => (
        <PostingCard
          key={post._id}
          post={post}
          onViewDetails={() => onViewDetails(post._id!)}
          onToggleFavorite={() => onToggleFavorite(post._id!)}
          isVertical={isVertical}
        />
      ))}
    </div>
  );
}
