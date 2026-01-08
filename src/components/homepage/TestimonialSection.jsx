"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const testimonials = [
  // ... (আপনার আগের টেস্টিমোনিয়াল ডাটাগুলো ঠিক রাখুন)
  {
    id: 1,
    name: "Sarah Rahman",
    role: "Working Mom",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
    quote:
      "The babysitter was incredibly professional. I could work peacefully knowing my child was in safe hands.",
    rating: 5,
  },
  {
    id: 2,
    name: "Kamal Hossain",
    role: "Businessman",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
    quote:
      "Finding reliable elderly care for my father was tough until I found Care.IO. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Farhana Yeasmin",
    role: "Doctor",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
    quote:
      "The nurse provided for my post-surgery care was excellent. She monitored my vitals perfectly.",
    rating: 5,
  },
  {
    id: 4,
    name: "Rafiqul Islam",
    role: "Teacher",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    quote:
      "I hired a nanny for my two kids. She is very punctual and helps with their homework too.",
    rating: 4,
  },
  {
    id: 5,
    name: "Nusrat Jahan",
    role: "Banker",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    quote:
      "Best platform for finding verified caregivers. The booking process is so simple and fast.",
    rating: 5,
  },
  {
    id: 6,
    name: "Ahmed Karim",
    role: "Engineer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
    quote:
      "Excellent service! The physiotherapy sessions at home helped me recover quickly.",
    rating: 5,
  },
];

const TestimonialSection = () => {
  const extendedTestimonials = [...testimonials, ...testimonials.slice(0, 4)];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // FIX: ডিফল্ট ৩ সেট করলাম, সার্ভারে window নেই তাই ৩ ধরেই রেন্ডার হবে
  const [visibleCards, setVisibleCards] = useState(3);
  const timeoutRef = useRef(null);

  const totalSlides = testimonials.length;

  // FIX: উইন্ডো সাইজ চেক করার লজিক useEffect এ আনলাম (এটি শুধু ক্লায়েন্টে রান হবে)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };

    // মাউন্ট হওয়ার পর এবং রিসাইজ হলে রান করবে
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const startAutoSlide = () => {
      timeoutRef.current = setTimeout(() => {
        handleNext();
      }, 3000);
    };

    startAutoSlide();

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, isPaused]);

  const handleTransitionEnd = () => {
    if (currentIndex >= totalSlides) {
      setIsTransitioning(false);
      setCurrentIndex(0);
      setTimeout(() => setIsTransitioning(true), 50);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalSlides);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(totalSlides - 1);
      }, 50);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Parents Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Real feedback from our happy clients
          </p>
        </div>

        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block hover:bg-primary hover:text-white"
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block hover:bg-primary hover:text-white"
          >
            <FaChevronRight size={20} />
          </button>

          {/* Slider Container */}
          <div className="overflow-hidden w-full">
            <div
              className="flex"
              style={{
                // FIX: এখানে এখন visibleCards স্টেট ব্যবহার করছি, সরাসরি window নয়
                transform: `translateX(-${
                  currentIndex * (100 / visibleCards)
                }%)`,
                transition: isTransitioning
                  ? "transform 0.5s ease-in-out"
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedTestimonials.map((item, index) => (
                <div
                  key={index}
                  // FIX: এখানেও visibleCards ব্যবহার করছি
                  style={{ width: `${100 / visibleCards}%` }}
                  className="flex-shrink-0 px-4"
                >
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 h-full flex flex-col relative group/card">
                    <FaQuoteLeft className="absolute top-6 right-6 text-4xl text-gray-100 dark:text-gray-700 group-hover/card:text-primary/10 transition-colors" />
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary p-0.5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">
                          {item.name}
                        </h4>
                        <p className="text-xs text-primary font-bold uppercase">
                          {item.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4 text-yellow-400 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < item.rating ? "fill-current" : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed flex-grow">
                      "{item.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
