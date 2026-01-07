import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";
import { sendEmail } from "@/lib/email";

// বুকিং তৈরি করার জন্য POST মেথড
export async function POST(request) {
  try {
    const body = await request.json();

    await connectDB();

    // ১. নতুন বুকিং ডাটাবেসে তৈরি করা
    const newBooking = await Booking.create(body);

    // ২. ইমেইল ইনভয়েস টেমপ্লেট সাজানো
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #0EA5E9;">Booking Confirmation - Family Care</h2>
        <p>Dear <strong>${body.userName}</strong>,</p>
        <p>Thank you for choosing Family Care. Your booking has been received successfully.</p>
        
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Invoice Details</h3>
          <p><strong>Service:</strong> ${body.serviceTitle}</p>
          <p><strong>Start Date:</strong> ${new Date(
            body.startDate
          ).toLocaleDateString()}</p>
          <p><strong>Duration:</strong> ${body.duration} Days</p>
          <p><strong>Address:</strong> ${body.address.details}, ${
      body.address.district
    }, ${body.address.division}</p>
          <hr style="border: 1px solid #ddd;">
          <p style="font-size: 18px;"><strong>Total Cost: ৳ ${
            body.totalCost
          }</strong></p>
        </div>

        <p>Status: <span style="color: orange;">Pending</span></p>
        <p>Please keep this email for your records. Our representative will contact you soon.</p>
        <br>
        <p>Best Regards,<br>Family Care Team</p>
      </div>
    `;

    // ৩. ইমেইল পাঠানো
    await sendEmail({
      to: body.userEmail,
      subject: `Booking Confirmed: ${body.serviceTitle}`,
      html: emailHtml,
    });

    return NextResponse.json(
      {
        message: "Booking created and email sent successfully",
        bookingId: newBooking._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json(
      { message: "Failed to create booking", error: error.message },
      { status: 500 }
    );
  }
}

// ইউজারের সব বুকিং দেখার জন্য GET মেথড
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const bookings = await Booking.find({ userEmail: email }).sort({
      createdAt: -1,
    });

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
