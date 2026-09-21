import type { ReactNode } from "react";

import { AnimatedHeading } from "@/components/ui/animated-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleId?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "center",
  className,
  titleId,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      <p className="mb-3 font-display text-xl italic text-sage-600">{eyebrow}</p>
      <AnimatedHeading
        id={titleId}
        title={title}
        className="font-display text-4xl font-semibold leading-none text-sage-950 sm:text-5xl"
      />
      {children ? (
        <div className="mt-5 text-base leading-8 text-sage-900/78 sm:text-lg">
          {children}
        </div>
      ) : null}
    </Reveal>
  );
}
