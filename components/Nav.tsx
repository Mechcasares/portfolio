"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ease } from "./motion";
import { site } from "@/content/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="nav"
      data-scrolled={scrolled}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease }}
    >
      <nav className="container nav-inner" aria-label="Main">
        <Link href="/" className="nav-name">
          <span className="hand nav-sign">{site.name}</span>
        </Link>
        <div className="nav-links">
          <Link className="nav-link" href="/#work">Work</Link>
          <Link className="nav-link" href="/#about">About</Link>
          <Link className="nav-link" href="/#contact">Contact</Link>
        </div>
      </nav>
    </motion.header>
  );
}
