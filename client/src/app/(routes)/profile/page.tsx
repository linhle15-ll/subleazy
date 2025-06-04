// personal page
'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import profilePicture from '@/public/bannerImg.jpg'; // Adjust the path as necessary
import { Album } from 'lucide-react';
import PostingGrid from '@/components/ui/posting/posting-grid';

type Post = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
  isFavorite: boolean;
};

export default function ProfilePage() {
    const user = {
        firstName: 'John',
        lastName: 'Doe',
        profilePicture: '@/public/bannerImg.jpg', // Adjust the path as necessary
        institution: 'Havard University',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    }

    const userPosts = [
    {
      id: '1',
      title: 'Cozy 1 Bedroom Apartment',
      description: 'A cozy one-bedroom apartment in the heart of the city.',
      price: 1200,
      location: 'New York, NY',
      imageUrl: '/images/apartment1.jpg',
      isFavorite: false,
    },
    {
      id: '2',
      title: 'Spacious Studio in Downtown',
      description: 'A spacious studio with modern amenities and great views.',
      price: 1500,
      location: 'San Francisco, CA',
      imageUrl: '/images/studio1.jpg',
      isFavorite: false,
    },
    {
      id: '3',
      title: 'Charming House in Suburbs',
      description: 'A charming house with a large backyard and quiet neighborhood.',
      price: 2000,
      location: 'Austin, TX',
      imageUrl: '/images/house1.jpg',
      isFavorite: false,
    },
    {
      id: '3',
      title: 'Charming House in Suburbs',
      description: 'A charming house with a large backyard and quiet neighborhood.',
      price: 2000,
      location: 'Austin, TX',
      imageUrl: '/images/house1.jpg',
      isFavorite: false,
    },
    {
      id: '3',
      title: 'Charming House in Suburbs',
      description: 'A charming house with a large backyard and quiet neighborhood.',
      price: 2000,
      location: 'Austin, TX',
      imageUrl: '/images/house1.jpg',
      isFavorite: false,
    },
    {
      id: '3',
      title: 'Charming House in Suburbs',
      description: 'A charming house with a large backyard and quiet neighborhood.',
      price: 2000,
      location: 'Austin, TX',
      imageUrl: '/images/house1.jpg',
      isFavorite: false,
    },
    {
      id: '3',
      title: 'Charming House in Suburbs',
      description: 'A charming house with a large backyard and quiet neighborhood.',
      price: 2000,
      location: 'Austin, TX',
      imageUrl: '/images/house1.jpg',
      isFavorite: false,
    }
  ]

  const [posts, setPosts] = useState<Post[]>(userPosts)

    return (
        <div className="flex flex-col items-start justify-center py-5">
            {/* Profile section */}
            <div className="w-full flex flex-row items-center justify-center gap-5 px-30 pb-12">
                <Image 
                    src={profilePicture}
                    alt="Profile Picture"
                    width={150}
                    height={150}
                    className="rounded-full"
                />

                <div className='flex flex-col items-start'>
                    <div className="text-2xl font-medium">{user.firstName} {user.lastName}</div>
                    <div className='pb-2'> Student at <span className='font-medium'> {user.institution} </span> </div>
                    <div>{user.bio}</div>
                </div>

                {/* buttons */}
                <div className='flex flex-row gap-3'>
                    {
                        
                        <div>
                            <button className='btn-primary'>View Wishlist</button>
                            <button className='btn-secondary'>Edit Profile</button>
                        </div>
                    }
                    
                </div>
            </div>
            {/* Post section */}
            <div className='px-12'>
                <div className='flex flex-row gap-3 font-medium text-xl '> <Album className='text-primaryOrange'/> {user.firstName}'s places for sublease</div>
                <div> 
                    {/* This is where you would map through the user's posts and display them */}
                    <div className='px-6 pt-5 lg:px-12'>
                        {userPosts.length > 0 ? (
                            <PostingGrid
                                    posts={userPosts}
                                    isVertical={true}
                                    onViewDetails={(id: string) => {
                                    // TODO: Implement view details navigation
                                    }}
                                    onToggleFavorite={(id: string) => {
                                        setPosts(
                                            userPosts.map((post) =>
                                            post.id === id
                                                ? { ...post, isFavorite: !post.isFavorite }
                                                : post
                                            )
                                        );
                                    }}
                                />
                        ) : (
                            <div className='pt-12 items-start text-gray-500 text-xl'>No posts available</div>
                        )}
                    </div>
                </div>
                    
            </div>
        </div>
    )
}