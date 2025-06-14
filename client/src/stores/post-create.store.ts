import { DeepPartial } from '@/lib/types/common.types';
import { PostRequestBody } from '@/lib/types/post.types';
import { create } from 'zustand';

interface PostCreateStore {
  post: Partial<PostRequestBody> | DeepPartial<PostRequestBody>;
  setPost: (
    post: Partial<PostRequestBody> | DeepPartial<PostRequestBody>
  ) => void;
}

export const usePostCreateStore = create<PostCreateStore>((set) => ({
  post: {},
  setPost: (post) => set({ post }),
}));
