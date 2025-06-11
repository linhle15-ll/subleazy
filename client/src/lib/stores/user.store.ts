import { create } from 'zustand';
import { devtools, subscribeWithSelector, persist } from 'zustand/middleware';
import { User } from '@/lib/types/user.types';

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;

  accessToken: string | null;
  setAccessToken: (token: string) => void;

  clearAccessToken: () => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set) => ({
          user: null,
          setUser: (user) => set({ user }),

          accessToken: null,
          setAccessToken: (token) => set({ accessToken: token }),
          clearAccessToken: () => set({ accessToken: '' }),
        }),
        {
          name: 'user-store',
          partialize: (state) => ({
            accessToken: state.accessToken,
            user: state.user
              ? {
                  id: state.user._id,
                  email: state.user.email,
                }
              : null,
          }),
        }
      )
    )
  )
);
