"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [isDarkUi, setIsDarkUi] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted) return;
    setIsDarkUi(theme === "dark");
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-10 w-[72px] rounded-full border border-border bg-muted/50",
          className
        )}
        aria-hidden
      />
    );
  }

  const isDark = isDarkUi;

  const handleToggle = () => {
    const nextIsDark = !isDarkUi;
    setIsDarkUi(nextIsDark);
    // Let the thumb start moving before global theme repaint.
    requestAnimationFrame(() => {
      setTheme(nextIsDark ? "dark" : "light");
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "group relative flex h-10 w-[72px] touch-manipulation items-center rounded-full border border-border/80 bg-background px-1.5 shadow-[0_2px_8px_hsl(var(--foreground)/0.08)] transition-colors duration-300 hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        "transform-gpu motion-reduce:transition-none",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Dark mode" : "Light mode"}
      aria-pressed={isDark}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-amber-300/12 via-transparent to-violet-400/12 opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
      <span
        className={cn(
          "pointer-events-none absolute left-2 transition-opacity duration-300",
          isDark ? "opacity-30" : "opacity-100"
        )}
        aria-hidden
      >
        <Sun className="h-3.5 w-3.5 text-amber-500" />
      </span>
      <span
        className={cn(
          "pointer-events-none absolute right-2 transition-opacity duration-300",
          isDark ? "opacity-100" : "opacity-35"
        )}
        aria-hidden
      >
        <Moon className="h-3.5 w-3.5 text-violet-500" />
      </span>

      <motion.div
        layout={false}
        animate={{ x: isDark ? 0 : 32, rotate: isDark ? 0 : 180 }}
        whileTap={{ scale: 0.92, rotate: isDark ? -12 : 192 }}
        transition={{
          type: "spring",
          stiffness: 520,
          damping: 34,
          mass: 0.5,
        }}
        className={cn(
          "relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-border/40 shadow-[0_2px_10px_hsl(var(--foreground)/0.2)] will-change-transform transform-gpu",
          isDark
            ? "bg-gradient-to-br from-violet-500 to-indigo-600 text-white"
            : "bg-gradient-to-br from-amber-300 to-orange-500 text-white"
        )}
      >
        {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
      </motion.div>
    </button>
  );
}
