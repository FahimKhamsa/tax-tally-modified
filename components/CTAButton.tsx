'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  text: string;
  href: string;
  variant?: 'default' | 'outline' | 'secondary';
  className?: string;
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function CTAButton({
  text,
  href,
  variant = 'default',
  className,
  external = false,
  onClick,
  disabled = false,
  icon,
}: CTAButtonProps) {
  const classes = cn({
    'bg-green-600 hover:bg-green-700 text-white': variant === 'default',
    'border-green-600 text-green-600 hover:bg-green-50': variant === 'outline',
    'bg-gray-100 hover:bg-gray-200 text-gray-800': variant === 'secondary',
    'flex items-center justify-center space-x-2': icon,
    [className as string]: className,
  });

  if (external) {
    return (
      <Button
        asChild
        variant={variant}
        className={classes}
        onClick={onClick}
        disabled={disabled}
      >
        <Link href={href} target="_blank" rel="noopener noreferrer">
          {icon && <span>{icon}</span>}
          <span>{text}</span>
        </Link>
      </Button>
    );
  }

  return (
    <Button
      asChild
      variant={variant}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      <Link href={href}>
        {icon && <span>{icon}</span>}
        <span>{text}</span>
      </Link>
    </Button>
  );
}