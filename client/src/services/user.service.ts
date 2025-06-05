import { User } from '@/lib/types/user.types';
import api from './api';
import { Result } from '@/lib/types/common.types';

const userService = {
  getUserById: async(id: string):Promise<Result<User>>  => {
    try {
      const response = await api.get(`/users/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: (error as any).response?.data?.error || 'Failed to fetch user',
      };
    }
  },
};

export default userService;
