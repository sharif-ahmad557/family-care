import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative h-[500px] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?q=80&w=1925&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Reliable Care for Your Family
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          Professional Baby Sitting, Elderly Care & Patient Support
        </p>
        <a
          href="#services"
          className="px-8 py-3 bg-primary hover:bg-sky-600 text-white font-semibold rounded-full transition-all duration-300"
        >
          Find Care Now
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
