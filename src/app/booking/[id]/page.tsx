"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { services } from "@/constants/services";
import { divisions, districts } from "@/constants/locations";
import toast from "react-hot-toast";

export default function BookingPage() {
  const { id } = useParams(); 
  const { user, loading } = useAuth();
  const router = useRouter();

  const service = services.find((s) => s.id === id);

  const [duration, setDuration] = useState(1);
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login to book a service.");
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !service) {
    return <div className="text-center py-20">Loading...</div>;
  }

  const totalCost = parseInt(service.price) * duration;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!division || !district || !area || !address) {
      toast.error("Please fill in all address fields.");
      return;
    }

    setIsSubmitting(true);

    const bookingData = {
      userId: user?.uid,
      userName: user?.displayName,
      userEmail: user?.email,
      serviceId: service.id,
      serviceName: service.title,
      pricePerDay: parseInt(service.price),
      duration,
      totalCost,
      location: {
        division,
        district,
        area,
        address,
      },
      status: "Pending",
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) throw new Error("Booking failed");

      toast.success("Booking Confirmed! Check your dashboard.");
      router.push("/my-bookings"); 
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row">
        {/* Left Side: Service Summary */}
        <div className="w-full md:w-1/3 bg-primary/10 p-6 md:p-8">
          <h2 className="text-xl font-bold text-primary mb-4">
            Service Details
          </h2>
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h3 className="text-lg font-bold dark:text-gray-800">
            {service.title}
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            {service.description.slice(0, 100)}...
          </p>

          <div className="mt-6 border-t border-gray-300 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700 font-medium">Price/Day:</span>
              <span className="font-bold">৳{service.price}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700 font-medium">Duration:</span>
              <span className="font-bold">{duration} Days</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-primary mt-4 pt-4 border-t border-gray-300">
              <span>Total:</span>
              <span>৳{totalCost}</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            Complete Booking
          </h2>

          <form onSubmit={handleBooking} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                Service Duration (Days)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {/* Location Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Division
                </label>
                <select
                  value={division}
                  onChange={(e) => {
                    setDivision(e.target.value);
                    setDistrict(""); 
                  }}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="">Select Division</option>
                  {divisions.map((div) => (
                    <option key={div} value={div}>
                      {div}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                  District
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  disabled={!division}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none disabled:opacity-50"
                >
                  <option value="">Select District</option>
                  {division &&
                    districts[division]?.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Area / Thana
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Mirpur 10"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                  House Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House 12, Road 5..."
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-primary text-white font-bold text-lg rounded-lg hover:bg-sky-600 transition-colors shadow-lg hover:shadow-primary/30 disabled:opacity-70"
            >
              {isSubmitting
                ? "Processing..."
                : `Confirm Booking (৳${totalCost})`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}