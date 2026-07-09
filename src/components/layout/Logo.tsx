import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  variant?: "ink" | "ivory";
  className?: string;
};

export function Logo({ variant = "ink", className = "" }: LogoProps) {
  const invert = variant === "ivory" ? "invert" : "";

  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="Aureth Tyrian — home"
    >
      <Image
        src="/assets/logo/monogram.svg"
        alt=""
        width={36}
        height={36}
        priority
        className={`h-8 w-8 shrink-0 transition-transform duration-200 group-hover:rotate-[6deg] ${invert}`}
      />
      <Image
        src="/assets/logo/wordmark.svg"
        alt="Aureth Tyrian"
        width={180}
        height={20}
        priority
        className={`hidden h-4 w-auto sm:block ${invert}`}
      />
    </Link>
  );
}
