import { create } from 'zustand';
import { devtools, subscribeWithSelector, persist } from 'zustand/middleware';

const initialUserValues = {
  id: '',
  authenFormData: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    institution: '',
  },
  profileImage: '',
  bio: '',
  isVerified: false,
  sublesseeHistory: [],
};

export const useUserStore = create<typeof initialUserValues>()(
  devtools(
    subscribeWithSelector(
      persist(() => initialUserValues, { name: 'User store' })
    ),
    { name: 'User store' }
  )
);

export const handleAuthenFormChange = (name: string, value: any) => {
  useUserStore.setState((state) => ({
    authenFormData: {
      ...state.authenFormData,
      [name]: value,
    },
  }));
};
