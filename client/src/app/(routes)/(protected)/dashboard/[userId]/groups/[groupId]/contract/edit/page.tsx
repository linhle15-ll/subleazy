'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDocumentData } from '@/stores/editor.store';
import Editor from '@/components/editor/editor';
import { useGroupMembers, usePostIdByGroupId } from '@/hooks/use-groups';
import contractService from '@/services/contract.service';

export default function ContractEditPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const { userId } = useParams<{ userId: string }>();
  const documentData = useDocumentData();
  const [contractCreated, setContractCreated] = React.useState(false);

  // get members of the group
  const { data: members } = useGroupMembers(groupId);
  const { data: postIdData } = usePostIdByGroupId(groupId);

  // Create contract when all data is loaded and members exist (only once)
  useEffect(() => {
    async function maybeCreateContract() {
      console.log('Contract creation useEffect triggered:', {
        contractCreated,
        groupId,
        membersCount: members?.length,
        postIdData: postIdData?.postId,
        members: members?.map((m) => ({
          id: m._id,
          name: `${m.firstName} ${m.lastName}`,
        })),
      });

      if (
        !contractCreated &&
        groupId &&
        members &&
        members.length > 1 &&
        postIdData?.postId
      ) {
        // 1. Check if contract already exists for this group
        const existing = await contractService.getContractByGroupId(groupId);
        if (existing.success && existing.data) {
          console.log(
            'Contract already exists for this group, skipping creation.'
          );
          return;
        }

        const sublessor = members[0]?._id;
        const sublessees = members.slice(1).map((m) => m._id);

        console.log('Contract creation data:', {
          sublessor,
          sublessees,
          postId: postIdData.postId,
          groupId,
        });

        if (!sublessor || !postIdData.postId || !groupId) {
          console.log('Missing required data for contract creation');
          return;
        }

        console.log('Creating contract...');
        setContractCreated(true);

        const contractData = {
          title: 'Contract',
          post: postIdData.postId,
          sublessor,
          sublessees: sublessees.filter(
            (id): id is string => typeof id === 'string'
          ),
          group: groupId,
          content: 'blank',
          sublessorSignature: '',
          sublesseesSignatures: sublessees
            .filter((id): id is string => typeof id === 'string')
            .map(() => ''), // Create empty string for each sublessee
        };

        console.log('Contract data to send:', contractData);

        contractService
          .createContract(contractData)
          .then((result) => {
            console.log('Contract creation result:', result);
            if (result.success) {
              console.log('Contract created successfully:', result.data);
            } else {
              console.error('Failed to create contract:', result.error);
              setContractCreated(false); // Reset if failed so it can retry
            }
          })
          .catch((error) => {
            console.error('Error creating contract:', error);
            setContractCreated(false); // Reset if failed so it can retry
          });
      } else {
        console.log('Contract creation conditions not met:', {
          contractCreated,
          hasGroupId: !!groupId,
          hasMembers: !!members,
          membersLength: members?.length,
          hasPostId: !!postIdData?.postId,
        });
      }
    }

    maybeCreateContract();
  }, [members, postIdData, postIdData?.postId]);

  return (
    <div className="sm:mx-auto items-center justify-center py-12 gap-10 lg:gap-16 max-w-7xl w-screen">
      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg w-full">
        <div className="flex items-center gap-2">
          <span className="text-green-600">📄</span>
          <span className="text-green-800 text-sm">
            Editing Sublease Aggreement
          </span>
        </div>
      </div>

      <Editor
        initialContent={documentData?.content}
        groupId={groupId}
        userId={userId}
      />
    </div>
  );
}
