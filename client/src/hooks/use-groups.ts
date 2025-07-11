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

export const useGroupMembers = (groupId?: string) => {
  return useQuery({
    queryKey: ['group-members', groupId],
    queryFn: async () => {
      if (!groupId) throw new Error('Group ID is required');
      const result = await groupService.getGroupMembers(groupId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    enabled: !!groupId,
  });
};

export const usePostIdByGroupId = (groupId?: string) => {
  return useQuery({
    queryKey: ['post-id-by-group', groupId],
    queryFn: async () => {
      if (!groupId) throw new Error('Group ID is required');
      const result = await groupService.getPostIdByGroupId(groupId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    enabled: !!groupId,
  });
};
