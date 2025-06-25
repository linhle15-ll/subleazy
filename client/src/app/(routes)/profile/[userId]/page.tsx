'use client';

import Loading from '@/components/ui/commons/loading';
import { PostingGrid } from '@/components/ui/posting/posting-grid';
import { usePosts } from '@/hooks/use-posts';
import userService from '@/services/user.service';
import { useUserStore } from '@/stores/user.store';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const router = useRouter();
  const currentUser = useUserStore((state) => state.user);
  const isOwner = currentUser?._id === userId;

  const { data: result, isFetching } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getUser(userId!),
    enabled: !!userId,
  });

  const userPosts = usePosts(userId);

  if (isFetching || !result) return <Loading />;
  if (!result.success)
    return <div className="text-red-500 screen-message">User not found</div>;

  const user = result.data!;

  return (
    <div className="max-w-full mx-auto px-25 py-15">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Image
            // TODO: add default profile image
            src={user.profileImage || '/default-profile.png'}
            alt="Profile"
            width={180}
            height={180}
            className="rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
        {/* Info & Actions */}
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-3xl font-medium">
            {user.firstName} {user.lastName}
          </h2>
          <div>{user.bio}</div>
          <div className="flex gap-4 mt-4">
            {isOwner && (
              <>
                <button
                  className="btn-secondary"
                  onClick={() => router.push('/profile/edit')}
                >
                  Edit Profile
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => router.push('/wishlist')}
                >
                  View Wishlist
                </button>
              </>
            )}
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
          <span className="text-2xl font-medium text-orange-500">▦</span>
          <span className="text-xl font-medium">
            {user.firstName}’s places for sublet
          </span>
        </div>
        {userPosts.loading ? (
          <div>
            <Loading />
          </div>
        ) : userPosts.error ? (
          <div className="text-red-500 screen-message">{userPosts.error}</div>
        ) : userPosts.posts && userPosts.posts.length > 0 ? (
          <PostingGrid isVertical={true} posts={userPosts.posts} />
        ) : (
          <div className="screen-message">No listings yet</div>
        )}
      </div>
    </div>
  );
}
