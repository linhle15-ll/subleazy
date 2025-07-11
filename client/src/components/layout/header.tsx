'use client';

import Image from 'next/image';
import logo from '@/public/subleazy_logo.png';
import {
  DropdownUser,
  DropdownHeader,
} from '@/components/ui/dropdown/dropdown-menu';
import { MainNavBar } from '@/components/ui/navigation-menu/main-navbar';
import { useUserStore } from '@/stores/user.store';
import Link from 'next/link';

export default function Header() {
  const { user } = useUserStore();

  return (
    <div className="bg-white py-5">
      <div className="mx-auto max-w-7xl px-15">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-teal-600 outline-none" href="/">
              <span className="sr-only">Home</span>
              <Image
                src={logo}
                alt="Subleazy Logo"
                width={120}
                height={28}
                className="h-7 w-auto outline-none"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </a>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <MainNavBar />

            {user === null ? (
              <button className="btn-secondary hidden md:block">
                <Link href={'/sign-in'}>Login</Link>
              </button>
            ) : (
              <div className="flex flex-row items-center gap-4">
                {/* Dropdown Menu for Small Screens */}
                <div className="block md:hidden">
                  <DropdownHeader />
                </div>

                <DropdownUser />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
