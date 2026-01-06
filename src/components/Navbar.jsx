"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiMenu, FiLogOut } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const { user, logOut } = useAuth(); // AuthContext থেকে ইউজার এবং লগআউট ফাংশন
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // লগআউট হ্যান্ডলার
  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Family<span className="text-gray-800 dark:text-white">Care</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
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

            {/* যদি ইউজার লগইন থাকে */}
            {user ? (
              <>
                <Link
                  href="/my-bookings"
                  className="hover:text-primary transition-colors font-medium"
                >
                  My Bookings
                </Link>
                <div className="flex items-center gap-3 ml-4">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-8 h-8 rounded-full border border-gray-300"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              </>
            ) : (
              /* যদি ইউজার লগইন না থাকে */
              <Link
                href="/login"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-sky-600 transition-colors"
              >
                Login
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
              }
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              {currentTheme === "dark" ? (
                <FiSun className="text-yellow-500" />
              ) : (
                <FiMoon className="text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
              }
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {currentTheme === "dark" ? (
                <FiSun className="text-yellow-500" />
              ) : (
                <FiMoon />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-200"
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Simple implementation) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/services" className="hover:text-primary">
              Services
            </Link>
            {user ? (
              <>
                <Link href="/my-bookings" className="hover:text-primary">
                  My Bookings
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="text-primary font-bold">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
