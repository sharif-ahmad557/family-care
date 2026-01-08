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
        "Professional and loving care for your little ones. We ensure safety, engagement, sleep routine management, and healthy feeding habits.",
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
        "Compassionate companionship and assistance for senior family members. Helping them live with dignity and comfort in their own home.",
      image:
        "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=2070&auto=format&fit=crop",
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
        "Dedicated nursing and support for recovering patients. Our nurses are trained to handle post-surgery care and chronic illness monitoring.",
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop",
      price: 2500,
      features: [
        "Vital Signs Monitoring",
        "Wound Care",
        "Personal Hygiene",
        "Doctor Coordination",
      ],
    },
    {
      title: "Physiotherapy at Home",
      slug: "physiotherapy",
      description:
        "Certified physiotherapists providing therapy for pain relief, mobility improvement, and rehabilitation after accidents or surgery.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
      price: 3000,
      features: [
        "Pain Management",
        "Mobility Exercises",
        "Post-Op Rehab",
        "Muscle Strengthening",
      ],
    },
    {
      title: "Special Child Care",
      slug: "special-child-care",
      description:
        "Specialized care for children with special needs. Our caregivers are trained in behavioral therapy and emotional support.",
      image:
        "https://plus.unsplash.com/premium_photo-1663089688180-444ff0066e5d?q=80&w=2070&auto=format&fit=crop",
      price: 2200,
      features: [
        "Behavioral Support",
        "Sensory Activities",
        "Personal Assistance",
        "Safe Environment",
      ],
    },
    {
      title: "Nanny Service",
      slug: "nanny-service",
      description:
        "Full-time or part-time nanny service for busy parents. We take care of your child's daily routine, schooling, and meals.",
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1972&auto=format&fit=crop",
      price: 1800,
      features: [
        "School Pick/Drop",
        "Homework Help",
        "Meal Preparation",
        "Creative Play",
      ],
    },
  ];

  try {
    await Service.deleteMany({});
    await Service.insertMany(services);
    return NextResponse.json({
      message: "✅ Services updated successfully with FIXED images!",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
