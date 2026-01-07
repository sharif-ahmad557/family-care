import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Service from "@/models/Service";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    console.log("Requested ID:", id);

    await connectDB();

    const service = await Service.findById(id);

    if (!service) {
      return NextResponse.json(
        { message: "Service not found in Database" },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("API Error Details:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
