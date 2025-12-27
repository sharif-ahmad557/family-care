import { ShieldCheck, Heart, Users } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Side: Image */}
          <div className="w-full md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1516733968668-dbdce39c4651?q=80&w=2070&auto=format&fit=crop"
              alt="Caregiving Mission"
              className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
            />
          </div>

          {/* Right Side: Content */}
          <div className="w-full md:w-1/2">
            <h4 className="text-primary font-bold uppercase tracking-wider mb-2">
              Who We Are
            </h4>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Making Caregiving Simple, Safe & Accessible
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
              At Family Care, our mission is to connect families with trusted
              professionals. Whether it's for your child, elderly parents, or a
              sick family member, we ensure they get the love and support they
              deserve.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-100">
                    100% Verified Caretakers
                  </h3>
                  <p className="text-sm text-gray-500">
                    Every caretaker goes through a strict background check.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-100">
                    Compassionate Service
                  </h3>
                  <p className="text-sm text-gray-500">
                    We prioritize empathy and kindness in every service.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-100">
                    24/7 Support
                  </h3>
                  <p className="text-sm text-gray-500">
                    Our support team is always ready to help you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
