interface MarkProps {
  className?: string;
  style?: React.CSSProperties;
}

/** Original stylized mark evocative of ChatGPT's identity — not a reproduction of the trademark. */
export function ChatGPTMark({ className, style }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden="true">
      {[0, 60, 120].map((deg) => (
        <ellipse
          key={deg}
          cx="12"
          cy="7.2"
          rx="2.5"
          ry="5.2"
          transform={`rotate(${deg} 12 12)`}
          opacity={0.92}
        />
      ))}
    </svg>
  );
}

/** Original sunburst mark evocative of Claude's identity — not a reproduction of the trademark. */
export function ClaudeMark({ className, style }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => {
        const deg = (360 / 8) * i;
        return (
          <line
            key={deg}
            x1="12"
            y1="12"
            x2="12"
            y2="3.4"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            transform={`rotate(${deg} 12 12)`}
          />
        );
      })}
    </svg>
  );
}

/** Original 4-point sparkle mark evocative of Gemini's identity — not a reproduction of the trademark. */
export function GeminiMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="geminiSparkleGradient" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="100%" stopColor="#9B72CB" />
        </linearGradient>
      </defs>
      <path
        d="M12 2c0.6 4.6 1.4 5.4 6 6-4.6 0.6-5.4 1.4-6 6-0.6-4.6-1.4-5.4-6-6 4.6-0.6 5.4-1.4 6-6Z"
        fill="url(#geminiSparkleGradient)"
      />
    </svg>
  );
}

/** Original compass mark evocative of Perplexity's identity — not a reproduction of the trademark. */
export function PerplexityMark({ className, style }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M15.2 8.8 13 13l-4.2 2.2L11 11l4.2-2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}
