'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/user.store';
import { useWish } from '@/hooks/use-wish';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PostRow, { type PostWithAuthor } from './post-row';
import type { Post } from '@/lib/types/post.types';
import type { Wish } from '@/lib/types/wish.types';
import { Users, Sparkles, AlertCircle } from 'lucide-react';

export default function PotentialMatches() {
  const user = useUserStore.getState().user;
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const router = useRouter();

  if (!user || !user._id) {
    router.push('/sign-in');
    return;
  }

  const { result, isFetching } = useWish(user._id);

  const posts = useMemo(() => {
    if (!result?.success || !Array.isArray(result.data)) return [];
    return result.data
      .filter(
        (wish): wish is Wish & { post: Post } =>
          typeof wish.post === 'object' &&
          wish.post !== null &&
          'bedroomInfo' in wish.post
      )
      .filter((wish) => wish.post.bedroomInfo.maxGuests > 1)
      .map((wish) => wish.post)
      .filter(
        (post): post is PostWithAuthor =>
          typeof post.author === 'object' &&
          post.author !== null &&
          'firstName' in post.author
      );
  }, [result]);

  const handleToggle = (postId: string) => {
    setExpandedPostId((prev) => (prev === postId ? null : postId));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-8 py-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-xl shadow-sm">
              <Sparkles className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Potential Matches
              </h2>
              <p className="text-gray-600">
                Find compatible roommates from your wishlist
              </p>
            </div>
          </div>
          <Button asChild className="btn-primary">
            <Link href={`/dashboard/${user?._id}/lifestyle`}>
              Complete Lifestyle Form
            </Link>
          </Button>
        </div>
      </div>

      <div className="p-6">
        {isFetching && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl p-6 animate-pulse"
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-gray-200 rounded-lg w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
                  </div>
                  <div className="h-6 w-6 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {result && !result.success && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800">
                  Failed to load wishlist
                </h3>
                <p className="text-red-600 text-sm mt-1">
                  Please try again later or refresh the page.
                </p>
              </div>
            </div>
          </div>
        )}

        {!isFetching && result?.success && (
          <div className="space-y-4">
            {posts.map((post: PostWithAuthor) => (
              <PostRow
                key={post._id}
                post={post}
                isOpen={expandedPostId === post._id}
                onToggle={() => handleToggle(post._id!)}
              />
            ))}

            {posts.length === 0 && (
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  No Group-Friendly Posts
                </h3>
                <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                  Add some group accommodations to your wishlist to find
                  potential roommate matches and start building your perfect
                  living situation.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
