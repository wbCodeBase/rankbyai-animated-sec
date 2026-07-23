"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Purely decorative shapes anchored to the chat card's own corners (not the
 * viewport), so they track the card regardless of surrounding empty space.
 */
export function CornerShapes() {
  const reduceMotion = !!useReducedMotion();

  return (
    <>
      {/* ring — behind the card's top-left corner */}
      <motion.svg
        className="pointer-events-none absolute -left-4 -top-4 h-24 w-24 sm:-left-10 sm:-top-10 sm:h-40 sm:w-40 md:-left-18 md:-top-18 md:h-56 md:w-56"
        viewBox="0 0 100 100"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={reduceMotion ? undefined : { duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(24,119,242,0.35)" strokeWidth="1" />
        <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(24,119,242,0.2)" strokeWidth="0.8" />
      </motion.svg>

      {/* hexagon — behind the card's bottom-right corner */}
      <motion.svg
        className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 sm:-bottom-10 sm:-right-10 sm:h-40 sm:w-40 md:-bottom-22 md:-right-22 md:h-56 md:w-56"
        viewBox="0 0 100 100"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={reduceMotion ? undefined : { duration: 100, repeat: Infinity, ease: "linear" }}
      >
        <polygon
          points="50,4 91,27 91,73 50,96 9,73 9,27"
          fill="none"
          stroke="rgba(24,119,242,0.32)"
          strokeWidth="1"
        />
        <polygon
          points="50,22 76,36 76,64 50,78 24,64 24,36"
          fill="none"
          stroke="rgba(24,119,242,0.18)"
          strokeWidth="0.8"
        />
      </motion.svg>
    </>
  );
}
