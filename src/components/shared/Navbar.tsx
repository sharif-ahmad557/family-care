"use client";

import Link from "next/link";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useAuth } from "@/providers/AuthProvider";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          Family<span className="text-secondary">Care</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="hover:text-primary transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="hover:text-primary transition-colors font-medium"
          >
            Services
          </Link>

          {user ? (
            <>
              <Link
                href="/my-bookings"
                className="hover:text-primary transition-colors font-medium"
              >
                My Bookings
              </Link>
              <div className="flex items-center gap-4 border-l pl-4 border-gray-300 dark:border-gray-700">
                <span className="text-sm font-semibold hidden md:block text-gray-700 dark:text-gray-300">
                  {user.displayName || "User"}
                </span>
                <button
                  onClick={logout}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-sky-600 transition-colors"
            >
              Login
            </Link>
          )}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
