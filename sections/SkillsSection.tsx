"use client";

import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DepthLayers } from "@/components/DepthLayers";

const SKILLS = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "AI / LLMs",
  "Prompt Engineering",
  "Tailwind",
  "PostgreSQL",
  "Python",
  "Framer Motion",
  "REST & GraphQL",
  "Vercel",
];

function SkillBubble({
  children,
  index,
  isInView,
}: {
  children: ReactNode;
  index: number;
  isInView: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { type: "spring" as const, stiffness: 150, damping: 15 };
  const translateX = useSpring(x, spring);
  const translateY = useSpring(y, spring);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.08;
    const deltaY = (e.clientY - centerY) * 0.08;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        delay: index * 0.05,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{ translateX, translateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "liquid-glass-pane rounded-2xl px-5 py-3",
        "cursor-default select-none transition-all duration-300",
        "hover:shadow-glow-soft"
      )}
    >
      <span className="text-sm font-medium text-foreground md:text-base">
        {children}
      </span>
    </motion.div>
  );
}

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <DepthLayers as="section" id="skills" className="scroll-mt-24 px-6 py-8 md:py-12 md:px-8">
      <div className="mx-auto max-w-4xl" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          Skills
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-10 text-lg text-muted-foreground"
        >
          Technologies and tools I work with.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {SKILLS.map((skill, i) => (
            <SkillBubble key={skill} index={i} isInView={isInView}>
              {skill}
            </SkillBubble>
          ))}
        </div>
      </div>
    </DepthLayers>
  );
}
