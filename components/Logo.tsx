import Image from "next/image";

interface LogoProps {
  className?: string;
  altText?: string;
  showText?: boolean;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  altText = "TaxTally Logo",
  showText = true,
  size = 32,
}) => (
  <div className={`flex items-center ${className}`}>
    <Image
      src="/images/logo.png"
      alt={altText}
      width={size}
      height={size}
      className="mr-2"
    />
    {showText && (
      <span
        style={{ fontSize: size }}
        className="font-extrabold text-gray-900 dark:text-white"
      >
        <span className="text-green-600 dark:text-green-500">Tax</span>
        Tally
      </span>
    )}
  </div>
);
