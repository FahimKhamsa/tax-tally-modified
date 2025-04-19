'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '@/types';

const faqItems: FAQItem[] = [
  {
    question: 'How does TaxTally work?',
    answer:
      'TaxTally helps you generate business tax forms through a simple chat interface on Telegram. You answer questions about your business, and our system creates the appropriate tax forms. You can preview the forms with a watermark, and after payment, you get the complete forms without the watermark.',
  },
  {
    question: 'What tax forms do you support?',
    answer:
      'We currently support most common U.S. business tax forms including 1099-MISC, 1099-NEC, W-9, Schedule C, and more. We are constantly adding support for additional forms.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Each completed tax form costs $2.99. There are no subscriptions or hidden fees. You only pay for the forms you need.',
  },
  {
    question: 'How do I access my completed forms?',
    answer:
      'After payment, you can download your forms directly from our website. We also offer the option to have them emailed to you for convenient access.',
  },
  {
    question: 'How long do I have access to my forms?',
    answer:
      'Your completed forms are available for 30 days after generation. We recommend downloading and saving them promptly.',
  },
];

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Find answers to common questions about TaxTally and how it works.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`border-b border-gray-200 dark:border-gray-700 ${
                index === 0 ? 'border-t' : ''
              }`}
            >
              <button
                className="flex justify-between items-center w-full py-5 px-2 text-left focus:outline-none"
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
                    ? 'max-h-96 pb-5'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-2 text-gray-700 dark:text-gray-300">
                  {item.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-700 dark:text-gray-300">
            Have more questions?{' '}
            <Link
              href="/faqs"
              className="text-green-600 dark:text-green-400 font-medium hover:underline"
            >
              View all FAQs
            </Link>{' '}
            or{' '}
            <Link
              href="/contact"
              className="text-green-600 dark:text-green-400 font-medium hover:underline"
            >
              contact our support team
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}