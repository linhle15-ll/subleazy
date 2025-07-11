"use client";
import React from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Heart, Users, LogOut, Menu } from "lucide-react";
import clsx from "clsx";
import { useUserStore } from "@/stores/user.store";
import { ProfileAvatar } from "@/components/ui/commons/avatar"


// --- Vertical Dashboard Menu Component ---
export const DashboardMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    const pathname = usePathname();
    const { user } = useUserStore(); // Get user from the store
    const userId = user?._id

    React.useEffect(() => {
        if (isMenuOpen) {
            setIsMenuOpen(false)
        }
    }, [isMenuOpen, setIsMenuOpen, pathname])

    const navItems = [
        {
            label: "Dashboard",
            href: `/dashboard/${userId}`,
            icon: LayoutDashboard,
        },
        {
            label: "Wishlist",
            href: `/dashboard/${userId}/wishlist`,
            icon: Heart,
        },
        {
            label: "Groups",
            href: `/dashboard/${userId}/groups`,
            icon: Users,
        },
    ];

    const handleLogout = () => {
        // Add your logout logic here
        // clearUser();
        window.location.href = '/';
    };

    return (
        <div>
            {/* Hamburger button to */}
            <button
                aria-label="Open sidebar"
                className="fixed lg:hidden top-4 left-4 z-30 p-2 bg-white rounded-full shadow-lg text-gray-800 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(true)}
            >
                <Menu size={30} />
            </button>

            {isMenuOpen && (
                <div
                    aria-hidden="true"
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                />
            )}
            {/* Sidebar */}
            <aside
                className={clsx(
                    "fixed top-0 left-0 h-full w-64 bg-white border-r z-50",
                    "flex flex-col transition-transform duration-300 ease-in-out",
                    {
                        "translate-x-0": isMenuOpen,
                        "-translate-x-full": !isMenuOpen,
                    },
                    "lg:translate-x-0 lg:static lg:h-screen"
                )}
            >

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col gap-2 p-4">
          {navItems.map((item) => {
            // Improved logic for determining the active link
            const isActive =
              item.href === `/dashboard/${userId}`
                ? pathname === item.href
                : pathname.startsWith(item.href);
            return (
              <NextLink
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
                  {
                    "bg-lightestOrange text-primaryOrange": isActive,
                    "text-gray-700 hover:bg-gray-100 hover:text-gray-900":
                      !isActive,
                  }
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NextLink>
            );
          })}
        </nav>

                {/* Footer Section with User Profile */}
        <div className="p-4 mt-auto border-t">
          <div className="flex items-center gap-3">
            <ProfileAvatar
              src={user?.profileImage}
              alt={user?.firstName}
              size={40}
            />
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-semibold truncate">
                {user?.firstName || "Guest User"}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {user?.email || ""}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 rounded-md hover:bg-gray-100 hover:text-gray-800"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
            </aside>
        </div>
    );
};