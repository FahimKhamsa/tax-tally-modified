"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Mail,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PdfData } from "@/types";

export default function PdfPage() {
  const { id } = useParams();
  const [pdf, setPdf] = useState<PdfData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    async function fetchPdf() {
      try {
        setLoading(true);
        const response = await fetch(`/api/get-actual?id=${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch PDF");
        }

        if (!data.isPaid) {
          throw new Error("This PDF has not been purchased");
        }

        setPdf(data);
      } catch (err) {
        console.error("Error fetching PDF:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load PDF. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPdf();
    }
  }, [id]);

  const handleDownload = () => {
    if (pdf?.actualPdfUrl) {
      window.open(pdf.actualPdfUrl, "_blank");
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Please enter a valid email address");
      return;
    }

    try {
      setIsSendingEmail(true);
      setEmailError(null);

      // In a real app, you'd send this to your API
      // const response = await fetch('/api/send-pdf-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ id, email }),
      // });
      // const data = await response.json();

      // For demo, we'll simulate a successful email
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setEmailSent(true);
      setEmail("");
    } catch (err) {
      console.error("Error sending email:", err);
      setEmailError(
        err instanceof Error
          ? err.message
          : "Failed to send email. Please try again."
      );
    } finally {
      setIsSendingEmail(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Loading Your PDF
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait while we retrieve your tax form...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>

            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>

            <div className="text-center mt-8">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {error.includes("purchased")
                  ? "This PDF requires payment. Please complete the purchase to access it."
                  : "Unable to load the PDF. The document may have expired or been removed."}
              </p>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                {error.includes("purchased") ? (
                  <Link href={`/preview/${id}`}>Go to Preview Page</Link>
                ) : (
                  <Link href="/">Return Home</Link>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!pdf) {
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>

            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>PDF Not Found</AlertTitle>
              <AlertDescription>
                The requested PDF could not be found or has expired.
              </AlertDescription>
            </Alert>

            <div className="text-center mt-8">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Try generating a new form using our Telegram bot.
              </p>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <a
                  href="https://t.me/TaxTallyBot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat with TaxTally Bot
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const expirationDate = new Date(pdf.expiresAt);
  const isExpired = new Date() > expirationDate;

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Your Tax Form
                </h1>

                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Expires: {formatDate(expirationDate)}
                </div>
              </div>

              <div className="relative">
                {isExpired && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 z-10">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md text-center">
                      <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                      <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        Document Expired
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-6">
                        This document has expired. Please generate a new form
                        using our Telegram bot.
                      </p>
                      <Button
                        asChild
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <a
                          href="https://t.me/TaxTallyBot"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Chat with TaxTally Bot
                        </a>
                      </Button>
                    </div>
                  </div>
                )}

                <div className="pdf-container h-[70vh] w-full">
                  {/* We'd use a PDF viewer here in production. For the demo, we'll just show a placeholder */}
                  <iframe
                    ref={iframeRef}
                    src={pdf.actualPdfUrl}
                    className="w-full h-full border-0"
                    title="PDF Document"
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 sticky top-24">
                <div className="flex items-center justify-center bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>

                <h2 className="text-xl font-bold mb-2 text-center text-gray-900 dark:text-white">
                  Payment Complete
                </h2>
                <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
                  Thank you for your purchase! Your tax form is now available to
                  download and use.
                </p>

                <Button
                  onClick={handleDownload}
                  disabled={isExpired}
                  className="w-full py-3 mb-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF
                </Button>

                {!isExpired && (
                  <>
                    <div className="text-center text-gray-700 dark:text-gray-300 mb-4">
                      <p>Or send the document to your email</p>
                    </div>

                    <form onSubmit={handleSendEmail} className="space-y-4">
                      <div>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isSendingEmail || emailSent}
                          className="w-full"
                        />
                        {emailError && (
                          <p className="text-red-500 text-sm mt-1">
                            {emailError}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={isSendingEmail || emailSent || !email}
                        className="w-full bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600"
                      >
                        {isSendingEmail ? (
                          <span className="flex items-center">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Sending...
                          </span>
                        ) : emailSent ? (
                          <span className="flex items-center text-green-500">
                            <Check className="h-4 w-4 mr-2" />
                            Sent Successfully
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            Send to Email
                          </span>
                        )}
                      </Button>
                    </form>
                  </>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">
                    Important Information
                  </h3>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 mr-2"></span>
                      <span>
                        Your document is available for 30 days from the purchase
                        date.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 mr-2"></span>
                      <span>
                        Download and save your document for future reference.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 mr-2"></span>
                      <span>
                        For support, contact us at{" "}
                        <a
                          href="mailto:support@taxtally.com"
                          className="text-green-600 hover:underline"
                        >
                          support@taxtally.com
                        </a>
                      </span>
                    </li>
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
