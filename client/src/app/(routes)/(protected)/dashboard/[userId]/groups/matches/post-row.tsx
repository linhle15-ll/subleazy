'use client';

import Image from 'next/image';
import MatchesList from './match-list';
import { ChevronDown, MapPin, Users, DollarSign, Home } from 'lucide-react';
import type { Post } from '@/lib/types/post.types';

export type PostWithAuthor = Post & {
  author?: {
    _id: string;
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
};

export default function PostRow({
  post,
  isOpen,
  onToggle,
}: {
  post: PostWithAuthor;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const pricePerPerson = post.price
    ? (post.price / post.bedroomInfo.maxGuests).toFixed(0)
    : '0';

  return (
    <div className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300 bg-white">
      <div
        className="flex items-center p-6 cursor-pointer hover:bg-gradient-to-r hover:from-gray-50 hover:to-orange-50 transition-all duration-200"
        onClick={onToggle}
      >
        <div className="relative mr-6 flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-sm group-hover:shadow-md transition-shadow duration-200">
            <Image
              src={post.media?.[0] || '/placeholder.jpg'}
              alt={post.title}
              width={80}
              height={80}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            <Home className="h-3 w-3" />
          </div>
        </div>

        <div className="flex-1 min-w-0 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-4">
            <h3 className="font-bold text-gray-900 text-lg truncate mb-2">
              {post.title}
            </h3>
            <div className="flex items-center text-gray-600 mb-1">
              <MapPin className="h-4 w-4 mr-2 text-orange-500" />
              <span className="font-medium">
                {post.city}, {post.state}
              </span>
            </div>
          </div>

          <div className="lg:col-span-3 hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-base">
                  {post.author?.firstName?.charAt(0) || 'N'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {post.author?.firstName ?? 'N/A'}
                </p>
                <p className="text-sm text-gray-600">Host</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 hidden lg:block">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-full font-semibold text-sm">
              <Users className="h-4 w-4" />
              {post.bedroomInfo.maxGuests} guests
            </div>
          </div>

          <div className="lg:col-span-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-2 rounded-full font-bold">
                <DollarSign className="h-4 w-4" />
                <span>${pricePerPerson}</span>
              </div>
              <span className="text-sm text-gray-600 font-medium ml-1">
                /person
              </span>
            </div>

            <div className="ml-4 p-2 rounded-full hover:bg-orange-100 transition-colors duration-200">
              <ChevronDown
                className={`h-6 w-6 text-orange-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </div>
        </div>
      </div>

      {isOpen && post._id && (
        <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-orange-50 p-6">
          <div className="mb-6">
            <h4 className="font-bold text-gray-900 text-lg mb-2 flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-500" />
              Compatible Roommates
            </h4>
            <p className="text-gray-600">
              Complete your lifestyle profile to unlock match percentages and
              find the best fit.
            </p>
          </div>
          <MatchesList postId={post._id} />
        </div>
      )}
    </div>
  );
}
