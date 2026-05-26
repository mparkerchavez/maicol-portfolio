"use client";

import { Button } from "@/components/base/buttons/button";
import { useSignalStore } from "@/stores/signal-store";

type LlamitaChipProps = {
  prompt: string;
};

export function LlamitaChip({ prompt }: LlamitaChipProps) {
  const recordEvent = useSignalStore((state) => state.recordEvent);

  return (
    <Button
      type="button"
      color="secondary"
      size="sm"
      className="h-auto whitespace-normal rounded-none border border-hairline bg-surface px-3 py-2 text-left text-mono text-ink shadow-none transition hover:border-ink"
      onClick={() => {
        recordEvent({ type: "chip-click", target: prompt });
        console.info("open chat", { prompt });
      }}
    >
      {prompt}
    </Button>
  );
}
