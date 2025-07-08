'use client';

import ChatHeader from '@/components/ui/chat/chat-header';
import ChatSidebar from '@/components/ui/chat/chat-sidebar';
import MessageInput from '@/components/ui/chat/message-input';
import MessageList from '@/components/ui/chat/message-list';
import Loading from '@/components/ui/commons/loading';
import { useGroups } from '@/hooks/use-groups';
import { Group } from '@/lib/types/group.types';
import { Message } from '@/lib/types/message.types';
import { cn } from '@/lib/utils/cn';
import { useUserStore } from '@/stores/user.store';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import messageService from '@/services/message.service';

export default function ChatPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeGroup, setActiveGroup] = useState<Group>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const currentUser = useUserStore((state) => state.user);
  const { result, isFetching } = useGroups(currentUser?._id);

  useEffect(() => {
    if (isFetching || !result) return;
    if (result.success) setGroups(result.data!);
  }, [result]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      withCredentials: true,
    });

    socket.on('connect', () => console.log('connected ' + socket.id));

    socket.on('disconnect', () => console.log('disconnected'));
  }, []);

  const handleGroupSelect = async (group: Group) => {
    setActiveGroup(group);
    setLoading(true);
    try {
      const result = await messageService.getMessages(group._id!);
      if (result.success) {
        setMessages(result.data!.messages);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex p-8 gap-4">
      <div
        className={cn(
          'chat-outer-border flex flex-col w-1/3 h-full',
          (isFetching || !result) && 'items-center justify-center'
        )}
      >
        {isFetching || !result ? (
          <div className="w-full">
            <Loading />
          </div>
        ) : (
          <ChatSidebar
            groups={groups}
            activeGroupId={activeGroup?._id}
            onSelect={handleGroupSelect}
          />
        )}
      </div>
      <div
        className={cn(
          'chat-outer-border flex flex-col justify-between w-2/3 h-full gap-4',
          (isFetching || !result || loading) && 'items-center justify-center'
        )}
      >
        {isFetching || !result || loading ? (
          <div className="w-full">
            <Loading />
          </div>
        ) : !activeGroup ? (
          <div className="screen-message h-full">No chat selected</div>
        ) : (
          <>
            <ChatHeader groupName={activeGroup.name} />
            <MessageList messages={messages} />
            <MessageInput groupId={activeGroup._id!} />
          </>
        )}
      </div>
    </div>
  );
}
