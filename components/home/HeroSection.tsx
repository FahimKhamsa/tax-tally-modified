"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MessageCircle, CheckCircle } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { Telegram, WhatsApp } from "@/components/icons/SvgIcons";
import { TypingText } from "../TypingText";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", () =>
      setSize({ width: window.innerWidth, height: window.innerHeight })
    );
    return () => window.removeEventListener("resize", () => {});
  }, []);
  return (
    <section
      className="relative min-h-[675px] scroll-pt-24 pb-20 md:pt-28 md:pb-24 
               bg-gradient-to-b from-green-50/90 to-white/90
               dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      <Image
        src="/images/home-bg-image.png"
        alt="Background"
        width={size.width}
        height={size.width}
        className="absolute top-0 left-0 object-cover transform -translate-y-[350px]"
        priority
      />

      {/* Overlay to darken/lighten over background image */}
      <div className="absolute inset-0 bg-white/25 dark:bg-gray-900/60"></div>

      <div
        className="
          absolute inset-x-0 bottom-0
          h-36 pointer-events-none
          bg-gradient-to-b
          from-transparent
            via-white/80
            to-white
          dark:via-gray-900/80
          dark:to-gray-900
        "
      />

      <div className="relative container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col text-4xl md:text-5xl lg:text-6xl 
                   font-extrabold tracking-tight mb-6 
                   text-gray-900 dark:text-white"
          >
            <span>Tax Forms Made</span>
            <TypingText
              words={["Simple", "Accurate", "Secure", "Fast", "Affordable"]}
            />
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
              href="https://t.me/TaxTallyBot"
              external
              icon={<Telegram className="h-5 w-5" />}
              className="px-5 py-3 text-base rounded-full"
            />
            <CTAButton
              text="Try on WhatsApp"
              href="/coming-soon"
              external={false}
              icon={<WhatsApp className="h-6 w-6" />}
              className="px-5 py-3 text-base rounded-full"
            />
            <CTAButton
              text="Learn More"
              href="#features"
              variant="outline"
              icon={<ArrowRight className="h-5 w-5" />}
              className="px-5 py-3 text-base rounded-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center lg:justify-start items-center space-x-6"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-700" />
              <span className="text-gray-700 font-bold dark:text-gray-300">
                Secure
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-700" />
              <span className="text-gray-700 font-bold dark:text-gray-300">
                Fast
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-700" />
              <span className="text-gray-700 font-bold dark:text-gray-300">
                Affordable
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
