import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 text-center px-4">
      <h1 className="text-9xl font-extrabold text-primary">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2 mb-8 max-w-md">
        Oops! The page you are looking for might have been removed or is
        temporarily unavailable.
      </p>

      <Link
        href="/"
        className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors shadow-lg"
      >
        Return to Home
      </Link>
    </div>
  );
}
