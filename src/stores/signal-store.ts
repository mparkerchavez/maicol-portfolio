"use client";

import { create } from "zustand";

export type IntentTrack = "for-anyone" | "recruiters" | "ai-strategist" | "product-managers" | "product-designers";
// Declared persona from the home page persona nav (ADR 0009). A 4-value subset of the
// 5 inferred tracks; the visible "AI Product Leaders" label maps to the internal
// "ai-strategist" track key per Spec 03 Section 4e.
export type SelectedPersona = "for-anyone" | "recruiters" | "ai-product-leaders" | "product-managers";
export type SignalEventType = "hover" | "click" | "scroll-section" | "chip-click";

export type HoverSignal = {
  phrase: string;
  tag: string;
  dwellMs: number;
  timestampMs: number;
};

export type SignalEvent = {
  type: SignalEventType;
  target: string;
  timestampMs: number;
};

type SignalState = {
  page: {
    slug: string;
    title: string;
  };
  inView: {
    sectionId: string;
    sectionTitle: string;
  } | null;
  lastHover: HoverSignal | null;
  selectedPersona: SelectedPersona;
  inferredTrack: {
    track: IntentTrack;
    confidence: number;
  };
  recentBehavior: SignalEvent[];
  lastEvent: SignalEvent | null;
  lastEngagementAtMs: number | null;
  lastSectionEnteredAtMs: number | null;
  setPage: (page: SignalState["page"]) => void;
  setInView: (inView: NonNullable<SignalState["inView"]>) => void;
  declareSelectedPersona: (persona: SelectedPersona) => void;
  hydrateSelectedPersona: (persona: SelectedPersona) => void;
  recordHover: (hover: Omit<HoverSignal, "timestampMs">) => void;
  recordEvent: (event: Omit<SignalEvent, "timestampMs">) => void;
  getPageContext: () => PageContext;
};

export type PageContext = Pick<SignalState, "page" | "inView" | "lastHover" | "selectedPersona" | "inferredTrack" | "recentBehavior">;

const withTimestamp = (event: Omit<SignalEvent, "timestampMs">): SignalEvent => ({
  ...event,
  timestampMs: Date.now(),
});

const keepRecent = (events: SignalEvent[]) => events.slice(-5);
const isEngagementEvent = (event: SignalEvent) => event.type === "click" || event.type === "chip-click";

export const useSignalStore = create<SignalState>((set, get) => ({
  page: {
    slug: "home",
    title: "Home",
  },
  inView: null,
  lastHover: null,
  selectedPersona: "for-anyone",
  // Permanently confidence 0 until Spec 08 lands post-launch (ADR 0010).
  inferredTrack: {
    track: "for-anyone",
    confidence: 0,
  },
  recentBehavior: [],
  lastEvent: null,
  lastEngagementAtMs: null,
  lastSectionEnteredAtMs: null,
  setPage: (page) => set({ page }),
  setInView: (inView) =>
    set((state) => {
      if (state.inView?.sectionId === inView.sectionId) {
        return { inView };
      }

      const event = withTimestamp({ type: "scroll-section", target: inView.sectionId });

      return {
        inView,
        lastEvent: event,
        lastSectionEnteredAtMs: event.timestampMs,
        recentBehavior: keepRecent([...state.recentBehavior, event]),
      };
    }),
  declareSelectedPersona: (persona) =>
    set((state) => {
      const event = withTimestamp({ type: "click", target: `persona-nav:${persona}` });

      return {
        selectedPersona: persona,
        lastEvent: event,
        lastEngagementAtMs: event.timestampMs,
        recentBehavior: keepRecent([...state.recentBehavior, event]),
      };
    }),
  // Restores a persona persisted earlier in the session without recording a new declared signal.
  hydrateSelectedPersona: (persona) => set({ selectedPersona: persona }),
  recordHover: (hover) =>
    set((state) => {
      const event = withTimestamp({ type: "hover", target: `${hover.tag}:${hover.phrase}` });

      return {
        lastHover: {
          ...hover,
          timestampMs: Date.now(),
        },
        lastEvent: event,
        recentBehavior: keepRecent([...state.recentBehavior, event]),
      };
    }),
  recordEvent: (eventInput) =>
    set((state) => {
      const event = withTimestamp(eventInput);

      return {
        lastEvent: event,
        lastEngagementAtMs: isEngagementEvent(event) ? event.timestampMs : state.lastEngagementAtMs,
        recentBehavior: keepRecent([...state.recentBehavior, event]),
      };
    }),
  getPageContext: () => {
    const state = get();

    return {
      page: state.page,
      inView: state.inView,
      lastHover: state.lastHover,
      selectedPersona: state.selectedPersona,
      inferredTrack: state.inferredTrack,
      recentBehavior: state.recentBehavior,
    };
  },
}));
