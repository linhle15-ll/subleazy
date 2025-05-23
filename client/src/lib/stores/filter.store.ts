import { create } from 'zustand';
import { PostRequestBody } from '../types/post.types';
import { DeepPartial } from '../types/common.types';

interface FilterStore {
  filters: DeepPartial<PostRequestBody> | Partial<PostRequestBody>;
  setFilters: (
    filters: DeepPartial<PostRequestBody> | Partial<PostRequestBody>
  ) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: {},
  setFilters: (filters) => set({ filters }),
}));
