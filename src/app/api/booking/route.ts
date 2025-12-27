import { connectDB } from "@/lib/db";
import { Booking } from "@/models/Booking";
import { NextResponse } from "next/server";
import { sendInvoiceEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📦 Booking Request Received for:", body.userEmail); 

    await connectDB();

    const newBooking = await Booking.create(body);

    if (body.userEmail) {
      await sendInvoiceEmail(
        body.userEmail,
        body.userName,
        body.serviceName,
        body.totalCost,
        newBooking._id.toString()
      );
    } else {
      console.log("⚠️ No email address provided in booking body!");
    }

    return NextResponse.json(
      { message: "Booking placed successfully", booking: newBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json(
      { message: "Failed to place booking" },
      { status: 500 }
    );
  }
}
