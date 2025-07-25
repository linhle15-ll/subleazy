import { Group } from '@/lib/types/group.types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/commons/accordion';
import { FileText } from 'lucide-react';
import { PostingCard } from '@/components/ui/posting/posting-card';
import { useUserStore } from '@/stores/user.store';
import MembersAddDialog from './members-add-dialog';
import { User } from '@/lib/types/user.types';
import Image from 'next/image';
import defaultProfileImage from '@/public/placeholder-image-person.webp';
import Link from 'next/link';
import GroupLeaveDialog from './group-leave-dialog';
import PostLinkDialog from './post-link-dialog';

export const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="flex gap-2">
      <Image
        src={user.profileImage || defaultProfileImage}
        alt={user.email}
        width={45}
        height={45}
        className="rounded-full"
      />
      <div>
        <p className="font-medium">{user.firstName + ' ' + user.lastName}</p>
        <p className="text-xs">{user.email}</p>
      </div>
    </div>
  );
};

export default function ChatInfo({
  group,
  user,
}: {
  group: Group;
  user: User;
}) {
  const currentUser = useUserStore((state) => state.user);

  return (
    <div className="chat-outer-border flex flex-col gap-2 items-center justify-between h-full w-1/4 overflow-y-auto">
      <div className="text-2xl font-medium p-2">{group.name}</div>
      <Accordion type="single" className="w-full p-2" collapsible>
        <AccordionItem value="post">
          <AccordionTrigger>Linked posting</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1 px-1">
            {group.post ? (
              <PostingCard post={group.post} isVertical={true} />
            ) : (
              <div className="p-2 font-medium">No linked posting</div>
            )}
            <PostLinkDialog group={group} user={user} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="contracts">
          <AccordionTrigger>Contracts</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1 px-1">
            {group.post ? (
              <Link
                href={`/dashboard/${currentUser!._id}/groups/${group._id}/contract/edit`}
                className="chat-info-button"
                title={'Create a new contract'}
                aria-label={'Create a new contract'}
              >
                <FileText className="w-5 h-5" />
                Create a new contract
              </Link>
            ) : (
              <div className="chat-info-button hover:bg-white cursor-default">
                <FileText className="w-5 h-5" />
                Link a posting to create a new contract
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="members">
          <AccordionTrigger>Members</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1 px-1">
            {group.members.map((member) => (
              <Link
                key={member._id}
                href={`/dashboard/${member._id}`}
                className="flex items-center p-2 rounded-xl hover:bg-gray-100"
              >
                <UserCard user={member} />
              </Link>
            ))}
            {!group.isDM && (
              <MembersAddDialog groupId={group._id!} user={user} />
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {group.isDM ? (
        <div></div>
      ) : (
        <GroupLeaveDialog groupId={group._id!} user={user} />
      )}
    </div>
  );
}
