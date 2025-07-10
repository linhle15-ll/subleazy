import { useQuery } from '@tanstack/react-query';
import wishService from '@/services/wish.services';

export const useMatches = (postId: string) => {
  const { data, isFetching } = useQuery({
    queryKey: ['post-matches', postId],
    queryFn: () => wishService.getMatchesByPost(postId),
    enabled: !!postId,
  });

  return { result: data, isFetching };
};
