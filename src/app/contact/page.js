"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiPlus,
  FiMinus,
} from "react-icons/fi";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // FAQ Data
  const faqs = [
    {
      id: 1,
      question: "What is your average response time?",
      answer:
        "We usually respond within 2-4 hours during business days. For emergencies, please call our hotline.",
    },
    {
      id: 2,
      question: "Can I visit your office directly?",
      answer:
        "Yes, you are welcome to visit our HQ at Gulshan-1 during office hours (9 AM - 6 PM).",
    },
    {
      id: 3,
      question: "Do you offer support on weekends?",
      answer:
        "Yes, our support team is available 24/7 for active bookings and emergencies.",
    },
  ];

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success(
        "Message sent successfully! We'll get back to you shortly."
      );
      setLoading(false);
      e.target.reset();
    }, 1500);
  };

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-primary py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Have questions or need assistance? We are here to help you 24/7.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Side: Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Get in Touch
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Whether you have a question about services, pricing, or need
                emergency support, our team is ready to answer all your
                questions.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: <FiMapPin />,
                    title: "Head Office",
                    desc: "Level 4, Care Tower, Gulshan-1, Dhaka",
                  },
                  {
                    icon: <FiPhone />,
                    title: "Phone",
                    desc: "+880 1712 345 678 (24/7 Support)",
                  },
                  {
                    icon: <FiMail />,
                    title: "Email",
                    desc: "support@familycare.xyz",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div className="p-3 bg-primary/10 text-primary rounded-lg text-xl">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Follow Us
              </h3>
              <div className="flex gap-4">
                {[FiFacebook, FiTwitter, FiLinkedin, FiInstagram].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 bg-white dark:bg-gray-800 flex items-center justify-center rounded-full shadow-sm text-gray-500 hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      <Icon size={20} />
                    </a>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none transition dark:text-white"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none transition dark:text-white"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none transition dark:text-white"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Subject
                </label>
                <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none transition dark:text-white">
                  <option>General Inquiry</option>
                  <option>Support Request</option>
                  <option>Feedback</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  rows="4"
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none transition dark:text-white"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary hover:bg-sky-600 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Google Map Section */}
        <div className="mb-20 rounded-2xl overflow-hidden shadow-lg h-[400px] border border-gray-200 dark:border-gray-700">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.012574971633!2d90.4224765955355!3d23.784061806371725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c790b4d4b3b3%3A0x63351d5334c44223!2sGulshan%201%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1709638421000!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            Common Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <span className="font-bold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  {openFaq === faq.id ? (
                    <FiMinus className="text-primary" />
                  ) : (
                    <FiPlus className="text-gray-500" />
                  )}
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
