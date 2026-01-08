"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const sliderData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?q=80&w=1925&auto=format&fit=crop",
    title: "Reliable Care for Your Family",
    subtitle: "Professional Baby Sitting, Elderly Care & Patient Support",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop", // Baby Care Image
    title: "Expert Baby Sitting Service",
    subtitle: "Safe, engaging, and loving care for your little ones.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=2070&auto=format&fit=crop", // Elderly Care Image
    title: "Compassionate Elderly Care",
    subtitle: "Dignified assistance and companionship for seniors.",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[85vh] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image Setup */}
          <div className="relative w-full h-full">
            <img
              src={sliderData[current].image}
              alt={sliderData[current].title}
              className="w-full h-full object-cover opacity-60"
            />

            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          key={`h1-${current}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
        >
          {sliderData[current].title}
        </motion.h1>

        <motion.p
          key={`p-${current}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl drop-shadow-md"
        >
          {sliderData[current].subtitle}
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <a
            href="#services"
            className="px-8 py-3 bg-primary hover:bg-sky-600 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-primary/50"
          >
            Find Care Now
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-3">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-primary w-8"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
