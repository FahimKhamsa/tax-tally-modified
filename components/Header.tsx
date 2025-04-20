"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/CTAButton";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigationClassName =
    "text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white dark:bg-gray-900 shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo className="space-x-2" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className={navigationClassName}>
            Home
          </Link>
          <Link href="#features" className={navigationClassName}>
            Features
          </Link>
          <Link href="/pricing" className={navigationClassName}>
            Pricing
          </Link>
          <Link href="/faqs" className={navigationClassName}>
            FAQs
          </Link>
          <Link href="/contact" className={navigationClassName}>
            Contact
          </Link>
          <CTAButton
            text="Try on Telegram"
            href="https://t.me/TaxTallyBot"
            external
            className="px-5 py-2.5 text-base"
          />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white dark:bg-gray-900 pt-20">
          <nav className="container mx-auto px-4 flex flex-col space-y-6 py-8">
            <Link
              href="/"
              className="text-xl text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="text-xl text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/faqs"
              className="text-xl text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQs
            </Link>
            <Link
              href="/contact"
              className="text-xl text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-700 w-full"
            >
              <Link
                href="https://t.me/TaxTallyBot"
                target="_blank"
                rel="noopener noreferrer"
              >
                Try on Telegram
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full border-green-600 text-green-600 hover:bg-green-50"
            >
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("WhatsApp bot coming soon!");
                  setIsMenuOpen(false);
                }}
              >
                Try on WhatsApp (Coming Soon)
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
