"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { AppButton } from "@/components/ui";
import { LlamitaBehaviorController } from "@/components/site/llamita-behavior-controller";
import { LlamitaChatPanel } from "@/components/site/llamita-chat-panel";
import { type LlamitaLook, LlamitaSprite } from "@/components/site/llamita-sprite";
import type { IdleObservationContent } from "@/lib/llamita-behavior";
import { LLAMITA_STATE_LABELS } from "@/lib/llamita-behavior";
import { useLlamitaBehaviorStore } from "@/stores/llamita-behavior-store";
import { useSignalStore } from "@/stores/signal-store";
import { cx } from "@/utils/cx";

type LlamitaPlaceholderProps = {
  idleObservations: IdleObservationContent;
};

export function LlamitaPlaceholder({ idleObservations }: LlamitaPlaceholderProps) {
  const shouldReduceMotion = useReducedMotion();
  const perchRef = useRef<HTMLDivElement | null>(null);
  const [look, setLook] = useState<LlamitaLook>(null);
  const llamitaState = useLlamitaBehaviorStore((state) => state.state);
  const chatOpen = useLlamitaBehaviorStore((state) => state.chatOpen);
  const currentObservation = useLlamitaBehaviorStore((state) => state.currentObservation);
  const hoverLookTarget = useLlamitaBehaviorStore((state) => state.hoverLookTarget);
  const openChat = useLlamitaBehaviorStore((state) => state.openChat);
  const dismissObservation = useLlamitaBehaviorStore((state) => state.dismissObservation);
  const recordEvent = useSignalStore((state) => state.recordEvent);

  useLayoutEffect(() => {
    const perch = perchRef.current;

    if (!perch || !hoverLookTarget || shouldReduceMotion) {
      setLook(null);
      return;
    }

    const rect = perch.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = hoverLookTarget.x - centerX;
    const deltaY = hoverLookTarget.y - centerY;

    if (Math.abs(deltaX) < 32 && Math.abs(deltaY) > 24) {
      setLook({ mode: "bob" });
      return;
    }

    setLook({
      mode: "track",
      x: clamp(deltaX / 34, -5, 5),
      y: clamp(deltaY / 42, -4, 4),
      rotate: clamp(deltaX / 68, -7, 7),
    });
  }, [hoverLookTarget, shouldReduceMotion]);

  const handleLlamitaClick = () => {
    recordEvent({ type: "click", target: currentObservation ? `open-chat:observation:${currentObservation.id}` : "open-chat:llamita" });
    openChat(currentObservation ? { observation: currentObservation, source: "llamita" } : { source: "llamita" });
  };

  return (
    <>
      <LlamitaBehaviorController idleObservations={idleObservations} />
      <LlamitaChatPanel />
      <div
        ref={perchRef}
        className={cx("fixed top-28 z-50 hidden transition-[right] duration-200 ease-out motion-reduce:transition-none md:block", chatOpen ? "right-[400px]" : "right-6")}
      >
        <AppButton
          type="button"
          intent="plain"
          aria-label="Open Llamita chat"
          className="grid size-20 place-items-center border border-ink bg-surface text-llamita-meta text-ink shadow-[6px_6px_0_0_var(--color-ink)]"
          onClick={handleLlamitaClick}
        >
          <LlamitaSprite state={llamitaState} look={look} />
        </AppButton>
        <AnimatePresence>
          {currentObservation ? (
            <motion.div
              aria-live="polite"
              className="absolute right-0 top-[calc(100%+14px)] w-72 border border-ink bg-paper p-4 shadow-[6px_6px_0_0_var(--color-ink)]"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: [0, 0, 0.2, 1] }}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-llamita-meta text-muted">{LLAMITA_STATE_LABELS.observing}</p>
                <AppButton type="button" intent="plain" aria-label="Dismiss Llamita observation" className="grid size-6 place-items-center" onClick={dismissObservation}>
                  <X aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
                </AppButton>
              </div>
              <p className="mt-3 text-llamita-body">{currentObservation.text}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
