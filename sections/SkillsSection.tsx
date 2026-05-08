"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DepthLayers } from "@/components/DepthLayers";
import {
  Atom,
  BrainCircuit,
  Code2,
  Database,
  FileJson2,
  Framer,
  Globe,
  Layers3,
  Server,
  Sparkles,
  Wind,
} from "lucide-react";

type IconGridItem = {
  id: string;
  name: string;
  icon: ReactNode;
};

const SKILLS: IconGridItem[] = [
  { id: "typescript", name: "TypeScript", icon: <FileJson2 className="h-9 w-9" /> },
  { id: "nextjs", name: "Next.js", icon: <Layers3 className="h-9 w-9" /> },
  { id: "react", name: "React", icon: <Atom className="h-9 w-9" /> },
  { id: "nodejs", name: "Node.js", icon: <Server className="h-9 w-9" /> },
  { id: "ai-llms", name: "AI / LLMs", icon: <BrainCircuit className="h-9 w-9" /> },
  { id: "prompt", name: "Prompt Engineering", icon: <Sparkles className="h-9 w-9" /> },
  { id: "tailwind", name: "Tailwind", icon: <Wind className="h-9 w-9" /> },
  { id: "postgres", name: "PostgreSQL", icon: <Database className="h-9 w-9" /> },
  { id: "python", name: "Python", icon: <Code2 className="h-9 w-9" /> },
  { id: "framer", name: "Framer Motion", icon: <Framer className="h-9 w-9" /> },
  { id: "api", name: "REST & GraphQL", icon: <Globe className="h-9 w-9" /> },
  { id: "vercel", name: "Dart", icon: <Layers3 className="h-9 w-9" /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

function IconGrid({ items, className }: { items: IconGridItem[]; className?: string }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={cn(
        "grid grid-cols-2 gap-4 text-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
        className
      )}
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          variants={itemVariants}
          className="group relative flex flex-col items-center justify-center"
          aria-label={item.name}
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-border/70 bg-card text-foreground shadow-[0_4px_14px_hsl(var(--foreground)/0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-card/70 hover:shadow-[0_10px_26px_hsl(var(--foreground)/0.14)]">
            {item.icon}
          </div>
          <p className="mt-2 text-xs font-medium text-muted-foreground">{item.name}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <DepthLayers as="section" id="skills" className="scroll-mt-24 px-6 pb-8 pt-2 md:px-8 md:pb-10 md:pt-4">
      <div className="mx-auto max-w-4xl" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          Skills
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-10 text-lg text-muted-foreground"
        >
          Technologies and tools I work with.
        </motion.p>

        <IconGrid items={SKILLS} />
      </div>
    </DepthLayers>
  );
}
