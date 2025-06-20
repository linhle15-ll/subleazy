import { Result } from '@/lib/types/common.types';
import { User } from '@/lib/types/user.types';
import { AxiosError } from 'axios';
import api from './api';

const userService = {
  getUser: async (id: string): Promise<Result<User>> => {
    try {
      const response = await api.get(`/users/${id}`);
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

export default userService;
