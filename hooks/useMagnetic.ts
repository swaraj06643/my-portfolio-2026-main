"use client";

import { useMotionValue, useSpring } from "framer-motion";
import { useCallback } from "react";

const STIFFNESS = 180;
const DAMPING = 20;
const STRENGTH = 0.2;

export function useMagnetic() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: STIFFNESS, damping: DAMPING };
  const translateX = useSpring(x, spring);
  const translateY = useSpring(y, spring);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * STRENGTH;
      const deltaY = (e.clientY - centerY) * STRENGTH;
      x.set(deltaX);
      y.set(deltaY);
    },
    [x, y]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { translateX, translateY, onMouseMove, onMouseLeave };
}
