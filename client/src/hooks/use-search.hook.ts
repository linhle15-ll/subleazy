import { useFilterStore } from '@/lib/stores/filter.store';
import { PostRequestBody } from '@/lib/types/post.types';
import { decodeQuery } from '@/lib/utils/search-query';
import postService from '@/services/post.service';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const useSearch = () => {
  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    if (query && Object.values(filters).length === 0)
      setFilters(decodeQuery(query));
  }, []);

  // Workflow: filters change -> query change -> fetch
  const { data } = useQuery({
    queryKey: ['search', query],
    queryFn: () => postService.searchPosts(filters as Partial<PostRequestBody>),
    enabled: Object.values(filters).length > 0,
  });

  return data;
};
