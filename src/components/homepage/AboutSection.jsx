"use client";

import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiShield, FiDollarSign } from "react-icons/fi";

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const features = [
    {
      id: 1,
      title: "Trusted Caregivers",
      desc: "All our staff are verified with background checks and NID verification.",
      icon: <FiShield className="w-10 h-10" />,
    },
    {
      id: 2,
      title: "24/7 Support",
      desc: "We are always available to assist you with any emergency requirements.",
      icon: <FiClock className="w-10 h-10" />,
    },
    {
      id: 3,
      title: "Affordable Plans",
      desc: "Customizable packages based on your specific duration and needs.",
      icon: <FiDollarSign className="w-10 h-10" />,
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose <span className="text-primary">Care.IO?</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Our mission is to make caregiving easy, secure, and accessible for
            everyone. We provide verified professionals to ensure your loved
            ones are in safe hands.
          </p>
        </motion.div>

        {/* Cards Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover={{ y: -10 }} // হোভার করলে ১০ পিক্সেল উপরে উঠবে
              className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-2xl border border-transparent hover:border-primary/20 transition-all duration-300 cursor-pointer"
            >
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-primary/10 text-primary rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
