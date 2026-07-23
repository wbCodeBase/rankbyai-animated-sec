"use client";

import { motion } from "framer-motion";
import { ArrowUp, Compass, Home, Library, Search } from "lucide-react";
import { PerplexityMark } from "../logos";
import { Composer } from "../Composer";
import { ResultList } from "../ResultList";
import { phaseFlags } from "../phaseFlags";
import { useAutoScrollBottom } from "../useAutoScrollBottom";
import type { SkinProps } from "../types";

const ACCENT = "#20B8CD";
const ACCENT_SOFT = "rgba(32,184,205,0.14)";

const RAIL = [
  { icon: Home, active: true },
  { icon: Compass, active: false },
  { icon: Library, active: false },
];

export function PerplexityWindow({ scenario, phase, typedText, showCaret, reduceMotion }: SkinProps) {
  const { showUser, showThinking, showResult } = phaseFlags(phase);
  const threadRef = useAutoScrollBottom<HTMLDivElement>(phase);

  return (
    <div className="flex h-140 w-full overflow-hidden rounded-md border border-white/10 bg-[#191A1A] shadow-2xl">
      {/* Icon rail */}
      <aside className="hidden w-16 shrink-0 flex-col items-center gap-3 border-r border-white/5 py-5 sm:flex">
        <PerplexityMark className="mb-3 h-6 w-6" style={{ color: ACCENT }} />
        {RAIL.map(({ icon: Icon, active }, i) => (
          <span
            key={i}
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{
              background: active ? ACCENT_SOFT : "transparent",
              color: active ? ACCENT : "rgba(255,255,255,0.4)",
            }}
          >
            <Icon size={17} />
          </span>
        ))}
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-14 shrink-0 items-center gap-2 border-b border-white/5 px-5">
          <span className="text-[14.5px] font-semibold text-white/90">Perplexity</span>
          <span className="rounded-md px-2 py-0.5 text-[11px]" style={{ background: ACCENT_SOFT, color: ACCENT }}>
            Pro
          </span>
        </div>

        <div ref={threadRef} className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
          <div className="mx-auto flex max-w-140 flex-col gap-6">
            {showUser && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[18px] font-medium leading-snug text-white"
              >
                {scenario.prompt}
              </motion.div>
            )}

            {showThinking && (
              <div className="flex items-center gap-2 text-[13px]" style={{ color: ACCENT }}>
                <Search size={14} />
                <span>Searching sources</span>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1 w-1 rounded-full"
                      style={{ background: ACCENT }}
                      animate={reduceMotion ? { opacity: 0.6 } : { opacity: [0.3, 1, 0.3] }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            )}

            {showResult && (
              <div>
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-1"
                >
                  <p className="text-[14px] leading-relaxed text-white/85">{scenario.intro}</p>
                  <span className="flex gap-1">
                    {scenario.rows.map((_, i) => (
                      <span
                        key={i}
                        className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
                        style={{ background: ACCENT_SOFT, color: ACCENT }}
                      >
                        {i + 1}
                      </span>
                    ))}
                  </span>
                </motion.div>
                <ResultList rows={scenario.rows} accent={ACCENT} accentSoft={ACCENT_SOFT} theme="dark" reduceMotion={reduceMotion} />
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 px-6 pb-6">
          <Composer
            typedText={typedText}
            showCaret={showCaret}
            reduceMotion={reduceMotion}
            className="mx-auto flex max-w-140 items-center gap-3 rounded-full border border-white/10 bg-white/4 px-5 py-3.5"
            textColor="#ffffff"
            caretColor={ACCENT}
            placeholder="Ask anything..."
            leftIcon={<Search size={16} className="shrink-0 text-white/40" />}
            rightIcon={<ArrowUp size={15} />}
            rightIconStyle={{ background: ACCENT, color: "#0b1414" }}
          />
        </div>
      </div>
    </div>
  );
}
