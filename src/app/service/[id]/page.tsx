import { services } from "@/constants/services";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, Clock, MapPin } from "lucide-react";
import { Metadata } from "next";

interface ServiceDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ServiceDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    return {
      title: "Service Not Found | Family Care",
    };
  }

  return {
    title: `${service.title} Service | Family Care`,
    description: service.description,
  };
}

export default async function ServiceDetailsPage({
  params,
}: ServiceDetailsProps) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
          {/* Forced Row Layout */}
          <div className="flex flex-row">
            {/* Image Section */}
            <div className="w-1/2 relative min-h-[400px]">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>

            {/* Content Section */}
            <div className="w-1/2 p-6 md:p-12 flex flex-col justify-center">
              <div className="uppercase tracking-wide text-sm text-primary font-bold mb-2">
                Professional Service
              </div>

              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {service.title}
              </h1>

              <div className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Verified & Trained Caretakers</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Clock className="h-5 w-5 text-blue-500 mr-3" />
                  <span>Flexible Duration</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <MapPin className="h-5 w-5 text-red-500 mr-3" />
                  <span>Available in your area</span>
                </div>
              </div>

              <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <span className="block text-sm text-gray-500 dark:text-gray-400">
                    Starting from
                  </span>
                  <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    ৳{service.price}{" "}
                    <span className="text-base font-normal text-gray-500">
                      / day
                    </span>
                  </span>
                </div>

                <Link
                  href={`/booking/${service.id}`}
                  className="px-6 py-3 bg-primary text-white text-center font-semibold rounded-lg hover:bg-sky-600 transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
