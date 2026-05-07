"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

type DepthLayersProps = {
  children: ReactNode;
  className?: string;
  /** Section ref for parallax; if not provided, uses first child section */
  as?: "section" | "div";
  id?: string;
};

/**
 * Wraps section content with 3–5 depth layers:
 * 1. Background gradient mesh (slow)
 * 2. Grid overlay
 * 3. Floating orbs
 * 4. Main content (children)
 * 5. Optional foreground glow – handled per section
 */
export function DepthLayers({
  children,
  className = "",
  as: Comp = "section",
  id,
}: DepthLayersProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "8%", "15%"]);
  const gridY = useTransform(scrollYProgress, [0, 0.5], ["0%", "5%"]);
  const orb1X = useTransform(scrollYProgress, [0, 0.4], ["0%", "6%"]);
  const orb2X = useTransform(scrollYProgress, [0, 0.4], ["0%", "-4%"]);

  return (
    <Comp ref={ref as React.Ref<HTMLDivElement>} id={id} className={`relative overflow-hidden ${className}`}>
      {/* Layer 1: Gradient mesh (slowest) */}
      <motion.div
        style={reduceMotion ? undefined : { y: bgY }}
        className="pointer-events-none absolute inset-0 -z-20"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/[0.02] to-transparent dark:via-foreground/[0.04]" />
      </motion.div>

      {/* Layer 2: Grid */}
      <motion.div
        style={
          reduceMotion
            ? {
                backgroundImage:
                  "linear-gradient(hsl(var(--foreground)/0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/0.04) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }
            : {
                y: gridY,
                backgroundImage:
                  "linear-gradient(hsl(var(--foreground)/0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/0.04) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }
        }
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] dark:opacity-25"
      />

      {/* Layer 3: Floating orbs */}
      <motion.div
        style={reduceMotion ? undefined : { x: orb1X }}
        className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-foreground/[0.04] blur-[80px] dark:bg-foreground/[0.06] will-change-transform motion-safe:animate-float-orb"
        aria-hidden
      />
      <motion.div
        style={reduceMotion ? undefined : { x: orb2X }}
        className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-foreground/[0.03] blur-[100px] dark:bg-foreground/[0.05] will-change-transform motion-safe:animate-float-orb"
        aria-hidden
      />

      {/* Layer 4: Content */}
      <div className="relative z-0">{children}</div>
    </Comp>
  );
}
