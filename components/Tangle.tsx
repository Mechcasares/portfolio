"use client";

import { motion } from "motion/react";

// A pen line that starts as a tangle and ends straight: the whole idea in one stroke.
function tanglePath() {
  const pts: string[] = [];
  const loops = 5;
  const steps = 120;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * loops * Math.PI * 2;
    const k = 1 - i / steps; // loops relax as they go
    const x = 10 + i * 3.4 - 26 * k * Math.sin(t);
    const y = 42 - 28 * k * Math.cos(t) + Math.sin(i * 0.7) * 2 * k;
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  const endX = 10 + steps * 3.4;
  return `M${pts.join(" L")} C ${endX + 120} 44, ${endX + 360} 38, 990 41`;
}

export function Tangle({ delay = 0.9 }: { delay?: number }) {
  return (
    <svg className="tangle pen" viewBox="0 0 1000 84" aria-hidden="true">
      <motion.path
        d={tanglePath()}
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: [0.45, 0, 0.2, 1], delay }}
      />
      <motion.circle
        cx={990}
        cy={41}
        r={5}
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 14, delay: delay + 2.1 }}
      />
    </svg>
  );
}
