"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { PricingTier } from "@/types";

const pricingTiers: PricingTier[] = [
  {
    name: "Per Form",
    price: 2.99,
    description: "Perfect for occasional tax form needs",
    features: [
      { feature: "Single tax form generation", included: true },
      { feature: "PDF preview with watermark", included: true },
      { feature: "Final PDF without watermark", included: true },
      { feature: "Email delivery", included: true },
      { feature: "30-day access to your form", included: true },
      { feature: "Bulk discounts", included: false },
      { feature: "Priority support", included: false },
    ],
    popular: true,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Affordable rates with no hidden fees or subscriptions. Pay only for
            the forms you need.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 gap-8"
          >
            {pricingTiers.map((tier, index) => {
              const splitIndex = Math.ceil(tier.features.length / 2);
              const firstHalf = tier.features.slice(0, splitIndex);
              const secondHalf = tier.features.slice(splitIndex);

              return (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden ${
                    tier.popular
                      ? "border-2 border-green-500 relative"
                      : "border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                      Most Popular
                    </div>
                  )}

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {tier.description}
                    </p>

                    <div className="flex items-baseline mb-8">
                      <span className="text-5xl font-extrabold text-gray-900 dark:text-white">
                        ${tier.price.toFixed(2)}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">
                        per form
                      </span>
                    </div>

                    <div className="flex space-x-8 mb-8">
                      <ul className="space-y-4 flex-1">
                        {firstHalf.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            {feature.included ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                            )}
                            <span
                              className={`${
                                feature.included
                                  ? "text-gray-700 dark:text-gray-300"
                                  : "text-gray-500 dark:text-gray-500"
                              }`}
                            >
                              {feature.feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <ul className="space-y-4 flex-1">
                        {secondHalf.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            {feature.included ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                            )}
                            <span
                              className={`${
                                feature.included
                                  ? "text-gray-700 dark:text-gray-300"
                                  : "text-gray-500 dark:text-gray-500"
                              }`}
                            >
                              {feature.feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTAButton removed as per request */}
                  </div>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Need multiple forms or have special requirements?{" "}
              <a
                href="/contact"
                className="text-green-600 dark:text-green-400 font-medium hover:underline"
              >
                Contact us
              </a>{" "}
              for custom pricing.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-gray-700 dark:text-gray-300 text-sm">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>No subscription required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Secure payments</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>30-day access</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
