'use client';

import { PostingCard } from './posting-card';
import { useRouter } from 'next/navigation';

interface PostingGridProps {
  isVertical?: boolean;
  posts?: any[]
}

export function PostingGrid({
  isVertical,
  posts
}: PostingGridProps) {
  
  const router = useRouter()

  const handleViewDetails = (id: string) => {
    router.push(`/posting?id=${id}`);
  };

  const handleToggleFavorite = (id: string) => {
    // add post to wishlist
  };

  console.log('PostingGrid posts', posts);
  return (
    <div
      className={`grid gap-11 ${isVertical ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1  lg:grid-cols-2'}`}
    >
      {Array.isArray(posts) && posts?.map((post) => (
        <PostingCard
          key={post._id}
          post={post}
          onViewDetails={() => handleViewDetails(post._id!)}
          onToggleFavorite={() => handleToggleFavorite(post._id!)}
          isVertical={isVertical}
        />
      ))}
    </div>
  );
}
