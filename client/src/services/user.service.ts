import { Result } from '@/lib/types/common.types';
import { User } from '@/lib/types/user.types';
import api from './api';
import { AxiosError } from 'axios';

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
        error:
          (error as AxiosError<{ error: string }>).response?.data.error ||
          JSON.stringify((error as AxiosError<{ error: string }>).response?.data) ||
          'Failed to get user by id', 
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
        error:
          (error as AxiosError<{ error: string }>).response?.data.error ||
          JSON.stringify((error as AxiosError<{ error: string }>).response?.data) ||
          'Failed to get posts by user id', 
      };
    }
  },
};

export default userService;
