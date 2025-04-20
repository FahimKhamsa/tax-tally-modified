"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MailIcon, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactFormData } from "@/types";
import { CTAButton } from "../CTAButton";

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // In a real app, you'd send this data to your API
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // For demo, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Have questions or need assistance? We&apos;re here to help!
          </p>
        </motion.div>

        <div className="flex items-center justify-center space-x-8">
          <CTAButton
            text="Contact Us"
            href="/contact"
            external={false}
            className="px-5 py-3 text-lg rounded-full hover:bg-green-600 hover:text-white transition-colors"
            variant="outline"
          />
          <CTAButton
            text="Check FAQs"
            href="/faqs"
            external={false}
            className="px-5 py-3 text-lg rounded-full hover:bg-green-600 hover:text-white transition-colors"
            variant="outline"
          />
        </div>
      </div>
    </section>
  );
}
