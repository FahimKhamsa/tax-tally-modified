"use client";

import { motion } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";
import { Logo } from "@/components/Logo";

const ComingSoon: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 py-20">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-white/30 dark:bg-gray-900/60" />

      <div className="relative z-10 text-center max-w-lg flex flex-col items-center justify-center">
        <Logo className="mx-auto mb-8 h-12 w-auto" />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4"
        >
          Feature Coming Soon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8"
        >
          We’re putting the final touches on this integration. You’ll be able to
          try it via WhatsApp shortly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <CTAButton
            text="Go Back Home"
            href="/"
            external={false}
            className="px-5 py-3 text-base rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoon;
