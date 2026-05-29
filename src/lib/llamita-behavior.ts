import type { SignalEvent } from "@/stores/signal-store";

export type LlamitaState = "idle" | "observing" | "talking" | "thinking" | "wrong" | "sleeping";

export type IdleObservationContent = Record<string, string>;

export type IdleObservationSurface = {
  id: string;
  contentKey: string;
  dwellMs: number;
};

export type ActiveIdleObservation = IdleObservationSurface & {
  text: string;
  firedAtMs: number;
};

export type HoverLookTarget = {
  x: number;
  y: number;
};

export type LlamitaTransitionTrigger =
  | { type: "dwell-fired" }
  | { type: "open-chat"; requiresResponse: boolean }
  | { type: "sleep-threshold" }
  | { type: "observation-cue-complete" }
  | { type: "click-llamita" }
  | { type: "response-complete" }
  | { type: "new-message" }
  | { type: "first-token" }
  | { type: "missed-framing" }
  | { type: "wrong-beat-complete" }
  | { type: "wake-input" }
  | { type: "close-chat" };

export const LLAMITA_STATE_LABELS: Record<LlamitaState, string> = {
  idle: "LLAMITA /// IDLE",
  observing: "LLAMITA /// OBSERVING",
  talking: "LLAMITA /// TALKING",
  thinking: "LLAMITA /// THINKING",
  wrong: "LLAMITA /// RECALIBRATING",
  sleeping: "LLAMITA /// RESTING",
};

export const LLAMITA_DWELL_WINDOWS_MS = {
  homeHero: 12_000,
  postToggle: 10_000,
  caseStudySection: 15_000,
  traceCard: 12_000,
} as const;

export const LLAMITA_GLOBAL_OBSERVATION_FLOOR_MS = 30_000;
export const LLAMITA_SLEEP_THRESHOLD_MS = 90_000;
export const LLAMITA_OBSERVATION_CUE_MS = 600;
export const LLAMITA_OBSERVATION_HINT_MS = 8_000;
export const LLAMITA_THINKING_STUB_MS = 450;
export const LLAMITA_TALKING_STUB_MS = 1_000;
export const LLAMITA_WRONG_BEAT_MS = 500;

type SurfaceInput = {
  pageSlug: string;
  sectionId?: string | null;
  lastSectionEnteredAtMs: number | null;
  lastThroughLineChangedAtMs: number | null;
  recentBehavior: SignalEvent[];
};

export function resolveLlamitaTransition(current: LlamitaState, trigger: LlamitaTransitionTrigger): LlamitaState {
  if (current === "idle" && trigger.type === "dwell-fired") {
    return "observing";
  }

  if (current === "idle" && trigger.type === "open-chat") {
    return trigger.requiresResponse ? "thinking" : "talking";
  }

  if (current === "idle" && trigger.type === "sleep-threshold") {
    return "sleeping";
  }

  if (current === "observing" && trigger.type === "observation-cue-complete") {
    return "idle";
  }

  if (current === "observing" && trigger.type === "click-llamita") {
    return "talking";
  }

  if (current === "talking" && trigger.type === "response-complete") {
    return "idle";
  }

  if (current === "talking" && trigger.type === "new-message") {
    return "thinking";
  }

  if (current === "thinking" && trigger.type === "first-token") {
    return "talking";
  }

  if (current === "thinking" && trigger.type === "missed-framing") {
    return "wrong";
  }

  if (current === "wrong" && trigger.type === "wrong-beat-complete") {
    return "talking";
  }

  if (current === "sleeping" && trigger.type === "wake-input") {
    return "idle";
  }

  if (trigger.type === "close-chat") {
    return "idle";
  }

  return current;
}

export function getIdleObservationSurface({
  pageSlug,
  sectionId,
  lastSectionEnteredAtMs,
  lastThroughLineChangedAtMs,
  recentBehavior,
}: SurfaceInput): IdleObservationSurface | null {
  if (!sectionId) {
    return null;
  }

  const sectionStartedAt = lastSectionEnteredAtMs ?? 0;
  const lastTraceClick = findLatestEvent(recentBehavior, (event) => event.type === "click" && event.target.startsWith("curate-trace:"));

  if (pageSlug === "home") {
    if (sectionId === "intent-cockpit") {
      const hasFreshToggle = Boolean(lastThroughLineChangedAtMs && lastThroughLineChangedAtMs >= sectionStartedAt);

      return hasFreshToggle
        ? {
            id: "home.post-toggle",
            contentKey: "home.post-toggle",
            dwellMs: LLAMITA_DWELL_WINDOWS_MS.postToggle,
          }
        : {
            id: "home.hero",
            contentKey: "home.hero",
            dwellMs: LLAMITA_DWELL_WINDOWS_MS.homeHero,
          };
    }

    if (sectionId === "proof-board") {
      return {
        id: "home.case-studies",
        contentKey: "home.case-studies",
        dwellMs: LLAMITA_DWELL_WINDOWS_MS.caseStudySection,
      };
    }

    if (sectionId === "trace-lab") {
      const traceId = lastTraceClick && lastTraceClick.timestampMs >= sectionStartedAt ? lastTraceClick.target : "trace-lab";

      return {
        id: `home.trace-card:${traceId}`,
        contentKey: "home.trace-card",
        dwellMs: LLAMITA_DWELL_WINDOWS_MS.traceCard,
      };
    }
  }

  if (pageSlug.startsWith("work/")) {
    const slug = pageSlug.replace("work/", "");
    const sectionKey = getCaseStudyObservationSectionKey(sectionId);

    if (!sectionKey) {
      return null;
    }

    return {
      id: `${pageSlug}:${sectionKey}`,
      contentKey: `work.${slug}.${sectionKey}`,
      dwellMs: LLAMITA_DWELL_WINDOWS_MS.caseStudySection,
    };
  }

  return null;
}

function getCaseStudyObservationSectionKey(sectionId: string) {
  if (sectionId === "case-hero" || sectionId === "01--the-challenge") {
    return "hero";
  }

  if (sectionId === "02--the-strategy") {
    return "strategy";
  }

  if (sectionId === "03--the-outcome") {
    return "outcome";
  }

  return null;
}

function findLatestEvent(events: SignalEvent[], predicate: (event: SignalEvent) => boolean) {
  for (let index = events.length - 1; index >= 0; index -= 1) {
    const event = events[index];

    if (event && predicate(event)) {
      return event;
    }
  }

  return null;
}
