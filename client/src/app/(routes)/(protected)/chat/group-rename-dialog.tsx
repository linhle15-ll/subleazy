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
import { User } from '@/lib/types/user.types';
import groupService from '@/services/group.service';
import { PenLine } from 'lucide-react';
import { useState } from 'react';

export default function GroupRenameDialog({
  groupId,
  user,
}: {
  groupId: string;
  user: User;
}) {
  const [name, setName] = useState('');

  const handleSubmit = async (id: string) => {
    await groupService.renameGroup(
      id,
      name,
      `${user.firstName} ${user.lastName}`
    );
    setName('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          title={'Rename group'}
          aria-label={'Rename group'}
        >
          <PenLine className="w-6 h-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white border-none outline-none">
        <DialogHeader>
          <DialogTitle>Rename group</DialogTitle>
          <DialogDescription>Enter a new name for the group</DialogDescription>
        </DialogHeader>
        <input
          className="chat-input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Group name"
        />
        <DialogFooter>
          <DialogClose asChild>
            <button
              onClick={() => handleSubmit(groupId)}
              className="chat-info-button"
              title={'Rename'}
              aria-label={'Rename'}
            >
              <PenLine className="w-5 h-5" />
              Rename
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
