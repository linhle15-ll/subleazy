// personal page
'use client';
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import userService from '@/services/user.service';
import Loading from '@/components/ui/commons/loading';
import { usePosts } from '@/hooks/use-get-posts.hook';
import { PostingGrid } from '@/components/ui/posting/posting-grid';
import Image from 'next/image';

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get('id');

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getUserById(userId!),
    enabled: !!userId,
  });

  const userData = user?.data;
  const userPosts = usePosts(userId ?? undefined);

  // Get current logged-in user (adjust according to your auth)
  // const { data: session } = useSession();
  // const isOwner = session?.user?.id === userId;

  const isOwner = true; // Replace with actual logic to check if the logged-in user is the profile owner

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error || !user) return <div className="text-red-500">User not found</div>;

  return (
    <div className="max-w-full mx-auto px-20 py-15">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Image
            src={userData?.profileImage || '/default-profile.png'}
            alt="Profile"
            width={180}
            height={180}
            className="rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
        {/* Info & Actions */}
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-3xl font-medium">
            {userData?.firstName} {userData?.lastName}
          </h2>
          <div>
            {' '}
            Student at{' '}
            <span className="font-medium">{userData?.institution} </span>
          </div>
          <div>{userData?.bio}</div>
          <div className="flex gap-4 mt-4">
            {isOwner ? (
              <>
                <button
                  className="btn-secondary"
                  onClick={() => router.push('/profile/edit')}
                >
                  Edit Profile
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => router.push(`/profile/wishlist?id=${userId}`)}
                >
                  View Wishlist
                </button>
              </>
            ) : null}
            <button
              className="btn-secondary"
              onClick={() => {
                /* message logic here */
              }}
            >
              Message
            </button>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="mt-12 w-full">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-semibold text-orange-500">▦</span>
          <span className="text-xl font-semibold">
            {userData?.firstName}’s places for sublet
          </span>
        </div>
        {userPosts.loading ? (
          <div>
            <Loading />
          </div>
        ) : userPosts.error ? (
          <div className="text-red-500">{userPosts.error}</div>
        ) : userPosts.posts && userPosts.posts.length > 0 ? (
          <PostingGrid isVertical={true} posts={userPosts.posts} />
        ) : (
          <div className="text-gray-500">No listings yet.</div>
        )}
      </div>
    </div>
  );
}
