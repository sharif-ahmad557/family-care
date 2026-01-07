import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/homepage/HeroSection";
import AboutSection from "@/components/homepage/AboutSection";
import ServicesSection from "@/components/homepage/ServicesSection";
import HowItWorks from "@/components/homepage/HowItWorks";
import TestimonialSection from "@/components/homepage/TestimonialSection";
import FAQSection from "@/components/homepage/FAQSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <HowItWorks />
      <TestimonialSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
