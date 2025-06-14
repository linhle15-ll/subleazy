import { useFilterStore } from '@/stores/filter.store';
import { encodeQuery } from '@/lib/utils/search-query';
import { useRouter } from 'next/navigation';

export const useSearchHandler = () => {
  const router = useRouter();
  const filters = useFilterStore((state) => state.filters);

  const handleSearch = () => {
    if (!filters.zip && !filters.state && (!filters.lat || !filters.long))
      return;

    if (Object.values(filters).length) {
      const query = encodeQuery(filters);
      router.push(`/posts/search?q=${query}`);
    }
  };

  return handleSearch;
};
