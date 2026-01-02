'use client';
import NextLink from 'next/link';
import { useMatches } from '@/hooks/use-matches';
import Image from 'next/image';
import type { MatchResults } from '@/services/wish.services';
import { useRouter } from 'next/navigation';
import { UserPlus, Eye, Heart, Star } from 'lucide-react';

export default function MatchesList({ postId }: { postId: string }) {
  const { result, isFetching } = useMatches(postId);
  console.log("UseMatch: ", result)

  const router = useRouter();
  const matches = result?.data;


  if (isFetching || !result) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-5 border border-gray-200 rounded-xl animate-pulse"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              <div className="h-9 bg-gray-200 rounded-full w-24"></div>
              <div className="h-9 bg-gray-200 rounded-full w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <Heart className="h-8 w-8 text-gray-400" />
        </div>
        <h4 className="text-lg font-semibold text-gray-900 mb-2">
          No matches found
        </h4>
        <p className="text-gray-600 max-w-sm mx-auto">
          Try updating your lifestyle preferences to find compatible roommates
          for this listing.
        </p>
      </div>
    );
  }

  const getMatchStyles = (percent: number | null) => {
    if (percent === null) return 'bg-gray-100 text-gray-700 border-gray-200';
    if (percent >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (percent >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="space-y-4">
      {matches.map(({ user, matchPercent }: MatchResults) => (
        <div
          key={user._id}
          className="group relative bg-gradient-to-r from-orange-50 via-white to-orange-50 border-2 border-orange-200 rounded-2xl p-5 hover:shadow-lg hover:border-orange-300 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-white shadow-md">
                  <Image
                    src={user.profileImage || '/placeholder-image-person.webp'}
                    alt={`${user.firstName}'s profile image`}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-gray-900 text-lg truncate">
                  {user.firstName} {user.lastName}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600 font-medium">
                    Available roommate
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div
                className={`px-4 py-2 rounded-full border font-bold text-sm ${getMatchStyles(matchPercent)}`}
              >
                {matchPercent !== null
                  ? `${matchPercent}% Match`
                  : 'Not Compatible'}
              </div>

              <div className="flex gap-2">
                {/* <button 
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  onClick={() => {
                    // You need to pass the groupId from props or get it from somewhere
                    const groupId = 1223;
                    addToGroup(user._id, user.);
                  }}
                >
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add to Group</span>
                </button> */}
                
                <NextLink
                  href={`/dashboard/${user._id}`}
                  className="inline-flex items-center gap-2 bg-white border-2 border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400 font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </NextLink>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
