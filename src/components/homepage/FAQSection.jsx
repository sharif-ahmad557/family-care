import { FiPlus } from "react-icons/fi";

const FAQSection = () => {
  const faqs = [
    {
      question: "Are your caregivers verified?",
      answer:
        "Yes, absolutely. We conduct strict background checks, collect NID copies, and verify phone numbers for every caregiver before they join our platform.",
    },
    {
      question: "How do I make a payment?",
      answer:
        "Currently, you will see the estimated cost during booking. Payment can be settled in cash or via mobile banking directly with the caregiver after service completion (Standard procedure).",
    },
    {
      question: "Can I cancel a booking?",
      answer:
        "Yes, you can cancel a booking from your 'My Bookings' page. However, we request you to cancel at least 24 hours before the service starts.",
    },
    {
      question: "Do you provide service in all areas?",
      answer:
        "We are currently operating in major cities including Dhaka, Chittagong, and Sylhet. We are expanding to other districts soon.",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Common questions about our services
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <summary className="flex justify-between items-center cursor-pointer p-6 font-medium text-gray-900 dark:text-white">
              {faq.question}
              <span className="transition group-open:rotate-45">
                <FiPlus />
              </span>
            </summary>
            <div className="px-6 pb-6 text-gray-600 dark:text-gray-300">
              <p>{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
