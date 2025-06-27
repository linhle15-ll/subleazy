import { create } from 'zustand';
import { PostRequestBody } from '@/lib/types/post.types';
import { DeepPartial } from '@/lib/types/common.types';

interface FilterStore {
  filters: DeepPartial<PostRequestBody> | Partial<PostRequestBody>;
  setFilters: (
    update:
      | DeepPartial<PostRequestBody>
      | Partial<PostRequestBody>
      | ((
          prev: DeepPartial<PostRequestBody> | Partial<PostRequestBody>
        ) => DeepPartial<PostRequestBody> | Partial<PostRequestBody>)
  ) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterStore>()((set) => ({
  filters: {},
  setFilters: (update) =>
    set((prev) => ({
      filters: typeof update === 'function' ? update(prev.filters) : update,
    })),
  reset: () => set({ filters: {} }),
}));
