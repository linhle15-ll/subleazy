'use client';

import { PostingCard } from './posting-card';
import { usePosts } from '@/hooks/use-posts.hook';

interface PostingGridProps {
  isVertical?: boolean;
  onViewDetails: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function PostingGrid({
  isVertical,
  onViewDetails,
  onToggleFavorite,
}: PostingGridProps) {
  const { posts, loading, error } = usePosts();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>No posts found</div>;
  }

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
