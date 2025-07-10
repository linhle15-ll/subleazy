import messageService from '@/services/message.service';
import { Send } from 'lucide-react';
import { useState } from 'react';

export default function MessageInput({ groupId }: { groupId: string }) {
  const [content, setContent] = useState('');

  const handleSend = async () => {
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
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Aa"
        className="flex-grow resize-none overflow-hidden p-2 border-2 border-gray-300 focus:outline-none focus:border-lightOrange rounded-xl"
      />
      <button
        onClick={handleSend}
        className="p-2 rounded-full hover:bg-gray-100"
        title={'Press enter to send'}
        aria-label={'Press enter to send'}
      >
        <Send className="w-6 h-6 text-primaryOrange" />
      </button>
    </div>
  );
}
