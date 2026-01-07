import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">FamilyCare</h2>
          <p className="mb-4 text-sm leading-relaxed">
            Making caregiving easy, secure, and accessible for everyone. We
            connect you with trusted professionals for your loved ones.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-primary transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-primary transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-primary transition">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-primary transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-primary transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-primary transition">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-primary transition">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>Dhaka, Bangladesh</li>
            <li>support@care.io</li>
            <li>+880 1234 567 890</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Care.IO | All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
