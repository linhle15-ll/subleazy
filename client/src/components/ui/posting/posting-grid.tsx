'use client';

import { Post } from '@/lib/types/post.types';
import { PostingCard } from './posting-card';

interface PostingGridProps {
  isVertical?: boolean;
  posts?: Post[];
  className?: string;
}

export function PostingGrid({
  isVertical,
  posts,
  className,
}: PostingGridProps) {
  return (
    <div
      className={`grid gap-8 ${className ? className : isVertical ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1  lg:grid-cols-2'}`}
    >
      {Array.isArray(posts) &&
        posts?.map((post) => (
          <PostingCard key={post._id} post={post} isVertical={isVertical} />
        ))}
    </div>
  );
}
