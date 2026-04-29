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
            <div className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              <p>
                I&apos;m an AI product builder and <span className="font-semibold text-foreground">LLM designer</span>
                who turns messy ideas into focused, reliable prompt systems. I work with{" "}
                <span className="font-semibold text-foreground">RAG</span> and agent
                workflows to produce answers that feel natural, safe, and consistent.
              </p>
              <p className="mt-4">
                I also design mobile experiences as a <span className="font-semibold text-foreground">Flutter UI designer</span>,
                bridging interaction, typography, and performance. Right now, I&apos;m
                aiming to become a strong <span className="font-semibold text-foreground">LangChain aspirant</span>:
                I prototype, refine prompts, and iterate based on real usage.
              </p>
              <p className="mt-4">
                I care about latency and conversational UX - not just demos. I enjoy
                shipping clean, performant full-stack products end-to-end. Always learning,
                always improving, always building.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {[
                { value: 3, label: "Years Experience", suffix: "" },
                { value: 20, label: "Projects Delivered", suffix: "+" },
                { value: 100, label: "Commits", suffix: "%" },
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
