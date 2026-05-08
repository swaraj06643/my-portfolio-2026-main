"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { DepthLayers } from "@/components/DepthLayers";
import type { Certification } from "@/components/CertificationCard";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { ease } from "@/lib/motion";

type CertificationStackItem = Certification & { color: string };

const CERTIFICATIONS: CertificationStackItem[] = [
  {
    title: "Geo-data sharing and Cyber Security",
    issuer: "IIRS / ISRO, Department of Space, Govt. of India",
    date: "Dec 2024 – Jan 2025 · 10 hrs · Grade A+",
    image: "/certificates/cert-1.png",
    verifyUrl: "https://certificate.iirs.gov.in",
    color: "rgba(109,40,217,0.8)",
  },
  {
    title: "The Method of Space Science Research",
    issuer: "IIRS / ISRO, Dept. of Space, Govt. of India",
    date: "May 2025 · 5 hrs · Grade A+ · 100% attendance",
    image: "/certificates/cert-2.png",
    verifyUrl: "https://certificate.iirs.gov.in",
    color: "rgba(37,99,235,0.8)",
  },
  {
    title: "Python for Data Science, AI & Development",
    issuer: "IBM · Coursera",
    date: "May 2025",
    image: "/certificates/cert-3.png",
    verifyUrl: "https://coursera.org/verify/AB5IWIXYJC07",
    color: "rgba(5,150,105,0.8)",
  },
  {
    title: "Developing Back-End Apps with Node.js and Express",
    issuer: "IBM · Coursera",
    date: "Dec 2024",
    image: "/certificates/cert-4.png",
    verifyUrl: "https://coursera.org/verify/4BEX9VPRKEV6",
    color: "rgba(202,138,4,0.8)",
  },
  {
    title: "Graphic Design",
    issuer: "Adobe · Coursera",
    date: "Dec 2025",
    image: "/certificates/cert-5.png",
    verifyUrl: "https://coursera.org/verify/1A3KBIR48V7J",
    color: "rgba(220,38,38,0.8)",
  },
  {
    title: "Artificial Intelligence & Machine Learning",
    issuer: "Central Tool Room & Training Centre, Bhubaneswar (CTTC)",
    date: "Jun 2025 · Industrial training",
    image: "/certificates/cert-6.png",
    color: "rgba(236,72,153,0.8)",
  },
  {
    title: "Innovation, Design and Entrepreneurship (IDE) Bootcamp",
    issuer: "AICTE & MoE's Innovation Cell",
    date: "Feb 2025 · Edition 2 Phase II",
    image: "/certificates/cert-7.png",
    color: "rgba(14,165,233,0.8)",
  },
];

function StackedCertificationCard({
  cert,
  index,
  totalCards,
  onOpen,
}: {
  cert: CertificationStackItem;
  index: number;
  totalCards: number;
  onOpen: (cert: CertificationStackItem) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const targetScale = 1 - (totalCards - index) * 0.05;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={containerRef} className="sticky top-0 flex h-[92vh] items-center justify-center">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${index * 24}px)` }}
        className="relative isolate h-[450px] w-[92%] max-w-4xl rounded-3xl"
      >
        <div
          className="absolute -inset-[3px] -z-10 rounded-[27px] p-[3px]"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, ${cert.color} 60deg, ${cert.color.replace(
              "0.8",
              "0.6"
            )} 120deg, transparent 180deg, ${cert.color.replace("0.8", "0.4")} 240deg, transparent 360deg)`,
          }}
        />
        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/20 bg-background/20 p-5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-white/5 to-transparent dark:from-white/10" />
          <div className="pointer-events-none absolute left-3 right-3 top-3 h-[2px] rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 rounded-3xl [background-image:radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.12)_1px,transparent_2px),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.08)_1px,transparent_2px)] [background-size:30px_30px,24px_24px]" />

          <button
            type="button"
            onClick={() => onOpen(cert)}
            className="relative block h-[62%] overflow-hidden rounded-2xl text-left"
          >
            <Image src={cert.image} alt={cert.title} fill unoptimized className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="line-clamp-2 text-xl font-semibold text-white">{cert.title}</h3>
              <p className="mt-1 text-sm text-white/80">{cert.issuer}</p>
            </div>
          </button>

          <div className="relative z-10 flex items-center justify-between gap-3">
            <p className="text-sm text-foreground/80">{cert.date}</p>
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-foreground/20 bg-background/40 px-3 py-1.5 text-xs font-medium text-foreground/85 transition hover:text-foreground"
              >
                Verify <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function CertificationsSection() {
  const [activeCert, setActiveCert] = useState<CertificationStackItem | null>(null);
  const closeLightbox = useCallback(() => setActiveCert(null), []);

  useEffect(() => {
    if (!activeCert) return;
    const onEscape = (e: KeyboardEvent) => e.key === "Escape" && closeLightbox();
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [activeCert, closeLightbox]);

  return (
    <DepthLayers as="section" id="certifications" className="scroll-mt-24 px-6 py-8 md:py-12 md:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: ease.cinematic }}
          className="mb-6 md:mb-8"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Certifications
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Courses and training completed.
          </p>
        </motion.div>

        <section className="relative">
          {CERTIFICATIONS.map((cert, index) => (
            <StackedCertificationCard
              key={cert.title}
              cert={cert}
              index={index}
              totalCards={CERTIFICATIONS.length}
              onOpen={setActiveCert}
            />
          ))}
        </section>
      </div>

      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={closeLightbox}
            aria-modal="true"
            role="dialog"
            aria-label="Certificate preview"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: ease.cinematic }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-4xl items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-2xl"
            >
              <Image
                src={activeCert.image}
                alt={activeCert.title}
                width={1100}
                height={720}
                className="h-auto w-full object-contain"
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DepthLayers>
  );
}
