'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, SquarePen, Star } from 'lucide-react';
import { getPlaceTypeIcon, getHouseTypeIcon } from '@/lib/utils/icons';
import { Post } from '@/lib/types/post.types';
import { usePathname } from 'next/navigation';
import { useFilterStore } from '@/stores/filter.store';

import { useUserStore } from '@/stores/user.store';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/commons/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/commons/alert-dialog";
import placeHolderImg from '@/public/placeholder.webp';
import wishService from '@/services/wish.services';

interface PostingCardProps {
  post: Post;
  isVertical?: boolean;
  isFavorite?: boolean;
  onWishlistChange?: () => void;
}

export function PostingCard({ post, isVertical, isFavorite: initialIsFavorite = false, onWishlistChange }: PostingCardProps) {
  const [isFavorite, setIsFavorite] = React.useState(initialIsFavorite);
  const [isFavLoading, setIsFavLoading] = React.useState(false);

  const currentUser = useUserStore((state) => state.user);
  const currentUserId = currentUser?._id;
  const isOwner = currentUser?._id === post.author;

  // Hydrate isFavorite from server for accuracy
  React.useEffect(() => {
    setIsFavorite(initialIsFavorite);
  }, [initialIsFavorite]);

  React.useEffect(() => {
    const hydrateFavorite = async () => {
      if (!currentUserId || !post?._id) return;
      try {
        const res = await wishService.getWishListByUserId(currentUserId);
        if (res.success && Array.isArray(res.data)) {
          const exists = res.data.some((w) => {
            // supports either string ID or populated object
            const wishPostId = typeof w.post === 'string' ? w.post : w.post?._id;
            return wishPostId === post._id;
          });
          setIsFavorite(exists);
        }
      } catch {
        // silent fail to avoid noisy UI
      }
    };
    hydrateFavorite();
  }, [currentUserId, post?._id]);

  const handleAddToFavorite = async (currentPostId: string) => {
    if (!currentUserId || isFavLoading) return;
    setIsFavLoading(true);
    try {
      const result = await wishService.createWish({ post: currentPostId, user: currentUserId });
      if (result.success) setIsFavorite(true);
      else alert(result.error || 'Failed to add to wishlist');
    } catch {
      alert('Failed to add to wishlist');
    } finally {
      setIsFavLoading(false);
    }
  };

  const handleDeleteFromFavorite = async (currentPostId: string) => {
    if (!currentUserId || isFavLoading) return;
    setIsFavLoading(true);
    try {
      const result = await wishService.deleteWish({ post: currentPostId, user: currentUserId });
      if (result.success) {
        setIsFavorite(false);
        
        window.location.reload();
       
      }
      else alert(result.error || 'Failed to remove from wishlist');
    } catch {
      alert('Failed to remove from wishlist');
    } finally {
      setIsFavLoading(false);
    }
  };

  // If post is not provided, return null to avoid rendering
  if (!post) {
    return null;
  }
  const pathname = usePathname();

  const placeType = post.houseInfo.placeType;
  const houseType = post.houseInfo.houseType;
  const imageUrl = post.media?.[0] || placeHolderImg;
  const location =
    post.city && post.state && post.zip
      ? `${post.city}, ${post.state} ${post.zip}`
      : 'Location not specified';
  const { title, price } = post;
  const viewDetailsLink = `/posts/${post._id}`;

  const PlaceTypeIcon = getPlaceTypeIcon(placeType);
  const HouseTypeIcon = getHouseTypeIcon(houseType);

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-700 flex shadow-md ${isVertical ? 'flex-col' : 'flex-row h-[220px]'}`}
    >
      <div className={`relative ${isVertical ? '' : 'w-2/5'}`}>
        <Image
          src={imageUrl}
          alt={title || 'Post image'}
          fill={!isVertical}
          width={isVertical ? 278 : undefined}
          height={isVertical ? 227 : undefined}
          className={`object-cover rounded-lg w-full ${isVertical ? 'h-48' : 'h-full'}`}
          style={!isVertical ? { objectFit: 'cover' } : {}}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/public/placeholder.webp';
          }}
        />
        {isOwner ? (
          <button className="absolute top-3 right-3 transition-colors hover:scale-110">
            <Link href={`/posts/edit/${post._id}`}>
              <SquarePen className="text-white" />
            </Link>
          </button>
        ) : (
          <>
            {!isFavorite ? (
              <button
                disabled={isFavLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  if (post._id) handleAddToFavorite(post._id);
                }}
                className="absolute top-3 right-3 transition-colors hover:scale-110 disabled:opacity-50"
                title="Add to wish list"
                aria-label="Add to wish list"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Heart className="text-white" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Love this? Click to add post to your Wishlist!</p>
                  </TooltipContent>
                </Tooltip>
              </button>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    disabled={isFavLoading}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-3 right-3 transition-colors hover:scale-110 disabled:opacity-50"
                    title="Remove from wish list"
                    aria-label="Remove from wish list"
                  >
                    <Heart className="fill-primaryOrange text-primaryOrange" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white" onClick={(e) => e.stopPropagation()}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will delete this post from your wishlist. You may find it and add it back to your wishlist later.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        if (post._id) handleDeleteFromFavorite(post._id);
                      }}
                    >
                      <div className="text-red-500 font-semibold"> Delete</div>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow px-4 pt-3 pb-0">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-lg line-clamp-2">
            {title || 'Untitled Post'}
          </h3>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-pink-500 flex items-center justify-center">
            <HouseTypeIcon className="w-4 h-4 stroke-white" />
          </div>
          <span>{houseType.charAt(0).toUpperCase() + houseType.slice(1)}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
            <PlaceTypeIcon className="w-4 h-4 stroke-white" />
          </div>
          <span>
            {placeType.charAt(0).toUpperCase() + placeType.slice(1)} living
            space
          </span>
        </div>

        {/* Spacer to push price/details to bottom */}
        <div className="flex-grow" />
        <div className="flex items-center justify-between pt-2 pb-3">
          <span className="font-medium">${price || 0}/ month</span>
          <Button
            asChild
            className="text-primaryOrange hover:font-medium focus:outline-none"
            title={'View details'}
            aria-label={'View details'}
          >
            <Link href={viewDetailsLink}>View details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}