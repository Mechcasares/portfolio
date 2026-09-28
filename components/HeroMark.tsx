"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { site } from "@/content/site";
import { roughLine } from "@/lib/rough";
import { ease } from "./motion";

// The hero's visual anchor: a big, slightly imperfect burgundy circle with the
// name written across it and a pen stroke that runs through both.
export function HeroMark() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -60]);
  const rotate = useTransform(scrollY, [0, 600], [0, 8]);

  return (
    <motion.div className="hero-mark" style={{ y }} aria-hidden="true">
      <motion.span
        className="hero-mark-circle"
        style={{ rotate }}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.9 }}
      />
      <svg className="hero-mark-line pen" viewBox="0 0 320 60">
        <motion.path
          d={roughLine(10, 34, 250, 16, 31, 3)}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 1.8 }}
        />
      </svg>
      {/* The name is drawn twice: ink everywhere, and in paper color where it crosses the circle. */}
      <motion.div
        className="hero-mark-write"
        initial={{ clipPath: "inset(-30% 100% -30% -140%)" }}
        animate={{ clipPath: "inset(-30% -30% -30% -140%)" }}
        transition={{ duration: 1.1, ease, delay: 1.2 }}
      >
        <span className="hero-mark-name hand">{site.name}</span>
        <span className="hero-mark-inside">
          <span className="hero-mark-name hand">{site.name}</span>
        </span>
      </motion.div>
      <motion.span
        className="sticker hero-mark-sticker"
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: -9 }}
        transition={{ type: "spring", stiffness: 260, damping: 14, delay: 2.2 }}
      >
        hola!
      </motion.span>
    </motion.div>
  );
}
