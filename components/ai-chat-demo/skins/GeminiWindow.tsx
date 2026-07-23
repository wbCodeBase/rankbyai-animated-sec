"use client";

import { motion } from "framer-motion";
import { ImagePlus, Mic, PenSquare } from "lucide-react";
import { GeminiMark } from "../logos";
import { Composer } from "../Composer";
import { ResultList } from "../ResultList";
import { phaseFlags } from "../phaseFlags";
import { useAutoScrollBottom } from "../useAutoScrollBottom";
import type { SkinProps } from "../types";

const ACCENT = "#4285F4";
const ACCENT_SOFT = "rgba(66,133,244,0.12)";

const HISTORY = ["GEO vs traditional SEO", "SaaS SEO playbook", "Agency comparison: Noida"];

export function GeminiWindow({ scenario, phase, typedText, showCaret, reduceMotion }: SkinProps) {
  const { showUser, showThinking, showResult } = phaseFlags(phase);
  const threadRef = useAutoScrollBottom<HTMLDivElement>(phase);

  return (
    <div className="flex h-140 w-full overflow-hidden rounded-md border border-black/10 bg-white shadow-2xl">
      {/* Sidebar */}
      <aside className="hidden w-52.5 shrink-0 flex-col border-r border-black/6 bg-[#F8F9FB] p-3 sm:flex">
        <div className="mb-4 flex items-center gap-2 px-1">
          <GeminiMark className="h-5 w-5" />
          <span className="text-[14px] font-semibold text-[#1f1f1f]">Gemini</span>
        </div>
        <button className="flex items-center gap-2 rounded-full border border-black/10 px-2.5 py-2 text-[13px] font-medium text-[#1f1f1f]/80">
          <PenSquare size={15} />
          New chat
        </button>
        <div className="mt-4 mb-1 px-2.5 text-[11px] font-medium uppercase tracking-wide text-black/30">
          Recent
        </div>
        <div className="flex flex-col gap-0.5">
          {HISTORY.map((h) => (
            <div key={h} className="truncate rounded-lg px-2.5 py-1.5 text-[12.5px] text-black/40">
              {h}
            </div>
          ))}
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-14 shrink-0 items-center gap-2 px-5">
          <span className="text-[15px] font-medium text-[#1f1f1f]">Gemini</span>
          <span className="rounded-md bg-black/4 px-2 py-0.5 text-[11px] text-black/45">2.5 Pro</span>
        </div>

        <div ref={threadRef} className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          <div className="mx-auto flex max-w-140 flex-col gap-6">
            {showUser && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="ml-auto max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed text-[#1f1f1f]"
                style={{ background: ACCENT_SOFT }}
              >
                {scenario.prompt}
              </motion.div>
            )}

            {showThinking && (
              <div className="flex items-center gap-3">
                <GeminiMark className="h-6 w-6 shrink-0" />
                <motion.div
                  className="h-3 w-40 rounded-full"
                  style={{
                    background: "linear-gradient(90deg,#4285F4,#9B72CB,#4285F4)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={reduceMotion ? {} : { backgroundPosition: ["0% 0%", "200% 0%"] }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 1.4, repeat: Infinity, ease: "linear" }}
                />
              </div>
            )}

            {showResult && (
              <div className="flex items-start gap-3">
                <GeminiMark className="mt-0.5 h-6 w-6 shrink-0" />
                <div className="min-w-0 flex-1 rounded-2xl bg-[#F8F9FB] p-4">
                  <motion.p
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-3 text-[14px] leading-relaxed text-[#1f1f1f]/85"
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
            className="mx-auto flex max-w-140 items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-3 shadow-sm"
            textColor="#1f1f1f"
            caretColor={ACCENT}
            placeholder="Ask Gemini"
            leftIcon={
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-black/40">
                <ImagePlus size={15} />
              </span>
            }
            rightIcon={<Mic size={15} />}
            rightIconStyle={{ background: ACCENT_SOFT, color: ACCENT }}
          />
        </div>
      </div>
    </div>
  );
}
