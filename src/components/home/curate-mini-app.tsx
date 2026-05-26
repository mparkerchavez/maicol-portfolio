"use client";

import { useState } from "react";
import { SignalAnchor } from "@/components/signals/signal-anchor";
import { OpenChatButton } from "@/components/site/open-chat-button";
import { AppButton, AppCard } from "@/components/ui";
import { curateTraces } from "@/data/curate-traces";
import { useSignalStore } from "@/stores/signal-store";

export function CurateMiniApp() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const recordEvent = useSignalStore((state) => state.recordEvent);

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-3">
        {curateTraces.map((trace, index) => {
          const expanded = expandedIndex === index;

          return (
            <AppCard
              key={trace.position}
              interactive
              className="min-h-[420px] text-left"
            >
              <p className="text-mono-sm text-muted">THEME</p>
              <p className="mt-2">{trace.theme}</p>
              <p className="my-6 text-mono-sm text-muted">↓</p>
              <p className="text-mono-sm text-muted">POSITION</p>
              <p className="mt-2">{trace.position}</p>
              <p className="my-6 text-mono-sm text-muted">↓</p>
              <p className="text-mono-sm text-muted">EVIDENCE</p>
              <p className="mt-2 text-body-sm text-muted">{expanded ? trace.evidence : "Click to expand this trace."}</p>
              {expanded ? (
                <div className="mt-6 border-t border-hairline pt-6">
                  <p className="text-mono-sm text-muted">SOURCE</p>
                  <p className="mt-2 text-body-sm">{trace.source}</p>
                  <OpenChatButton prompt={`explain this Curate Mind trace: ${trace.position}`} className="mt-6 text-mono">
                    ASK LLAMITA TO EXPLAIN →
                  </OpenChatButton>
                </div>
              ) : (
                <p className="mt-8 text-body-sm text-muted">Expand to see the source placeholder and chat handoff.</p>
              )}
              <AppButton
                type="button"
                intent="plain"
                className="mt-8 text-mono"
                onClick={() => {
                  setExpandedIndex(expanded ? null : index);
                  recordEvent({ type: "click", target: `curate-trace:${index + 1}` });
                }}
              >
                {expanded ? "COLLAPSE ↑" : "EXPAND ↓"}
              </AppButton>
            </AppCard>
          );
        })}
      </div>

      <SignalAnchor
        href="https://curatemind.io"
        signalType="click"
        targetId="curate-mind-external"
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-block text-mono text-ink"
      >
        EXPLORE THE FULL EXPERIENCE → CURATEMIND.IO
      </SignalAnchor>
    </div>
  );
}
