'use client';
import {
  LogOut,
  MessageSquare,
  Settings,
  User,
  Menu,
  Bell,
  House,
  Info,
  FilePlus2,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './index';
import Link from 'next/link';
import { useUserStore } from '@/stores/user.store';
import authService from '@/services/auth.service';

export function DropdownUser() {
  const { user, reset } = useUserStore();
  const userId = user?._id;

  const handleLogout = async () => {
    if (!user) return;
    const res = await authService.signout();
    if (res.success) {
      reset();
      window.location.href = '/sign-in';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-full border-2 border-primaryOrange outline-none hover:bg-gray-100">
          <User className="h-6 w-6 text-gray" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white/90">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <Link href={`/dashboard/${userId}`}>Dashboard</Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <MessageSquare />
            <Link href="/chat">Message</Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Bell />
            <Link href={'/notification'}>Notification</Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings />
            <Link href={'/settings'}>Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogOut />
          <button onClick={handleLogout}>Logout</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DropdownHeader() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white/90">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Info />
            <Link href="/about">About</Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <House />
            <Link href="/">Home</Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <FilePlus2 />
            <Link href="/sublease">Sublease your place</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
