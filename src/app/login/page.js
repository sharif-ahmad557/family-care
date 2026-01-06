"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signIn, googleSignIn } = useAuth();
  const router = useRouter();

  // ইমেইল পাসওয়ার্ড দিয়ে লগইন ফাংশন
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      toast.success("Login Successful!");
      router.push("/"); // হোমপেজে রিডাইরেক্ট
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  // গুগল দিয়ে লগইন ফাংশন
  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      toast.success("Google Login Successful!");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Google Login Failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        {/* হেডার */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Please login to your account
          </p>
        </div>

        {/* লগইন ফর্ম */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* ইমেইল ইনপুট */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 dark:text-white"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* পাসওয়ার্ড ইনপুট */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 dark:text-white"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* সাবমিট বাটন */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-sky-600 text-white font-semibold rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* অথবা (Divider) */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* গুগল বাটন */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
        >
          <FcGoogle className="text-xl" />
          <span className="text-gray-700 dark:text-gray-200 font-medium">
            Google
          </span>
        </button>

        {/* ফুটার */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-primary hover:underline font-medium"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
