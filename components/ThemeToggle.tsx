"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Leaf, SunDim } from "lucide-react";
import { cn } from "@/lib/utils";

const THEMES = ["light", "dark", "green", "yellow"] as const;
type ThemeId = (typeof THEMES)[number];

const ICONS: Record<ThemeId, React.ComponentType<{ className?: string }>> = {
  light: Sun,
  dark: Moon,
  green: Leaf,
  yellow: SunDim,
};

const LABELS: Record<ThemeId, string> = {
  light: "Light",
  dark: "Dark",
  green: "Soft green",
  yellow: "Soft yellow",
};

export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn("h-10 w-10 rounded-xl border border-border bg-muted/50", className)}
        aria-hidden
      />
    );
  }

  const current = (THEMES.includes(theme as ThemeId) ? theme : "light") as ThemeId;
  const nextIndex = (THEMES.indexOf(current) + 1) % THEMES.length;
  const next = THEMES[nextIndex];
  const Icon = ICONS[current];

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted/50 text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        className
      )}
      aria-label={`Theme: ${LABELS[current]}. Switch to ${LABELS[next]}`}
      title={`${LABELS[current]} (next: ${LABELS[next]})`}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
