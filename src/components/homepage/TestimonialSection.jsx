const TestimonialSection = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
        What Parents Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Testimonial 1 */}
        <div className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-gray-600 dark:text-gray-300 italic mb-4">
            "The babysitter was incredibly professional. I could work peacefully
            knowing my child was in safe hands. Highly recommended!"
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-700">
              S
            </div>
            <div>
              <h4 className="font-bold dark:text-white">Sarah Rahman</h4>
              <p className="text-sm text-gray-500">Working Mom</p>
            </div>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-gray-600 dark:text-gray-300 italic mb-4">
            "Finding reliable elderly care for my father was tough until I found
            Care.IO. The caregiver is very polite and attentive."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-700">
              K
            </div>
            <div>
              <h4 className="font-bold dark:text-white">Kamal Hossain</h4>
              <p className="text-sm text-gray-500">Businessman</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
