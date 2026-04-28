"use client";

import Link from "next/link";
import { Linkedin, Github, Mail } from "lucide-react";

const CONTACT_LINKS = [
  {
    href: "www.linkedin.com/in/subhasish-rath-926b902a4",
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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="border-t border-foreground/[0.08] bg-background px-6 py-8 md:py-10 dark:border-foreground/10"
    >
      <div className="mx-auto max-w-6xl">
        {/* Contact / Connect */}
        <div className="flex flex-col items-center gap-8 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Connect
          </p>
          <nav
            className="flex flex-wrap items-center justify-center gap-8"
            aria-label="Contact links"
          >
            {CONTACT_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="flex flex-col items-center gap-2 text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={label}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-transparent transition-colors duration-300 hover:border-foreground/20 hover:bg-foreground/[0.04] dark:border-foreground/15 dark:hover:border-foreground/25 dark:hover:bg-foreground/[0.06]">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                </span>
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-foreground/[0.06] pt-6 text-center text-sm text-muted-foreground dark:border-foreground/10">
          © {year} Subhasish Rath. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
