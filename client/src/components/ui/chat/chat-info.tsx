import { Group } from '@/lib/types/group.types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../commons/accordion';
import { FileText, HousePlus, LogOut, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PostingCard } from '../posting/posting-card';
import { useUserStore } from '@/stores/user.store';

export default function ChatInfo({ group }: { group: Group }) {
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
                onToggleFavorite={() => {}}
                isVertical={true}
                isFavorite={true}
              />
            ) : (
              <div className="p-2 font-medium">No linked posting</div>
            )}
            <button
              className="flex gap-2 p-2 rounded-xl hover:bg-gray-100 font-medium"
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
                className="flex gap-2 p-2 rounded-xl hover:bg-gray-100 font-medium"
                title={'Create a new contract'}
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
              <div
                key={member._id}
                className="cursor-pointer rounded-xl hover:bg-gray-100 p-2 font-medium"
                onClick={() => router.push(`/profile/${member._id}`)}
              >
                {member.firstName} {member.lastName}
              </div>
            ))}
            {!group.isDM && (
              <button
                className="flex gap-2 p-2 rounded-xl hover:bg-gray-100 font-medium"
                title={'Add members'}
                aria-label={'Add members'}
              >
                <UserPlus className="w-5 h-5" />
                Add members
              </button>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex gap-1 font-medium text-red-500 cursor-pointer p-2">
        <LogOut className="w-6 h-6" />
        Leave group
      </div>
    </div>
  );
}
