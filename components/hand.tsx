"use client";

import { motion } from "motion/react";
import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { roughArrow, roughEllipse, roughLine, roughRect, roughUnderline } from "@/lib/rough";

type Trigger = "mount" | "view";

/** A pen stroke that draws itself in, on mount or when scrolled into view. */
export function Stroke({
  d,
  delay = 0,
  duration = 0.9,
  trigger = "view",
  width = 2,
}: {
  d: string;
  delay?: number;
  duration?: number;
  trigger?: Trigger;
  width?: number;
}) {
  const animate = { pathLength: 1, opacity: 1 };
  const play =
    trigger === "mount"
      ? { animate }
      : { whileInView: animate, viewport: { once: true, amount: 0.8 } };
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      transition={{ pathLength: { duration, ease: [0.65, 0, 0.35, 1], delay }, opacity: { duration: 0.01, delay } }}
      {...play}
    />
  );
}

/**
 * An SVG that measures itself and draws a path in real pixels. Stretching a
 * 100×100 viewBox would distort the stroke, and Chrome breaks pathLength
 * animations on non-scaling strokes, so we size the path to the box instead.
 */
function PenBox({
  className,
  draw,
  delay,
  duration,
  trigger,
  width = 2,
}: {
  className: string;
  draw: (w: number, h: number) => string;
  delay: number;
  duration: number;
  trigger: Trigger;
  width?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState<[number, number] | null>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setSize((prev) => (prev && Math.abs(prev[0] - r.width) < 2 && Math.abs(prev[1] - r.height) < 2 ? prev : [r.width, r.height]));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <svg ref={ref} className={`pen ${className}`} viewBox={size ? `0 0 ${size[0]} ${size[1]}` : undefined} aria-hidden="true">
      {size && <Stroke d={draw(size[0], size[1])} delay={delay} duration={duration} trigger={trigger} width={width} />}
    </svg>
  );
}

/** Circles a word or phrase with a loose pen loop. */
export function Circled({
  children,
  seed = 3,
  delay = 0.2,
  trigger = "view",
}: {
  children: ReactNode;
  seed?: number;
  delay?: number;
  trigger?: Trigger;
}) {
  return (
    <span className="circled">
      {children}
      <PenBox
        className="circled-svg"
        draw={(w, h) => roughEllipse(w / 2, h / 2, w * 0.47, h * 0.42, seed)}
        delay={delay}
        duration={1.1}
        trigger={trigger}
        width={2.2}
      />
    </span>
  );
}

/** Scribbled underline under a phrase. */
export function Underlined({
  children,
  seed = 2,
  delay = 0.3,
  trigger = "view",
}: {
  children: ReactNode;
  seed?: number;
  delay?: number;
  trigger?: Trigger;
}) {
  return (
    <span className="underlined">
      {children}
      <PenBox className="underlined-svg" draw={(w, h) => roughUnderline(w, h * 0.35, seed)} delay={delay} duration={0.8} trigger={trigger} width={2.2} />
    </span>
  );
}

/**
 * A word crossed out in pen with a handwritten correction above it:
 * the editing gesture of someone who writes for a living.
 */
export function Corrected({
  from,
  to,
  delay = 1.2,
  trigger = "mount",
}: {
  from: string;
  to: string;
  delay?: number;
  trigger?: Trigger;
}) {
  const show = { opacity: 1, y: 0, rotate: -4 };
  const play = trigger === "mount" ? { animate: show } : { whileInView: show, viewport: { once: true } };
  return (
    <span className="corrected">
      <span className="sr-only">{to}</span>
      <span className="corrected-old" aria-hidden="true">
        {from}
        <PenBox className="corrected-strike" draw={(w, h) => roughLine(-4, h * 0.56, w + 4, h * 0.46, 5, 2)} delay={delay} duration={0.5} trigger={trigger} width={4} />
      </span>
      <motion.span
        className="corrected-new hand"
        aria-hidden="true"
        initial={{ opacity: 0, y: 10, rotate: -8 }}
        transition={{ duration: 0.6, delay: delay + 0.45, ease: [0.22, 1, 0.36, 1] }}
        {...play}
      >
        {to}
      </motion.span>
    </span>
  );
}

/** A rough pen frame around whatever box it sits in. */
export function PenFrame({ seed = 21, delay = 0.2 }: { seed?: number; delay?: number }) {
  return (
    <PenBox className="frame" draw={(w, h) => roughRect(3, 3, w - 6, h - 6, seed, 7)} delay={delay} duration={1.6} trigger="view" width={2} />
  );
}

/**
 * A hand-drawn arrow. `box` is its size in px and coordinates are in that same
 * space, so the drawing is never squashed and the tip lands where it's aimed.
 */
export function Arrow({
  from,
  to,
  box = [100, 100],
  bend = 0.25,
  seed = 1,
  delay = 0.4,
  trigger = "view",
  className = "",
  style,
}: {
  from: [number, number];
  to: [number, number];
  box?: [number, number];
  bend?: number;
  seed?: number;
  delay?: number;
  trigger?: Trigger;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      className={`pen hand-arrow ${className}`}
      viewBox={`0 0 ${box[0]} ${box[1]}`}
      width={box[0]}
      height={box[1]}
      style={style}
      aria-hidden="true"
    >
      <Stroke d={roughArrow(from[0], from[1], to[0], to[1], bend, seed)} delay={delay} duration={0.7} trigger={trigger} width={2} />
    </svg>
  );
}

/** Handwritten margin note. */
export function Note({
  children,
  delay = 0.6,
  trigger = "view",
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  trigger?: Trigger;
  className?: string;
  style?: CSSProperties;
}) {
  const show = { opacity: 1, rotate: -2, y: 0 };
  const play = trigger === "mount" ? { animate: show } : { whileInView: show, viewport: { once: true } };
  return (
    <motion.span
      className={`note ${className}`}
      style={style}
      initial={{ opacity: 0, rotate: -4, y: 6 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...play}
    >
      {children}
    </motion.span>
  );
}
