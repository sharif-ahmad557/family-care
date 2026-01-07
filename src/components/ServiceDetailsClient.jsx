"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { FiCheckCircle, FiClock, FiMapPin, FiDollarSign } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ServiceDetailsClient({ id }) {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const res = await fetch(`/api/services/${id}`);
        if (!res.ok) throw new Error("Service not found");
        const data = await res.json();
        setService(data);
      } catch (error) {
        console.error(error);
        toast.error("Could not load service details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchServiceDetails();
    }
  }, [id]);

  const handleBookService = () => {
    if (!user) {
      toast.error("Please login first to book a service");
      router.push("/login");
    } else {
      router.push(`/booking/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          Service not found
        </h2>
        <button
          onClick={() => router.push("/")}
          className="mt-4 text-primary hover:underline"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="relative h-[300px] md:h-[400px]">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
            {service.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">
                Service Overview
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-6">
                {service.description}
              </p>

              <h3 className="text-xl font-bold mb-4 dark:text-white">
                What's Included?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features?.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <FiCheckCircle className="text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg sticky top-24 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-6 dark:text-white">
                Booking Summary
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <FiDollarSign className="text-primary text-xl" />
                  <span className="font-semibold text-lg">
                    ৳ {service.price} / day
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <FiClock className="text-primary text-xl" />
                  <span>24/7 Service Available</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <FiMapPin className="text-primary text-xl" />
                  <span>Available in Major Cities</span>
                </div>
              </div>

              <button
                onClick={handleBookService}
                className="w-full py-4 bg-primary hover:bg-sky-600 text-white font-bold rounded-lg transition-colors text-lg shadow-md"
              >
                Book This Service
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                No payment required now. Pay after service.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
