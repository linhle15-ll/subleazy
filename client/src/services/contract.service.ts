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
  sublessorSignature?: string;
  sublesseesSignatures?: string[];
  createdAt: string;
  updatedAt: string;
}

interface ContractUpdateData {
  title?: string;
  content?: string;
  sublessorSignature?: string;
  sublesseesSignatures?: string[];
  status?: 'pending' | 'completed' | 'terminated';
}

const contractService = {
  getContractByGroupId: async (groupId: string): Promise<Result<Contract>> => {
    try {
      console.log('Fetching contract for groupId:', groupId);
      const response = await api.get(`/contracts/${groupId}`);
      console.log('Contract response:', response.data);
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      console.error('Error fetching contract:', error);
      console.error(
        'Error response:',
        (error as AxiosError<{ error: string }>).response?.data
      );
      return {
        success: false,
        error:
          (error as AxiosError<{ error: string }>).response?.data.error ||
          'Failed to get contract by group ID',
      };
    }
  },

  updateContractByGroupId: async (
    groupId: string,
    updateData: ContractUpdateData
  ): Promise<Result<Contract>> => {
    try {
      const response = await api.put(
        `/contracts/update/${groupId}`,
        updateData
      );
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          (error as AxiosError<{ error: string }>).response?.data.error ||
          'Failed to update contract',
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
    sublessorSignature?: string;
    sublesseesSignatures?: string[];
  }): Promise<Result<Contract>> => {
    try {
      console.log('Creating contract with data:', contractData);
      const response = await api.post('/contracts/create', contractData);
      console.log('Contract creation response:', response.data);
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      console.error('Contract creation error:', error);
      console.error('Error response:', (error as AxiosError<{ error: string }>).response?.data);
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
