"use client";

import { useEffect, useRef, ReactNode } from "react";

type LenisInstance = {
  raf: (time: number) => void;
  destroy: () => void;
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => void;
};

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisInstance | null>(null);

  useEffect(() => {
    let rafId: number | undefined;
    const initLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default;
        const lenis = new Lenis({
          // Lerp-based interpolation feels smoother on high refresh-rate displays.
          lerp: 0.08,
          duration: 1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          smoothTouch: false,
          syncTouch: false,
          touchMultiplier: 1.05,
          wheelMultiplier: 1,
          anchors: true,
        }) as LenisInstance;
        lenisRef.current = lenis;
        const raf = (time: number) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } catch {
        // Lenis failed; page still works with native scroll
      }
    };
    initLenis();
    return () => {
      if (lenisRef.current) {
        try {
          lenisRef.current.destroy();
        } catch {}
        lenisRef.current = null;
      }
      if (rafId !== undefined) cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
}
