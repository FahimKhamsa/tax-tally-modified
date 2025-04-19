"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, CheckCircle } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pt-24 pb-20 md:pt-28 md:pb-24 bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800"
      style={{
        backgroundImage: "url('/images/bg-image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay to darken/lighten over background image */}
      <div className="absolute inset-0 bg-white/20 dark:bg-gray-900/60"></div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white"
          >
            Tax Forms Made{" "}
            <span className="text-green-600 dark:text-green-500">Simple</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300"
          >
            Generate complete U.S. business tax forms via our intuitive Telegram
            chatbot. Preview, pay, and download your forms in minutes—no
            complicated software needed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10"
          >
            <CTAButton
              text="Try on Telegram"
              href="https://t.me/taxtally_bot"
              external
              icon={<MessageCircle className="h-5 w-5" />}
              className="px-6 py-3 text-base rounded-full"
            />
            <CTAButton
              text="Learn More"
              href="#features"
              variant="outline"
              icon={<ArrowRight className="h-5 w-5" />}
              className="px-6 py-3 text-base rounded-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center lg:justify-start items-center space-x-6"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-gray-700 dark:text-gray-300">Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-gray-700 dark:text-gray-300">Fast</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-gray-700 dark:text-gray-300">
                Affordable
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-green-200 dark:bg-green-900/20 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-30 blur-3xl"></div>
    </section>
  );
}
