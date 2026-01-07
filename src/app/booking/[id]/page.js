"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";

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

  const [duration, setDuration] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(false);

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
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!service || !user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">
          Complete Your Booking
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Booking Details
            </h2>

            <form onSubmit={handleBooking} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={duration}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                    Division
                  </label>
                  <select
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                    District/City
                  </label>
                  <select
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                  Full Address (Road, House, Area)
                </label>
                <textarea
                  rows="3"
                  required
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="e.g. House 12, Road 5, Block B"
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={bookingLoading}
                className="w-full py-3 bg-primary hover:bg-sky-600 text-white font-bold rounded-lg transition-colors mt-4 disabled:opacity-50"
              >
                {bookingLoading ? "Processing..." : "Confirm Booking"}
              </button>
            </form>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg sticky top-24 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4 border-b pb-2 dark:text-white">
                Cost Summary
              </h3>

              <div className="flex justify-between mb-2 text-gray-600 dark:text-gray-300">
                <span>Service Charge</span>
                <span>৳ {service.price} / day</span>
              </div>
              <div className="flex justify-between mb-4 text-gray-600 dark:text-gray-300">
                <span>Duration</span>
                <span>{duration} Days</span>
              </div>

              <div className="border-t pt-4 flex justify-between font-bold text-xl text-primary">
                <span>Total Cost</span>
                <span>৳ {totalCost}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
