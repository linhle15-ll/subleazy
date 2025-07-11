import { Result } from '@/lib/types/common.types';
import { Group } from '@/lib/types/group.types';
import { User } from '@/lib/types/user.types';
import api from './api';
import { AxiosError } from 'axios';
import { Post } from '@/lib/types/post.types';

const groupService = {
  getGroups: async (): Promise<Result<Group[]>> => {
    try {
      const response = await api.get('/groups/');
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

  leaveGroup: async (groupId: string, name: string): Promise<Result<Group>> => {
    try {
      const response = await api.put(`/groups/${groupId}/leave`, { name });
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

  getGroupMembers: async (groupId: string): Promise<Result<User[]>> => {
    try {
      const response = await api.get(`/groups/${groupId}/members`);
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

  addMembers: async (
    groupId: string,
    name: string,
    members: User[]
  ): Promise<Result<Group>> => {
    try {
      const response = await api.put(`/groups/${groupId}/add-members`, {
        name,
        members,
      });
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

  createGroup: async (data: Partial<Group>): Promise<Result<Group>> => {
    try {
      const response = await api.post('/groups/create', data);
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

  getPostIdByGroupId: async (
    groupId: string
  ): Promise<Result<{ postId: string }>> => {
    try {
      const response = await api.get(`/groups/${groupId}/post`);
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        error: (error as AxiosError<{ error: string }>).response?.data.error,
      };
    }
  },

  addContractToGroup: async (
    groupId: string,
    contractId: string
  ): Promise<Result<Group>> => {
    try {
      const response = await api.put(`/groups/${groupId}/add-contract`, {
        contractId,
      });
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        error: (error as AxiosError<{ error: string }>).response?.data.error,
      };
    }
  },

  linkPost: async (
    groupId: string,
    post: Post,
    name: string
  ): Promise<Result<Group>> => {
    try {
      const response = await api.put(`/groups/${groupId}/link-post`, {
        post,
        name,
      });
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

  renameGroup: async (
    groupId: string,
    name: string,
    username: string
  ): Promise<Result<Group>> => {
    try {
      const response = await api.put(`/groups/${groupId}/rename`, {
        name,
        username,
      });
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

export default groupService;
