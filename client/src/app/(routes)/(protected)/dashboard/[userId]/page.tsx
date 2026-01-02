// personal page
'use client';
import React from 'react';
import NextLink from 'next/link';
import { useParams } from 'next/navigation';
import Loading from '@/components/ui/commons/loading';
import { usePostsByAuthor } from '@/hooks/use-posts-by-author';
import { useUserStore } from '@/stores/user.store';
import { ProfileAvatar } from '@/components/ui/commons/avatar';
import { useUser } from '@/hooks/use-user';
import { DashboardMenu } from '@/components/ui/navigation-menu/dashboard-menu';
import userImage from '@/public/placeholder-image-person.webp';
import { PlusCircle } from 'lucide-react';
import { PostingCard } from '@/components/ui/posting/posting-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const { data: user, isLoading, error } = useUser(userId);
  const currentUser = useUserStore((state) => state.user);
  const isOwner = currentUser?._id === userId;

  const userData = user?.data;
  const userPosts = usePostsByAuthor(userId);

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error || !user) return <div className="text-red-500">User not found</div>;

  return (
    <div className="flex">
      {isOwner && (
        <div className="pt-11 h-full">
          <DashboardMenu />
        </div>
      )}

      <div className="w-full py-12">
        <div className="flex flex-col sm:px-8 md:px-20 md:flex-row md:items-start gap-8 items-center">
          {/* Avatar */}
          <div className="h-full w-auto">
            <ProfileAvatar
              src={userData?.profileImage || userImage}
              alt={userData?.firstName}
              size={160}
            />
          </div>

          {/* Info & Actions */}
          <div className="flex-1 flex flex-col gap-2 justify-center">
            <h2 className="text-3xl font-medium">
              {isOwner && (
                <div className="font-normal text-4xl sm:text-5xl mb-2">
                  {' '}
                  Welcome{' '}
                </div>
              )}
              <span className="text-primaryOrange font-semibold">
                {userData?.firstName} {userData?.lastName}{' '}
              </span>
            </h2>
            <div>{userData?.email}</div>
            {/* <div className='text-gray-600 mt-1'>{userData?.bio || 'No bio provided.'}</div> */}
            <div className="flex gap-4 mt-4">
              {isOwner ? null : ( // </NextLink> //   <button className="btn-secondary">Edit Profile</button> // <NextLink href={`/dashboard/${userId}/edit`}>
                <NextLink href={`/chat/`}> 
                  <button 
                    className="btn-secondary"
                  >Message
                  
                  </button>
                </NextLink>
              )}
            </div>
          </div>
        </div>

        {/* Listings */}
        <div className="mt-12 w-full px-15">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="text-2xl font-semibold">
              {isOwner
                ? 'Your posts'
                : `${userData?.firstName}’s places for sublet`}
            </h3>
            {isOwner && (
              <NextLink href="/sublease/step-1">
                <div className="flex gap-2 items-center">
                  {' '}
                  <PlusCircle size={20} />{' '}
                  <span className="font-medium"> New Post </span>{' '}
                </div>
              </NextLink>
            )}
          </div>

          {/* Light divider line */}
          <hr className="border-gray-200 mb-6" />

          {userPosts.loading ? (
            <div>
              <Loading />
            </div>
          ) : userPosts.error ? (
            <div className="text-red-500">{userPosts.error}</div>
          ) : userPosts.posts && userPosts.posts.length > 0 ? (
            <Carousel
              opts={{
                align: 'start',
              }}
              className="w-[98%]
              "
            >
              <CarouselContent>
                {userPosts.posts.map((post, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/3 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <PostingCard post={post} isVertical={true} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <div className="text-gray-500 mt-6 text-center">
              {isOwner
                ? "You haven't posted any listings yet."
                : 'This user has no listings yet.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
