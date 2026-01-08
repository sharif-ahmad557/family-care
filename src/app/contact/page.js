"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  // ফর্ম সাবমিট হ্যান্ডলার (ডেমো)
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // ১.৫ সেকেন্ড পর সাকসেস দেখাবে (সিমুলেশন)
    setTimeout(() => {
      toast.success("Message sent successfully! We will contact you soon.");
      setLoading(false);
      e.target.reset(); // ফর্ম ক্লিয়ার
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Header */}
      <div className="bg-primary text-white py-20 text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg opacity-90">
          Have questions? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Get in Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Fill up the form and our team will get back to you within 24
              hours. Or visit us at our office headquarters.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-primary">
                  <FiMapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">Our Location</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Level 4, Care Tower, Gulshan-1, Dhaka-1212
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-primary">
                  <FiPhone size={24} />
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">Phone Number</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    +880 1712 345 678
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-primary">
                  <FiMail size={24} />
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">Email Address</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    support@familycare.xyz
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-6 dark:text-white">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  rows="4"
                  required
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary hover:bg-sky-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
