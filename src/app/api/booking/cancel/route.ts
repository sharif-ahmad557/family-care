import { connectDB } from "@/lib/db";
import { Booking } from "@/models/Booking";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Booking ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status: "Cancelled" },
      { new: true }
    );

    if (!updatedBooking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Booking cancelled successfully", booking: updatedBooking },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cancel Error:", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
