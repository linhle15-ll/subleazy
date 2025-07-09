import { Result } from '@/lib/types/common.types';
import { Wish } from '@/lib/types/wish.types';
import api from './api';
import { AxiosError } from 'axios';

const wishService = {
  createWish: async (wish: {
    post: string;
    user: string;
  }): Promise<Result<Wish>> => {
    try {
      const response = await api.post('/wishes/create', wish);
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
          'Failed to create post', 
      };
    }
  },

  getWishListByUserId: async (userId: string): Promise<Result<Wish>> => {
    try {
      const response = await api.get(`/wishes/getByUserId/${userId}`);
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
          'Failed to get post by user id', 
      };
    }
  },
};

export default wishService;
