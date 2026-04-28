/**
 * Cinematic motion config – After Effects–style easing and variants.
 * Only transform + opacity for 60fps. No layout-triggering properties.
 */

export const ease = {
  cinematic: [0.25, 0.46, 0.45, 0.94] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
  outExpo: [0.19, 1, 0.22, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const duration = {
  fast: 0.35,
  normal: 0.5,
  slow: 0.7,
  cinematic: 0.85,
};

/** Entrance: opacity + y + slight scale. No bounce. */
export const fadeUp = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: duration.slow, ease: ease.cinematic },
};

export const fadeUpStagger = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: ease.cinematic,
      delay: 0.08 * i,
    },
  }),
};

/** Scroll reveal: opacity + y + filter blur (GPU). */
export const scrollReveal = {
  initial: { opacity: 0, y: 32, filter: "blur(12px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.85, ease: ease.outExpo },
};

export const scrollRevealStagger = {
  container: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  },
  item: {
    initial: { opacity: 0, y: 28, filter: "blur(10px)" },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: ease.cinematic },
    },
  },
};

/** Hero entrance – staggered, 0.6–1s */
export const heroEntrance = {
  title: {
    initial: { opacity: 0, y: 28, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.8, ease: ease.cinematic },
  },
  subtitle: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.12, ease: ease.cinematic },
  },
  typewriter: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, delay: 0.28, ease: ease.cinematic },
  },
  cta: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.45, ease: ease.cinematic },
  },
};
