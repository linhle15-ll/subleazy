'use client';

import ChatSidebar from '@/components/ui/chat/chat-sidebar';
import Loading from '@/components/ui/commons/loading';
import { useGroups } from '@/hooks/use-groups';
import { Group } from '@/lib/types/group.types';
import { useUserStore } from '@/stores/user.store';
import { useEffect, useState } from 'react';

export default function ChatPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeGroup, setActiveGroup] = useState<Group>();
  const currentUser = useUserStore((state) => state.user);
  const { result, isFetching } = useGroups(currentUser?._id);

  useEffect(() => {
    if (isFetching || !result) return;
    if (result.success) setGroups(result.data!);
  }, [result]);

  const handleGroupSelect = (group: Group) => {
    setActiveGroup(group);
  };

  return (
    <div className="h-screen flex p-8 gap-4">
      <div className="chat-outer-border flex flex-col w-1/3 h-full">
        {isFetching || !result ? (
          <div className="w-full">
            <Loading />
          </div>
        ) : groups.length === 0 ? (
          <div className="screen-message">No groups found</div>
        ) : (
          <ChatSidebar
            groups={groups}
            activeGroupId={activeGroup?._id}
            onSelect={handleGroupSelect}
          />
        )}
      </div>
      <div className="chat-outer-border flex flex-grow items-center justify-center h-full">
        {isFetching || !result ? (
          <div className="w-full">
            <Loading />
          </div>
        ) : !activeGroup ? (
          <div className="screen-message">No chat selected</div>
        ) : (
          <div className="screen-message">{activeGroup.name}</div>
        )}
      </div>
    </div>
  );
}
