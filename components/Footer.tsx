"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { Linkedin, Github, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const CONTACT_LINKS = [
  {
    href: "https://www.linkedin.com/in/subhasish-rath-926b902a4",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://github.com/swaraj06643",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "mailto:swarajrath6@gmail.com",
    label: "Gmail",
    icon: Mail,
  },
] as const;

const springConfig = {
  duration: 0.3,
  ease: "easeInOut" as const,
};

function FooterMenuBar() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = React.useState({ left: 0, width: 0 });
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (activeIndex !== null && menuRef.current && tooltipRef.current) {
      const menuItem = menuRef.current.children[activeIndex] as HTMLElement;
      const menuRect = menuRef.current.getBoundingClientRect();
      const itemRect = menuItem.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      const left = itemRect.left - menuRect.left + (itemRect.width - tooltipRect.width) / 2;

      setTooltipPosition({
        left: Math.max(0, Math.min(left, menuRect.width - tooltipRect.width)),
        width: tooltipRect.width,
      });
    }
  }, [activeIndex]);

  return (
    <div className="relative">
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={springConfig}
            className="pointer-events-none absolute left-0 right-0 -top-[38px] z-50"
          >
            <motion.div
              ref={tooltipRef}
              className={cn(
                "inline-flex h-7 items-center justify-center overflow-hidden rounded-lg px-3",
                "border border-border/50 bg-background/95 backdrop-blur",
                "shadow-[0_0_0_1px_rgba(0,0,0,0.08)] dark:border-border/50 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
              )}
              initial={{ x: tooltipPosition.left }}
              animate={{ x: tooltipPosition.left }}
              transition={springConfig}
              style={{ width: "auto" }}
            >
              <p className="whitespace-nowrap text-[13px] font-medium leading-tight">
                {CONTACT_LINKS[activeIndex].label}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={menuRef}
        className={cn(
          "z-10 inline-flex h-11 items-center justify-center gap-[5px] overflow-hidden rounded-full px-2",
          "border border-border/50 bg-background/95 backdrop-blur",
          "shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_8px_16px_-4px_rgba(0,0,0,0.1)]",
          "dark:border-border/50 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_16px_-4px_rgba(0,0,0,0.2)]"
        )}
      >
        {CONTACT_LINKS.map(({ href, label, icon: Icon }, index) => (
          <Link
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={label}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <Icon className="h-[18px] w-[18px]" />
            <span className="sr-only">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-foreground/[0.08] bg-transparent px-6 py-8 md:py-10 dark:border-foreground/10"
    >
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-center gap-5 text-center">
        <nav aria-label="Footer links">
          <FooterMenuBar />
        </nav>

        <div className="w-full border-t border-foreground/[0.08] pt-4 text-center text-sm text-muted-foreground dark:border-foreground/10">
          © {year} Subhasish Rath. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
