"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const socialHover = {
    scale: 1.2,
    transition: { type: "spring", stiffness: 300 },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand Info & Logo */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo Image */}
            <div className="bg-white p-1 rounded-lg w-12 h-12 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110">
              <img
                src="/Logo.png"
                alt="Family Care Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
              FamilyCare
            </span>
          </Link>

          <p className="text-sm leading-relaxed text-gray-400">
            Making caregiving easy, secure, and accessible for everyone. We
            connect you with trusted professionals to ensure your loved ones
            receive the best care possible.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            {[
              { icon: <FaFacebook size={18} />, href: "#" },
              { icon: <FaTwitter size={18} />, href: "#" },
              { icon: <FaInstagram size={18} />, href: "#" },
              { icon: <FaLinkedin size={18} />, href: "#" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={socialHover}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-primary hover:text-white transition-colors duration-300 shadow-lg"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6 border-l-4 border-primary pl-3">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "Login", path: "/login" },
              { name: "Register", path: "/register" },
            ].map((link, index) => (
              <li key={index}>
                <Link
                  href={link.path}
                  className="flex items-center gap-2 hover:text-primary hover:translate-x-2 transition-all duration-300 w-fit"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6 border-l-4 border-primary pl-3">
            Contact Us
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 group">
              <FaMapMarkerAlt className="mt-1 text-primary group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-white transition-colors">
                Level 4, Care Tower,
                <br /> Gulshan-1, Dhaka-1212
              </span>
            </li>
            <li className="flex items-center gap-3 group">
              <FaEnvelope className="text-primary group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-white transition-colors">
                support@care.io
              </span>
            </li>
            <li className="flex items-center gap-3 group">
              <FaPhoneAlt className="text-primary group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-white transition-colors">
                +880 1234 567 890
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 mt-16 pt-8 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">Care.IO</span> | Designed &
          Developed for Family Care.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
