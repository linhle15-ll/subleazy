'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import userService from '@/services/user.service';
import Loading from '@/components/ui/commons/loading';
import { PostingGrid } from '@/components/ui/posting/posting-grid';
import { Wish } from '@/lib/types/wish.types';
import { PostRequestBody } from '@/lib/types/post.types';

import WishlistTable from './wishlist-table';

export default function WishlistPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const [tableView, setTableView] = React.useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['wishlist', userId],
    queryFn: () => userService.getWishListByUserId(userId!),
    enabled: !!userId,
  });

  const wishList = Array.isArray(data?.data) ? data.data : [];
  const posts = wishList
    .map((wish: Wish) => wish.post)
    .filter(
      (post): post is PostRequestBody =>
        typeof post === 'object' && post !== null
    );

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500">Failed to load wishlist</div>;

  return (
    <div className="mt-12 w-full px-15">
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl font-semibold mb-6">
          View your <span className="text-primaryOrange"> Wishlist </span>
        </div>
        <button
          className="btn-primary"
          onClick={() => setTableView(!tableView)}
        >
          {tableView ? `View as Cards` : `View as Table`}
        </button>
      </div>
      {posts.length > 0 ? (
        tableView ? (
          <WishlistTable posts={posts} />
        ) : (
          <PostingGrid posts={posts} isVertical={true} />
        )
      ) : (
        <div className="text-gray-500">No wishlisted posts yet.</div>
      )}
    </div>
  );
}
