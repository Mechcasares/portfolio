"use client";

import { motion, MotionConfig, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Page-load entrance. Use `delay` to build the nav → hero → copy → work sequence. */
export function Enter({
  children,
  delay = 0,
  y = 14,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "header" | "p";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </Tag>
  );
}

/** Gentle fade + translate when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  amount = 0.2,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  amount?: number;
  as?: "div" | "li";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Tag>
  );
}

/** Word-by-word masked reveal. `onMount` plays on load instead of on scroll. */
export function WordReveal({
  text,
  delay = 0,
  stagger = 0.035,
  onMount = false,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  onMount?: boolean;
}) {
  const words = text.split(" ");
  const trigger = onMount
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: { once: true, amount: 0.6 } };
  return (
    <motion.span className="words" initial="hidden" {...trigger}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span className="word-mask" key={i} aria-hidden="true">
          <motion.span
            className="word"
            variants={{
              hidden: { y: "105%" },
              visible: { y: "0%", transition: { duration: 0.9, ease, delay: delay + i * stagger } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Media frame with scroll-linked motion: the frame scales 0.97 → 1 as it
 * enters, and the content drifts slightly for parallax. Hover scale is CSS.
 */
export function ParallaxMedia({
  children,
  className = "",
  strength = 1,
  style,
}: {
  children: ReactNode;
  className?: string;
  /** Parallax drift; 0 shows the image uncropped (no drift). */
  strength?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.97, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [`${-3 * strength}%`, `${3 * strength}%`]);

  return (
    <motion.div ref={ref} className={`media ${className}`} style={{ ...style, scale }}>
      <motion.div className={strength ? "media-parallax" : "media-still"} style={strength ? { y } : undefined}>
        <div className="media-hover">{children}</div>
      </motion.div>
    </motion.div>
  );
}

/** Small vertical drift tied to scroll, for text columns next to media. */
export function Drift({
  children,
  className,
  distance = 32,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
