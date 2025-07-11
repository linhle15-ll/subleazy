'use client';

import { useEffect, useState } from 'react';
import { useUserStore } from '@/stores/user.store';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const user = useUserStore((state) => state.user);
  const accessToken = useUserStore((state) => state.accessToken);
  const router = useRouter();

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && (!user || !accessToken)) {
      router.push('/sign-in');
    }
  }, [hydrated, user, accessToken]);

  return hydrated && user && accessToken ? <>{children}</> : null;
}
