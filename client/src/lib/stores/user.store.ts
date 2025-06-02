import { create } from 'zustand';
import { devtools, subscribeWithSelector, persist } from 'zustand/middleware';
import type { Post } from '@/lib/types/post.types';

export interface AuthFormStore {
  firstName: string;
  lastName: string;
  institution: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UserStore {
  id: string;
  authForm: AuthFormStore;
  profileImage: string;
  bio: string;
  isVerified: boolean;
  sublesseeHistory: (string | Post)[];

  accessToken: string;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;

  updateAuthForm: (field: keyof AuthFormStore, value: string) => void;
  resetAuthForm: () => void;
}

const initialAuthFormValues: AuthFormStore = {
  firstName: '',
  lastName: '',
  institution: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const useUserStore = create<UserStore>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set) => ({
          id: '',
          authForm: initialAuthFormValues,
          profileImage: '',
          bio: '',
          isVerified: false,
          sublesseeHistory: [],

          accessToken: '',
          setAccessToken: (token) => set({ accessToken: token }),
          clearAccessToken: () => set({ accessToken: '' }), //for log out

          updateAuthForm: (field, value) =>
            set((state) => ({
              authForm: {
                ...state.authForm,
                [field]: value,
              },
            })),
          resetAuthForm: () => set({ authForm: initialAuthFormValues }),
        }),
        {
          name: 'user-store',
          partialize: (state) => ({
            id: state.id,
            authForm: state.authForm,
            profileImage: state.profileImage,
            bio: state.bio,
            isVerified: state.isVerified,
            sublesseeHistory: state.sublesseeHistory,
          }),
        }
      )
    )
  )
);
