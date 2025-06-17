'use client';
import React, { useState } from 'react';
import {
  MapPin,
  DollarSign,
  Eye,
  Home,
  ChevronDown,
  ChevronUp,
  Wifi,
  Utensils,
  Dog,
  Car,
  BedDouble,
  Bath,
  Star,
} from 'lucide-react';
import { PostRequestBody } from '@/lib/types/post.types';

export default function WishlistTable({ posts }: { posts: PostRequestBody[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [starredPosts, setStarredPosts] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleStar = (postId: string) => {
    setStarredPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="py-3 px-4 text-left">
              <Home className="inline w-5 h-5 mr-1" />
              Title
            </th>
            <th className="py-3 px-4 text-left">
              <MapPin className="inline w-5 h-5 mr-1" />
              Location
            </th>
            <th className="py-3 px-4 text-left">
              <DollarSign className="inline w-5 h-5 mr-1" />
              Price
            </th>
            <th className="py-3 px-4 text-left">Type</th>
            <th className="py-3 px-4 text-left">Action</th>
            <th className="py-3 px-4 text-left">Details</th>
            <th className="py-3 px-4 text-left">Favorite</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <React.Fragment key={post._id}>
              <tr key={post._id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{post.title}</td>
                <td className="py-3 px-4">
                  {post.city}, {post.state} {post.zip}
                </td>
                <td className="py-3 px-4">${post.price}/month</td>
                <td className="py-3 px-4">
                  {post.houseInfo?.houseType || 'N/A'}
                </td>
                <td className="py-3 px-4">
                  <a
                    href={`/posting?id=${post._id}`}
                    className="inline-flex items-center gap-1 text-primaryOrange hover:underline"
                  >
                    <Eye className="w-4 h-4" /> View
                  </a>
                </td>
                <td className="py-3 px-4">
                  <button
                    className="text-primaryOrange flex items-center"
                    onClick={() =>
                      setExpanded(
                        expanded === post._id ? null : (post._id ?? null)
                      )
                    }
                  >
                    {expanded === post._id ? (
                      <>
                        <ChevronUp className="w-4 h-4" /> Hide
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" /> Details
                      </>
                    )}
                  </button>
                </td>

                <td className="flex pt-3 items-center justify-center align-middle ">
                  <button onClick={() => post._id && toggleStar(post._id)}>
                    <Star
                      className={
                        starredPosts[post._id ?? '']
                          ? 'text-yellow-400'
                          : 'text-gray-400'
                      }
                      fill={
                        starredPosts[post._id ?? ''] ? 'currentColor' : 'none'
                      }
                      style={{ color: '#FFD700' }}
                    />
                  </button>
                </td>
              </tr>
              {expanded === post._id && (
                <tr>
                  <td colSpan={6} className="bg-gray-50 px-4 py-3">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <div className="font-semibold mb-1">Description:</div>
                        <div className="mb-2 text-gray-700">
                          {post.description || 'No description.'}
                        </div>
                        <div className="font-semibold mb-1">Amenities:</div>
                        <div className="flex flex-wrap gap-3 mb-2">
                          {post.amenities?.wifi && (
                            <span className="flex items-center gap-1">
                              <Wifi className="w-4 h-4" />
                              Wifi
                            </span>
                          )}
                          {post.amenities?.kitchen && (
                            <span className="flex items-center gap-1">
                              <Utensils className="w-4 h-4" />
                              Kitchen
                            </span>
                          )}
                          {post.amenities?.parking && (
                            <span className="flex items-center gap-1">
                              <Car className="w-4 h-4" />
                              Parking
                            </span>
                          )}
                          {post.amenities?.laundry && (
                            <span className="flex items-center gap-1">
                              <BedDouble className="w-4 h-4" />
                              Laundry
                            </span>
                          )}
                          {post.amenities?.airConditioning && (
                            <span className="flex items-center gap-1">
                              <Bath className="w-4 h-4" />
                              A/C
                            </span>
                          )}
                          {/* Add more amenities as needed */}
                        </div>
                        <div className="font-semibold mb-1">Rules:</div>
                        <div className="text-gray-700">
                          {post.rules?.noPet ? (
                            <span className="flex items-center gap-1">
                              <Dog className="w-4 h-4" />
                              No pets
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Dog className="w-4 h-4" />
                              Pets allowed
                            </span>
                          )}
                          {/* Add more rules as needed */}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold mb-1">Images:</div>
                        <div className="flex gap-2 flex-wrap">
                          {post.media?.length > 0 ? (
                            post.media.map((img: string, idx: number) => (
                              <img
                                key={idx}
                                src={img}
                                alt={`Post image ${idx + 1}`}
                                className="w-24 h-20 object-cover rounded border"
                              />
                            ))
                          ) : (
                            <span className="text-gray-400">No images</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
