import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Service from "@/models/Service";

export async function GET() {
  await connectDB();

  const services = [
    {
      title: "Baby Care",
      slug: "baby-care",
      description:
        "Professional and loving care for your little ones. We ensure safety, engagement, and routine management.",
      image:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop",
      price: 1500,
      features: [
        "Feeding & Bathing",
        "Playtime & Learning",
        "Sleep Routine",
        "Emergency Support",
      ],
    },
    {
      title: "Elderly Care",
      slug: "elderly-care",
      description:
        "Compassionate companionship and assistance for senior family members. Helping them live with dignity.",
      image:
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1976&auto=format&fit=crop",
      price: 2000,
      features: [
        "Medication Management",
        "Mobility Assistance",
        "Companionship",
        "Daily Chores",
      ],
    },
    {
      title: "Sick People Service",
      slug: "sick-care",
      description:
        "Dedicated nursing and support for recovering patients or chronically ill family members.",
      image:
        "https://images.unsplash.com/photo-1584515933487-9bdb2f2a693f?q=80&w=2070&auto=format&fit=crop",
      price: 2500,
      features: [
        "Vital Signs Monitoring",
        "Wound Care",
        "Personal Hygiene",
        "Doctor Coordination",
      ],
    },
  ];

  try {
    await Service.deleteMany({});

    await Service.insertMany(services);

    return NextResponse.json({ message: "✅ Services seeded successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
