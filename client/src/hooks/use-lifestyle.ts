import { useQuery } from '@tanstack/react-query';
import userService from '@/services/user.service';

export const useLifestyle = (userId: string) => {
  const { data, isFetching } = useQuery({
    queryKey: ['lifestyle', userId],
    queryFn: () => userService.getLifestyle(userId),
    enabled: !!userId,
  });

  return { result: data, isFetching };
};
