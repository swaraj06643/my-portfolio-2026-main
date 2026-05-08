"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
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

function ScrollProjectCard({ item, i }: { item: ProjectShowcase; i: number }) {
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
        className={`card-container-${i} relative -mb-20 flex justify-center overflow-hidden pt-6`}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.72, once: true }}
      >
        <motion.article
          variants={cardVariants}
          transition={{ ease: ease.cinematic }}
          className="project-outer relative z-10 h-[500px] w-full max-w-[340px] sm:max-w-[390px]"
          style={{ transformOrigin: "12% 60%" }}
        >
          <div className="project-dot" />
          <div className="project-card">
            <div className="project-ray" />
            <button
              type="button"
              disabled={!item.video}
              onClick={() => item.video && setVideoLightboxOpen(true)}
              className="relative block aspect-[16/9] w-full overflow-hidden rounded-xl disabled:cursor-default"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/45 px-2 py-1 text-[10px] font-medium text-white/90">
                {item.video ? "Tap to play video" : "Live preview"}
              </div>
            </button>
            <div className="project-value mt-3">{item.title}</div>
            <div className="text-xs text-muted-foreground">{item.description}</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-foreground/15 bg-foreground/[0.03] px-2 py-0.5 text-[10px] font-medium text-foreground/80"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs font-medium">
              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-foreground/15 px-2.5 py-1 text-foreground/85 transition-colors hover:text-foreground"
                >
                  Live
                </a>
              )}
              {item.github && (
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-foreground/15 px-2.5 py-1 text-foreground/85 transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              )}
            </div>
            <div className="project-line project-line-top" />
            <div className="project-line project-line-left" />
            <div className="project-line project-line-bottom" />
            <div className="project-line project-line-right" />
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
