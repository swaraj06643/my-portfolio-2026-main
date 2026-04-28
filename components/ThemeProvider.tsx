"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="portfolio-theme"
      disableTransitionOnChange={false}
      themes={["light", "dark", "green", "yellow"]}
    >
      {children}
    </NextThemesProvider>
  );
}
