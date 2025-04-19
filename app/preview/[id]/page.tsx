"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Download, Eye, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn, formatDate } from "@/lib/utils";
import { PreviewData } from "@/types";

export default function PreviewPage() {
  const { id } = useParams();
  const router = useRouter();
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    async function fetchPreview() {
      try {
        setLoading(true);
        const response = await fetch(`/api/get-preview?id=${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch preview");
        }

        setPreview(data);
      } catch (err) {
        console.error("Error fetching preview:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load preview. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPreview();
    }
  }, [id]);

  const handlePurchase = async () => {
    try {
      setIsCheckoutLoading(true);
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          successUrl: `${window.location.origin}/pdf/${id}`,
          cancelUrl: window.location.href,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      console.error("Error creating checkout session:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to start checkout process. Please try again."
      );
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Loading Preview
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait while we retrieve your tax form preview...
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
                Unable to load the preview. The form may have expired or been
                removed.
              </p>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!preview) {
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
              <AlertTitle>Preview Not Found</AlertTitle>
              <AlertDescription>
                The requested preview could not be found or has expired.
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

  if (preview.isPaid) {
    router.push(`/pdf/${id}`);
    return null;
  }

  const expirationDate = new Date(preview.expiresAt);
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
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-green-600" />
                  Preview: Tax Form
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
                        Preview Expired
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-6">
                        This preview has expired. Please generate a new form
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

                <div className="preview-container h-[70vh] w-full">
                  {/* We'd use a PDF viewer here in production. For the demo, we'll just show a placeholder */}
                  <iframe
                    ref={iframeRef}
                    src={preview.previewPdfUrl}
                    className="w-full h-full border-0"
                    title="PDF Preview"
                  ></iframe>
                </div>

                <div
                  className={cn(
                    "absolute top-0 left-0 right-0 bottom-0 pointer-events-none flex items-center justify-center",
                    isExpired ? "opacity-0" : "opacity-100"
                  )}
                  style={{ zIndex: 5 }}
                >
                  <div className="bg-green-600/20 dark:bg-green-900/30 p-6 rounded-lg backdrop-blur-sm border border-green-400/30 rotate-[-30deg] transform scale-150">
                    <span className="text-green-800 dark:text-green-200 font-bold text-3xl md:text-5xl uppercase tracking-wider">
                      Preview
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Get Your Complete Form
                </h2>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6">
                  <p className="text-gray-800 dark:text-gray-200 mb-4">
                    This is a preview of your tax form with a watermark. Pay a
                    small fee to access the complete, watermark-free version.
                  </p>
                  <div className="flex items-baseline gap-1 text-green-700 dark:text-green-300 mb-2">
                    <span className="text-3xl font-bold">$2.99</span>
                    <span className="text-sm">one-time payment</span>
                  </div>
                </div>

                <Button
                  onClick={handlePurchase}
                  disabled={isCheckoutLoading || isExpired}
                  className="w-full py-6 text-lg bg-green-600 hover:bg-green-700 disabled:bg-gray-400 mb-4"
                >
                  {isCheckoutLoading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Processing...
                    </span>
                  ) : isExpired ? (
                    "Preview Expired"
                  ) : (
                    <span className="flex items-center justify-center">
                      <Download className="h-5 w-5 mr-2" />
                      Get Full PDF
                    </span>
                  )}
                </Button>

                <div className="flex flex-col space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                      <svg
                        className="h-5 w-5 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <span className="text-gray-700 dark:text-gray-300">
                        Watermark-free PDF
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                      <svg
                        className="h-5 w-5 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <span className="text-gray-700 dark:text-gray-300">
                        Instant download
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                      <svg
                        className="h-5 w-5 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <span className="text-gray-700 dark:text-gray-300">
                        Email delivery option
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                      <svg
                        className="h-5 w-5 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <span className="text-gray-700 dark:text-gray-300">
                        30-day access
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
