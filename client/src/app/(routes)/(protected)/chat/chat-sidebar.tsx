import { Group } from '@/lib/types/group.types';
import { User } from '@/lib/types/user.types';
import { useUserStore } from '@/stores/user.store';
import GroupCreateDialog from './group-create-dialog';

export default function ChatSidebar({
  groups,
  userMaps,
  activeGroup,
  onSelect,
}: {
  groups: Group[];
  userMaps: Record<string, Record<string, User>>;
  activeGroup?: Group;
  onSelect: (group: Group) => void;
}) {
  const currentUser = useUserStore((state) => state.user);

  return (
    <>
      <div className="flex justify-between items-center p-2">
        <div className="text-2xl font-semibold">Chats</div>
        <GroupCreateDialog />
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto">
        {groups.length > 0 ? (
          groups.map((group) => {
            const groupId = group._id!;
            const groupName = group.name;
            const isSystem = group.lastMessage && !group.lastMessage.sender;
            const sender =
              typeof group.lastMessage?.sender === 'string'
                ? userMaps[groupId][group.lastMessage?.sender]
                : group.lastMessage?.sender;
            const userLastRead = new Date(
              group.lastRead ? group.lastRead[currentUser!._id!] : '2021-11-16'
            ).toISOString();
            const updatedAt = new Date(group.updatedAt!).toISOString();
            const lastMessage = new Date(
              group.lastMessage?.createdAt
                ? group.lastMessage?.createdAt
                : group.updatedAt!
            ).toISOString();
            const isUnread =
              lastMessage > userLastRead || updatedAt > userLastRead;
            return (
              <div
                key={groupId}
                title={groupName}
                className={`flex items-center justify-between gap-2 p-2 rounded-lg min-h-20 h-20 cursor-pointer ${activeGroup?._id === groupId ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                onClick={() => onSelect(group)}
              >
                <div
                  className={`flex flex-col gap-1 justify-center ${isUnread ? 'max-w-[90%]' : 'max-w-full'}`}
                >
                  <div
                    className={`${isUnread ? 'font-semibold' : 'font-medium'} truncate`}
                  >
                    {groupName}
                  </div>
                  {group.lastMessage && (
                    <div
                      className={`text-xs text-gray-500 truncate ${isUnread && 'font-medium'}`}
                    >
                      {isSystem
                        ? group.lastMessage.content
                        : `${sender?.firstName || 'Left user'}: ${group.lastMessage.content}`}
                    </div>
                  )}
                </div>
                {isUnread && (
                  <span className="rounded-full w-3 h-3 bg-blue-400"></span>
                )}
              </div>
            );
          })
        ) : (
          <div className="screen-message h-full">No groups found</div>
        )}
      </div>
    </>
  );
}
