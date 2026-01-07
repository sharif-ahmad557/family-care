import { FiCheckCircle } from "react-icons/fi";

const AboutSection = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Why Choose Care.IO?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Our mission is to make caregiving easy, secure, and accessible for
          everyone. We provide verified professionals to ensure your loved ones
          are in safe hands.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Card 1 */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="text-primary text-4xl mb-4 flex justify-center">
            <FiCheckCircle />
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">
            Trusted Caregivers
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            All our staff are verified with background checks and NID
            verification.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="text-primary text-4xl mb-4 flex justify-center">
            <FiCheckCircle />
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">
            24/7 Support
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            We are always available to assist you with any emergency
            requirements.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="text-primary text-4xl mb-4 flex justify-center">
            <FiCheckCircle />
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">
            Affordable Plans
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Customizable packages based on your specific duration and needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
