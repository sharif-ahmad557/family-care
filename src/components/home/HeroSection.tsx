"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2070&auto=format&fit=crop"
          alt="Caregiving Background"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Reliable Care for Your{" "}
          <span className="text-primary">Loved Ones</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200"
        >
          Professional babysitting, elderly care, and special support services
          right at your doorstep. Safe, secure, and trusted by thousands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/services"
            className="px-8 py-3 bg-primary text-white text-lg font-semibold rounded-full hover:bg-sky-600 transition-all shadow-lg hover:shadow-primary/50"
          >
            Find a Caretaker
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
