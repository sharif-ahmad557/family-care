"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import {
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiShare2,
  FiStar,
  FiUser,
  FiShield,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ServiceDetailsClient({ id }) {
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
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

        const allRes = await fetch("/api/services");
        const allData = await allRes.json();
        const others = allData.filter((s) => s._id !== id).slice(0, 3);
        setRelatedServices(others);
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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!service) return null;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Hero Banner with Share Button */}
      <div className="relative h-[400px] md:h-[500px]">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end pb-12 px-4">
          <div className="max-w-7xl mx-auto w-full flex justify-between items-end">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold text-white mb-2"
              >
                {service.title}
              </motion.h1>
              <div className="flex items-center gap-2 text-yellow-400">
                <FiStar className="fill-current" />
                <span className="text-white font-medium">
                  4.9 (120+ Reviews)
                </span>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="bg-white/20 backdrop-blur hover:bg-white/30 text-white p-3 rounded-full transition-all"
              title="Share Service"
            >
              <FiShare2 size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-6 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">
                Service Overview
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
                {service.description}
              </p>

              <h3 className="text-xl font-bold mb-4 dark:text-white">
                What's Included?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features?.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <FiCheckCircle className="text-primary text-xl flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Why Choose This Service */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <FiShield />,
                  title: "Verified Staff",
                  desc: "Background checked professionals",
                },
                {
                  icon: <FiClock />,
                  title: "24/7 Support",
                  desc: "Always here when you need us",
                },
                {
                  icon: <FiUser />,
                  title: "Expert Care",
                  desc: "Trained and certified caregivers",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-primary text-3xl mb-3 flex justify-center">
                    {item.icon}
                  </div>
                  <h4 className="font-bold dark:text-white">{item.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* User Reviews (Fake Data) */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold mb-6 dark:text-white">
                Customer Reviews
              </h3>
              <div className="space-y-6">
                {[1, 2].map((review) => (
                  <div
                    key={review}
                    className="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-6 last:pb-0"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div>
                        <h5 className="font-bold dark:text-white">
                          Happy Parent
                        </h5>
                        <div className="flex text-yellow-400 text-xs">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} className="fill-current" />
                          ))}
                        </div>
                      </div>
                      <span className="ml-auto text-sm text-gray-400">
                        2 days ago
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      "Excellent service! The caregiver was very polite and
                      professional. Highly recommended."
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Pricing Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-xl font-bold mb-6 dark:text-white">
                  Booking Summary
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <FiDollarSign className="text-primary text-xl" />
                      <span className="font-medium">Daily Rate</span>
                    </div>
                    <span className="font-bold text-lg text-primary">
                      ৳ {service.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 p-3">
                    <FiClock className="text-primary text-xl" />
                    <span>Duration: Flexible</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 p-3">
                    <FiMapPin className="text-primary text-xl" />
                    <span>Location: All Major Cities</span>
                  </div>
                </div>

                <button
                  onClick={handleBookService}
                  className="w-full py-4 bg-primary hover:bg-sky-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-primary/30 flex justify-center items-center gap-2"
                >
                  Book Now <FiCheckCircle />
                </button>
                <p className="text-center text-xs text-gray-500 mt-4">
                  Safe & Secure Booking Process
                </p>
              </motion.div>

              {/* Related Services */}
              <div>
                <h4 className="font-bold text-lg mb-4 dark:text-white">
                  You may also like
                </h4>
                <div className="space-y-4">
                  {relatedServices.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => router.push(`/services/${item._id}`)}
                      className="flex gap-4 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all group"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h5 className="font-bold text-sm dark:text-white group-hover:text-primary transition-colors">
                          {item.title}
                        </h5>
                        <p className="text-xs text-gray-500 mt-1">
                          Starting at ৳ {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
