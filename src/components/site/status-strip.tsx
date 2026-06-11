"use client";

// Live session readout (handoff 0009, Section 7, Task 3): name, role status,
// declared persona, current section in view. Informational, sticky, no ticker.
import { getPersona } from "@/data/personas";
import { useSignalStore } from "@/stores/signal-store";

export function StatusStrip() {
  const selectedPersona = useSignalStore((state) => state.selectedPersona);
  const inView = useSignalStore((state) => state.inView);

  return (
    <div className="sticky top-0 z-40 border-b border-hairline bg-paper/95 backdrop-blur">
      <div className="site-container flex min-h-8 flex-wrap items-center gap-x-3 gap-y-0 py-1 text-mono-sm text-muted">
        <span className="text-ink">MAICOL PARKER-CHAVEZ</span>
        <span>{"///"}</span>
        <span>OPEN TO SENIOR PM AND AI PRODUCT LEAD ROLES</span>
        <span className="hidden md:inline">{"///"}</span>
        <span className="hidden md:inline">PERSONA: {getPersona(selectedPersona).label}</span>
        <span className="hidden lg:inline">{"///"}</span>
        <span className="hidden lg:inline">READING: {inView ? inView.sectionTitle : "Top of page"}</span>
      </div>
    </div>
  );
}
