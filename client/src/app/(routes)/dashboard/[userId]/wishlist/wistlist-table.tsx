'use client';
import React, { useState } from 'react';
import {
  MapPin,
  DollarSign,
  Eye,
  Home,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { PostRequestBody } from '@/lib/types/post.types';
import { postData } from '@/lib/utils/post-data';

// Helper component to render sections in the details view, reducing repetitive code.
const DetailSection = ({ title, items }: { title: string; items: { icon: React.ElementType; label: string }[] }) => {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h4 className="font-semibold mb-2 text-gray-800">{title}</h4>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3 text-gray-600">
            <item.icon className="w-5 h-5 text-primaryOrange flex-shrink-0" />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function WishlistTable({ posts }: { posts: PostRequestBody[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr className="text-gray-700">
            <th className="py-3 px-4 text-left font-medium">
              <Home className="inline w-4 h-4 mr-2" />
              Title
            </th>
            <th className="py-3 px-4 text-left font-medium">
              <MapPin className="inline w-4 h-4 mr-2" />
              Location
            </th>
            <th className="py-3 px-4 text-left font-medium">
              <DollarSign className="inline w-4 h-4 mr-2" />
              Price
            </th>
            <th className="py-3 px-4 text-left font-medium">Type</th>
            <th className="py-3 px-4 text-left font-medium">Action</th>
            <th className="py-3 px-4 text-left font-medium">Details</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            // Use the postData utility to process the post object
            const processedPost = postData(post);

            return (
              <React.Fragment key={post._id}>
                <tr className="border-t hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4 font-medium">{processedPost.title}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {post.city}, {post.state} {processedPost.zip}
                  </td>
                  <td className="py-3 px-4 text-gray-600">${processedPost.price}/month</td>
                  <td className="py-3 px-4 text-gray-600">
                    {post.houseInfo?.houseType || 'N/A'}
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={`/posts/${post._id}`}
                      className="inline-flex items-center gap-1 text-primaryOrange hover:underline"
                    >
                      <Eye className="w-4 h-4" /> View
                    </a>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="text-primaryOrange flex items-center gap-1"
                      onClick={() =>
                        setExpanded(expanded === post._id ? null : (post._id ?? null))
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
                </tr>
                {expanded === post._id && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="px-6 py-5">
                      {/* New 2-column grid layout for a cleaner look */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {/* Left Column */}
                        <div className="space-y-5">
                          <div>
                            <h4 className="font-semibold mb-2 text-gray-800">Description</h4>
                            <p className="text-gray-600 text-sm">
                              {post.description || 'No description provided.'}
                            </p>
                          </div>
                          <DetailSection title="Amenities" items={processedPost.amenities} />
                          <DetailSection title="Conveniences" items={processedPost.convenience} />

                          <div>
                            <h4 className="font-semibold mb-2 text-gray-800">Images</h4>
                            <div className="flex gap-2 flex-wrap">
                              {post.media?.length > 0 ? (
                                post.media.map((img: string, idx: number) => (
                                  <img
                                    key={idx}
                                    src={img}
                                    alt={`Post image ${idx + 1}`}
                                    className="w-28 h-24 object-cover rounded-md border"
                                  />
                                ))
                              ) : (
                                <span className="text-gray-500 text-sm">No images available</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-5">
                          <DetailSection title="Room Information" items={processedPost.roomInfo} />
                          <DetailSection title="House Rules" items={processedPost.rules} />
                        
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}