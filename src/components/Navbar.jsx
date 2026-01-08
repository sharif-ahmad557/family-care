"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FiSun, FiMoon, FiMenu, FiLogOut } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const { user, logOut } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();

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

  const isActive = (path) => pathname === path;

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <img
              src="/Logo.png"
              alt="Family Care"
              className="h-10 w-auto object-contain"
            />
            <span className="text-xl font-bold text-primary hidden sm:block">
              Family<span className="text-gray-800 dark:text-white">Care</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`relative px-1 py-2 text-sm font-medium transition-colors duration-300 group ${
                  isActive(link.path)
                    ? "text-primary font-bold"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary"
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 bottom-0.5 w-full h-0.5 bg-primary transition-transform duration-300 origin-left ${
                    isActive(link.path)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  href="/my-bookings"
                  className={`relative px-1 py-2 text-sm font-medium transition-colors duration-300 group ${
                    isActive("/my-bookings")
                      ? "text-primary font-bold"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary"
                  }`}
                >
                  My Bookings
                  <span
                    className={`absolute left-0 bottom-0.5 w-full h-0.5 bg-primary transition-transform duration-300 origin-left ${
                      isActive("/my-bookings")
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </Link>

                {/* Admin Link */}
                {/* <Link
                  href="/admin/dashboard"
                  className="px-3 py-1 bg-gray-800 text-white rounded text-xs hover:bg-gray-700 transition"
                >
                  Admin
                </Link> */}

                <div className="flex items-center gap-3 ml-2 border-l pl-4 border-gray-300 dark:border-gray-600">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-8 h-8 rounded-full border border-gray-300 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-600 transition-colors"
                    title="Logout"
                  >
                    <FiLogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2 bg-primary text-white rounded-full hover:bg-sky-600 transition-all shadow-md hover:shadow-lg text-sm font-medium"
              >
                Login
              </Link>
            )}

            <button
              onClick={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
              }
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
            >
              {currentTheme === "dark" ? (
                <FiSun className="text-yellow-400 w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
              }
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {currentTheme === "dark" ? (
                <FiSun className="text-yellow-400" />
              ) : (
                <FiMoon className="text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-200"
            >
              <FiMenu className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  href="/my-bookings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/my-bookings")
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  My Bookings
                </Link>
                <Link
                  href="/admin/dashboard"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Admin Panel
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-red-500 font-medium hover:bg-red-50 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-primary font-bold hover:bg-primary/5 rounded-md"
              >
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
