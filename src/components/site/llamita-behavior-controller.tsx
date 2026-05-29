"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo } from "react";
import {
  getIdleObservationSurface,
  LLAMITA_GLOBAL_OBSERVATION_FLOOR_MS,
  LLAMITA_OBSERVATION_CUE_MS,
  LLAMITA_OBSERVATION_HINT_MS,
  LLAMITA_SLEEP_THRESHOLD_MS,
  LLAMITA_TALKING_STUB_MS,
  LLAMITA_THINKING_STUB_MS,
  type IdleObservationContent,
} from "@/lib/llamita-behavior";
import { useLlamitaBehaviorStore } from "@/stores/llamita-behavior-store";
import { useSignalStore } from "@/stores/signal-store";

type LlamitaBehaviorControllerProps = {
  idleObservations: IdleObservationContent;
};

export function LlamitaBehaviorController({ idleObservations }: LlamitaBehaviorControllerProps) {
  const shouldReduceMotion = useReducedMotion();
  const page = useSignalStore((state) => state.page);
  const inView = useSignalStore((state) => state.inView);
  const recentBehavior = useSignalStore((state) => state.recentBehavior);
  const lastEngagementAtMs = useSignalStore((state) => state.lastEngagementAtMs);
  const lastSectionEnteredAtMs = useSignalStore((state) => state.lastSectionEnteredAtMs);
  const lastThroughLineChangedAtMs = useSignalStore((state) => state.lastThroughLineChangedAtMs);
  const llamitaState = useLlamitaBehaviorStore((state) => state.state);
  const chatOpen = useLlamitaBehaviorStore((state) => state.chatOpen);
  const currentObservation = useLlamitaBehaviorStore((state) => state.currentObservation);
  const firedObservationSurfaces = useLlamitaBehaviorStore((state) => state.firedObservationSurfaces);
  const lastObservationAtMs = useLlamitaBehaviorStore((state) => state.lastObservationAtMs);
  const stubTurnId = useLlamitaBehaviorStore((state) => state.stubTurnId);
  const beginObservation = useLlamitaBehaviorStore((state) => state.beginObservation);
  const completeObservationCue = useLlamitaBehaviorStore((state) => state.completeObservationCue);
  const dismissObservation = useLlamitaBehaviorStore((state) => state.dismissObservation);
  const dispatch = useLlamitaBehaviorStore((state) => state.dispatch);
  const firedKey = firedObservationSurfaces.join("|");

  const activeSurface = useMemo(
    () =>
      getIdleObservationSurface({
        pageSlug: page.slug,
        sectionId: inView?.sectionId,
        lastSectionEnteredAtMs,
        lastThroughLineChangedAtMs,
        recentBehavior,
      }),
    [inView?.sectionId, lastSectionEnteredAtMs, lastThroughLineChangedAtMs, page.slug, recentBehavior],
  );

  useEffect(() => {
    if (!activeSurface || chatOpen || currentObservation || llamitaState !== "idle" || firedObservationSurfaces.includes(activeSurface.id)) {
      return;
    }

    const text = idleObservations[activeSurface.contentKey];

    if (!text) {
      return;
    }

    const now = Date.now();
    const floorRemainingMs = lastObservationAtMs ? Math.max(0, lastObservationAtMs + LLAMITA_GLOBAL_OBSERVATION_FLOOR_MS - now) : 0;
    const waitMs = Math.max(activeSurface.dwellMs, floorRemainingMs);

    const timer = window.setTimeout(() => {
      const signalState = useSignalStore.getState();
      const behaviorState = useLlamitaBehaviorStore.getState();
      const freshSurface = getIdleObservationSurface({
        pageSlug: signalState.page.slug,
        sectionId: signalState.inView?.sectionId,
        lastSectionEnteredAtMs: signalState.lastSectionEnteredAtMs,
        lastThroughLineChangedAtMs: signalState.lastThroughLineChangedAtMs,
        recentBehavior: signalState.recentBehavior,
      });

      if (
        freshSurface?.id !== activeSurface.id ||
        behaviorState.chatOpen ||
        behaviorState.currentObservation ||
        behaviorState.state !== "idle" ||
        behaviorState.firedObservationSurfaces.includes(activeSurface.id)
      ) {
        return;
      }

      beginObservation({
        ...activeSurface,
        text,
        firedAtMs: Date.now(),
      });
    }, waitMs);

    return () => window.clearTimeout(timer);
  }, [
    activeSurface,
    beginObservation,
    chatOpen,
    currentObservation,
    firedKey,
    firedObservationSurfaces,
    idleObservations,
    lastEngagementAtMs,
    lastObservationAtMs,
    llamitaState,
  ]);

  useEffect(() => {
    if (!currentObservation) {
      return;
    }

    const cueMs = shouldReduceMotion ? 0 : LLAMITA_OBSERVATION_CUE_MS;
    const cueTimer = window.setTimeout(() => {
      completeObservationCue(currentObservation.id);
    }, cueMs);
    const hintTimer = window.setTimeout(() => {
      dismissObservation();
    }, LLAMITA_OBSERVATION_HINT_MS);

    return () => {
      window.clearTimeout(cueTimer);
      window.clearTimeout(hintTimer);
    };
  }, [completeObservationCue, currentObservation, dismissObservation, shouldReduceMotion]);

  useEffect(() => {
    if (stubTurnId === 0) {
      return;
    }

    const firstTokenTimer = window.setTimeout(() => {
      dispatch({ type: "first-token" });
    }, LLAMITA_THINKING_STUB_MS);
    const responseCompleteTimer = window.setTimeout(() => {
      dispatch({ type: "response-complete" });
    }, LLAMITA_THINKING_STUB_MS + LLAMITA_TALKING_STUB_MS);

    return () => {
      window.clearTimeout(firstTokenTimer);
      window.clearTimeout(responseCompleteTimer);
    };
  }, [dispatch, stubTurnId]);

  useEffect(() => {
    let sleepTimer: number | null = null;

    const resetSleepTimer = () => {
      if (sleepTimer) {
        window.clearTimeout(sleepTimer);
      }

      if (useLlamitaBehaviorStore.getState().state === "sleeping") {
        window.requestAnimationFrame(() => {
          useLlamitaBehaviorStore.getState().dispatch({ type: "wake-input" });
        });
      }

      sleepTimer = window.setTimeout(() => {
        const behaviorState = useLlamitaBehaviorStore.getState();

        if (behaviorState.state === "idle" && !behaviorState.chatOpen) {
          behaviorState.dispatch({ type: "sleep-threshold" });
        }
      }, LLAMITA_SLEEP_THRESHOLD_MS);
    };

    window.addEventListener("pointermove", resetSleepTimer, { passive: true });
    window.addEventListener("scroll", resetSleepTimer, { passive: true });
    window.addEventListener("keydown", resetSleepTimer);
    window.addEventListener("focus", resetSleepTimer);
    document.addEventListener("focusin", resetSleepTimer);
    resetSleepTimer();

    return () => {
      if (sleepTimer) {
        window.clearTimeout(sleepTimer);
      }

      window.removeEventListener("pointermove", resetSleepTimer);
      window.removeEventListener("scroll", resetSleepTimer);
      window.removeEventListener("keydown", resetSleepTimer);
      window.removeEventListener("focus", resetSleepTimer);
      document.removeEventListener("focusin", resetSleepTimer);
    };
  }, []);

  return null;
}
