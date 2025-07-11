import { Group } from '@/lib/types/group.types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/commons/accordion';
import { FileText, HousePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PostingCard } from '@/components/ui/posting/posting-card';
import { useUserStore } from '@/stores/user.store';
import MembersAddDialog from './members-add-dialog';
import { User } from '@/lib/types/user.types';
import Image from 'next/image';
import defaultProfileImage from '@/public/placeholder-image-person.webp';
import Link from 'next/link';
import GroupLeaveDialog from './group-leave-dialog';

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
  const router = useRouter();
  const currentUser = useUserStore((state) => state.user);

  return (
    <div className="chat-outer-border flex flex-col gap-2 items-center justify-between h-full w-1/4 overflow-y-auto">
      <div className="text-2xl font-medium p-2">{group.name}</div>
      <Accordion type="single" className="w-full p-2" collapsible>
        <AccordionItem value="post">
          <AccordionTrigger>Linked posting</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1 px-1">
            {group.post ? (
              <PostingCard
                post={group.post}
                onViewDetails={() => router.push(`/posts/${group.post!._id}`)}
                isVertical={true}
                isFavorite={true}
              />
            ) : (
              <div className="p-2 font-medium">No linked posting</div>
            )}
            <button
              className="chat-info-button"
              title={'Link a post'}
              aria-label={'Link a post'}
            >
              <HousePlus className="w-5 h-5" />
              Link a post
            </button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="contracts">
          <AccordionTrigger>Contracts</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1 px-1">
            {group.contracts.length > 0 ? (
              group.contracts.map((contract) => (
                // TODO: Add contract info display or button something
                // Note: If you add any contract operations such as delete or create and need to be updated in real-time then lmk
                <div key={contract} className="" onClick={() => {}}></div>
              ))
            ) : (
              <div className="p-2 font-medium">No contracts found</div>
            )}
            {group.post && group.post.author === currentUser?._id && (
              <button
                className="chat-info-button"
                title={'Create a new contract'}
                onClick={() => {
                  router.push(
                    `/dashboard/${user._id}/groups/${group._id}/contract`
                  );
                }}
                aria-label={'Create a new contract'}
              >
                <FileText className="w-5 h-5" />
                Create a new contract
              </button>
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
