"use client";

import { OpenChatButton } from "@/components/site/open-chat-button";
import { PixelLlamitaMark } from "@/components/site/pixel-llamita-mark";

export function LlamitaPlaceholder() {
  return (
    <div className="fixed right-6 top-28 z-50 hidden md:block">
      <OpenChatButton
        aria-label="Open Llamita chat"
        className="grid size-20 place-items-center border border-ink bg-surface text-llamita-meta text-ink shadow-[6px_6px_0_0_var(--color-ink)] transition hover:-translate-y-0.5"
      >
        <PixelLlamitaMark className="scale-90" />
      </OpenChatButton>
    </div>
  );
}
