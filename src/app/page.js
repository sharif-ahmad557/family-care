import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navbar />

      {/* Requirement: Homepage Sections Placeholder */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Care.IO / Family Care</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Banner, About Section, Services Overview, and Testimonials will be
          implemented here.
        </p>
      </div>
    </main>
  );
}
