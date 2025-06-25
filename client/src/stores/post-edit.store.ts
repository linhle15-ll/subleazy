import { create } from 'zustand';
import { PostRequestBody } from '../lib/types/post.types';
import { DeepPartial } from '../lib/types/common.types';

export type StepKeys =
  | 'description'
  | 'photos'
  | 'place-type'
  | 'bedroom'
  | 'bathroom'
  | 'who-else'
  | 'amenities'
  | 'address'
  | 'availability'
  | 'time'
  | 'price'
  | 'rules';

interface PostEditStore {
  step: StepKeys;
  setStep: (key: StepKeys) => void;
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

export const usePostEditStore = create<PostEditStore>()((set) => ({
  step: 'description',
  setStep: (step) => set({ step }),
  post: {},
  setPost: (update) =>
    set((prev) => ({
      post: typeof update === 'function' ? update(prev.post) : update,
    })),
}));
