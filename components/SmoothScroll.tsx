"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
  });

  return (
    <>
      <motion.aside
        className="pointer-events-none fixed right-4 top-1/2 z-[65] hidden -translate-y-1/2 md:block"
        style={{ opacity: smoothProgress }}
        aria-hidden
      >
        <svg
          width="75"
          height="75"
          viewBox="0 0 100 100"
          className="-rotate-90"
        >
          <circle
            cx="50"
            cy="50"
            r="30"
            pathLength="1"
            className="fill-none stroke-foreground/20"
            strokeWidth="5"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="30"
            pathLength="1"
            style={{ pathLength: smoothProgress }}
            className="fill-none stroke-foreground"
            strokeWidth="5"
          />
        </svg>
      </motion.aside>
      {children}
    </>
  );
}
