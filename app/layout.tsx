import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DottedSurface } from "@/components/DottedSurface";
import "@/styles/globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Subhasish Rath | Master in AI Prompt & Fullstack Dev",
  description:
    "Portfolio of Subhasish Rath — Master in AI prompt engineering and fullstack development. Modern, premium developer portfolio.",
  keywords: ["Subhasish Rath", "AI Prompt", "Fullstack Developer", "Portfolio"],
  authors: [{ name: "Subhasish Rath" }],
  openGraph: {
    title: "Subhasish Rath | AI Prompt & Fullstack Dev",
    description: "Master in AI prompt and fullstack development.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171717",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${spaceMono.variable} font-sans min-h-screen antialiased`}>
        <ThemeProvider>
          <DottedSurface />
          <div className="relative z-10">
            <SmoothScroll>{children}</SmoothScroll>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
