import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: {
        "2xl": "1rem",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.06)",
        "depth-sm": "0 1px 2px hsl(var(--foreground)/0.04), 0 4px 12px -2px hsl(var(--foreground)/0.06)",
        "depth": "0 2px 4px hsl(var(--foreground)/0.04), 0 8px 24px -4px hsl(var(--foreground)/0.08), 0 16px 48px -8px hsl(var(--foreground)/0.04)",
        "depth-lg": "0 4px 8px hsl(var(--foreground)/0.04), 0 12px 32px -4px hsl(var(--foreground)/0.08), 0 24px 64px -12px hsl(var(--foreground)/0.06)",
        "glow-soft": "0 0 40px -12px hsl(var(--foreground)/0.14)",
        "glow-soft-lg": "0 0 60px -16px hsl(var(--foreground)/0.12)",
        "glow-bloom": "0 0 60px -16px hsl(var(--foreground)/0.15)",
        "glow-focus": "0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--foreground)/0.1)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite",
        "light-beam": "light-beam 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite",
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
        "float-orb": "float-orb 6s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "light-beam": {
          "0%": { transform: "translateX(-100%) scaleX(0.3)", opacity: "0" },
          "15%": { opacity: "0.4" },
          "50%": { transform: "translateX(0) scaleX(1)", opacity: "0.6" },
          "85%": { opacity: "0.3" },
          "100%": { transform: "translateX(100%) scaleX(0.3)", opacity: "0" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "float-orb": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(4px, -8px)" },
          "66%": { transform: "translate(-3px, 4px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "700": "700ms",
      },
    },
  },
  plugins: [],
};

export default config;
