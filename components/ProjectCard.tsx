"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { scrollRevealStagger } from "@/lib/motion";
import { useTilt3D } from "@/hooks/useTilt3D";
import { useCallback, useEffect, useRef, useState } from "react";

type Project = {
  title: string;
  description: string;
  image?: string;
  video?: string;
  tech: string[];
  href?: string;
  github?: string;
};

export function ProjectCard({ project }: { project: Project }) {
  const tilt = useTilt3D();
  const [videoLightboxOpen, setVideoLightboxOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const isMediaInView = useInView(mediaRef, { amount: 0.6, margin: "-5% 0px -5% 0px" });
  const isVideoProject = Boolean(project.video);
  const closeLightbox = useCallback(() => setVideoLightboxOpen(false), []);

  useEffect(() => {
    if (!project.video || !videoRef.current) return;

    if (isMediaInView) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked by browser policies.
      });
      return;
    }

    videoRef.current.pause();
  }, [isMediaInView, project.video]);

  useEffect(() => {
    if (!videoLightboxOpen || !lightboxVideoRef.current) return;
    lightboxVideoRef.current.play().catch(() => {
      // Playback can fail if browser blocks autoplay with sound.
    });
  }, [videoLightboxOpen]);

  useEffect(() => {
    if (!videoLightboxOpen) return;
    const onEscape = (e: KeyboardEvent) => e.key === "Escape" && closeLightbox();
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [videoLightboxOpen, closeLightbox]);

  const cardClassName =
    "block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-2xl";

  const renderCardContent = () => (
    <motion.div
      style={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-300 group-hover:shadow-md will-change-transform"
    >
      <div className="overflow-hidden rounded-2xl bg-card">
        <div ref={mediaRef} className="relative aspect-[5/3] overflow-hidden">
          {project.video ? (
            <video
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] will-change-transform"
            />
          ) : (
            <Image
              src={project.image ?? "/projects/nexora-ai.png"}
              alt={project.title}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] will-change-transform"
            />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent dark:from-black/65"
            aria-hidden
          />
          <div className="absolute bottom-0 left-0 right-0 px-5 py-4 md:px-6 md:py-5">
            <h3 className="text-lg font-semibold tracking-tight text-white md:text-xl">
              {project.title}
            </h3>
          </div>
        </div>
        <div className="border-t border-border/70">
          <div className="p-5 md:p-6">
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className={cn(
                    "rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-foreground/85"
                  )}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <motion.article
        variants={scrollRevealStagger.item}
        className="group relative"
      >
        {isVideoProject ? (
          <button
            type="button"
            className={cardClassName}
            onClick={() => setVideoLightboxOpen(true)}
          >
            {renderCardContent()}
          </button>
        ) : (
          <a
            href={project.href ?? "#projects"}
            target={project.href ? "_blank" : undefined}
            rel={project.href ? "noopener noreferrer" : undefined}
            className={cardClassName}
          >
            {renderCardContent()}
          </a>
        )}
        {(project.github || project.href) && (
          <div className="absolute right-4 top-4 z-10 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-black/60"
                aria-label="GitHub profile"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-black/60"
                aria-label="Open project"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </motion.article>

      <AnimatePresence>
        {videoLightboxOpen && project.video && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/45 dark:bg-black/70 backdrop-blur-sm p-4"
            onClick={closeLightbox}
            aria-modal="true"
            role="dialog"
            aria-label={`${project.title} video`}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            >
              <video
                ref={lightboxVideoRef}
                src={project.video}
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
