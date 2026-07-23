"use client";

import { motion } from "framer-motion";
import type { ResultRow } from "./types";

function starGlyphs(rating: number) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(Math.max(0, 5 - full));
}

interface ResultListProps {
  rows: ResultRow[];
  accent: string;
  accentSoft: string;
  theme: "dark" | "light";
  reduceMotion: boolean;
}

export function ResultList({ rows, accent, accentSoft, theme, reduceMotion }: ResultListProps) {
  const isDark = theme === "dark";

  return (
    <ol className="flex flex-col gap-2">
      {rows.map((row, i) => (
        <motion.li
          key={row.name}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { delay: i * 0.12, type: "spring", stiffness: 320, damping: 26 }
          }
          className="flex flex-col gap-1.5 rounded-xl px-3.5 py-2.5 sm:flex-row sm:items-center sm:gap-3"
          style={{
            background: row.highlight ? accentSoft : isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
            border: `1px solid ${row.highlight ? accent : isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
          }}
        >
          <div className="flex min-w-0 items-center gap-3 sm:flex-1">
            <span
              className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
              style={{
                background: row.highlight ? accent : isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                color: row.highlight ? "#fff" : isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
              }}
            >
              {i + 1}
            </span>

            <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-1">
              <strong
                className="truncate text-[13.5px]"
                style={{ color: isDark ? "#fff" : "#1a1a1a" }}
              >
                {row.name}
              </strong>
              <small
                className="truncate text-[11.5px]"
                style={{ color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)" }}
              >
                {row.tag}
              </small>
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2 pl-8 sm:pl-0">
            <span className="shrink-0 whitespace-nowrap text-[11px]" style={{ color: "#f5b400" }}>
              {starGlyphs(row.rating)}{" "}
              <b style={{ color: isDark ? "#fff" : "#1a1a1a" }}>{row.rating.toFixed(1)}</b>
            </span>

            {row.highlight && row.badge ? (
              <motion.span
                initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { delay: i * 0.12 + 0.35, type: "spring", stiffness: 400, damping: 18 }
                }
                className="shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide text-white"
                style={{ background: accent }}
              >
                {row.badge}
              </motion.span>
            ) : null}
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
