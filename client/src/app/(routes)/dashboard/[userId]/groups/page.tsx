'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { DashboardMenu } from '@/components/ui/navigation-menu/dashboard-menu';
import { useUserStore } from '@/stores/user.store';
import PotentialMatches from './matches/potential-matches';

export default function GroupsPage() {
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

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="pb-8 border-b border-gray-200 mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
              View your <span className="text-primaryOrange">Groups</span>
            </h1>
            <p className="mt-2 text-lg text-gray-500">
              View your current matching groups, track progress, and find
              potential matches to team up with.
            </p>
          </div>

          {/* Sections Wrapper */}
          <div className="grid grid-cols-1 gap-12">
            {/* Your Groups Section */}
            <section aria-labelledby="your-groups-heading">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2
                  id="your-groups-heading"
                  className="text-2xl font-semibold text-gray-900 mb-2"
                >
                  Your Groups
                </h2>
                <p className="text-gray-600 mb-6">
                  Here are the groups you’re currently part of. Stay in, leave,
                  or move forward to sign together.
                </p>
                {/* TODO: Get groups by userId and render them here */}
                <div className="text-center text-gray-500 py-8">
                  <p>You are not part of any groups yet.</p>
                </div>
              </div>
            </section>

            {/* Potential Matches Section */}
            <section aria-labelledby="potential-matches-heading">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2
                  id="potential-matches-heading"
                  className="text-2xl font-semibold text-gray-900 mb-2"
                >
                  Potential Matches
                </h2>
                <p className="text-gray-600 mb-6">
                  These are potential matches for you to team up with. Review
                  their profiles and consider sending a request to connect.
                </p>
                <div className="w-full">
                  <PotentialMatches />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
