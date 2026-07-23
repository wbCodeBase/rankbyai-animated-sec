"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ComposerProps {
  typedText: string;
  showCaret: boolean;
  reduceMotion: boolean;
  className: string;
  textColor: string;
  caretColor: string;
  placeholder: string;
  leftIcon?: ReactNode;
  rightIcon: ReactNode;
  rightIconStyle: React.CSSProperties;
}

export function Composer({
  typedText,
  showCaret,
  reduceMotion,
  className,
  textColor,
  caretColor,
  placeholder,
  leftIcon,
  rightIcon,
  rightIconStyle,
}: ComposerProps) {
  const hasText = typedText.length > 0;

  return (
    <div className={className}>
      {leftIcon}
      <span
        className="min-w-0 flex-1 truncate text-[14px]"
        style={{ color: hasText ? textColor : `${textColor}88` }}
      >
        {hasText ? typedText : placeholder}
        {showCaret ? (
          <motion.span
            className="ml-0.5 inline-block h-[15px] w-[2px] translate-y-[2px] align-middle"
            style={{ background: caretColor }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
            transition={reduceMotion ? { duration: 0 } : { duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
          />
        ) : null}
      </span>
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={rightIconStyle}
      >
        {rightIcon}
      </span>
    </div>
  );
}
