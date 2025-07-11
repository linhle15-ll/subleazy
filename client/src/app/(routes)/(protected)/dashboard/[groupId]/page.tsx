'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { DashboardMenu } from '@/components/ui/navigation-menu/dashboard-menu';
import { useUserStore } from '@/stores/user.store';

export default function WishlistPage() {
  const { userId } = useParams<{ userId: string }>();
  const currentUser = useUserStore((state) => state.user);
  const isOwner = currentUser?._id === userId;

  return (
    <div className="flex">
      {isOwner && (
        <div className="pt-11 h-full">
          <DashboardMenu />
        </div>
      )}

      <div className="mt-12 w-full px-15">
        <div className="flex justify-between items-center mb-6">
          <div className="text-3xl font-semibold mb-6">
            View your <span className="text-primaryOrange"> group BLAHHH </span>
          </div>
        </div>
      </div>
    </div>
  );
}
