import { Ellipsis } from 'lucide-react';

export default function ChatHeader({
  groupName,
  onClick,
}: {
  groupName: string;
  onClick: () => void;
}) {
  return (
    <div className="flex justify-between items-center p-2">
      <div title={groupName} className="text-2xl font-medium truncate">
        {groupName}
      </div>
      <button
        onClick={onClick}
        className="p-2 rounded-full hover:bg-gray-100"
        title={'More information'}
        aria-label={'More information'}
      >
        <Ellipsis className={`w-6 h-6`} />
      </button>
    </div>
  );
}
