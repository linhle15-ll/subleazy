import { Result } from '@/lib/types/common.types';
import { User } from '@/lib/types/user.types';
import { AxiosError } from 'axios';
import api from './api';

const authService = {
  signup: async (userData: Partial<User>): Promise<Result<User>> => {
    try {
      const response = await api.post('/auth/signup', userData);
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
          'Failed to sign up', 
      };
    }
  },

  signin: async (
    userData: Partial<User>
  ): Promise<Result<{ accessToken: string; user: User }>> => {
    try {
      const response = await api.post('/auth/signin', userData);
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
          'Failed to sign in', 
      };
    }
  },
};

export default authService;
