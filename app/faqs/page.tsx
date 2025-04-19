"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { FAQItem } from "@/types";
import { Button } from "@/components/ui/button";

const faqCategories = [
  {
    category: "About TaxTally",
    items: [
      {
        question: "What is TaxTally?",
        answer:
          "TaxTally is a service that helps businesses generate filled U.S. tax forms through a conversational interface. Our Telegram bot guides you through the process, collects the necessary information, and produces ready-to-use tax documents.",
      },
      {
        question: "How does TaxTally work?",
        answer:
          "You start by chatting with our Telegram bot. The bot asks you questions about your business and tax situation. Based on your answers, we generate the appropriate tax forms. You can preview the forms with a watermark, and after payment, you get the complete forms without the watermark.",
      },
      {
        question: "Who can use TaxTally?",
        answer:
          "TaxTally is designed for small business owners, freelancers, independent contractors, and self-employed individuals who need to generate U.S. business tax forms.",
      },
    ],
  },
  {
    category: "Using the Service",
    items: [
      {
        question: "How do I start using TaxTally?",
        answer:
          'Simply click on the "Try on Telegram" button on our website, or search for "TaxTally Bot" on Telegram. Start a conversation with the bot, and it will guide you through the process.',
      },
      {
        question: "What tax forms do you support?",
        answer:
          "We currently support most common U.S. business tax forms including 1099-MISC, 1099-NEC, W-9, Schedule C, and more. We are constantly adding support for additional forms.",
      },
      {
        question: "Can I use TaxTally on my phone?",
        answer:
          "Yes! TaxTally works on any device where Telegram is available, including smartphones, tablets, and desktop computers.",
      },
      {
        question: "Is there a WhatsApp version?",
        answer:
          "We are currently developing a WhatsApp version of our bot. It will be available soon. For now, please use our Telegram bot.",
      },
    ],
  },
  {
    category: "Pricing and Payment",
    items: [
      {
        question: "How much does TaxTally cost?",
        answer:
          "Each completed tax form costs $2.99. There are no subscriptions or hidden fees. You only pay for the forms you need.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards through our secure Stripe payment processing system.",
      },
      {
        question: "Is there a free trial?",
        answer:
          "While we don't offer a free trial, you can preview your generated form with a watermark before deciding to purchase.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "If there are issues with the form generation or quality, please contact our support team. We handle refund requests on a case-by-case basis.",
      },
    ],
  },
  {
    category: "Security and Privacy",
    items: [
      {
        question: "Is my information secure?",
        answer:
          "Yes, we take security very seriously. All data is encrypted both in transit and at rest. We use industry-standard security protocols to protect your information.",
      },
      {
        question: "How long do you keep my data?",
        answer:
          "We keep your generated forms for 30 days, after which they are automatically deleted from our system. Your chat information with the bot is retained for support purposes but can be deleted upon request.",
      },
      {
        question: "Who has access to my tax information?",
        answer:
          "Only you have access to your completed forms. Our system administrators have limited access for technical support purposes only and are bound by strict confidentiality agreements.",
      },
    ],
  },
  {
    category: "Technical Support",
    items: [
      {
        question: "What if I encounter issues with the bot?",
        answer:
          'If you experience any problems with our Telegram bot, please contact our support team through the "Contact" page on our website.',
      },
      {
        question: "Can I get help filling out my forms?",
        answer:
          "Our bot is designed to guide you through the process with simple questions. If you need additional assistance, contact our support team.",
      },
      {
        question: "What if I make a mistake in my form?",
        answer: `If you discover an error before payment, simply restart the conversation with the bot. If you've already purchased the form, contact our support team for assistance.`,
      },
    ],
  },
];

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState<string>(
    faqCategories[0].category
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Find answers to common questions about TaxTally and how it works.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="sticky top-24 space-y-2">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  Categories
                </h3>
                {faqCategories.map((cat, index) => (
                  <Button
                    key={index}
                    variant={
                      activeCategory === cat.category ? "default" : "ghost"
                    }
                    className={`w-full justify-start ${
                      activeCategory === cat.category
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => setActiveCategory(cat.category)}
                  >
                    {cat.category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="md:col-span-3">
              {faqCategories
                .filter((cat) => cat.category === activeCategory)
                .map((category) => (
                  <div key={category.category}>
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                      {category.category}
                    </h2>

                    <div className="space-y-4">
                      {category.items.map((item: FAQItem, index: number) => (
                        <div
                          key={index}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                        >
                          <button
                            className="flex justify-between items-center w-full py-4 px-6 text-left focus:outline-none bg-gray-50 dark:bg-gray-800"
                            onClick={() => toggleAccordion(index)}
                          >
                            <span className="text-lg font-medium text-gray-900 dark:text-white">
                              {item.question}
                            </span>
                            {activeIndex === index ? (
                              <ChevronUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            )}
                          </button>
                          <div
                            className={`overflow-hidden transition-all duration-300 ${
                              activeIndex === index
                                ? "max-h-96"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="p-6 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                              {item.answer}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-16 text-center bg-green-50 dark:bg-green-900/20 p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Still have questions?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our support team is ready to assist you with any additional
              questions you might have.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
