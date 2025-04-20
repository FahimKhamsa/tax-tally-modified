"use client";

import Link from "next/link";
import { ArrowLeft, FileText, MessageSquare, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
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
              Have questions, feedback, or need assistance? We’re here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              {/* Support Form Card */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 mx-auto">
                  <FileText className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold mb-9 text-gray-900 dark:text-white">
                  Support Form
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Fill out our ClickUp support form for detailed assistance &
                  report any issues.
                </p>
                <Link
                  href="https://forms.clickup.com/20570259/f/kkr4k-4451/NMY2NBB72FOHF7K15R"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white">
                    Open Form
                  </Button>
                </Link>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-xl p-8 shadow-md text-white">
                <h3 className="text-xl font-semibold mb-4">
                  We’re Here to Help
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
                    <li>Telegram Bot: Automated responses available 24/7</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Other Contact Methods */}
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
                      <p className="text-green-600 dark:text-green-400 hover:text-green-700 transition-colors">
                        <Link
                          href="mailto:contact@kaizenapps.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          contact@kaizenapps.com
                        </Link>
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
                      <Link
                        href="https://t.me/TaxTallyBot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Open Telegram Bot
                      </Link>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
