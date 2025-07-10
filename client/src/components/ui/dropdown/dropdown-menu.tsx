'use client'
import {
  LogOut,
  MessageSquare,
  Settings,
  User,
  Menu,
  Bell,
  House,
  Info,
  Users,
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

import { useUserStore } from "@/stores/user.store";

export function DropdownUser() {
  const currentUser = useUserStore((state) => state.user);
  const userId = currentUser?._id
  
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
            <a href={`/dashboard/${userId}`}>Profile</a>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <MessageSquare />
            <a href="/message">Message</a>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Bell />
            <a href="/notifications">Notifications</a>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings />
            <a href="/settings">Settings</a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogOut />
          <span>Log out</span>
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
            <a href="/about">About</a>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <House />
            <a href="/">Home</a>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Users />
            <a href="/community">Community</a>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <FilePlus2 />
            <a href="/sublease">Sublease your place</a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
