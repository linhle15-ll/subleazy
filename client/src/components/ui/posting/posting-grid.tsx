'use client';

import { Post } from '@/lib/types/post.types';
import { PostingCard } from './posting-card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = (id: string) => {
    console.log(id);

    setIsFavorite(!isFavorite);
    // TODO: wishlist functionality
  };

  return (
    <div
      className={`grid gap-11 ${className ? className : isVertical ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1  lg:grid-cols-2'}`}
    >
      {Array.isArray(posts) &&
        posts?.map((post) => (
          <PostingCard
            key={post._id}
            post={post}
            onViewDetails={() => router.push(`/posts/${post._id}`)}
            onToggleFavorite={() => handleToggleFavorite(post._id!)}
            isVertical={isVertical}
            isFavorite={isFavorite}
          />
        ))}
    </div>
  );
}
