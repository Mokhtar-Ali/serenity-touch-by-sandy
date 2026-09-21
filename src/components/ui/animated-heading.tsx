"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type AnimatedHeadingProps = {
  id?: string;
  as?: "h1" | "h2" | "h3";
  title: string;
  className?: string;
  delay?: number;
  initiallyVisible?: boolean;
  stagger?: number;
  trigger?: "inView" | "mount";
};

export function AnimatedHeading({
  id,
  as = "h2",
  title,
  className,
  delay = 0,
  initiallyVisible = false,
  stagger = 0.065,
  trigger = "inView",
}: AnimatedHeadingProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const Heading = as === "h1" ? motion.h1 : as === "h3" ? motion.h3 : motion.h2;
  const words = title.split(" ");

  if (reduceMotion) {
    const StaticHeading = as;

    return (
      <StaticHeading id={id} className={className}>
        {title}
      </StaticHeading>
    );
  }

  return (
    <Heading
      id={id}
      className={cn("overflow-hidden", className)}
      initial={initiallyVisible ? false : "hidden"}
      animate={trigger === "mount" ? "visible" : undefined}
      whileInView={trigger === "inView" ? "visible" : undefined}
      viewport={{ once: true, amount: 0.68 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <motion.span
            className="inline-block overflow-hidden"
            variants={{
              hidden: { y: "105%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.62, ease: "easeOut" },
              },
            }}
          >
            <span className="inline-block">{word}</span>
          </motion.span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Heading>
  );
}
