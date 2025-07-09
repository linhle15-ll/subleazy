import { create } from 'zustand';
import { Lifestyle } from '@/lib/types/user.types';

interface LifestyleStore {
  lifestyle: Lifestyle;

  setLifestyle: (update: Lifestyle | ((prev: Lifestyle) => Lifestyle)) => void;
  reset: () => void;
}

export const useLifestyleStore = create<LifestyleStore>()((set) => ({
  lifestyle: {},
  setLifestyle: (update) =>
    set((prev) => ({
      lifestyle: typeof update === 'function' ? update(prev.lifestyle) : update,
    })),
  reset: () =>
    set({
      lifestyle: {},
    }),
}));
