"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  amount?: number;
  delay?: number;
  stagger?: number;
  once?: boolean;
  trigger?: "inView" | "mount";
};

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  duration?: number;
  scale?: number;
  y?: number;
};

export function StaggerReveal({
  children,
  className,
  amount = 0.3,
  delay = 0,
  stagger = 0.08,
  once = true,
  trigger = "inView",
}: StaggerRevealProps) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      animate={trigger === "mount" ? "visible" : undefined}
      whileInView={trigger === "inView" ? "visible" : undefined}
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: reduceMotion ? 0 : stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  duration = 0.58,
  scale = 1,
  y = 18,
}: StaggerItemProps) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.div
      className={className}
      variants={
        reduceMotion
          ? undefined
          : {
              hidden: { opacity: 0, y, scale },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration, ease: "easeOut" },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}
