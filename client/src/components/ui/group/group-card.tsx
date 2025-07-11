'use client';
import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card';
import { Button } from '@/components/ui/button';

import { Users, FileText, ArrowRight, MessageCircle } from 'lucide-react';
import { Group } from '@/lib/types/group.types';
import { ContractStatus } from '@/lib/types/contract.types';

interface GroupCardProps {
  group: Group;
  userId: string;
}

const getContractStatusColor = (status: string) => {
  switch (status) {
    case ContractStatus.PENDING:
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case ContractStatus.COMPLETED:
      return 'bg-green-100 text-green-800 border-green-200';
    case ContractStatus.TERMINATED:
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getContractStatusText = (status: string) => {
  switch (status) {
    case ContractStatus.PENDING:
      return 'Pending';
    case ContractStatus.COMPLETED:
      return 'Completed';
    case ContractStatus.TERMINATED:
      return 'Terminated';
    default:
      return 'No Contract';
  }
};

export default function GroupCard({ group, userId }: GroupCardProps) {
  const memberCount = group.members?.length || 0;
  const latestContract = group.contracts?.[0]; // Get the most recent contract
  const contractStatus = latestContract?.status || 'none';

  // Get sublessor and sublessees from contract if available
  const sublessor = latestContract?.sublessor;
  const sublessees = latestContract?.sublessees || [];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 w-full ">
      <CardHeader className="pb-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
              {group.name || 'Unnamed Group'}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{memberCount} members</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full border ${getContractStatusColor(contractStatus)}`}
            >
              {getContractStatusText(contractStatus)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Contract Parties Information */}
        {latestContract && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Contract Parties</h4>
            <div className="grid grid-cols-1 gap-4">
              {/* Sublessor */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">
                  Sublessor
                </h5>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-medium">
                      {typeof sublessor === 'object' && sublessor?.firstName
                        ? sublessor.firstName.charAt(0)
                        : typeof sublessor === 'string'
                          ? sublessor.charAt(0)
                          : 'U'}
                    </span>
                  </div>
                  <span className="text-sm text-gray-900 font-medium">
                    {typeof sublessor === 'object' && sublessor?.firstName
                      ? `${sublessor.firstName} ${sublessor.lastName || ''}`
                      : typeof sublessor === 'string'
                        ? sublessor
                        : 'Unknown'}
                  </span>
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    Sublessor
                  </span>
                </div>
              </div>

              {/* Sublessees */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">
                  Sublessees
                </h5>
                <div className="space-y-2">
                  {sublessees.length > 0 ? (
                    sublessees.map((sublessee, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border"
                      >
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-xs font-medium">
                            {typeof sublessee === 'object' &&
                            sublessee?.firstName
                              ? sublessee.firstName.charAt(0)
                              : typeof sublessee === 'string'
                                ? sublessee.charAt(0)
                                : 'U'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-900">
                          {typeof sublessee === 'object' && sublessee?.firstName
                            ? `${sublessee.firstName} ${sublessee.lastName || ''}`
                            : typeof sublessee === 'string'
                              ? sublessee
                              : 'Unknown'}
                        </span>
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          Sublessee
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">
                      No sublessees assigned
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Group Members (if no contract) */}
        {!latestContract && group.members && group.members.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Group Members</h4>
            <div className="space-y-4">
              {/* Sublessor */}
              {group.members.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    Sublessor
                  </h5>
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-medium">
                        {group.members[0].firstName?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-900 font-medium">
                      {group.members[0].firstName} {group.members[0].lastName}
                    </span>
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      Sublessor
                    </span>
                  </div>
                </div>
              )}

              {/* Sublessees */}
              {group.members.length > 1 && (
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    Sublessees
                  </h5>
                  <div className="space-y-2">
                    {group.members.slice(1).map((member, index) => (
                      <div
                        key={member._id || index}
                        className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border"
                      >
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-xs font-medium">
                            {member.firstName?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-900">
                          {member.firstName} {member.lastName}
                        </span>
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          Sublessee
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Link href={`/chat`} className="flex-1">
            <Button
              className="w-full bg-orange-50 text-orange-700 hover:bg-orange-100 border-none shadow-none"
              variant="outline"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
          </Link>

          {group.post && (
            <Link
              href={`/posts/${group.post._id || group.post}`}
              className="flex-1"
            >
              <Button
                className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 border-none shadow-none"
                variant="outline"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                View Post
              </Button>
            </Link>
          )}
        </div>

        {/* Contract Actions */}
        {latestContract && (
          <div className="pt-2 border-t border-gray-100 space-y-2">
            {/* Only show "View Contract" if contract is not completed */}
            {latestContract.status !== ContractStatus.COMPLETED && (
              <Link href={`/dashboard/${userId}/groups/${group._id}/contract`}>
                <Button
                  className="w-full text-sm bg-green-50 text-green-700 hover:bg-green-100 border-none shadow-none"
                  variant="ghost"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Contract
                </Button>
              </Link>
            )}

            {/* Show "View Final Contract" for completed contracts */}
            {latestContract.status === ContractStatus.COMPLETED && (
              <Link
                href={`/dashboard/${userId}/groups/final-contract?contractId=${latestContract._id}&groupId=${group._id}`}
              >
                <Button
                  className="w-full text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 border-none shadow-none"
                  variant="ghost"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Final Contract
                </Button>
              </Link>
            )}
          </div>
        )}

        {/* Create Contract Action */}
        {!latestContract && group.post && (
          <div className="pt-2 border-t border-gray-100">
            <Link
              href={`/dashboard/${userId}/groups/${group._id}/contract/edit`}
            >
              <Button
                className="w-full text-sm bg-green-50 text-green-700 hover:bg-green-100 border-none shadow-none"
                variant="ghost"
              >
                <FileText className="w-4 h-4 mr-2" />
                Create Contract
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
