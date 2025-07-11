'use client';

import { useUserStore } from '@/stores/user.store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const MainNavBar = () => {
  const user = useUserStore((state) => state.user);
  const accessToken = useUserStore((state) => state.accessToken);
  const router = useRouter();

  const handleProtectedClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user || !accessToken) {
      router.push('/sign-in');
    } else {
      router.push(href);
    }
  };

  return (
    <nav aria-label="Global" className="hidden md:block">
      <ul className="flex items-center gap-6 text-sm">
        <li>
          <Link className="navbar-text" href="/about">
            About
          </Link>
        </li>

        <li>
          <Link className="navbar-text" href="/">
            Home
          </Link>
        </li>

        <li>
          <Link
            className="btn-primary"
            href="/sublease/step-1"
            onClick={handleProtectedClick('/sublease/step-1')}
          >
            Sublease your space
          </Link>
        </li>
      </ul>
    </nav>
  );
};
