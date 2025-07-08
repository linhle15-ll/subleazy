import { Result } from '@/lib/types/common.types';
import { Message } from '@/lib/types/message.types';
import { AxiosError } from 'axios';
import api from './api';

const messageService = {
  getMessages: async (
    groupId: string,
    page: number = 1
  ): Promise<
    Result<{ messages: Message[]; page: number; hasNextPage: boolean }>
  > => {
    try {
      const response = await api.get(`/messages/${groupId}?page=${page}`);
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

  sendMessage: async (
    groupId: string,
    content: string
  ): Promise<Result<Message>> => {
    try {
      const response = await api.post(`/messages/${groupId}`, { content });
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

export default messageService;
