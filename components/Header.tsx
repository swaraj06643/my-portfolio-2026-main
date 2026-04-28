"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#skills", label: "Skills" },
  { href: "#book-call", label: "Book Call" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const closeProfile = useCallback(() => setProfileOpen(false), []);
  useEffect(() => {
    if (!profileOpen) return;
    const onEscape = (e: KeyboardEvent) => e.key === "Escape" && closeProfile();
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [profileOpen, closeProfile]);

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 border-b border-foreground/[0.08] bg-background/80 shadow-[inset_0_1px_0_0_hsl(var(--foreground)/0.04)] backdrop-blur-2xl dark:bg-background/70 dark:border-foreground/10 dark:shadow-[inset_0_1px_0_0_hsl(var(--foreground)/0.06)]"
    >
      <nav className="mx-auto flex h-14 min-h-[3.5rem] max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setProfileOpen(true)}
            className="flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background p-0"
            aria-label="View profile photo"
          >
            <motion.div
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-border sm:h-12 sm:w-12"
            >
              <Image
                src="/profile.png"
                alt="Subhasish Rath"
                width={96}
                height={96}
                sizes="(max-width: 640px) 44px, 48px"
                className="h-full w-full object-cover object-center"
                unoptimized
              />
            </motion.div>
          </button>
          <Link
            href="/"
            className="hidden text-sm font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded sm:block"
            aria-label="Home"
          >
            Subhasish Rath
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ul className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground after:absolute after:left-0 after:bottom-[-2px] after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-300 after:ease-cinematic hover:after:w-full"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle className="hidden sm:flex" />
          <button
            type="button"
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden border-t border-border md:hidden"
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "block rounded-lg px-4 py-3 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="px-4 py-3">
            <ThemeToggle />
          </li>
        </ul>
      </motion.div>

      {/* Profile photo lightbox — squared, centered */}
      <AnimatePresence>
        {profileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={closeProfile}
            aria-modal="true"
            role="dialog"
            aria-label="Profile photo"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-square h-[min(280px,85vmin)] w-[min(280px,85vmin)] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 sm:h-[min(320px,80vmin)] sm:w-[min(320px,80vmin)]"
            >
              <Image
                src="/profile.png"
                alt="Subhasish Rath"
                width={400}
                height={400}
                sizes="(max-width: 640px) 280px, 320px"
                className="h-full w-full object-cover object-center"
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
