import { services } from "@/constants/services";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Our Care Services
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            We provide professional care services tailored to your family's
            needs.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description}
              image={service.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
