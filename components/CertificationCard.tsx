"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { scrollRevealStagger } from "@/lib/motion";
import { useTilt3D } from "@/hooks/useTilt3D";

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  image: string;
  verifyUrl?: string;
};

export function CertificationCard({ certification }: { certification: Certification }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const tilt = useTilt3D();

  const close = useCallback(() => setLightboxOpen(false), []);
  useEffect(() => {
    if (!lightboxOpen) return;
    const onEscape = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [lightboxOpen, close]);

  return (
    <>
      <motion.article
        variants={scrollRevealStagger.item}
        className="group relative"
      >
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-2xl"
        >
          <motion.div
            style={{
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
              transformStyle: "preserve-3d",
            }}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            className="gradient-border-wrap rounded-2xl will-change-transform"
          >
            <div className="liquid-glass-card overflow-hidden rounded-[calc(1rem-1px)] bg-background/80 backdrop-blur-xl transition-all duration-500 group-hover:shadow-glow-bloom dark:bg-background/90">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={certification.image}
                  alt={certification.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
                  aria-hidden
                />
                <div className="absolute bottom-0 left-0 right-0 liquid-glass-pane rounded-t-2xl border-b-0 px-4 py-3 md:px-5 md:py-4">
                  <h3 className="text-base font-semibold tracking-tight text-foreground md:text-lg line-clamp-2">
                    {certification.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground md:text-sm">
                    {certification.issuer}
                  </p>
                </div>
              </div>
              <div className="border-t border-foreground/[0.06] dark:border-foreground/10 px-4 py-3 md:px-5 md:py-4">
                <p className="text-sm text-muted-foreground">{certification.date}</p>
              </div>
            </div>
          </motion.div>
        </button>

        {certification.verifyUrl && (
          <a
            href={certification.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-xl liquid-glass-pane text-muted-foreground transition-all duration-300 hover:text-foreground hover:shadow-glow-focus opacity-0 group-hover:opacity-100"
            aria-label="Verify certificate"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </motion.article>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={close}
            aria-modal="true"
            role="dialog"
            aria-label="Certificate"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-3xl items-center justify-center overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
            >
              <Image
                src={certification.image}
                alt={certification.title}
                width={900}
                height={600}
                className="h-auto w-full object-contain"
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
