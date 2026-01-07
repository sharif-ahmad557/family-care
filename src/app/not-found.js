import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 text-center">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-lg max-w-md w-full border border-gray-100 dark:border-gray-700">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
            <FiAlertTriangle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          404
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-primary hover:bg-sky-600 rounded-lg transition-colors duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
