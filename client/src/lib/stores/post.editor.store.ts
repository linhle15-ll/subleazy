import { create } from 'zustand';
import { PostRequestBody } from '../types/post.types';
import { DeepPartial } from '../types/common.types';

export type StepKeys =
  | 'description'
  | 'photos'
  | 'place-type'
  | 'bedroom'
  | 'bathroom'
  | 'who-else'
  | 'amenities'
  | 'convenience'
  | 'address'
  | 'availability'
  | 'time'
  | 'price'
  | 'rules';

interface PostEditorStore {
  step: StepKeys;
  setStep: (key: StepKeys) => void;
  post: DeepPartial<PostRequestBody>;
  setPost: (post: DeepPartial<PostRequestBody>) => void;
}

export const usePostEditorStore = create<PostEditorStore>((set) => ({
  step: 'description',
  setStep: (step) => set({ step }),
  post: {} as DeepPartial<PostRequestBody>,
  setPost: (post) =>
    set((state) => ({
      post: {
        ...state.post,
        ...post,
      },
    })),
}));
