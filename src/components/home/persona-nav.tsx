"use client";

// The visible visitor-persona nav (ADR 0009, Spec 03 Sections 4b and 9).
// Controlled by the hero: hover previews copy without committing, click commits.
import { AppTabButton } from "@/components/ui";
import { personas } from "@/data/personas";
import type { SelectedPersona } from "@/stores/signal-store";

type PersonaNavProps = {
  activePersona: SelectedPersona;
  onCommit: (persona: SelectedPersona) => void;
  onPreview: (persona: SelectedPersona | null) => void;
};

export function PersonaNav({ activePersona, onCommit, onPreview }: PersonaNavProps) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-2" role="tablist" aria-label="Who are you, the visitor?">
      {personas.map((persona) => {
        const isActive = persona.key === activePersona;

        return (
          <AppTabButton
            key={persona.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`min-h-11 text-left text-h3 transition ${isActive ? "font-bold italic text-ink" : "text-muted hover:text-ink"}`}
            onMouseEnter={() => {
              if (!isActive) {
                onPreview(persona.key);
              }
            }}
            onMouseLeave={() => onPreview(null)}
            onFocus={() => {
              if (!isActive) {
                onPreview(persona.key);
              }
            }}
            onBlur={() => onPreview(null)}
            onClick={() => onCommit(persona.key)}
          >
            {persona.label}
          </AppTabButton>
        );
      })}
    </div>
  );
}
