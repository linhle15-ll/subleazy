import { useQuery } from '@tanstack/react-query';
import wishService from '@/services/wish.services';

export const useWish = (userId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['wishlist', userId],
    queryFn: () => wishService.getWishListByUserId(userId!),
    enabled: !!userId,
  });
  return { data, isLoading, error };
};
