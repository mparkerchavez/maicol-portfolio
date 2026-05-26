"use client";

import { AppButton } from "@/components/ui";
import { useSignalStore } from "@/stores/signal-store";

type LlamitaChipProps = {
  prompt: string;
};

export function LlamitaChip({ prompt }: LlamitaChipProps) {
  const recordEvent = useSignalStore((state) => state.recordEvent);

  return (
    <AppButton
      type="button"
      intent="chip"
      size="sm"
      onClick={() => {
        recordEvent({ type: "chip-click", target: prompt });
        console.info("open chat", { prompt });
      }}
    >
      {prompt}
    </AppButton>
  );
}
