"use client";

import { AppButton } from "@/components/ui";
import { useLlamitaBehaviorStore } from "@/stores/llamita-behavior-store";
import { useSignalStore } from "@/stores/signal-store";

type LlamitaChipProps = {
  prompt: string;
};

export function LlamitaChip({ prompt }: LlamitaChipProps) {
  const recordEvent = useSignalStore((state) => state.recordEvent);
  const openChat = useLlamitaBehaviorStore((state) => state.openChat);

  return (
    <AppButton
      type="button"
      intent="chip"
      size="sm"
      onClick={() => {
        recordEvent({ type: "chip-click", target: prompt });
        openChat({ prompt, source: "chip" });
      }}
    >
      {prompt}
    </AppButton>
  );
}
