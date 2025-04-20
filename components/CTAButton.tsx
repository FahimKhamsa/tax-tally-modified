"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Motion-enabled Button for hover/tap animations
const MotionButton = motion.create(Button);

interface CTAButtonProps {
  text: string;
  href: string;
  variant?: "default" | "outline" | "secondary";
  className?: string;
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function CTAButton({
  text,
  href,
  variant = "default",
  className,
  external = false,
  onClick,
  disabled = false,
  icon,
}: CTAButtonProps) {
  const baseClasses = {
    "bg-green-600 hover:bg-green-700 text-white": variant === "default",
    "border-green-600 text-green-600 hover:bg-green-50": variant === "outline",
    "bg-gray-100 hover:bg-gray-200 text-gray-800": variant === "secondary",
    "flex items-center justify-center space-x-2": Boolean(icon),
  };

  const classes = cn(baseClasses, className);

  const commonProps = {
    asChild: true,
    variant,
    className: classes,
    onClick,
    disabled,
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 300, damping: 20 },
  };

  if (external) {
    return (
      <MotionButton {...commonProps}>
        <Link href={href} target="_blank" rel="noopener noreferrer">
          {icon && <span>{icon}</span>}
          <span>{text}</span>
        </Link>
      </MotionButton>
    );
  }

  return (
    <MotionButton {...commonProps}>
      <Link href={href}>
        {icon && <span>{icon}</span>}
        <span>{text}</span>
      </Link>
    </MotionButton>
  );
}
