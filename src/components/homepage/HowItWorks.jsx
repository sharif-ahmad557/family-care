import { FiSearch, FiCalendar, FiSmile } from "react-icons/fi";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FiSearch className="w-8 h-8" />,
      title: "1. Select Service",
      desc: "Choose the care service that fits your family's needs from our list.",
    },
    {
      icon: <FiCalendar className="w-8 h-8" />,
      title: "2. Schedule & Book",
      desc: "Select your preferred dates, location and confirm the booking instantly.",
    },
    {
      icon: <FiSmile className="w-8 h-8" />,
      title: "3. Get Care",
      desc: "Our verified caregiver will arrive at your doorstep to provide care.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Get reliable care in just 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 dark:border-gray-700"
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
