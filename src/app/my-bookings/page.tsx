"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, MapPin, Clock, XCircle } from "lucide-react"; // XCircle আইকন যোগ করা হয়েছে
import toast from "react-hot-toast";

interface Booking {
  _id: string;
  serviceName: string;
  totalCost: number;
  duration: number;
  status: string;
  createdAt: string;
  location: {
    area: string;
    district: string;
  };
}

export default function MyBookingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [fetching, setFetching] = useState(true);

  // ডাটা আনার ফাংশন
  const fetchBookings = async () => {
    try {
      const res = await fetch(`/api/my-bookings?email=${user?.email}`);
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }
    if (user?.email) {
      fetchBookings();
    }
  }, [user, loading, router]);

  // ⚠️ ক্যানসেল হ্যান্ডলার ফাংশন
  const handleCancel = async (bookingId: string) => {
    // কনফার্মেশন অ্যালার্ট
    const isConfirmed = confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!isConfirmed) return;

    try {
      const res = await fetch("/api/booking/cancel", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: bookingId }),
      });

      if (res.ok) {
        toast.success("Booking Cancelled Successfully");
        fetchBookings(); // ডাটা আবার রিফ্রেশ করা
      } else {
        toast.error("Failed to cancel booking");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  if (loading || fetching) {
    return (
      <div className="text-center py-20 text-xl">Loading your bookings...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold mb-8 text-primary">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="text-center bg-white dark:bg-gray-900 p-10 rounded-xl shadow border border-gray-100 dark:border-gray-800">
            <p className="text-xl text-gray-500 mb-4">
              You haven't booked any service yet.
            </p>
            <Link
              href="/"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-sky-600"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                {/* Left: Info */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {booking.serviceName}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{booking.duration} Days</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {booking.location.area}, {booking.location.district}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions & Status */}
                <div className="flex flex-col md:flex-row items-end md:items-center gap-4 md:gap-6 w-full md:w-auto">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Cost</p>
                    <p className="text-2xl font-bold text-primary">
                      ৳{booking.totalCost}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold capitalize ${
                        booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500"
                          : booking.status === "Cancelled"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {booking.status}
                    </span>

                    {/* Cancel Button (Only show if Pending) */}
                    {booking.status === "Pending" && (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                      >
                        <XCircle className="h-4 w-4" /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
