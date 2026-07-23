"use client";

import { motion } from "framer-motion";
import { ChevronDown, Mic, Plus, SquarePen } from "lucide-react";
import { ChatGPTMark } from "../logos";
import { Composer } from "../Composer";
import { ResultList } from "../ResultList";
import { phaseFlags } from "../phaseFlags";
import { useAutoScrollBottom } from "../useAutoScrollBottom";
import type { SkinProps } from "../types";

const ACCENT = "#10A37F";
const ACCENT_SOFT = "rgba(16,163,127,0.16)";

const HISTORY = [
  "Compare NetSuite vs Zoho for ITES",
  "Draft a GEO content brief",
  "Noida agency shortlist",
];

export function ChatGPTWindow({ scenario, phase, typedText, showCaret, reduceMotion }: SkinProps) {
  const { showUser, showThinking, showResult } = phaseFlags(phase);
  const threadRef = useAutoScrollBottom<HTMLDivElement>(phase);

  return (
    <div className="flex h-140 w-full overflow-hidden rounded-md border border-white/10 bg-[#212121] shadow-2xl">
      {/* Sidebar */}
      <aside className="hidden w-52.5 shrink-0 flex-col border-r border-white/5 bg-[#171717] p-3 sm:flex">
        <button className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] font-medium text-white/85 hover:bg-white/5">
          <SquarePen size={15} />
          New chat
        </button>
        <div className="mt-4 mb-1 px-2.5 text-[11px] font-medium uppercase tracking-wide text-white/25">
          Recent
        </div>
        <div className="flex flex-col gap-0.5">
          {HISTORY.map((h) => (
            <div key={h} className="truncate rounded-lg px-2.5 py-1.5 text-[12.5px] text-white/35">
              {h}
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 rounded-lg px-2 py-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white/70">
            WB
          </span>
          <span className="text-[12.5px] text-white/50">White Bunnie</span>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-14 shrink-0 items-center gap-1.5 border-b border-white/5 px-5">
          <span className="text-[14.5px] font-semibold text-white/90">ChatGPT</span>
          <ChevronDown size={14} className="text-white/40" />
          <span className="ml-2 rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-white/40">GPT-5.1</span>
        </div>

        <div ref={threadRef} className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
          <div className="mx-auto flex max-w-140 flex-col gap-6">
            {showUser && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="ml-auto max-w-[85%] rounded-3xl bg-[#2f2f2f] px-4 py-2.5 text-[14px] leading-relaxed text-white/90"
              >
                {scenario.prompt}
              </motion.div>
            )}

            {showThinking && (
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-black">
                  <ChatGPTMark className="h-4 w-4" />
                </span>
                <div className="flex gap-1.5 pt-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-white/50"
                      animate={reduceMotion ? { opacity: 0.6 } : { y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            )}

            {showResult && (
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-black">
                  <ChatGPTMark className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <motion.p
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-3 text-[14px] leading-relaxed text-white/85"
                  >
                    {scenario.intro}
                  </motion.p>
                  <ResultList rows={scenario.rows} accent={ACCENT} accentSoft={ACCENT_SOFT} theme="dark" reduceMotion={reduceMotion} />
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
            className="mx-auto flex max-w-140 items-center gap-3 rounded-3xl border border-white/10 bg-[#2f2f2f] px-4 py-3"
            textColor="#ffffff"
            caretColor="#ffffff"
            placeholder="Message ChatGPT"
            leftIcon={
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70">
                <Plus size={15} />
              </span>
            }
            rightIcon={<Mic size={15} />}
            rightIconStyle={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
          />
        </div>
      </div>
    </div>
  );
}
