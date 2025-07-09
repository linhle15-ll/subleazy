import { Result } from '@/lib/types/common.types';
import { Lifestyle, User } from '@/lib/types/user.types';
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

  createOrEditLifestyle: async (
    id: string,
    submissionData: Lifestyle
  ): Promise<Result<User>> => {
    try {
      console.log('Submitting lifestyle:', submissionData);
      const response = await api.patch(
        `/users/${id}/lifestyle`,
        submissionData
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
          'Failed to edit lifestyle form',
      };
    }
  },

  getLifestyle: async (id: string): Promise<Result<User>> => {
    try {
      const response = await api.get(`/users/${id}/lifestyle`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          (error as AxiosError<{ error: string }>).response?.data.error ||
          'Failed to get lifestyle form',
      };
    }
  },
};

export default userService;
