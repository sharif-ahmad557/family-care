import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(request) {
  try {
    const { name, email, phone, nid } = await request.json();

    await connectDB();

    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { message: "User already exists in database" },
        { status: 400 }
      );
    }

    await User.create({
      name,
      email,
      phone,
      nid,
    });

    return NextResponse.json(
      { message: "User registered successfully in MongoDB" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "Error registering user", error: error.message },
      { status: 500 }
    );
  }
}
