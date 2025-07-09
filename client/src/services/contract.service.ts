import { Result } from '@/lib/types/common.types';
import { AxiosError } from 'axios';
import api from './api';

interface Contract {
  _id: string;
  title: string;
  content: string;
  status: 'pending' | 'completed' | 'terminated';
  post: string;
  sublessor: string;
  sublessees: string[];
  group: string;
  createdAt: string;
  updatedAt: string;
}

const contractService = {
  getContractByGroupId: async (groupId: string): Promise<Result<Contract>> => {
    try {
      const response = await api.get(`/contracts/by-group/${groupId}`);
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          (error as AxiosError<{ error: string }>).response?.data.error ||
          'Failed to get contract by group ID',
      };
    }
  },

  createContract: async (contractData: {
    title: string;
    post: string;
    sublessor: string;
    sublessees: string[];
    group: string;
    content: string;
  }): Promise<Result<Contract>> => {
    try {
      const response = await api.post('/contracts/create', contractData);
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          (error as AxiosError<{ error: string }>).response?.data.error ||
          'Failed to create contract',
      };
    }
  },

  getMyContracts: async (): Promise<Result<Contract[]>> => {
    try {
      const response = await api.get('/contracts/my-contracts');
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          (error as AxiosError<{ error: string }>).response?.data.error ||
          'Failed to get my contracts',
      };
    }
  },

  deleteContract: async (
    contractId: string
  ): Promise<Result<{ contractId: string }>> => {
    try {
      const response = await api.delete(`/contracts/${contractId}`);
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          (error as AxiosError<{ error: string }>).response?.data.error ||
          'Failed to delete contract',
      };
    }
  },
};

export default contractService;
