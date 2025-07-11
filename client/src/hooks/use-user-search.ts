import userService from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';

export const useUserSearch = (query: string) => {
  const { data } = useQuery({
    queryKey: ['userSearch', query],
    queryFn: () => userService.searchUsers(query),
    enabled: !!query,
  });
  return data;
};
