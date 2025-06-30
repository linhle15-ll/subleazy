import { DeepPartial } from '@/lib/types/common.types';
import { PostRequestBody } from '@/lib/types/post.types';
import { create } from 'zustand';

interface PostCreateStore {
  post: Partial<PostRequestBody> | DeepPartial<PostRequestBody>;
  setPost: (
    update:
      | Partial<PostRequestBody>
      | DeepPartial<PostRequestBody>
      | ((
          prev: Partial<PostRequestBody> | DeepPartial<PostRequestBody>
        ) => Partial<PostRequestBody> | DeepPartial<PostRequestBody>)
  ) => void;
}

export const usePostCreateStore = create<PostCreateStore>()((set) => ({
  post: {},
  setPost: (update) =>
    set((prev) => ({
      post: typeof update === 'function' ? update(prev.post) : update,
    })),
}));
