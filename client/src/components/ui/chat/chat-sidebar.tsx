import { Group } from '@/lib/types/group.types';
import { SquarePen } from 'lucide-react';

export default function ChatSidebar({
  groups,
  activeGroupId,
  onSelect,
}: {
  groups: Group[];
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
        {groups.map((group) => (
          <div
            key={group._id}
            className={`flex flex-col gap-1 justify-center p-2 rounded-lg min-h-20 h-20 cursor-pointer ${activeGroupId === group._id ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            onClick={() => onSelect(group)}
          >
            <div className="font-medium truncate">{group.name}</div>
            {group.lastMessage && (
              <div className="text-gray-500 truncate">{`${group.members.find((m) => m._id === group.lastMessage!.sender)?.firstName}: ${group.lastMessage.content}`}</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
