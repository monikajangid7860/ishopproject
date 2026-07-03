"use client";

import { motion } from "framer-motion";

export default function ScrollReveal({
  children,
  delay = 0,
  y = 24,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
