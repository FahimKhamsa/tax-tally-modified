"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileDown, ShieldCheck } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { Feature } from "@/types";

const features: Feature[] = [
  {
    title: "Chat-Based Form Generation",
    description:
      "Answer simple questions via our Telegram bot and our AI will generate your tax forms in minutes.",
    icon: "MessageSquare",
  },
  {
    title: "Instant Downloads and Email Delivery",
    description:
      "Download your completed tax forms or collect it from mails instantly after payment for immediate use.",
    icon: "FileDown",
  },
  {
    title: "Data Security",
    description:
      "Your data is encrypted and securely stored, with forms automatically deleted after 30 days.",
    icon: "ShieldCheck",
  },
];

const iconComponents = {
  MessageSquare,
  FileDown,
  ShieldCheck,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturesSection() {
  return (
    <section id="features" className="-mt-5 py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Why TaxTally?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Our streamlined process makes tax form generation simple, secure,
            and stress-free.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 px-7"
        >
          {features.map((feature, index) => {
            const IconComponent = iconComponents[
              feature.icon as keyof typeof iconComponents
            ] as React.ElementType;

            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                tabIndex={0}
                className="
                  bg-[#F1FCEE] dark:bg-gray-800
                  p-8 rounded-2xl
                  shadow-sm hover:shadow-lg transition-shadow duration-300
                  cursor-pointer
                  border border-transparent hover:border-green-300
                  focus:outline-none focus:ring-4 focus:ring-green-200 dark:focus:ring-green-700
                "
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                  className="
                    inline-flex items-center justify-center
                    w-14 h-14 rounded-lg
                    bg-green-100 dark:bg-green-900/30
                    text-green-600 dark:text-green-400
                    mb-5
                  "
                >
                  <IconComponent className="h-7 w-7" />
                </motion.div>

                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 p-8 bg-[#DFFAEC] dark:bg-green-900/20 rounded-lg max-w-3xl mx-auto">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="text-left">
              <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Ready to get started?
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Start chatting with our Telegram bot and have your tax forms
                ready in minutes.
              </p>
              <CTAButton
                text="Chat with TaxTally Bot"
                href="https://t.me/TaxTallyBot"
                external
                icon={<MessageSquare className="h-5 w-5" />}
                className="px-5 py-2.5 text-base"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
