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
import { LogOut } from 'lucide-react';

export default function GroupLeaveDialog({
  groupId,
  user,
}: {
  groupId: string;
  user: User;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="chat-info-button text-red-500"
          title={'Leave group'}
          aria-label={'Leave group'}
        >
          <LogOut className="w-5 h-5" />
          Leave group
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white border-none outline-none">
        <DialogHeader>
          <DialogTitle>Leave group</DialogTitle>
          <DialogDescription>
            Are you sure you want to leave this group?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button
              onClick={() =>
                groupService.leaveGroup(
                  groupId,
                  `${user.firstName} ${user.lastName}`
                )
              }
              className="chat-info-button bg-red-500 hover:bg-red-600 text-white"
              title={'Leave'}
              aria-label={'Leave'}
            >
              <LogOut className="w-5 h-5" />
              Leave
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
