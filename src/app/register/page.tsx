"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ফর্ম ডাটা স্টেট
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nid: "",
    password: "",
  });

  // ইনপুট হ্যান্ডেল করা
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // সাবমিট হ্যান্ডেল করা
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, phone, nid, password } = formData;

    // ১. পাসওয়ার্ড ভ্যালিডেশন (রিকুয়ারমেন্ট অনুযায়ী)
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be 6+ chars, with 1 uppercase & 1 lowercase letter."
      );
      setLoading(false);
      return;
    }

    try {
      // ২. Firebase এ ইউজার তৈরি করা
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // ৩. Firebase এ নাম আপডেট করা
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // ৪. MongoDB তে অতিরিক্ত তথ্য (NID, Phone) সেভ করা
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, nid }),
      });

      if (!res.ok) {
        throw new Error("Failed to save user data to database.");
      }

      toast.success("Registration Successful!");

      // ৫. সফল হলে হোম পেজে পাঠিয়ে দেওয়া
      router.push("/");
    } catch (error: any) {
      console.error(error);
      // Firebase এর সাধারণ এরর মেসেজ হ্যান্ডলিং
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already registered.");
      } else {
        toast.error(error.message || "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-10">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Create Account</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Join FamilyCare today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="Your Name"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="you@example.com"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                Phone No
              </label>
              <input
                name="phone"
                type="text"
                required
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="017..."
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                NID Number
              </label>
              <input
                name="nid"
                type="text"
                required
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="NID..."
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="******"
              onChange={handleChange}
            />
            <p className="text-xs text-gray-400 mt-1">
              Must contain 6+ chars, 1 uppercase, 1 lowercase.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-bold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
