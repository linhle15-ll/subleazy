'use client';

import ChatInfo from './chat-info';
import ChatHeader from './chat-header';
import ChatSidebar from './chat-sidebar';
import MessageInput from './message-input';
import MessageList from './message-list';
import Loading from '@/components/ui/commons/loading';
import { useGroups } from '@/hooks/use-groups';
import { Group } from '@/lib/types/group.types';
import { Message } from '@/lib/types/message.types';
import { cn } from '@/lib/utils/cn';
import { useUserStore } from '@/stores/user.store';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { User } from '@/lib/types/user.types';
import messageService from '@/services/message.service';

export default function ChatPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeGroup, setActiveGroup] = useState<Group>();
  const [userMaps, setUserMaps] = useState<
    Record<string, Record<string, User>>
  >({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [infoShown, setInfoShown] = useState(false);
  const currentUser = useUserStore((state) => state.user);
  const { result, isFetching } = useGroups(currentUser?._id);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isFetching || !result) return;
    if (result.success) {
      const groups = result.data!;
      setGroups(groups);
      for (const group of groups) {
        const userMap: Record<string, User> = {};
        for (const user of group.members) {
          userMap[user._id!] = user;
        }
        setUserMaps((prev) => ({
          ...prev,
          [group._id!]: userMap,
        }));
      }
    }
  }, [result]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log(`user ${currentUser?._id} connected - ${socket.id}`);
      socket.emit('join-chat', currentUser?._id);
    });

    socket.on('disconnect', () => console.log('disconnected'));

    socket.on('new-message', (message: Message) => {
      const groupId = message.group as string;

      if (activeGroup?._id === groupId)
        setMessages((prev) => [message, ...prev]);

      setGroups((prev) => {
        const group = prev.find((group) => group._id === groupId);
        if (!group) return prev;

        group.lastMessage = message;
        if (activeGroup?._id === groupId) {
          group.lastRead[currentUser!._id!] = new Date();
          socket.emit('mark-read', groupId, currentUser?._id);
        }
        return [group, ...prev.filter((g) => g._id !== groupId)];
      });
    });

    socket.on('member-left', (groupId: string, userId: string) => {
      const group = groups.find((group) => group._id === groupId);
      if (!group || group.isDM) return;

      if (currentUser?._id === userId) {
        setGroups((prev) => prev.filter((group) => group._id !== groupId));
        if (activeGroup?._id === groupId) {
          setActiveGroup(undefined);
          setInfoShown(false);
        }
        socket.emit('leave-group', groupId);
        return;
      }

      const members = group.members.filter((user) => user._id !== userId);
      group.members = members;
      setGroups((prev) => prev.map((g) => (g._id === groupId ? group : g)));
      if (activeGroup?._id === groupId) setActiveGroup(group);
    });

    socket.on('members-added', (groupId: string, users: User[]) => {
      const group = groups.find((group) => group._id === groupId);
      if (!group || group.isDM) return;

      if (activeGroup?._id === groupId) setActiveGroup(group);

      group.members = [...group.members, ...users];
      setGroups((prev) => prev.map((g) => (g._id === groupId ? group : g)));
      setUserMaps((prev) => ({
        ...prev,
        [groupId]: {
          ...prev[groupId],
          ...users.reduce((acc, user) => ({ ...acc, [user._id!]: user }), {}),
        },
      }));
    });

    socket.on('new-group', (group: Group) => {
      setUserMaps((prev) => ({
        ...prev,
        [group._id!]: group.members.reduce(
          (acc, user) => ({ ...acc, [user._id!]: user }),
          {}
        ),
      }));
      setGroups((prev) => [group, ...prev]);
      socket.emit('join-group', group._id);
    });

    return () => {
      socket.disconnect();
    };
  }, [activeGroup?._id]);

  const handleGroupSelect = async (group: Group) => {
    setActiveGroup(group);
    setGroups((prev) =>
      prev.map((g) =>
        g._id === group._id
          ? {
              ...g,
              lastRead: { ...g.lastRead, [currentUser!._id!]: new Date() },
            }
          : g
      )
    );
    setLoading(true);
    try {
      const result = await messageService.getMessages(group._id!);
      if (result.success) setMessages(result.data!.messages);
    } finally {
      setLoading(false);
    }
  };

  const handleShowInfo = () => setInfoShown((prev) => !prev);

  return (
    <div className="h-screen flex p-8 gap-4" ref={bottomRef}>
      <div
        className={cn(
          'chat-outer-border flex flex-col h-full',
          (isFetching || !result) && 'items-center justify-center',
          infoShown ? 'w-1/4' : 'w-1/3'
        )}
      >
        {isFetching || !result ? (
          <div className="w-full">
            <Loading />
          </div>
        ) : (
          <ChatSidebar
            groups={groups}
            userMaps={userMaps}
            activeGroup={activeGroup}
            onSelect={handleGroupSelect}
          />
        )}
      </div>
      <div
        className={cn(
          'chat-outer-border flex flex-col justify-between h-full gap-4',
          (isFetching || !result || loading) && 'items-center justify-center',
          infoShown ? 'w-1/2' : 'w-2/3'
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
            <ChatHeader groupName={activeGroup.name} onClick={handleShowInfo} />
            <MessageList
              messages={messages}
              userMap={userMaps[activeGroup._id!]}
            />
            <MessageInput group={activeGroup} />
          </>
        )}
      </div>
      {infoShown && activeGroup && (
        <ChatInfo
          group={activeGroup}
          user={userMaps[activeGroup._id!][currentUser!._id!]}
        />
      )}
    </div>
  );
}
