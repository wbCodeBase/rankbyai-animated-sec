import type { Phase } from "./types";

export function phaseFlags(phase: Phase) {
  return {
    showUser: phase !== "typing",
    showThinking: phase === "thinking",
    showResult: phase === "result" || phase === "holding" || phase === "fading",
  };
}
