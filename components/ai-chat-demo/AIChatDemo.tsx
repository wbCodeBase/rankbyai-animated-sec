"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SCENARIOS } from "./scenarios";
import type { Phase, Platform } from "./types";
import { ChatGPTWindow } from "./skins/ChatGPTWindow";
import { ClaudeWindow } from "./skins/ClaudeWindow";
import { GeminiWindow } from "./skins/GeminiWindow";
import { PerplexityWindow } from "./skins/PerplexityWindow";
import { CornerShapes } from "./CornerShapes";

const SKINS: Record<Platform, typeof ChatGPTWindow> = {
  chatgpt: ChatGPTWindow,
  claude: ClaudeWindow,
  gemini: GeminiWindow,
  perplexity: PerplexityWindow,
};

const TYPE_MS = 26;
const PAUSE_POLL_MS = 150;

export function AIChatDemo() {
  const reduceMotion = !!useReducedMotion();

  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typedText, setTypedText] = useState("");
  const [cardOpacity, setCardOpacity] = useState(1);
  const [paused, setPaused] = useState(false);

  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    let cancelled = false;

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const check = () => {
          if (cancelled) {
            resolve();
            return;
          }
          if (pausedRef.current) {
            setTimeout(check, PAUSE_POLL_MS);
          } else {
            setTimeout(resolve, ms);
          }
        };
        check();
      });

    async function run() {
      let idx = 0;
      while (!cancelled) {
        const scenario = SCENARIOS[idx];
        setScenarioIndex(idx);
        setPhase("typing");
        setCardOpacity(1);
        setTypedText("");

        if (reduceMotion) {
          setTypedText(scenario.prompt);
        } else {
          for (let i = 1; i <= scenario.prompt.length; i++) {
            if (cancelled) return;
            setTypedText(scenario.prompt.slice(0, i));
            await sleep(TYPE_MS);
          }
        }
        await sleep(500);
        if (cancelled) return;

        setPhase("sent");
        setTypedText("");
        await sleep(500);
        if (cancelled) return;

        setPhase("thinking");
        await sleep(900);
        if (cancelled) return;

        setPhase("result");
        await sleep(4200);
        if (cancelled) return;

        setPhase("fading");
        setCardOpacity(0);
        await sleep(420);
        if (cancelled) return;

        idx = (idx + 1) % SCENARIOS.length;
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [reduceMotion]);

  const scenario = SCENARIOS[scenarioIndex];
  const Skin = SKINS[scenario.platform];

  return (
    <div
      className="relative isolate w-full max-w-250"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <CornerShapes />
      <motion.div
        className="relative"
        animate={{ opacity: cardOpacity, scale: cardOpacity ? 1 : 0.985 }}
        transition={{ duration: reduceMotion ? 0 : 0.35 }}
      >
        <Skin
          scenario={scenario}
          phase={phase}
          typedText={typedText}
          showCaret={phase === "typing"}
          reduceMotion={reduceMotion}
        />
      </motion.div>
      {/* <p className="mt-4 text-center text-[13px] text-white/45">{scenario.caption}</p> */}
    </div>
  );
}
