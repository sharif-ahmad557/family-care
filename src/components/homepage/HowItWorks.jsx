"use client";

import { motion } from "framer-motion";
import { FiSearch, FiCalendar, FiHeart } from "react-icons/fi";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FiSearch className="w-8 h-8" />,
      title: "Select Service",
      desc: "Browse our list of professional care services and choose the one that fits your family's specific needs.",
    },
    {
      id: 2,
      icon: <FiCalendar className="w-8 h-8" />,
      title: "Schedule & Book",
      desc: "Select your preferred dates, location, and duration. Our system calculates the cost instantly.",
    },
    {
      id: 3,
      icon: <FiHeart className="w-8 h-8" />,
      title: "Get Care",
      desc: "Relax as our verified and compassionate caregiver arrives at your doorstep to provide the best care.",
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Get reliable care in just 3 simple steps
          </p>
        </motion.div>

        {/* Steps Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gray-200 dark:bg-gray-700 -z-10 rounded-full"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group flex flex-col items-center text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
            >
              <span className="absolute -right-4 -top-4 text-9xl font-bold text-gray-50 dark:text-gray-700/50 opacity-50 group-hover:text-primary/10 transition-colors duration-300 select-none">
                {step.id}
              </span>

              {/* Icon Container */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 z-10 shadow-lg"
              >
                {step.icon}
              </motion.div>

              {/* Title & Desc */}
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white z-10">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed z-10">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
