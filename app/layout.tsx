import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
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
      <body className={`${inter.variable} font-sans min-h-screen antialiased`}>
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
