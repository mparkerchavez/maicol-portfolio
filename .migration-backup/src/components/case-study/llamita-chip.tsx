"use client";

import { useSignalStore } from "@/stores/signal-store";

type LlamitaChipProps = {
  prompt: string;
};

export function LlamitaChip({ prompt }: LlamitaChipProps) {
  const recordEvent = useSignalStore((state) => state.recordEvent);

  return (
    <button
      type="button"
      className="border border-hairline bg-surface px-3 py-2 text-left text-mono text-ink transition hover:border-ink"
      onClick={() => {
        recordEvent({ type: "chip-click", target: prompt });
        console.info("open chat", { prompt });
      }}
    >
      {prompt}
    </button>
  );
}
