"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { scrollRevealStagger } from "@/lib/motion";
import { DepthLayers } from "@/components/DepthLayers";
import { CertificationCard, type Certification } from "@/components/CertificationCard";

const CERTIFICATIONS: Certification[] = [
  {
    title: "Geo-data sharing and Cyber Security",
    issuer: "IIRS / ISRO, Department of Space, Govt. of India",
    date: "Dec 2024 – Jan 2025 · 10 hrs · Grade A+",
    image: "/certificates/cert-1.png",
    verifyUrl: "https://certificate.iirs.gov.in",
  },
  {
    title: "The Method of Space Science Research",
    issuer: "IIRS / ISRO, Dept. of Space, Govt. of India",
    date: "May 2025 · 5 hrs · Grade A+ · 100% attendance",
    image: "/certificates/cert-2.png",
    verifyUrl: "https://certificate.iirs.gov.in",
  },
  {
    title: "Python for Data Science, AI & Development",
    issuer: "IBM · Coursera",
    date: "May 2025",
    image: "/certificates/cert-3.png",
    verifyUrl: "https://coursera.org/verify/AB5IWIXYJC07",
  },
  {
    title: "Developing Back-End Apps with Node.js and Express",
    issuer: "IBM · Coursera",
    date: "Dec 2024",
    image: "/certificates/cert-4.png",
    verifyUrl: "https://coursera.org/verify/4BEX9VPRKEV6",
  },
  {
    title: "Graphic Design",
    issuer: "Adobe · Coursera",
    date: "Dec 2025",
    image: "/certificates/cert-5.png",
    verifyUrl: "https://coursera.org/verify/1A3KBIR48V7J",
  },
  {
    title: "Artificial Intelligence & Machine Learning",
    issuer: "Central Tool Room & Training Centre, Bhubaneswar (CTTC)",
    date: "Jun 2025 · Industrial training",
    image: "/certificates/cert-6.png",
  },
  {
    title: "Innovation, Design and Entrepreneurship (IDE) Bootcamp",
    issuer: "AICTE & MoE's Innovation Cell",
    date: "Feb 2025 · Edition 2 Phase II",
    image: "/certificates/cert-7.png",
  },
];

export function CertificationsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <DepthLayers as="section" id="certifications" className="scroll-mt-24 px-6 py-8 md:py-12 md:px-8">
      <div className="mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-4 md:mb-5"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Certifications
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Courses and training completed.
          </p>
        </motion.div>

        <motion.div
          variants={scrollRevealStagger.container}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CERTIFICATIONS.map((cert) => (
            <CertificationCard key={cert.title} certification={cert} />
          ))}
        </motion.div>
      </div>
    </DepthLayers>
  );
}
