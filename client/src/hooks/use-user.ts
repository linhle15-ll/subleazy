
import userService from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

// for chat and thread
const colors = ['#958DF1', '#F98181', '#FBBC88', '#FAF594', '#70CFF8', '#94FADB', '#B9F18D']

/**
 * Assigns a deterministic color based on the user's ID.
 * This ensures a user always has the same color, but different users have different colors.
 * @param userId The user's unique identifier.
 * @returns A color string from the predefined list.
 */
export const getUserColor = (userId: string) => {
  if (!userId) {
    return '#808080'; 
  }
  let hash = 0
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % colors.length);
  return colors[index];
}

export const useUser = (userId: string) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getUserById(userId!),
    enabled: !!userId,
  });

  const color = React.useMemo(() => getUserColor(userId), [userId])

  return { data: user, isLoading, error, color }
}
