"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiMenu, FiLogOut } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const { user, logOut } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await logOut();
    toast.success("Logged out");
  };

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            <img src="/Logo.png" alt="logo" className="w-32 h-32" />
            
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="hover:text-primary font-medium transition-colors dark:text-gray-200"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  href="/my-bookings"
                  className="hover:text-primary font-medium dark:text-gray-200"
                >
                  My Bookings
                </Link>
                <div className="flex items-center gap-3 ml-2 border-l pl-4 dark:border-gray-600">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-8 h-8 rounded-full border"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FiLogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-sky-600 transition-colors"
              >
                Login
              </Link>
            )}

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
            >
              {currentTheme === "dark" ? (
                <FiSun className="text-yellow-500" />
              ) : (
                <FiMoon />
              )}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <FiMenu className="h-6 w-6 dark:text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 p-4 border-t dark:border-gray-700">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="block py-2 dark:text-white"
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href="/my-bookings"
                  className="block py-2 dark:text-white"
                >
                  My Bookings
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-red-500 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="block py-2 text-primary font-bold">
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
