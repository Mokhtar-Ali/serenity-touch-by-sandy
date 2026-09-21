import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "light" | "outlineLight" | "ghost";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const baseClasses =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-300 ease-out motion-safe:hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-sage-800 text-cream-100 shadow-[0_18px_36px_rgba(73,85,63,0.22)] hover:bg-sage-700 focus-visible:outline-sage-700",
  secondary:
    "border border-sage-700/20 bg-white/55 text-sage-900 shadow-[0_14px_30px_rgba(73,85,63,0.08)] hover:border-sage-700/35 hover:bg-white/80 focus-visible:outline-sage-700",
  light:
    "bg-cream-100 text-sage-950 shadow-[0_18px_40px_rgba(29,36,27,0.18)] hover:bg-white focus-visible:outline-cream-100",
  outlineLight:
    "border border-cream-100/35 bg-cream-100/8 text-cream-100 hover:bg-cream-100/14 focus-visible:outline-cream-100",
  ghost:
    "text-sage-900 hover:bg-sage-700/8 focus-visible:outline-sage-700",
};

export function ButtonLink({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <a className={cn(baseClasses, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}
