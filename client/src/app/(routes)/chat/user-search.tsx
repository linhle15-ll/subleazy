import { useDebounce } from '@/hooks/use-debounce';
import { useUserSearch } from '@/hooks/use-user-search';
import { User } from '@/lib/types/user.types';
import { cn } from '@/lib/utils/cn';
import { useState } from 'react';
import { UserCard } from './chat-info';

export default function UserSearch({
  onAdd,
  className,
}: {
  onAdd: (user: User) => void;
  className?: string;
}) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 200);
  const result = useUserSearch(debouncedQuery);
  const [showUsers, setShowUsers] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowUsers(true);
  };

  const handleSelect = (user: User) => {
    setShowUsers(false);
    setQuery('');
    onAdd(user);
  };

  return (
    <div className="relative">
      <input
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (!result || !result.data?.length) return;

          const users = result.data;

          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((prevIndex) => (prevIndex + 1) % users.length);
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(
              (prevIndex) => (prevIndex - 1 + users.length) % users.length
            );
          } else if (e.key === 'Enter') {
            e.preventDefault();
            handleSelect(users[activeIndex]);
          }
        }}
        onBlur={() => setTimeout(() => setShowUsers(false), 100)}
        onFocus={() => setShowUsers(true)}
        className={className}
        placeholder="Name or email"
      />
      {(result?.data?.length || 0) > 0 && showUsers && (
        <ul className="absolute w-full border rounded-md bg-white shadow-md z-50">
          {result!.data!.map((user, index) => (
            <li
              key={index}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                handleSelect(user);
              }}
              className={cn(
                'p-2 hover:bg-gray-100 hover:font-medium rounded-md cursor-pointer focus:outline-none',
                activeIndex === index && 'bg-gray-100 font-medium'
              )}
            >
              <UserCard user={user} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
