'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Loading from '@/components/ui/commons/loading';
import { PostingGrid } from '@/components/ui/posting/posting-grid';
import { Wish } from '@/lib/types/wish.types';
import { PostRequestBody } from '@/lib/types/post.types';
import WishlistTable from './wistlist-table';
import { DashboardMenu } from '@/components/ui/navigation-menu/dashboard-menu'
import { useWish } from '@/hooks/use-wish';
import { useUserStore } from '@/stores/user.store'

export default function WishlistPage() {
  const [tableView, setTableView] = React.useState(false);

  const { userId } = useParams<{ userId: string }>();
  const currentUser = useUserStore((state) => state.user);
  const isOwner = currentUser?._id === userId

  const { data, isLoading, error } = useWish(userId ?? '')

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
    <div className='flex'>
      {isOwner && (
        <div className='pt-11 h-full'>
          <DashboardMenu />
        </div>
      )}

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
    </div>
  );
}