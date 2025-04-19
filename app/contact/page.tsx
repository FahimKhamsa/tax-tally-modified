'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, MessageSquare, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ContactFormData } from '@/types';

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
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
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Contact Us
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
              Have questions, feedback, or need assistance? We're here to help.
              Fill out the form below or reach out through our other contact
              channels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                Send us a message
              </h2>

              {isSubmitted ? (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <MessageSquare className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    Message Received!
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Thank you for reaching out. We'll get back to you as soon as
                    possible.
                  </p>
                  <Button
                    type="button"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message..."
                      required
                      className="w-full min-h-[160px]"
                    />
                  </div>

                  {error && <div className="text-red-500 text-sm">{error}</div>}

                  <Button
                    type="submit"
                    className="w-full py-3 bg-green-600 hover:bg-green-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md">
                <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                  Other Ways to Connect
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                        Email
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-1">
                        For general inquiries and support:
                      </p>
                      <p className="text-green-600 dark:text-green-400">
                        support@taxtally.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                        Telegram Bot
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Start a conversation with our Telegram bot:
                      </p>
                      <a
                        href="https://t.me/taxtally_bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Open Telegram Bot
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Find answers to common questions about our service on our FAQ
                  page.
                </p>
                <Link
                  href="/faqs"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                >
                  View FAQs
                  <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                </Link>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-xl p-8 shadow-md text-white">
                <h3 className="text-xl font-semibold mb-4">
                  We're Here to Help
                </h3>
                <p className="mb-6 opacity-90">
                  Our customer support team is available Monday through Friday,
                  9:00 AM to 5:00 PM EST. We aim to respond to all inquiries
                  within 24 hours during business days.
                </p>
                <div className="text-sm font-medium bg-white/20 p-4 rounded-lg">
                  <p>Response Times:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Email: Within 24 hours (business days)</li>
                    <li>Contact Form: Within 24 hours (business days)</li>
                    <li>Telegram Bot: Automated responses available 24/7</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}