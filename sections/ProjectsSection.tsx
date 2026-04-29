"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { scrollRevealStagger } from "@/lib/motion";
import { DepthLayers } from "@/components/DepthLayers";
import { ProjectCard } from "@/components/ProjectCard";
import { GitHubActivity } from "@/components/GitHubActivity";

const GITHUB_PROFILE = "https://github.com/swaraj06643";

const PROJECTS = [
  {
    title: "Nexora Ai",
    description:
      "An AI vibe coding platform that helps generate websites, PDFs, and resumes with source code—all downloadable.",
    image: "/projects/nexora-ai.png",
    tech: ["AI", "Next.js", "TypeScript", "Vercel"],
    href: "https://nexora-ai-o5tt.onrender.com",
    github: GITHUB_PROFILE,
  },
  {
    title: "Rakshyak App",
    description:
      "An emergency access platform designed for people across India, especially in rural and unfamiliar places. It provides quick reach to core emergency facilities like nearest hospital support, ambulance help, police contacts, and location-aware safety access during urgent situations.",
    video: "/projects/rakshyak-app.mp4",
    tech: ["Emergency Access", "Safety", "Location Aware", "India"],
    github: GITHUB_PROFILE,
  },
  {
    title: "Hirepilot",
    description:
      "A platform to get hired by companies with a humanized, best-in-class ATS-scored resume generator.",
    image: "/projects/hirepilot.png",
    tech: ["Resume", "ATS", "AI", "Tailwind"],
    href: "https://hirepilot-ai.vercel.app/",
    github: GITHUB_PROFILE,
  },
  {
    title: "Mind Forge",
    description:
      "A mental ability and coding practice engine for students from class 6 to B.Tech. It combines coding drills, logic challenges, and neural improvement activities to strengthen focus, reasoning speed, memory retention, and problem-solving confidence.",
    video: "/projects/mind-forge.mp4",
    tech: ["EdTech", "Coding Practice", "Neural Growth", "Students"],
    github: GITHUB_PROFILE,
  },
  {
    title: "Face Score",
    description:
      "A face analysis app where users can upload or click a photo to get a facial score with detailed form-factor insights. It suggests personalized exercises and supports Dual Analysis mode to compare two people live for side-by-side assessment.",
    video: "/projects/face-score.mp4",
    tech: ["Face Analysis", "Score Engine", "Exercise Suggestion", "Dual Analysis"],
    github: GITHUB_PROFILE,
  },
  {
    title: "Local Connect",
    description:
      "A civic reporting platform built in Dart with one-click issue submission. Users can track report progress, earn rewards for meaningful civic participation, and improve detection quality with Google ML Kit integration.",
    video: "/projects/local-connect.mp4",
    tech: ["Dart", "Civic Reports", "One-Click Submit", "Google ML Kit"],
    github: GITHUB_PROFILE,
  },
];

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
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Projects
          </h2>
          <p className="mb-2 text-sm text-muted-foreground">
            <span aria-hidden="true">*</span> Application projects include video demo; websites have link.
          </p>
          <p className="mt-2 text-lg text-muted-foreground">
            A selection of recent work.
          </p>
        </motion.div>

        <motion.div
          variants={scrollRevealStagger.container}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="grid gap-6 sm:grid-cols-2"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <GitHubActivity username="swaraj06643" />
        </motion.div>
      </div>
    </DepthLayers>
  );
}
