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

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className="h-full w-full text-slate-900 dark:text-white" viewBox="0 0 696 316" fill="none">
        <title>Hero Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.06 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{
              pathLength: 1,
              opacity: [0.25, 0.55, 0.25],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 18 + path.id * 0.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

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
  const contentY = useTransform(scrollYProgress, [0, 0.25], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0.25]);

  const magneticPrimary = useMagnetic();
  const magneticOutline = useMagnetic();

  return (
    <section
      ref={ref}
      className="relative flex min-h-[72vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-12 md:min-h-[70vh] md:px-8 md:pt-28 md:pb-14"
    >
      {/* Hero-only animated background */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -z-20 bg-background"
      >
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/65" />
      </motion.div>

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
