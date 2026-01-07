import connectDB from "@/lib/db";
import Service from "@/models/Service";
import ServiceDetailsClient from "@/components/ServiceDetailsClient";

// 1. Dynamic Metadata Generation (SEO)
export async function generateMetadata({ params }) {
  const { id } = await params;

  await connectDB();
  const service = await Service.findById(id);

  if (!service) {
    return {
      title: "Service Not Found | Family Care",
    };
  }

  return {
    title: `${service.title} | Family Care`,
    description: service.description.substring(0, 160), // প্রথম ১৬০ অক্ষর
    openGraph: {
      images: [service.image],
    },
  };
}

// 2. Main Page Component
export default async function ServiceDetailsPage({ params }) {
  const { id } = await params;
  return <ServiceDetailsClient id={id} />;
}
