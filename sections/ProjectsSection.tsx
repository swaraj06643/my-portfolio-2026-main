"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { DepthLayers } from "@/components/DepthLayers";
import { GitHubActivity } from "@/components/GitHubActivity";
import { ease, scrollRevealStagger } from "@/lib/motion";
import Image from "next/image";
import { FlippingCard } from "@/components/FlippingCard";

const GITHUB_PROFILE = "https://github.com/swaraj06643";

type ProjectShowcase = {
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
    title: "Nexora Ai",
    description:
      "An AI vibe coding platform that helps generate websites, PDFs, and resumes with source code—all downloadable.",
    tech: ["AI", "Next.js", "TypeScript", "Vercel"],
    image: "/projects/nexora-ai.png",
    href: "https://nexora-ai-o5tt.onrender.com",
    github: GITHUB_PROFILE,
  },
  {
    title: "Rakshyak App",
    description:
      "An emergency access platform designed for people across India, especially in rural and unfamiliar places. It provides quick reach to core emergency facilities like nearest hospital support, ambulance help, police contacts, and location-aware safety access during urgent situations.",
    tech: ["Emergency Access", "Safety", "Location Aware", "India"],
    video: "/projects/rakshyak-app.mp4",
    github: GITHUB_PROFILE,
  },
  {
    title: "Hirepilot",
    description:
      "A platform to get hired by companies with a humanized, best-in-class ATS-scored resume generator.",
    tech: ["Resume", "ATS", "AI", "Tailwind"],
    image: "/projects/hirepilot.png",
    href: "https://hirepilot-ai.vercel.app/",
    github: GITHUB_PROFILE,
  },
  {
    title: "Mind Forge",
    description:
      "A mental ability and coding practice engine for students from class 6 to B.Tech. It combines coding drills, logic challenges, and neural improvement activities to strengthen focus, reasoning speed, memory retention, and problem-solving confidence.",
    tech: ["EdTech", "Coding Practice", "Neural Growth", "Students"],
    video: "/projects/mind-forge.mp4",
    github: GITHUB_PROFILE,
  },
  {
    title: "Face Score",
    description:
      "A face analysis app where users can upload or click a photo to get a facial score with detailed form-factor insights. It suggests personalized exercises and supports Dual Analysis mode to compare two people live for side-by-side assessment.",
    tech: ["Face Analysis", "Score Engine", "Exercise Suggestion", "Dual Analysis"],
    video: "/projects/face-score.mp4",
    github: GITHUB_PROFILE,
  },
  {
    title: "Local Connect",
    description:
      "A civic reporting platform built in Dart with one-click issue submission. Users can track report progress, earn rewards for meaningful civic participation, and improve detection quality with Google ML Kit integration.",
    tech: ["Dart", "Civic Reports", "One-Click Submit", "Google ML Kit"],
    video: "/projects/local-connect.mp4",
    github: GITHUB_PROFILE,
  },
];

function ScrollProjectCard({ item }: { item: ProjectShowcase }) {
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
      <motion.article variants={scrollRevealStagger.item} className="flex justify-center">
        <FlippingCard
          className="max-w-full"
          width={340}
          height={460}
          frontContent={
            <button
              type="button"
              disabled={!item.video}
              onClick={() => item.video && setVideoLightboxOpen(true)}
              className="relative h-full w-full overflow-hidden rounded-lg text-left disabled:cursor-default"
            >
              {item.video ? (
                <video
                  src={item.video}
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={item.image ?? "/projects/nexora-ai.png"}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-xs text-white/80">
                  {item.video ? "Hover to flip for details | Tap to play demo" : "Hover to flip for details"}
                </p>
              </div>
            </button>
          }
          backContent={
            <div className="flex h-full flex-col justify-between rounded-lg border border-border bg-background/95 p-4">
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-foreground/15 bg-foreground/[0.03] px-2.5 py-1 text-[11px] font-medium text-foreground/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium">
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
          }
        />
      </motion.article>

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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <DepthLayers as="section" id="projects" className="scroll-mt-24 px-6 py-8 md:py-12 md:px-8">
      <div className="mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-4 md:mb-5"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Projects</h2>
          <p className="mt-1 text-sm text-muted-foreground">Hover to flip each card. Tap video cards to open demos.</p>
          <p className="mt-2 text-lg text-muted-foreground">A selection of recent work.</p>
        </motion.div>

        <motion.div
          variants={scrollRevealStagger.container}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS.map((item) => (
            <ScrollProjectCard key={item.title} item={item} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-10"
        >
          <GitHubActivity username="swaraj06643" />
        </motion.div>
      </div>
    </DepthLayers>
  );
}
