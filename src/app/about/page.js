"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiAward,
  FiHeart,
  FiShield,
  FiClock,
  FiCheck,
  FiLinkedin,
  FiTwitter,
  FiFacebook,
} from "react-icons/fi";
import Link from "next/link";

// Counter Component for Stats
const Counter = ({ target, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target.substring(0, 3)); // শুধু সংখ্যাটুকু নিবে (যেমন 5k থেকে 5)
    if (start === end) return;

    let totalMilSec = duration * 1000;
    let incrementTime = totalMilSec / end;

    let timer = setInterval(() => {
      start += 1;
      setCount(String(start) + target.substring(String(start).length));
      if (start === end) {
        clearInterval(timer);
        setCount(target);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}</span>;
};

export default function AboutPage() {
  // Team Data
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Ayesha Siddiqua",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
      bio: "Former pediatrician with 15 years of experience in child and elderly health management.",
    },
    {
      id: 2,
      name: "Rahim Uddin",
      role: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop",
      bio: "Expert in logistics and caregiver training ensuring top-notch service quality.",
    },
    {
      id: 3,
      name: "Fatima Begum",
      role: "Senior Nurse Supervisor",
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
      bio: "Certified nurse ensuring all medical protocols are followed strictly.",
    },
  ];

  // Core Values Data
  const values = [
    {
      icon: <FiShield />,
      title: "Integrity",
      desc: "We conduct thorough background checks to ensure 100% safety.",
    },
    {
      icon: <FiHeart />,
      title: "Empathy",
      desc: "We treat your family members with the same love we would our own.",
    },
    {
      icon: <FiClock />,
      title: "Reliability",
      desc: "Punctuality and consistency are the pillars of our service.",
    },
    {
      icon: <FiAward />,
      title: "Excellence",
      desc: "Continuous training ensures our caregivers are the best in the field.",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />

      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[400px] flex items-center justify-center bg-fixed bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1976&auto=format&fit=crop')]">
        <div className="absolute inset-0 bg-black/60"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            About Family Care
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto drop-shadow-md">
            Dedicated to providing the most reliable and compassionate care
            services across Bangladesh.
          </p>
        </motion.div>
      </div>

      {/* Our Story & Mission */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop"
                alt="Our Story"
                className="rounded-2xl shadow-2xl w-full z-10 relative"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full -z-0 blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full -z-0 blur-2xl"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-primary font-bold uppercase tracking-wide mb-2">
              Our Journey
            </h4>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Caring for Families Since 2020
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
              Family Care started with a personal struggle. When our founder
              couldn't find reliable care for her aging parents, she realized
              the gap in the system.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
              Today, our mission is to bridge that gap. We connect busy
              professionals with trained caregivers, ensuring that no family
              member feels neglected. We believe in care that goes beyond just
              duty—it's about building relationships.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <FiCheck />
                </div>
                <span className="font-medium dark:text-white">
                  Verified Professionals
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <FiCheck />
                </div>
                <span className="font-medium dark:text-white">
                  Emergency Support
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-100 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These principles guide every decision we make and every service we
              provide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 mx-auto bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-3xl text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">
                  {val.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
            <div className="p-4">
              <h3 className="text-4xl md:text-5xl font-bold mb-2">
                <Counter target="5000+" duration={2} />
              </h3>
              <p className="text-white/80">Happy Families</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl md:text-5xl font-bold mb-2">
                <Counter target="500+" duration={2} />
              </h3>
              <p className="text-white/80">Caregivers</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl md:text-5xl font-bold mb-2">
                <Counter target="12+" duration={2} />
              </h3>
              <p className="text-white/80">Cities Covered</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl md:text-5xl font-bold mb-2">4.9</h3>
              <p className="text-white/80">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Leaders
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The minds behind Family Care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group border border-gray-100 dark:border-gray-700"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Social Overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href="#"
                    className="bg-white p-2 rounded-full text-primary hover:text-sky-700"
                  >
                    <FiLinkedin size={20} />
                  </a>
                  <a
                    href="#"
                    className="bg-white p-2 rounded-full text-primary hover:text-sky-700"
                  >
                    <FiTwitter size={20} />
                  </a>
                  <a
                    href="#"
                    className="bg-white p-2 rounded-full text-primary hover:text-sky-700"
                  >
                    <FiFacebook size={20} />
                  </a>
                </div>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-gray-900 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Ready to find the best care for your family?
          </h2>
          <p className="mb-8 text-gray-300">
            Join thousands of satisfied families who trust Care.IO for their
            loved ones.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/services"
              className="px-8 py-3 bg-primary rounded-full font-bold hover:bg-sky-600 transition"
            >
              Book a Service
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-transparent border border-white rounded-full font-bold hover:bg-white hover:text-gray-900 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
