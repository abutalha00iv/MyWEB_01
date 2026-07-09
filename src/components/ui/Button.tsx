import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";

type Variant = "primary" | "secondary" | "ghost";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  showArrow?: boolean;
  className?: string;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-plum text-ivory hover:bg-plum-dark active:bg-plum-dark border border-plum",
  secondary:
    "bg-transparent text-ink border border-ink/25 hover:border-plum hover:text-plum",
  ghost:
    "bg-transparent text-plum border border-transparent hover:border-plum/40 px-0",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-plum";

type LinkProps = CommonProps & {
  href: string;
};

export function ButtonLink({ href, children, variant = "primary", showArrow = false, className = "" }: LinkProps) {
  return (
    <Link href={href} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
      {showArrow && <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </Link>
  );
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, variant = "primary", showArrow = false, className = "", ...rest }: ButtonProps) {
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...rest}>
      {children}
      {showArrow && <ArrowRightIcon className="h-4 w-4" />}
    </button>
  );
}
