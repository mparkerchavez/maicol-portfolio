"use client";

import { create } from "zustand";
import type { ActiveIdleObservation, HoverLookTarget, LlamitaState, LlamitaTransitionTrigger } from "@/lib/llamita-behavior";
import { resolveLlamitaTransition } from "@/lib/llamita-behavior";

export type LlamitaChatMessage = {
  id: string;
  role: "visitor" | "llamita";
  text: string;
  timestampMs: number;
};

type OpenChatInput = {
  prompt?: string;
  observation?: ActiveIdleObservation;
  source?: "button" | "chip" | "llamita";
};

type LlamitaBehaviorState = {
  state: LlamitaState;
  chatOpen: boolean;
  currentObservation: ActiveIdleObservation | null;
  firedObservationSurfaces: string[];
  lastObservationAtMs: number | null;
  hoverLookTarget: HoverLookTarget | null;
  chatMessages: LlamitaChatMessage[];
  stubTurnId: number;
  dispatch: (trigger: LlamitaTransitionTrigger) => void;
  beginObservation: (observation: ActiveIdleObservation) => void;
  completeObservationCue: (surfaceId: string) => void;
  dismissObservation: () => void;
  openChat: (input?: OpenChatInput) => void;
  closeChat: () => void;
  submitStubMessage: (message: string) => void;
  setHoverLookTarget: (target: HoverLookTarget) => void;
  clearHoverLookTarget: () => void;
};

export const useLlamitaBehaviorStore = create<LlamitaBehaviorState>((set) => ({
  state: "idle",
  chatOpen: false,
  currentObservation: null,
  firedObservationSurfaces: [],
  lastObservationAtMs: null,
  hoverLookTarget: null,
  chatMessages: [],
  stubTurnId: 0,
  dispatch: (trigger) =>
    set((current) => ({
      state: resolveLlamitaTransition(current.state, trigger),
    })),
  beginObservation: (observation) =>
    set((current) => {
      if (current.chatOpen || current.currentObservation || current.state !== "idle") {
        return current;
      }

      return {
        currentObservation: observation,
        firedObservationSurfaces: current.firedObservationSurfaces.includes(observation.id)
          ? current.firedObservationSurfaces
          : [...current.firedObservationSurfaces, observation.id],
        lastObservationAtMs: observation.firedAtMs,
        state: resolveLlamitaTransition(current.state, { type: "dwell-fired" }),
      };
    }),
  completeObservationCue: (surfaceId) =>
    set((current) => {
      if (current.currentObservation?.id !== surfaceId || current.state !== "observing") {
        return current;
      }

      return {
        state: resolveLlamitaTransition(current.state, { type: "observation-cue-complete" }),
      };
    }),
  dismissObservation: () =>
    set((current) => ({
      currentObservation: null,
      state: current.state === "observing" ? resolveLlamitaTransition(current.state, { type: "observation-cue-complete" }) : current.state,
    })),
  openChat: (input) =>
    set((current) => {
      const prompt = input?.prompt?.trim();
      const observation = input?.observation;
      const messageText = observation?.text ?? prompt;
      const now = Date.now();
      const shouldRunStub = Boolean(prompt);
      const stateBeforeOpen = current.state === "sleeping" ? "idle" : current.state;
      const trigger =
        observation && current.state === "observing"
          ? ({ type: "click-llamita" } as const)
          : ({ type: "open-chat", requiresResponse: shouldRunStub } as const);
      const nextMessages = messageText
        ? [
            ...current.chatMessages,
            {
              id: `${now}:${current.chatMessages.length}`,
              role: observation ? "llamita" : "visitor",
              text: messageText,
              timestampMs: now,
            } satisfies LlamitaChatMessage,
          ]
        : current.chatMessages;

      return {
        chatOpen: true,
        currentObservation: null,
        chatMessages: nextMessages,
        stubTurnId: shouldRunStub ? current.stubTurnId + 1 : current.stubTurnId,
        state: resolveLlamitaTransition(stateBeforeOpen, trigger),
      };
    }),
  closeChat: () =>
    set((current) => ({
      chatOpen: false,
      state: resolveLlamitaTransition(current.state, { type: "close-chat" }),
    })),
  submitStubMessage: (message) =>
    set((current) => {
      const text = message.trim();

      if (!text) {
        return current;
      }

      const now = Date.now();
      const nextState =
        current.state === "talking"
          ? resolveLlamitaTransition(current.state, { type: "new-message" })
          : current.state === "idle"
            ? "thinking"
            : current.state;

      return {
        chatMessages: [
          ...current.chatMessages,
          {
            id: `${now}:${current.chatMessages.length}`,
            role: "visitor",
            text,
            timestampMs: now,
          },
        ],
        stubTurnId: current.stubTurnId + 1,
        state: nextState,
      };
    }),
  setHoverLookTarget: (target) => set({ hoverLookTarget: target }),
  clearHoverLookTarget: () => set({ hoverLookTarget: null }),
}));
