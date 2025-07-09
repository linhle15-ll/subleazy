import { Group } from '@/lib/types/group.types';
import { User } from '@/lib/types/user.types';
import { SquarePen } from 'lucide-react';

export default function ChatSidebar({
  groups,
  userMaps,
  activeGroupId,
  onSelect,
}: {
  groups: Group[];
  userMaps: Map<string, Map<string, User>>;
  activeGroupId?: string;
  onSelect: (group: Group) => void;
}) {
  return (
    <>
      <div className="flex justify-between items-center p-2">
        <div className="text-2xl font-semibold">Chats</div>
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          title={'New group'}
          aria-label={'New group'}
        >
          <SquarePen className={`w-6 h-6`} />
        </button>
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto">
        {groups.length > 0 ? (
          groups.map((group) => {
            const groupId = group._id!;
            const groupName = group.name;
            const sender =
              typeof group.lastMessage?.sender === 'string'
                ? userMaps.get(groupId)?.get(group.lastMessage?.sender)
                : group.lastMessage?.sender;
            return (
              // TODO: add unread status
              <div
                key={groupId}
                title={groupName}
                className={`flex flex-col gap-1 justify-center p-2 rounded-lg min-h-20 h-20 cursor-pointer ${activeGroupId === groupId ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                onClick={() => onSelect(group)}
              >
                <div className="font-medium truncate">{groupName}</div>
                {group.lastMessage && (
                  <div className="text-gray-500 truncate">{`${sender?.firstName}: ${group.lastMessage.content}`}</div>
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
