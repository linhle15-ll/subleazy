'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/stores/user.store';
import { useRouter } from 'next/navigation';

export default function RedirectIfAuthenticated() {
  const user = useUserStore((state) => state.user);
  const accessToken = useUserStore((state) => state.accessToken);
  const router = useRouter();

  useEffect(() => {
    if (user && accessToken) {
      router.push(`/dashboard/${user._id}`);
    }
  }, [user, accessToken]);

  return null;
}
