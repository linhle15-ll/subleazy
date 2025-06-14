import { create } from 'zustand';
import { PostRequestBody } from '@/lib/types/post.types';
import { DeepPartial } from '@/lib/types/common.types';

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
