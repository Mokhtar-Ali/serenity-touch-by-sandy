"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  amount?: number;
  delay?: number;
  duration?: number;
  initiallyVisible?: boolean;
  scale?: number;
  once?: boolean;
  trigger?: "inView" | "mount";
  y?: number;
};

export function Reveal({
  children,
  className,
  amount = 0.22,
  delay = 0,
  duration = 0.72,
  initiallyVisible = false,
  scale = 1,
  once = true,
  trigger = "inView",
  y = 18,
}: RevealProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const shouldSkipInitialState = reduceMotion || initiallyVisible;
  const hiddenState = { opacity: 0, y, scale };
  const visibleState = reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 };

  return (
    <motion.div
      className={className}
      initial={shouldSkipInitialState ? false : hiddenState}
      animate={trigger === "mount" ? visibleState : undefined}
      whileInView={trigger === "inView" ? visibleState : undefined}
      viewport={{ once, amount }}
      transition={reduceMotion ? { duration: 0 } : { duration, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
