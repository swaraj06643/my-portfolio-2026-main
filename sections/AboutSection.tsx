"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { DepthLayers } from "@/components/DepthLayers";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 50, stiffness: 100 });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
    return () => unsub();
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <DepthLayers as="section" id="about" className="scroll-mt-24 px-6 py-8 md:py-12 md:px-8">
      <div className="mx-auto max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="liquid-glass-card group relative overflow-hidden rounded-2xl p-8 md:p-12 will-change-transform"
          whileHover={{ scale: 1.005 }}
          style={{ transformOrigin: "center" }}
        >
          <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(135deg,hsl(var(--foreground)/0.05),transparent_50%)]" />
          <div className="relative">
            <h2 className="mb-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              About Me
            </h2>
            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              I&apos;m a developer focused on AI prompt engineering and full-stack
              development. I build clean, performant applications and craft
              effective AI interactions. Always learning, always shipping.
            </p>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
              {[
                { value: 5, label: "Years Experience", suffix: "+" },
                { value: 20, label: "Projects Delivered", suffix: "+" },
                { value: 100, label: "Commits", suffix: "%" },
                { value: 1, label: "Cup of Coffee", suffix: " ☕" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                  animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ delay: 0.12 + 0.08 * i, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="liquid-glass-pane rounded-xl p-5 text-center transition-all duration-300 hover:shadow-glow-focus"
                >
                  <div className="text-2xl font-bold text-foreground md:text-3xl">
                    <AnimatedCounter value={item.value} suffix={item.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </DepthLayers>
  );
}
