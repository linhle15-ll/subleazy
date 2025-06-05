// personal page
'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import postService from '@/services/post.service';
import userService from '@/services/user.service';
import { User } from '@/lib/types/user.types';
import { Post } from '@/lib/types/post.types';
import { Album } from 'lucide-react';
import { PostingGrid } from '@/components/ui/posting/posting-grid';

export default function ProfilePage() {
    // const { userId } = useParams<{ userId: string }>();
    const userId = "682cefca27db55d55c680bcb"
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) return;
        const fetchUser = async () => {
            const res = await userService.getUserById(userId);
            if (res.success) {
                setUser(res.data);
                setError(null);
            } else {
                setUser(undefined);
                setError(res.error || 'Failed to fetch user');
            }
        };
        fetchUser();
    }, [userId]);

    return (
        <div className="flex flex-col items-start justify-center py-5">
            {error ? (
                <div className="text-red-500">{error}</div>
            ) : user ? (
                <div>
                    <h2>{user.firstName}</h2>
                    <p>{user.email}</p>
                    {/* Add more user fields as needed */}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}