import { Result } from '@/lib/types/common.types';
import { User } from '@/lib/types/user.types';
import api from './api';

const userService = {
  getUserById: async (id: string): Promise<Result<User>> => {
    try {
      const response = await api.get(`/users/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: (error as any).response.data.error,
      };
    }
  },
  getPostsByUserId: async (id: string): Promise<Result<User>> => {
    try {
      const response = await api.get(
        `/posts/getByUserId/${id}`
      );
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: (error as any).response.data.error,
      };
    }
  },
};

export default userService;
