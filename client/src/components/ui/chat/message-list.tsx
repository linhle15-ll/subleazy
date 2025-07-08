import { Message } from '@/lib/types/message.types';
import { User } from '@/lib/types/user.types';
import { cn } from '@/lib/utils/cn';
import { useUserStore } from '@/stores/user.store';

export default function MessageList({ messages }: { messages: Message[] }) {
  const currentUser = useUserStore((state) => state.user);
  // TODO: load more message on scroll

  return (
    <>
      <div className="flex flex-col-reverse overflow-y-auto gap-4 p-2">
        {messages.map((message) => {
          const sender = message.sender as User;
          const isOwner = sender._id === currentUser?._id;
          return (
            <div
              key={message._id}
              className={`flex flex-col ${isOwner ? 'items-end' : 'items-start'}`}
            >
              <span className="text-gray-500 px-2">
                {sender.firstName + ' ' + sender.lastName}
              </span>
              <span
                title={new Date(message.createdAt!).toLocaleTimeString(
                  'en-US',
                  {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  }
                )}
                className={cn(
                  'rounded-2xl p-2 w-full w-fit max-w-[75%]',
                  isOwner ? 'bg-primaryOrange text-white' : 'bg-gray-100'
                )}
              >
                {message.content}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex-grow"></div>
    </>
  );
}
