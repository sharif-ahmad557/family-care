import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";

// বুকিং ক্যানসেল বা আপডেট করার জন্য PATCH মেথড
export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();

  try {
    await connectDB();

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status: body.status }, // যেমন: "Cancelled"
      { new: true }
    );

    if (!updatedBooking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Booking updated",
      booking: updatedBooking,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
