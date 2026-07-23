"use client";

import { motion } from "framer-motion";
import { ArrowUp, MessageSquarePlus, Paperclip } from "lucide-react";
import { ClaudeMark } from "../logos";
import { Composer } from "../Composer";
import { ResultList } from "../ResultList";
import { phaseFlags } from "../phaseFlags";
import { useAutoScrollBottom } from "../useAutoScrollBottom";
import type { SkinProps } from "../types";

const ACCENT = "#D97757";
const ACCENT_SOFT = "rgba(217,119,87,0.14)";

const HISTORY = ["AEO checklist for SaaS", "Compare GEO vendors", "Noida marketing shortlist"];

export function ClaudeWindow({ scenario, phase, typedText, showCaret, reduceMotion }: SkinProps) {
  const { showUser, showThinking, showResult } = phaseFlags(phase);
  const threadRef = useAutoScrollBottom<HTMLDivElement>(phase);

  return (
    <div className="flex h-140 w-full overflow-hidden rounded-md border border-black/5 bg-[#F5F4EE] shadow-2xl">
      {/* Sidebar */}
      <aside className="hidden w-52.5 shrink-0 flex-col border-r border-black/6 bg-[#EEECE1] p-3 sm:flex">
        <div className="mb-4 flex items-center gap-2 px-1">
          <ClaudeMark className="h-5 w-5" style={{ color: ACCENT }} />
          <span className="text-[14px] font-semibold text-[#3d3929]">Claude</span>
        </div>
        <button
          className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] font-medium text-white"
          style={{ background: ACCENT }}
        >
          <MessageSquarePlus size={15} />
          New chat
        </button>
        <div className="mt-4 mb-1 px-2.5 text-[11px] font-medium uppercase tracking-wide text-[#3d3929]/35">
          Recents
        </div>
        <div className="flex flex-col gap-0.5">
          {HISTORY.map((h) => (
            <div key={h} className="truncate rounded-lg px-2.5 py-1.5 text-[12.5px] text-[#3d3929]/45">
              {h}
            </div>
          ))}
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-14 shrink-0 items-center gap-2 border-b border-black/6 px-5">
          <span className="text-[14.5px] font-semibold text-[#3d3929]">Claude</span>
          <span className="rounded-md bg-black/4 px-2 py-0.5 text-[11px] text-[#3d3929]/50">Opus 4.5</span>
        </div>

        <div ref={threadRef} className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
          <div className="mx-auto flex max-w-140 flex-col gap-6">
            {showUser && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="ml-auto max-w-[85%] rounded-2xl border border-black/6 bg-white px-4 py-2.5 text-[14px] leading-relaxed text-[#3d3929]"
              >
                {scenario.prompt}
              </motion.div>
            )}

            {showThinking && (
              <div className="flex items-center gap-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{ background: ACCENT_SOFT, color: ACCENT }}
                >
                  <ClaudeMark className="h-4 w-4" />
                </span>
                <div className="flex gap-1.5 pt-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: ACCENT }}
                      animate={reduceMotion ? { opacity: 0.6 } : { y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            )}

            {showResult && (
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{ background: ACCENT_SOFT, color: ACCENT }}
                >
                  <ClaudeMark className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <motion.p
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-3 text-[14px] leading-relaxed text-[#3d3929]/85"
                  >
                    {scenario.intro}
                  </motion.p>
                  <ResultList rows={scenario.rows} accent={ACCENT} accentSoft={ACCENT_SOFT} theme="light" reduceMotion={reduceMotion} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 px-6 pb-6">
          <Composer
            typedText={typedText}
            showCaret={showCaret}
            reduceMotion={reduceMotion}
            className="mx-auto flex max-w-140 items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm"
            textColor="#3d3929"
            caretColor={ACCENT}
            placeholder="Reply to Claude"
            leftIcon={
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#3d3929]/50">
                <Paperclip size={15} />
              </span>
            }
            rightIcon={<ArrowUp size={15} />}
            rightIconStyle={{ background: ACCENT, color: "#fff" }}
          />
        </div>
      </div>
    </div>
  );
}
