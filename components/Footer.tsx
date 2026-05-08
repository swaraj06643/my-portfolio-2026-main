"use client";

import Link from "next/link";
import { Linkedin, Github, Mail } from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/TextHoverEffect";

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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-foreground/[0.08] bg-background px-6 py-10 md:py-14 dark:border-foreground/10"
    >
      <FooterBackgroundGradient />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-center gap-5 text-center">
        <div className="h-14 w-52 md:h-16 md:w-64">
          <TextHoverEffect text="SUBHASISH" duration={0.2} />
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/85">
          Portfolio
        </p>

        <nav
          className="flex flex-wrap items-center justify-center gap-6"
          aria-label="Footer links"
        >
          {CONTACT_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="group flex items-center gap-2 rounded-full border border-foreground/15 bg-background/35 px-3 py-1.5 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
              aria-label={label}
            >
              <Icon className="h-4 w-4 opacity-80 transition-opacity group-hover:opacity-100" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="w-full border-t border-foreground/[0.08] pt-5 text-center text-sm text-muted-foreground dark:border-foreground/10">
          © {year} Subhasish Rath. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
