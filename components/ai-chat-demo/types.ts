export type Platform = "chatgpt" | "claude" | "gemini" | "perplexity";

export interface ResultRow {
  name: string;
  tag: string;
  rating: number;
  highlight?: boolean;
  badge?: string;
}

export interface Scenario {
  id: string;
  platform: Platform;
  prompt: string;
  intro: string;
  caption: string;
  rows: ResultRow[];
}

export type Phase =
  | "typing"
  | "sent"
  | "thinking"
  | "result"
  | "holding"
  | "fading";

export interface SkinProps {
  scenario: Scenario;
  phase: Phase;
  typedText: string;
  showCaret: boolean;
  reduceMotion: boolean;
}
