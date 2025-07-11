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
import { UserPlus, X } from 'lucide-react';
import { useState } from 'react';
import { User } from '@/lib/types/user.types';
import UserSearch from './user-search';
import { UserCard } from './chat-info';
import Link from 'next/link';
import groupService from '@/services/group.service';

export default function MembersAddDialog({
  groupId,
  user,
}: {
  groupId: string;
  user: User;
}) {
  const [users, setUsers] = useState<User[]>([]);

  const handleAddMember = (user: User) => {
    setUsers((prev) => [...prev, user]);
  };

  const handleRemoveMember = (user: User) => {
    setUsers((prev) => prev.filter((u) => u._id !== user._id));
  };

  const handleSubmit = async () => {
    if (users.length === 0) return;

    await groupService.addMembers(
      groupId,
      `${user.firstName} ${user.lastName}`,
      users
    );
    setUsers([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="chat-info-button"
          title={'Add members'}
          aria-label={'Add members'}
        >
          <UserPlus className="w-5 h-5" />
          Add members
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white border-none outline-none">
        <DialogHeader>
          <DialogTitle>Add members</DialogTitle>
          <DialogDescription>
            Search for users by their names or emails to add
          </DialogDescription>
        </DialogHeader>
        <UserSearch onAdd={handleAddMember} className="chat-input-field" />
        {users.length > 0 &&
          users.map((user, idx) => (
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
              title={'Add'}
              aria-label={'Add'}
            >
              <UserPlus className="w-5 h-5" />
              Add
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
