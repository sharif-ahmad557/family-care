"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiCheck,
  FiDollarSign,
  FiInfo,
} from "react-icons/fi";

const locations = {
  Dhaka: ["Dhaka City", "Gazipur", "Narayanganj", "Tangail"],
  Chittagong: ["Chittagong City", "Cox's Bazar", "Comilla", "Feni"],
  Sylhet: ["Sylhet City", "Sunamganj", "Habiganj", "Moulvibazar"],
  Rajshahi: ["Rajshahi City", "Bogra", "Pabna", "Sirajganj"],
  Khulna: ["Khulna City", "Jessore", "Kushtia", "Satkhira"],
  Barisal: ["Barisal City", "Bhola", "Patuakhali"],
  Rangpur: ["Rangpur City", "Dinajpur", "Kurigram"],
  Mymensingh: ["Mymensingh City", "Jamalpur", "Sherpur"],
};

export default function BookingPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form States
  const [duration, setDuration] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Get Today's Date for Restriction
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${id}`);
        if (!res.ok) throw new Error("Service not found");
        const data = await res.json();
        setService(data);
        setTotalCost(data.price);
      } catch (error) {
        toast.error("Could not load service");
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchService();
  }, [id, router]);

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("You must be logged in to view this page");
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (service) {
      setTotalCost(service.price * duration);
    }
  }, [duration, service]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!startDate || !division || !district || !address) {
      toast.error("Please fill all the fields");
      return;
    }

    setBookingLoading(true);

    const bookingData = {
      userId: user.uid,
      userName: user.displayName || "Unknown User",
      userEmail: user.email,
      serviceId: service._id,
      serviceTitle: service.title,
      pricePerDay: service.price,
      duration: parseInt(duration),
      totalCost: totalCost,
      startDate: new Date(startDate),
      address: {
        division,
        district,
        details: address,
      },
      status: "Pending",
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        toast.success("Booking Confirmed Successfully!");
        router.push("/my-bookings");
      } else {
        throw new Error("Booking failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!service || !user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-primary py-12 text-center text-white mb-8">
        <h1 className="text-3xl font-bold">Secure Your Booking</h1>
        <p className="opacity-90">Almost there! Just a few details away.</p>

        {/* Progress Steps */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center font-bold">
              1
            </span>
            <span className="font-medium">Details</span>
          </div>
          <div className="w-12 h-0.5 bg-white/50"></div>
          <div className="flex items-center gap-2 opacity-60">
            <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              2
            </span>
            <span>Confirm</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Service Preview */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
              <img
                src={service.image}
                alt={service.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">
                  You are booking
                </p>
                <h2 className="text-xl font-bold dark:text-white">
                  {service.title}
                </h2>
                <p className="text-primary font-medium">
                  ৳ {service.price} / day
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-6 dark:text-white flex items-center gap-2">
                <FiCalendar className="text-primary" /> Schedule & Location
              </h2>

              <form onSubmit={handleBooking} className="space-y-6">
                {/* Date & Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                      Start Date
                    </label>
                    <input
                      type="date"
                      required
                      min={today} // Past date restriction
                      className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                      Duration (Days)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={duration}
                      className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                </div>

                {/* Location Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                      Division
                    </label>
                    <select
                      className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                      value={division}
                      onChange={(e) => {
                        setDivision(e.target.value);
                        setDistrict("");
                      }}
                      required
                    >
                      <option value="">Select Division</option>
                      {Object.keys(locations).map((div) => (
                        <option key={div} value={div}>
                          {div}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                      District/City
                    </label>
                    <select
                      className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      disabled={!division}
                      required
                    >
                      <option value="">Select District</option>
                      {division &&
                        locations[division].map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Detailed Address */}
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300 flex items-center gap-2">
                    Full Address <FiMapPin className="text-gray-400" />
                  </label>
                  <textarea
                    rows="3"
                    required
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    placeholder="e.g. House 12, Road 5, Block B, Niketon"
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>

                {/* Info Note */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex gap-3 text-sm text-blue-800 dark:text-blue-200">
                  <FiInfo className="mt-0.5 text-lg" />
                  <p>
                    Our representative will call you within 2 hours to confirm
                    your location and requirements before dispatching the
                    caregiver.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full py-4 bg-primary hover:bg-sky-600 text-white font-bold rounded-xl transition-all shadow-md lg:hidden"
                >
                  {bookingLoading
                    ? "Processing..."
                    : `Confirm & Pay ৳ ${totalCost}`}
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 sticky top-24">
              <h3 className="text-lg font-bold mb-6 pb-4 border-b dark:border-gray-700 dark:text-white flex items-center gap-2">
                <FiDollarSign /> Cost Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Rate per day</span>
                  <span className="font-medium">৳ {service.price}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Duration</span>
                  <span className="font-medium">× {duration} Days</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Service Fee</span>
                  <span className="text-green-500 font-medium">Free</span>
                </div>
              </div>

              <div className="border-t dark:border-gray-700 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900 dark:text-white">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    ৳ {totalCost}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-right">
                  Includes VAT & Taxes
                </p>
              </div>

              {/* Submit Button (Desktop Only) */}
              <button
                onClick={handleBooking}
                disabled={bookingLoading}
                className="hidden lg:flex w-full py-4 bg-primary hover:bg-sky-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-primary/30 justify-center items-center gap-2"
              >
                {bookingLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Confirm Booking <FiCheck />
                  </>
                )}
              </button>

              <div className="mt-6 flex justify-center gap-4 grayscale opacity-60">
                {/* Dummy Payment Icons */}
                <div className="h-6 w-10 bg-gray-200 rounded"></div>
                <div className="h-6 w-10 bg-gray-200 rounded"></div>
                <div className="h-6 w-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
