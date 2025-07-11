import { Result } from '@/lib/types/common.types';
import { Post, PostRequestBody } from '@/lib/types/post.types';
import { AxiosError } from 'axios';
import api from './api';

const postService = {
  createPost: async (
    submissionData: Partial<PostRequestBody>
  ): Promise<Result<Post>> => {
    try {
      const response = await api.post('/posts/create', submissionData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          (error as AxiosError<{ error: string }>).response?.data.error ||
          'Failed to create post',
      };
    }
  },

  getPost: async (id: string): Promise<Result<Post>> => {
    try {
      const response = await api.get(`/posts/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          (error as AxiosError<{ error: string }>).response?.data.error ||
          'Failed to get post by ID',
      };
    }
  },

  editPost: async (
    id: string,
    submissionData: Partial<PostRequestBody>
  ): Promise<Result<Post>> => {
    try {
      const response = await api.put(`/posts/edit/${id}`, submissionData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          (error as AxiosError<{ error: string }>).response?.data.error ||
          'Failed to edit post by ID',
      };
    }
  },

  searchPosts: async (
    filter: Partial<PostRequestBody>
  ): Promise<Result<Post[]>> => {
    try {
      const response = await api.post('/posts/search', filter);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          (error as AxiosError<{ error: string }>).response?.data.error ||
          JSON.stringify(
            (error as AxiosError<{ error: string }>).response?.data
          ) ||
          'Failed to search posts',
      };
    }
  },

  getAllPosts: async (
    createdAt?: string,
    _id?: string
  ): Promise<
    Result<{
      posts: Post[];
      total: number;
      nextCursor: { createdAt: string; _id: string };
    }>
  > => {
    try {
      const params = new URLSearchParams();

      if (createdAt && _id) {
        params.append('createdAt', createdAt);
        params.append('_id', _id);
      }

      const response = await api.get(`/posts?${params.toString()}`);
      return {
        success: true,
        data: {
          posts: response.data.posts,
          total: response.data.total,
          nextCursor: response.data.nextCursor,
        },
      };
    } catch (error) {
      return {
        success: false,
        error:
          (error as AxiosError<{ error: string }>).response?.data.error ||
          JSON.stringify(
            (error as AxiosError<{ error: string }>).response?.data
          ) ||
          'Failed to get all posts',
      };
    }
  },

  getPostsByUserId: async (id: string): Promise<Result<Post[]>> => {
    try {
      const response = await api.get(`/posts/getByUserId/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          (error as AxiosError<{ error: string }>).response?.data.error ||
          JSON.stringify(
            (error as AxiosError<{ error: string }>).response?.data
          ) ||
          'Failed to get posts by user id',
      };
    }
  },
};

export default postService;
