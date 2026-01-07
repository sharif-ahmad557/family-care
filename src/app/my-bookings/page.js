"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function MyBookingsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.email) return;

      try {
        const res = await fetch(`/api/bookings?email=${user.email}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error(error);
        toast.error("Could not load your bookings");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      if (!user) {
        router.push("/login"); 
      } else {
        fetchBookings();
      }
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h2 className="text-xl text-gray-600 dark:text-gray-300">
              No bookings found!
            </h2>
            <p className="mt-2 text-gray-500">
              You haven't booked any service yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
                  <th className="p-4">Service</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Total Cost</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <td className="p-4 font-semibold dark:text-white">
                      {booking.serviceTitle}
                    </td>
                    <td className="p-4 dark:text-gray-300">
                      {new Date(booking.startDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 dark:text-gray-300">
                      {booking.duration} Days
                    </td>
                    <td className="p-4 font-bold text-primary">
                      ৳ {booking.totalCost}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold 
                        ${
                          booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        className="text-red-500 hover:underline text-sm disabled:opacity-50"
                        disabled
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
