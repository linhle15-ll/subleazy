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
      <DialogContent className="sm:max-w-md bg-white border-none">
        <DialogHeader>
          <DialogTitle>Leave group</DialogTitle>
          <DialogDescription>
            Are you sure you want to leave this group?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="w-full flex items-center justify-around">
            <div
              onClick={() =>
                groupService.leaveGroup(
                  groupId,
                  `${user.firstName} ${user.lastName}`
                )
              }
              className="chat-info-button text-red-500 w-20 rounded-3xl justify-center border border-2 border-red-500"
              title={'Leave'}
              aria-label={'Leave'}
            >
              Leave
            </div>
            <div
              className="chat-info-button w-20 rounded-3xl justify-center border border-2 border-gray-500"
              title={'Stay'}
              aria-label={'Stay'}
            >
              Stay
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
