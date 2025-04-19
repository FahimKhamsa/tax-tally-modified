"use client";

import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import { PricingTier } from "@/types";
import { Button } from "@/components/ui/button";

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
      { feature: "Downloadable PDF", included: true },
      { feature: "30-day access to your form", included: true },
      { feature: "Bulk discounts", included: false },
      { feature: "Priority support", included: false },
    ],
    popular: true,
  },
  {
    name: "Business",
    price: 19.99,
    description: "Ideal for businesses needing multiple forms",
    features: [
      { feature: "10 tax forms per month", included: true },
      { feature: "PDF preview with watermark", included: true },
      { feature: "Final PDF without watermark", included: true },
      { feature: "Email delivery", included: true },
      { feature: "Downloadable PDF", included: true },
      { feature: "60-day access to your forms", included: true },
      { feature: "Bulk discounts", included: true },
      { feature: "Priority support", included: true },
    ],
    popular: false,
  },
];

const faq = [
  {
    question: "How much does each tax form cost?",
    answer:
      "Each individual tax form costs $2.99. This is a one-time payment per form, with no subscriptions or hidden fees.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards through our secure Stripe payment processing system.",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "If there are issues with the form generation or quality, please contact our support team. We handle refund requests on a case-by-case basis.",
  },
  {
    question: "Do you offer discounts for multiple forms?",
    answer:
      "Yes, our Business tier offers a significant discount for users who need multiple forms regularly. We also offer custom pricing for enterprise users with higher volume needs.",
  },
];

export default function PricingPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Affordable rates with no hidden fees or complicated subscriptions.
              Pay only for the forms you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border-2 ${
                  tier.popular
                    ? "border-green-500 relative"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-medium">
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
                    {tier.name === "Per Form" ? (
                      <span className="text-gray-600 dark:text-gray-400 ml-2">
                        per form
                      </span>
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400 ml-2">
                        per month
                      </span>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
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

                  <Button
                    className={`w-full py-3 ${
                      tier.popular
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600"
                    }`}
                  >
                    <Link
                      href={
                        tier.name === "Per Form"
                          ? "https://t.me/TaxTallyBot"
                          : "/contact"
                      }
                      target={tier.name === "Per Form" ? "_blank" : undefined}
                      rel={
                        tier.name === "Per Form"
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {tier.name === "Per Form" ? "Get Started" : "Contact Us"}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faq.map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm"
                >
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    {item.question}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Need a Custom Solution?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              For businesses with high-volume needs or custom requirements, we
              offer tailored pricing plans. Contact our team to discuss your
              specific needs.
            </p>
            <Button className="bg-green-600 hover:bg-green-700 py-3 px-8">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
