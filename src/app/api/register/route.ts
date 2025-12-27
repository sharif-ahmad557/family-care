import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone, nid } = await req.json();

    // ১. ডাটাবেস কানেক্ট করা
    await connectDB();

    // ২. চেক করা ইউজার আগে থেকেই আছে কিনা
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists in database" },
        { status: 400 }
      );
    }

    // ৩. নতুন ইউজার তৈরি করা
    await User.create({ name, email, phone, nid });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
