'use client';

import { PostingCard } from './posting-card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import userService from '@/services/user.service';
import { PostRequestBody } from '@/lib/types/post.types';
import Loading from '@/components/ui/commons/loading';

interface PostingGridProps {
  isVertical?: boolean;
  posts?: PostRequestBody[];
}

export function PostingGrid({ isVertical, posts }: PostingGridProps) {
  const router = useRouter();
  // AUTH: get current user
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleViewDetails = (id: string) => {
    router.push(`/posting?id=${id}`);
  };

  const handleToggleFavorite = async (postId: string) => {
    setIsFavorite(!isFavorite);
    setLoading(true);
    try {
      const result = await userService.createWish({
        postId: postId,
        // userId: session.user.id,
        userId: '682cefca27db55d55c680bcb',
      });
      if (result.success) {
        setIsFavorite(!isFavorite);
      } else if (loading) {
        return (
          <>
            {' '}
            <Loading />{' '}
          </>
        );
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  console.log('PostingGrid posts', posts);
  return (
    <div
      className={`grid gap-11 ${isVertical ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1  lg:grid-cols-2'}`}
    >
      {Array.isArray(posts) &&
        posts?.map((post) => (
          <PostingCard
            key={post._id}
            post={post}
            onViewDetails={() => handleViewDetails(post._id!)}
            onToggleFavorite={() => handleToggleFavorite(post._id!)}
            isVertical={isVertical}
            isFavorite={isFavorite}
          />
        ))}
    </div>
  );
}
