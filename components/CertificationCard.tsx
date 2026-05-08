"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { scrollRevealStagger } from "@/lib/motion";

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  image: string;
  verifyUrl?: string;
};

export function CertificationCard({ certification }: { certification: Certification }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [rotation, setRotation] = useState("0deg");
  const rtlTitle = /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(certification.title);
  const rtlDescription = /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(certification.issuer);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x);
    setRotation(`${angle}rad`);
  };

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
          className="mx-auto block w-full max-w-[388px] text-left outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-2xl"
        >
          <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
              setHovered(false);
              setRotation("0deg");
            }}
            style={{
              border: "3px solid transparent",
              borderRadius: "1em",
              padding: "10px",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              backgroundImage: `linear-gradient(hsl(var(--background)), hsl(var(--background))), conic-gradient(from ${rotation}, #FF8A00 0deg, #FF8A00 90deg, #242424 90deg, #242424 360deg)`,
            }}
            className="transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,138,0,0.35)]"
          >
            <div
              style={{
                backgroundImage:
                  "linear-gradient(45deg, rgba(230,230,230,0.15) 25%, transparent 25%, transparent 75%, rgba(240,240,240,0.15) 75%), linear-gradient(-45deg, rgba(240,240,240,0.15) 25%, transparent 25%, transparent 75%, rgba(230,230,230,0.15) 75%)",
                backgroundSize: "20.84px 20.84px",
              }}
              className="overflow-hidden rounded-[calc(1rem-1px)] border border-white/10 bg-black pb-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={certification.image}
                  alt={certification.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                />
              </div>
              <div className="flex min-h-[120px] flex-col justify-between px-3 pb-1 pt-2.5 md:min-h-[128px] md:px-5 md:pt-3">
                <h3
                  dir={rtlTitle ? "rtl" : "ltr"}
                  className="relative mb-1 overflow-hidden text-center text-sm font-bold tracking-tight text-[#f5f5f5] md:text-lg"
                >
                  <span className="relative z-10 px-1">
                    {certification.title}
                  </span>
                  <span
                    style={{
                      clipPath: hovered
                        ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
                        : "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
                    }}
                    className="absolute inset-[-4px] z-0 bg-[#FF8A00] transition-all duration-300 [transition-timing-function:cubic-bezier(.1,.5,.5,1)]"
                  />
                </h3>
                <p
                  dir={rtlDescription ? "rtl" : "ltr"}
                  className="mb-1 line-clamp-2 text-[11px] text-[#f5f5f5]/85 md:text-sm"
                >
                  {certification.issuer}
                </p>
                <p className="text-xs text-[#f5f5f5]/70 md:text-sm">{certification.date}</p>
              </div>
            </div>
          </div>
        </button>

        {certification.verifyUrl && (
          <a
            href={certification.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-black/55 text-white/85 backdrop-blur-sm transition-all duration-300 hover:text-white hover:shadow-glow-focus opacity-0 group-hover:opacity-100"
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
