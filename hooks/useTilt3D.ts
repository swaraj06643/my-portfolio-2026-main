"use client";

import { useMotionValue, useSpring } from "framer-motion";
import { useCallback } from "react";

const MAX_TILT = 6;
const STIFFNESS = 200;
const DAMPING = 25;

export function useTilt3D() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: STIFFNESS, damping: DAMPING };
  const rotateX = useSpring(y, spring);
  const rotateY = useSpring(x, spring);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const relX = (e.clientX - centerX) / rect.width;
      const relY = (e.clientY - centerY) / rect.height;
      const tiltY = relX * MAX_TILT;
      const tiltX = -relY * MAX_TILT;
      x.set(tiltY);
      y.set(tiltX);
    },
    [x, y]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}
