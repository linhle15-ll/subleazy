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

interface PostEditorStore {
  step: StepKeys;
  setStep: (key: StepKeys) => void;
  post: Partial<PostRequestBody> | DeepPartial<PostRequestBody>;
  setPost: (
    post: Partial<PostRequestBody> | DeepPartial<PostRequestBody>
  ) => void;
}

export const usePostEditorStore = create<PostEditorStore>()((set) => ({
  step: 'description',
  setStep: (step) => set({ step }),
  post: {} as Partial<PostRequestBody> | DeepPartial<PostRequestBody>,
  setPost: (post) =>
    set((state) => ({
      post: {
        ...state.post,
        ...post,
      },
    })),
}));
