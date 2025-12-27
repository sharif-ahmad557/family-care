import { connectDB } from "@/lib/db";
import { Booking } from "@/models/Booking";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email required" }, { status: 400 });
    }

    await connectDB();

    const bookings = await Booking.find({ userEmail: email }).sort({
      createdAt: -1,
    });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
