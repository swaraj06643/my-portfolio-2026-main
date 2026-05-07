"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-8 w-16 rounded-full border border-border bg-muted/50 sm:h-8 sm:w-[72px]",
          className
        )}
        aria-hidden
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex h-8 w-16 touch-manipulation items-center rounded-full border border-border/80 bg-muted/70 px-1.5 transition-colors duration-300 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background sm:w-[72px]",
        className
      )}
      style={{ justifyContent: isDark ? "flex-start" : "flex-end" }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Dark mode" : "Light mode"}
    >
      <motion.div
        layout
        whileTap={{ scale: 0.92 }}
        transition={{
          type: "spring",
          stiffness: 360,
          damping: 28,
          mass: 0.7,
        }}
        className={cn(
          "h-5 w-5 rounded-full shadow-sm sm:h-6 sm:w-6",
          isDark ? "bg-violet-500" : "bg-amber-400"
        )}
      />
    </button>
  );
}
