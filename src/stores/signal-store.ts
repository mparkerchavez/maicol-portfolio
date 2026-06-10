"use client";

import { create } from "zustand";

export type IntentTrack = "for-anyone" | "recruiters" | "ai-strategist" | "product-managers" | "product-designers";
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
  recordHover: (hover: Omit<HoverSignal, "timestampMs">) => void;
  recordEvent: (event: Omit<SignalEvent, "timestampMs">) => void;
  getPageContext: () => PageContext;
};

export type PageContext = Pick<SignalState, "page" | "inView" | "lastHover" | "inferredTrack" | "recentBehavior">;

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
      inferredTrack: state.inferredTrack,
      recentBehavior: state.recentBehavior,
    };
  },
}));
