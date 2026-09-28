"use client";

import { motion } from "motion/react";
import { ease } from "@/components/motion";

// Re-mounts on every navigation: a short cross-fade between pages.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease }}>
      {children}
    </motion.div>
  );
}
