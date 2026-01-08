"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiUsers, FiAward, FiHeart, FiShield } from "react-icons/fi";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary text-white py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About Family Care
        </h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          We are dedicated to providing the most reliable and compassionate care
          services for your loved ones across Bangladesh.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
            alt="Our Mission"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
            At Family Care, our mission is simple: to make caregiving
            accessible, secure, and stress-free. We understand the challenges of
            balancing work and family, which is why we connect you with verified
            professionals who care for your family members just like their own.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <FiShield className="text-primary text-3xl" />
              <div>
                <h4 className="font-bold dark:text-white">Safety First</h4>
                <p className="text-sm text-gray-500">Verified Caregivers</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <FiHeart className="text-primary text-3xl" />
              <div>
                <h4 className="font-bold dark:text-white">Compassion</h4>
                <p className="text-sm text-gray-500">Care with love</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">5k+</h3>
              <p className="text-gray-600 dark:text-gray-400">Happy Families</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Verified Caregivers
              </p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">10+</h3>
              <p className="text-gray-600 dark:text-gray-400">Cities Covered</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">4.9</h3>
              <p className="text-gray-600 dark:text-gray-400">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (Placeholder) */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">
          Meet Our Leaders
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full mb-4 overflow-hidden">
                <img
                  src={`https://randomuser.me/api/portraits/men/${
                    item + 20
                  }.jpg`}
                  alt="Team"
                />
              </div>
              <h3 className="text-xl font-bold dark:text-white">John Doe</h3>
              <p className="text-primary text-sm">Co-Founder</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
