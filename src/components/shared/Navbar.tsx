import Link from "next/link";
import { ThemeToggle } from "../ui/ThemeToggle";
// Menu আইকনটি আপাতত সরিয়ে রাখছি যেহেতু আমরা এখন সব স্ক্রিনে মেনু দেখাব
// import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          Family<span className="text-secondary">Care</span>
        </Link>

        {/* Menu Links - এখানে 'hidden' ক্লাসটি বাদ দেওয়া হয়েছে */}
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
          <Link
            href="/login"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-sky-600 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-sky-600 transition-colors"
          >
            Register
          </Link>
          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
