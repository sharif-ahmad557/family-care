import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rahim Uddin",
    role: "Parent",
    comment:
      "I was worried about leaving my baby, but the babysitter from Family Care was amazing! Highly recommended.",
    rating: 5,
  },
  {
    id: 2,
    name: "Fatima Begum",
    role: "Daughter",
    comment:
      "Found a great nurse for my elderly mother. She is very polite and professional. Thank you Family Care!",
    rating: 5,
  },
  {
    id: 3,
    name: "Sajjad Hossain",
    role: "User",
    comment:
      "The booking process was so easy and the cost is very reasonable compared to other agencies.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          What Our Users Say
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16">
          Thousands of families trust us. Here are some of their experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-6">
                "{review.comment}"
              </p>
              <h4 className="font-bold text-gray-900 dark:text-white">
                {review.name}
              </h4>
              <span className="text-sm text-primary">{review.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
