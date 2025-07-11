import groupService from '@/services/group.service';
import { useQuery } from '@tanstack/react-query';

export const useGroups = (userId?: string) => {
  const { data, isFetching } = useQuery({
    queryKey: ['groups', userId],
    queryFn: () => groupService.getGroups(),
    enabled: !!userId,
  });

  return { result: data, isFetching };
};
