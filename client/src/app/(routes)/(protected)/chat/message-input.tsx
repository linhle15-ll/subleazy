import { Group } from '@/lib/types/group.types';
import messageService from '@/services/message.service';
import { Send } from 'lucide-react';
import { useState } from 'react';

export default function MessageInput({ group }: { group: Group }) {
  const [content, setContent] = useState('');

  const handleSend = async (groupId: string) => {
    const message = content.trim();
    if (message) {
      setContent('');
      await messageService.sendMessage(groupId, message);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend(group._id!)}
        placeholder="Aa"
        className="chat-input-field"
      />
      <button
        onClick={() => handleSend(group._id!)}
        className="p-2 rounded-full hover:bg-gray-100"
        title={'Press enter to send'}
        aria-label={'Press enter to send'}
      >
        <Send className="w-6 h-6 text-primaryOrange" />
      </button>
    </div>
  );
}
