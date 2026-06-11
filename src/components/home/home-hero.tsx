"use client";

// Hero with persona nav (Spec 03 Section 4). The page owns the section wrapper;
// this component owns persona state, persistence, and the declared signal (ADR 0010).
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PersonaNav } from "@/components/home/persona-nav";
import { OpenChatButton } from "@/components/site/open-chat-button";
import { getPersona, isSelectedPersona, personaStorageKey } from "@/data/personas";
import { useLlamitaBehaviorStore } from "@/stores/llamita-behavior-store";
import type { SelectedPersona } from "@/stores/signal-store";
import { useSignalStore } from "@/stores/signal-store";

export function HomeHero() {
  const [activePersona, setActivePersona] = useState<SelectedPersona>("for-anyone");
  const [previewPersona, setPreviewPersona] = useState<SelectedPersona | null>(null);
  const declareSelectedPersona = useSignalStore((state) => state.declareSelectedPersona);
  const hydrateSelectedPersona = useSignalStore((state) => state.hydrateSelectedPersona);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(personaStorageKey);

    if (stored && isSelectedPersona(stored)) {
      setActivePersona(stored);
      hydrateSelectedPersona(stored);
    }
  }, [hydrateSelectedPersona]);

  const commitPersona = (persona: SelectedPersona) => {
    setActivePersona(persona);
    setPreviewPersona(null);
    declareSelectedPersona(persona);
    window.sessionStorage.setItem(personaStorageKey, persona);
  };

  const currentPersona = getPersona(previewPersona ?? activePersona);

  return (
    <div>
      <p className="text-mono text-muted">01 /// POSITIONING</p>
      <div className="mt-8">
        <PersonaNav activePersona={activePersona} onCommit={commitPersona} onPreview={setPreviewPersona} />
      </div>
      <HeroCopy personaKey={currentPersona.key} display={currentPersona.display} subhead={currentPersona.subhead} />
      <AboutAffordance />
    </div>
  );
}

function HeroCopy({ personaKey, display, subhead }: { personaKey: SelectedPersona; display: string; subhead: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="mt-10 min-h-[380px] md:mt-12 md:min-h-[460px]">
        <h1 className="max-w-[13ch] text-display-1 max-md:text-[clamp(40px,12vw,64px)]">{display}</h1>
        <p className="mt-8 max-w-[42ch] text-body-lg italic">{subhead}</p>
      </div>
    );
  }

  return (
    <div className="mt-10 min-h-[380px] md:mt-12 md:min-h-[460px]">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={personaKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, ease: [0, 0, 0.2, 1] }}
        >
          <h1 className="max-w-[13ch] text-display-1 max-md:text-[clamp(40px,12vw,64px)]">{display}</h1>
          <p className="mt-8 max-w-[42ch] text-body-lg italic">{subhead}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AboutAffordance() {
  const ref = useRef<HTMLSpanElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const setHoverLookTarget = useLlamitaBehaviorStore((state) => state.setHoverLookTarget);
  const clearHoverLookTarget = useLlamitaBehaviorStore((state) => state.clearHoverLookTarget);

  const beginLook = () => {
    if (shouldReduceMotion || !ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    setHoverLookTarget({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  const endLook = () => {
    clearHoverLookTarget();
  };

  return (
    <span
      ref={ref}
      className="mt-10 hidden md:inline-flex md:items-center"
      onPointerEnter={beginLook}
      onPointerLeave={endLook}
      onMouseEnter={beginLook}
      onMouseLeave={endLook}
      onFocus={beginLook}
      onBlur={endLook}
    >
      <OpenChatButton prompt="tell me about Maicol" className="inline-flex items-center gap-2 text-mono">
        TO LEARN ABOUT MAICOL
        <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
        ASK LLAMITA
      </OpenChatButton>
    </span>
  );
}
