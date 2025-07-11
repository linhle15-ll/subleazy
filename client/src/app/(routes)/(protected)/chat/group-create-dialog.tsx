import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/commons/dialog';
import { MessageCircleMore, SquarePen, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import UserSearch from './user-search';
import { User } from '@/lib/types/user.types';
import Link from 'next/link';
import { UserCard } from './chat-info';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/commons/select';
import groupService from '@/services/group.service';

export default function GroupCreateDialog() {
  const [data, setData] = useState<{
    name: string;
    isDM: boolean;
    members: User[];
  }>({
    name: '',
    isDM: true,
    members: [],
  });

  useEffect(() => {
    if (data.isDM && data.members.length > 1)
      setData((prev) => ({ ...prev, members: [prev.members[0]] }));
  }, [data]);

  const handleAddMember = (user: User) => {
    if (data.isDM) setData((prev) => ({ ...prev, members: [user] }));
    else setData((prev) => ({ ...prev, members: [...prev.members, user] }));
  };

  const handleRemoveMember = (user: User) => {
    setData((prev) => ({
      ...prev,
      members: prev.members.filter((u) => u._id !== user._id),
    }));
  };

  const handleSubmit = async () => {
    await groupService.createGroup(data);
    setData({ name: '', isDM: true, members: [] });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          title={'New group'}
          aria-label={'New group'}
        >
          <SquarePen className={`w-6 h-6`} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white border-none outline-none">
        <DialogHeader>
          <DialogTitle>Create group</DialogTitle>
          <DialogDescription>
            Create a group chat or direct message
          </DialogDescription>
        </DialogHeader>
        <Select
          onValueChange={(value) =>
            setData((prev) => ({ ...prev, isDM: value === 'dm' }))
          }
        >
          <SelectTrigger className="w-full p-2 border-2 border-gray-300 hover:bg-gray-100 rounded-xl outline-none">
            <SelectValue placeholder="Group type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem
              className="w-full cursor-pointer outline-none hover:bg-gray-100"
              value="dm"
            >
              Direct message
            </SelectItem>
            <SelectItem
              className="w-full cursor-pointer outline-none hover:bg-gray-100"
              value="group"
            >
              Group
            </SelectItem>
          </SelectContent>
        </Select>
        {!data.isDM && (
          <input
            value={data.name}
            onChange={(e) =>
              setData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="chat-input-field"
            placeholder="Group name"
          />
        )}
        <UserSearch onAdd={handleAddMember} className="chat-input-field" />
        {data.members.length > 0 &&
          data.members.map((user, idx) => (
            <Link
              key={idx}
              href={`/dashboard/${user._id}`}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-100"
            >
              <UserCard user={user} />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveMember(user);
                }}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </Link>
          ))}
        <DialogFooter>
          <DialogClose asChild>
            <button
              onClick={handleSubmit}
              className="chat-info-button"
              title="Create"
              aria-label="Create"
            >
              <MessageCircleMore className="w-5 h-5" />
              Create
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
