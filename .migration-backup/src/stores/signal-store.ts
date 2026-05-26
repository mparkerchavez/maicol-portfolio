"use client";

import { create } from "zustand";

export type ThroughLine = "designer" | "ai-product-lead" | "end-to-end-product";
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
  throughLine: ThroughLine;
  inferredTrack: {
    track: IntentTrack;
    confidence: number;
  };
  recentBehavior: SignalEvent[];
  setPage: (page: SignalState["page"]) => void;
  setInView: (inView: NonNullable<SignalState["inView"]>) => void;
  setThroughLine: (throughLine: ThroughLine) => void;
  recordHover: (hover: Omit<HoverSignal, "timestampMs">) => void;
  recordEvent: (event: Omit<SignalEvent, "timestampMs">) => void;
  getPageContext: () => PageContext;
};

export type PageContext = Pick<SignalState, "page" | "inView" | "lastHover" | "throughLine" | "inferredTrack" | "recentBehavior">;

const withTimestamp = (event: Omit<SignalEvent, "timestampMs">): SignalEvent => ({
  ...event,
  timestampMs: Date.now(),
});

const keepRecent = (events: SignalEvent[]) => events.slice(-5);

export const useSignalStore = create<SignalState>((set, get) => ({
  page: {
    slug: "home",
    title: "Home",
  },
  inView: null,
  lastHover: null,
  throughLine: "ai-product-lead",
  inferredTrack: {
    track: "for-anyone",
    confidence: 0,
  },
  recentBehavior: [],
  setPage: (page) => set({ page }),
  setInView: (inView) =>
    set((state) => ({
      inView,
      recentBehavior: keepRecent([...state.recentBehavior, withTimestamp({ type: "scroll-section", target: inView.sectionId })]),
    })),
  setThroughLine: (throughLine) =>
    set((state) => ({
      throughLine,
      recentBehavior: keepRecent([...state.recentBehavior, withTimestamp({ type: "click", target: `through-line:${throughLine}` })]),
    })),
  recordHover: (hover) =>
    set((state) => ({
      lastHover: {
        ...hover,
        timestampMs: Date.now(),
      },
      recentBehavior: keepRecent([...state.recentBehavior, withTimestamp({ type: "hover", target: `${hover.tag}:${hover.phrase}` })]),
    })),
  recordEvent: (event) =>
    set((state) => ({
      recentBehavior: keepRecent([...state.recentBehavior, withTimestamp(event)]),
    })),
  getPageContext: () => {
    const state = get();

    return {
      page: state.page,
      inView: state.inView,
      lastHover: state.lastHover,
      throughLine: state.throughLine,
      inferredTrack: state.inferredTrack,
      recentBehavior: state.recentBehavior,
    };
  },
}));
