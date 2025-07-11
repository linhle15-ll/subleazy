import { Result } from '@/lib/types/common.types';
import { Group } from '@/lib/types/group.types';
import api from './api';
import { AxiosError } from 'axios';

const groupService = {
  getGroups: async (): Promise<Result<Group[]>> => {
    try {
      const response = await api.get('/groups/');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: (error as AxiosError<{ error: string }>).response?.data.error,
      };
    }
  },

  leaveGroup: async (groupId: string, name: string): Promise<Result<Group>> => {
    try {
      const response = await api.put(`/groups/${groupId}/leave`, { name });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: (error as AxiosError<{ error: string }>).response?.data.error,
      };
    }
  },
};

export default groupService;
