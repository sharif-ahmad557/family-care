"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import {
  FiEye,
  FiEyeOff,
  FiUser,
  FiMail,
  FiPhone,
  FiCreditCard,
  FiLock,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RegisterPage() {
  const router = useRouter();
  const { createUser, updateUserProfile } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nid: "",
    password: "",
  });

  // Password Validation State
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real-time password validation check
    if (name === "password") {
      setValidations({
        length: value.length >= 6,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !validations.length ||
      !validations.uppercase ||
      !validations.lowercase
    ) {
      toast.error("Please meet all password requirements.");
      return;
    }

    if (!agreed) {
      toast.error("Please agree to the Terms & Conditions.");
      return;
    }

    setLoading(true);

    try {
      await createUser(formData.email, formData.password);
      await updateUserProfile(formData.name, "");

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          nid: formData.nid,
        }),
      });

      if (!res.ok) throw new Error("Database save failed");

      toast.success("Account Created Successfully!");
      router.push("/");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already exists!");
      } else {
        toast.error("Registration failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4 py-12">
        <div className="max-w-6xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-3/5 p-8 md:p-12"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Create Account
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Join our community of caring families.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    placeholder="John Doe"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    placeholder="you@example.com"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Phone & NID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                    Phone
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      name="phone"
                      required
                      className="w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                      placeholder="01XXXXXXXXX"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                    NID Number
                  </label>
                  <div className="relative">
                    <FiCreditCard className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      name="nid"
                      required
                      className="w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                      placeholder="National ID"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    className="w-full pl-10 pr-10 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    placeholder="••••••••"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

                {/* Real-time Validation Check */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  <div
                    className={`flex items-center gap-1 ${
                      validations.length ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {validations.length ? <FiCheck /> : <FiX />} 6+ Chars
                  </div>
                  <div
                    className={`flex items-center gap-1 ${
                      validations.uppercase ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {validations.uppercase ? <FiCheck /> : <FiX />} Uppercase
                  </div>
                  <div
                    className={`flex items-center gap-1 ${
                      validations.lowercase ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {validations.lowercase ? <FiCheck /> : <FiX />} Lowercase
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 rounded text-primary focus:ring-primary"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms & Conditions
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary hover:bg-sky-600 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline font-bold"
              >
                Login here
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Image Banner */}
          <div
            className="hidden md:block w-2/5 bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1974&auto=format&fit=crop')",
            }}
          >
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Join Family Care</h2>
              <p className="text-lg opacity-90">
                "Start your journey with us today and ensure the best care for
                your loved ones."
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
