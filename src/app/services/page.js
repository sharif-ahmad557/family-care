"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight, FiSearch, FiFilter } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceSort, setPriceSort] = useState("default"); // default, lowToHigh, highToLow

  const categories = [
    "All",
    "Child Care",
    "Elderly Care",
    "Medical",
    "Therapy",
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(data);
        setFilteredServices(data);
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Filtering Logic
  useEffect(() => {
    let result = services;

    // 1. Search Filter
    if (searchTerm) {
      result = result.filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Category Filter
    if (selectedCategory !== "All") {
      if (selectedCategory === "Child Care") {
        result = result.filter(
          (s) =>
            s.title.includes("Baby") ||
            s.title.includes("Child") ||
            s.title.includes("Nanny")
        );
      } else if (selectedCategory === "Elderly Care") {
        result = result.filter((s) => s.title.includes("Elderly"));
      } else if (selectedCategory === "Medical") {
        result = result.filter(
          (s) => s.title.includes("Sick") || s.title.includes("Patient")
        );
      } else if (selectedCategory === "Therapy") {
        result = result.filter((s) => s.title.includes("Physiotherapy"));
      }
    }

    // 3. Sorting
    if (priceSort === "lowToHigh") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (priceSort === "highToLow") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    setFilteredServices(result);
  }, [searchTerm, selectedCategory, priceSort, services]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />

      {/* Hero Header with Search */}
      <div className="relative bg-primary py-24 text-center text-white overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find the Perfect Care
          </h1>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Professional and verified care solutions tailored for your family's
            needs.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for a service (e.g., Baby Care, Elderly...)"
              className="w-full py-4 pl-12 pr-4 rounded-full text-gray-900 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters & Sorting Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-500" />
            <select
              className="bg-transparent text-gray-700 dark:text-gray-300 font-medium focus:outline-none cursor-pointer"
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
            >
              <option value="default">Sort by: Default</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={service._id}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group flex flex-col"
                  >
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                        Best Seller
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed flex-grow">
                        {service.description}
                      </p>

                      <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center mt-auto">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Starting at
                          </p>
                          <span className="text-primary font-bold text-xl">
                            ৳ {service.price}{" "}
                            <span className="text-sm text-gray-500 font-normal">
                              / day
                            </span>
                          </span>
                        </div>
                        <Link
                          href={`/services/${service._id}`}
                          className="flex items-center gap-2 text-white bg-primary px-5 py-2.5 rounded-lg hover:bg-sky-600 transition-colors shadow-md hover:shadow-lg"
                        >
                          Book Now <FiArrowRight />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <h3 className="text-2xl font-bold text-gray-400">
                    No services found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filters.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  );
}
