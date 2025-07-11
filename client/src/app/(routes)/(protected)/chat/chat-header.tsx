import { Group } from '@/lib/types/group.types';
import { Menu } from 'lucide-react';
import GroupRenameDialog from './group-rename-dialog';
import { User } from '@/lib/types/user.types';

export default function ChatHeader({
  group,
  user,
  onClick,
}: {
  group: Group;
  user: User;
  onClick: () => void;
}) {
  return (
    <div className="flex justify-between gap-2 items-center p-2">
      <div className="flex gap-2 items-center">
        <div title={group.name} className="text-2xl font-medium truncate">
          {group.name}
        </div>
        {!group.isDM && <GroupRenameDialog groupId={group._id!} user={user} />}
      </div>
      <button
        onClick={onClick}
        className="p-2 rounded-full hover:bg-gray-100"
        title={'More information'}
        aria-label={'More information'}
      >
        <Menu className={`w-6 h-6`} />
      </button>
    </div>
  );
}
