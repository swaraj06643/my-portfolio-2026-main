"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const defaultVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function SectionWrapper({
  children,
  className = "",
  id,
  as = "section",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
}) {
  const Comp = as;
  return (
    <Comp id={id} className={className}>
      {children}
    </Comp>
  );
}

export { defaultVariants };
