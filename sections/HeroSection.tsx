"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Code2 } from "lucide-react";
import { heroEntrance } from "@/lib/motion";
import { useMagnetic } from "@/hooks/useMagnetic";

const ROLES = [
  "AI Prompt Engineer",
  "Fullstack Developer",
  "Problem Solver",
];

function Typewriter({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[index];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (display.length < phrase.length) {
            setDisplay(phrase.slice(0, display.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (display.length > 0) {
            setDisplay(phrase.slice(0, display.length - 1));
          } else {
            setIsDeleting(false);
            setIndex((i) => (i + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [display, isDeleting, index, phrases]);

  return (
    <span className="inline-block min-w-[260px] text-left text-foreground md:min-w-[300px]">
      {display}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="ml-0.5 inline-block h-4 w-0.5 bg-foreground align-middle"
        aria-hidden
      />
    </span>
  );
}

function FloatingCodeWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute right-0 top-1/2 hidden w-[240px] -translate-y-1/2 rounded-xl p-3 md:block liquid-glass transition-shadow duration-300 hover:shadow-glow-soft will-change-transform"
    >
      <div className="mb-2 flex gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
      </div>
      <pre className="font-mono text-[11px] leading-relaxed text-foreground/85">
        <code>
          <span className="text-foreground">const</span>{" "}
          <span className="text-muted-foreground">dev</span> ={" "}
          <span className="text-foreground">&quot;Subhasish&quot;</span>;
          {"\n"}
          <span className="text-foreground">dev</span>.
          <span className="text-muted-foreground">stack</span> = [
          {"\n"}
          {"  "}
          <span className="text-foreground">&quot;AI&quot;</span>,{" "}
          <span className="text-foreground">&quot;Next.js&quot;</span>,
          {"\n"}
          {"  "}
          <span className="text-foreground">&quot;TypeScript&quot;</span>
          {"\n];"}
        </code>
      </pre>
    </motion.div>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const blob1X = useTransform(scrollYProgress, [0, 0.5], ["0%", "12%"]);
  const blob2X = useTransform(scrollYProgress, [0, 0.5], ["0%", "-8%"]);
  const blob3Y = useTransform(scrollYProgress, [0, 0.4], ["0%", "15%"]);
  const contentY = useTransform(scrollYProgress, [0, 0.25], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0.25]);

  const magneticPrimary = useMagnetic();
  const magneticOutline = useMagnetic();

  return (
    <section
      ref={ref}
      className="relative flex min-h-[72vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-12 md:min-h-[70vh] md:px-8 md:pt-28 md:pb-14"
    >
      {/* Layer 0: Base gradient (slowest) */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-background via-background to-background"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-30%,hsl(var(--foreground)/0.05),transparent_50%)]" />
      </motion.div>

      {/* Layer 1: Soft vignette */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_60%,hsl(var(--foreground)/0.02))]"
        aria-hidden
      />

      {/* Layer 2: Grid – far (slower parallax) */}
      <motion.div
        style={{
          y: gridY,
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.4] dark:hidden"
      />
      <motion.div
        style={{
          y: gridY,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
        className="pointer-events-none absolute inset-0 -z-10 hidden opacity-[0.35] dark:block"
      />

      {/* Layer 3: Finer grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.25] dark:hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden opacity-20 dark:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Layer 4: Blobs with floating animation */}
      <motion.div
        style={{ x: blob1X }}
        className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-foreground/[0.05] blur-[100px] dark:bg-foreground/[0.08] animate-float-orb will-change-transform"
        aria-hidden
      />
      <motion.div
        style={{ x: blob2X }}
        className="absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-foreground/[0.04] blur-[120px] dark:bg-foreground/[0.06] animate-float-slow will-change-transform"
        aria-hidden
      />
      <motion.div
        style={{ y: blob3Y }}
        className="absolute left-1/2 top-2/3 h-64 w-64 -translate-x-1/2 rounded-full bg-foreground/[0.03] blur-[80px] dark:bg-foreground/[0.05] animate-float-orb will-change-transform"
        aria-hidden
      />

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center"
      >
        {/* Light beam sweep across heading */}
        <div className="relative mb-4 inline-block">
          <motion.h1
            {...heroEntrance.title}
            className="relative text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Subhasish Rath</span>
              {/* Animated gradient accent under name */}
              <span
                className="absolute -inset-x-2 bottom-0 top-full h-2 bg-gradient-to-r from-transparent via-foreground/15 to-transparent dark:via-foreground/20"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "gradient-shift 6s ease-in-out infinite",
                }}
                aria-hidden
              />
            </span>
          </motion.h1>
          {/* Light beam overlay */}
          <div
            className="pointer-events-none absolute inset-0 top-0 h-full w-full overflow-hidden rounded-lg"
            aria-hidden
          >
            <div
              className="absolute inset-0 h-full w-1/2 origin-left bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5"
              style={{ animation: "light-beam 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite" }}
            />
          </div>
        </div>

        <motion.p
          {...heroEntrance.subtitle}
          className="mb-2 text-lg text-muted-foreground md:text-xl"
        >
          Master in AI Prompt & Fullstack Dev
        </motion.p>

        <motion.div
          {...heroEntrance.typewriter}
          className="mb-10 min-h-[2rem] text-lg text-muted-foreground md:text-xl"
        >
          <Typewriter phrases={ROLES} />
        </motion.div>

        <motion.div
          {...heroEntrance.cta}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#projects"
            style={{
              translateX: magneticPrimary.translateX,
              translateY: magneticPrimary.translateY,
            }}
            onMouseMove={magneticPrimary.onMouseMove}
            onMouseLeave={magneticPrimary.onMouseLeave}
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-2xl transition-shadow duration-300 hover:shadow-glow-bloom will-change-transform"
            )}
          >
            <span className="relative z-10">View Projects</span>
          </motion.a>
          <motion.a
            href="#book-call"
            style={{
              translateX: magneticOutline.translateX,
              translateY: magneticOutline.translateY,
            }}
            onMouseMove={magneticOutline.onMouseMove}
            onMouseLeave={magneticOutline.onMouseLeave}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-2xl inline-flex items-center transition-shadow duration-300 hover:shadow-glow-focus will-change-transform"
            )}
          >
            <Code2 className="mr-2 h-4 w-4" />
            Book Free Call
          </motion.a>
        </motion.div>
      </motion.div>

      <FloatingCodeWindow />
    </section>
  );
}
