import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function ServiceCard({
  id,
  title,
  description,
  image,
}: ServiceProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700">
      <div className="relative h-48 w-full">
        {/* Next.js Image ব্যবহার করছি না কারণ external domain config করা লাগতে পারে, তাই সাধারণ img ট্যাগ ব্যবহার করছি সহজ রাখার জন্য */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
          {description}
        </p>

        <Link
          href={`/service/${id}`}
          className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all"
        >
          View Details <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
