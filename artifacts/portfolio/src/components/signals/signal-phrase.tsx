"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useSignalStore } from "@/stores/signal-store";

type SignalPhraseProps = {
  phrase: string;
  tag: string;
  children?: ReactNode;
};

const dwellThresholdMs = 2000;

export function SignalPhrase({ phrase, tag, children }: SignalPhraseProps) {
  const startedAt = useRef<number | null>(null);
  const recordHover = useSignalStore((state) => state.recordHover);

  return (
    <span
      data-signal={tag}
      className="underline decoration-hairline underline-offset-4"
      onMouseEnter={() => {
        startedAt.current = Date.now();
      }}
      onMouseLeave={() => {
        if (!startedAt.current) {
          return;
        }

        const dwellMs = Date.now() - startedAt.current;
        startedAt.current = null;

        if (dwellMs >= dwellThresholdMs) {
          recordHover({ phrase, tag, dwellMs });
        }
      }}
    >
      {children ?? phrase}
    </span>
  );
}
