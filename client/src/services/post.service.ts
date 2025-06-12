import { Result } from '@/lib/types/common.types';
import { Post, PostRequestBody } from '@/lib/types/post.types';
import api from './api';

const postService = {
  createPost: async (submissionData: any): Promise<Result<Post>> => {
    try {
      const response = await api.post('/posts/create', submissionData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (error as any).response?.data?.error || 'Failed to create post',
      };
    }
  },
  searchPosts: async (
    filter: Partial<PostRequestBody>
  ): Promise<Result<Post[]>> => {
    try {
      const response = await api.post(
        'http://localhost:5000/api/posts/search',
        filter
      );
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (error as any).response.data.error,
      };
    }
  },

  getAllPosts: async (): Promise<Result<Post[]>> => {
    try {
      const response = await api.get('http://localhost:5000/api/posts/');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (error as any).response.data.error,
      };
    }
  },

  getPostById: async (id: string): Promise<Result<Post>> => {
    try {
      const response = await api.get(`/posts/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      // Optionally, you can log the error or handle it as needed
      console.error('Error fetching post by ID:', error);
      return {
        success: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error:
          (error as any).response?.data?.error || 'Failed to fetch post by ID',
      };
    }
  },
};

export default postService;
