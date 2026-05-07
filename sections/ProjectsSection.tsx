"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { DepthLayers } from "@/components/DepthLayers";
import { GitHubActivity } from "@/components/GitHubActivity";
import { ease } from "@/lib/motion";
import Image from "next/image";

const GITHUB_PROFILE = "https://github.com/swaraj06643";

type ProjectShowcase = {
  emoji: string;
  hueA: number;
  hueB: number;
  title: string;
  description: string;
  tech: string[];
  image?: string;
  video?: string;
  href?: string;
  github?: string;
};

const PROJECTS: ProjectShowcase[] = [
  {
    emoji: "🤖",
    hueA: 225,
    hueB: 275,
    title: "Nexora Ai",
    description:
      "An AI vibe coding platform that helps generate websites, PDFs, and resumes with source code—all downloadable.",
    tech: ["AI", "Next.js", "TypeScript", "Vercel"],
    image: "/projects/nexora-ai.png",
    href: "https://nexora-ai-o5tt.onrender.com",
    github: GITHUB_PROFILE,
  },
  {
    emoji: "🛟",
    hueA: 350,
    hueB: 20,
    title: "Rakshyak App",
    description:
      "An emergency access platform designed for people across India, especially in rural and unfamiliar places. It provides quick reach to core emergency facilities like nearest hospital support, ambulance help, police contacts, and location-aware safety access during urgent situations.",
    tech: ["Emergency Access", "Safety", "Location Aware", "India"],
    video: "/projects/rakshyak-app.mp4",
    github: GITHUB_PROFILE,
  },
  {
    emoji: "📄",
    hueA: 35,
    hueB: 62,
    title: "Hirepilot",
    description:
      "A platform to get hired by companies with a humanized, best-in-class ATS-scored resume generator.",
    tech: ["Resume", "ATS", "AI", "Tailwind"],
    image: "/projects/hirepilot.png",
    href: "https://hirepilot-ai.vercel.app/",
    github: GITHUB_PROFILE,
  },
  {
    emoji: "🧠",
    hueA: 80,
    hueB: 130,
    title: "Mind Forge",
    description:
      "A mental ability and coding practice engine for students from class 6 to B.Tech. It combines coding drills, logic challenges, and neural improvement activities to strengthen focus, reasoning speed, memory retention, and problem-solving confidence.",
    tech: ["EdTech", "Coding Practice", "Neural Growth", "Students"],
    video: "/projects/mind-forge.mp4",
    github: GITHUB_PROFILE,
  },
  {
    emoji: "🧬",
    hueA: 188,
    hueB: 235,
    title: "Face Score",
    description:
      "A face analysis app where users can upload or click a photo to get a facial score with detailed form-factor insights. It suggests personalized exercises and supports Dual Analysis mode to compare two people live for side-by-side assessment.",
    tech: ["Face Analysis", "Score Engine", "Exercise Suggestion", "Dual Analysis"],
    video: "/projects/face-score.mp4",
    github: GITHUB_PROFILE,
  },
  {
    emoji: "📍",
    hueA: 278,
    hueB: 320,
    title: "Local Connect",
    description:
      "A civic reporting platform built in Dart with one-click issue submission. Users can track report progress, earn rewards for meaningful civic participation, and improve detection quality with Google ML Kit integration.",
    tech: ["Dart", "Civic Reports", "One-Click Submit", "Google ML Kit"],
    video: "/projects/local-connect.mp4",
    github: GITHUB_PROFILE,
  },
];

const cardVariants: Variants = {
  offscreen: {
    y: 180,
    opacity: 0,
  },
  onscreen: {
    y: 38,
    opacity: 1,
    rotate: -8,
    transition: {
      type: "spring",
      bounce: 0.35,
      duration: 0.85,
    },
  },
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

const splashStyle: CSSProperties = {
  clipPath:
    'path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")',
};

function ScrollProjectCard({ item, i }: { item: ProjectShowcase; i: number }) {
  const background = `linear-gradient(306deg, ${hue(item.hueA)}, ${hue(item.hueB)})`;
  const [videoLightboxOpen, setVideoLightboxOpen] = useState(false);
  const closeLightbox = useCallback(() => setVideoLightboxOpen(false), []);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoLightboxOpen || !item.video || !lightboxVideoRef.current) return;
    lightboxVideoRef.current.play().catch(() => {});
  }, [videoLightboxOpen, item.video]);

  useEffect(() => {
    if (!videoLightboxOpen) return;
    const onEscape = (e: KeyboardEvent) => e.key === "Escape" && closeLightbox();
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [videoLightboxOpen, closeLightbox]);

  return (
    <>
      <motion.div
        className={`card-container-${i} relative -mb-28 flex justify-center overflow-hidden pt-6`}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.72, once: true }}
      >
        <div className="absolute inset-0 rounded-3xl opacity-70 blur-[2px]" style={{ ...splashStyle, background }} />
        <motion.article
          variants={cardVariants}
          transition={{ ease: ease.cinematic }}
          className="liquid-glass-card relative z-10 flex h-[500px] w-full max-w-[340px] flex-col overflow-hidden rounded-[22px] shadow-2xl sm:max-w-[390px]"
          style={{ transformOrigin: "12% 60%" }}
        >
          <button
            type="button"
            disabled={!item.video}
            onClick={() => item.video && setVideoLightboxOpen(true)}
            className="relative block aspect-[16/9] w-full overflow-hidden disabled:cursor-default"
          >
            {item.video ? (
              <video
                src={item.video}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              <Image src={item.image ?? "/projects/nexora-ai.png"} alt={item.title} fill unoptimized className="object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
            <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 px-2 py-1 text-[10px] font-medium text-white/90">
              {item.video ? "Tap to play video" : "Live preview"}
            </div>
          </button>

          <div className="flex h-full flex-col justify-between p-5">
            <div>
              <div className="mb-2 text-3xl">{item.emoji}</div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-foreground/12 bg-foreground/[0.04] px-2.5 py-1 text-[11px] font-medium text-foreground/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs font-medium">
              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-foreground/15 px-3 py-1.5 text-foreground/85 transition-colors hover:text-foreground"
                >
                  Live
                </a>
              )}
              {item.github && (
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-foreground/15 px-3 py-1.5 text-foreground/85 transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </motion.article>
      </motion.div>

      <AnimatePresence>
        {videoLightboxOpen && item.video && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-background/55 p-4 backdrop-blur-sm dark:bg-black/75"
            onClick={closeLightbox}
            aria-modal="true"
            role="dialog"
            aria-label={`${item.title} video`}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: ease.cinematic }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            >
              <video
                ref={lightboxVideoRef}
                src={item.video}
                controls
                playsInline
                className="h-auto max-h-[85vh] w-full object-contain bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function ProjectsSection() {
  return (
    <DepthLayers as="section" id="projects" className="scroll-mt-24 px-6 py-8 md:py-12 md:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, ease: ease.cinematic }}
          className="mb-8 md:mb-10"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Projects</h2>
          <p className="mt-1 text-sm text-muted-foreground">Tap any card with video to open full demo.</p>
          <p className="mt-2 text-lg text-muted-foreground">A selection of recent work.</p>
        </motion.div>

        <div className="mx-auto mb-10 w-full max-w-[500px] pb-20">
          {PROJECTS.map((item, index) => (
            <ScrollProjectCard key={item.title} item={item} i={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.12, ease: ease.cinematic }}
        >
          <GitHubActivity username="swaraj06643" />
        </motion.div>
      </div>
    </DepthLayers>
  );
}
