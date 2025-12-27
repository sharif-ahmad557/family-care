import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <HeroSection />
      <ServicesSection />
      {/* পরের সেকশনগুলো আমরা নিচে নিচে যোগ করব */}
      <div className="py-10 text-center text-gray-500">
        (Services Section Coming Soon...)
      </div>
    </main>
  );
}
