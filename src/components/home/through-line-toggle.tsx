"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { AppTabButton } from "@/components/ui";
import type { ThroughLine } from "@/stores/signal-store";
import { useSignalStore } from "@/stores/signal-store";

const storageKey = "maicol-through-line";

const framings: Record<ThroughLine, { label: string; display: string; subhead: string }> = {
  designer: {
    label: "Product Designer",
    display: "I have been a Product Designer for 24 years. I am working on what that becomes in the age of AI.",
    subhead: "Curate Mind is one piece of the answer. Read the work, or ask Llamita.",
  },
  "ai-product-lead": {
    label: "AI Product Lead",
    display: "I work in the gap between AI capability and human adoption.",
    subhead: "Discovery, validation, prototyping, alignment. All in one person.",
  },
  "end-to-end-product": {
    label: "End-to-end Product",
    display: "Twenty-four years of product work, converged on one function.",
    subhead: "Find where AI creates value. Prove it before the build. Scale what works.",
  },
};

const framingOrder = Object.keys(framings) as ThroughLine[];

export function ThroughLineToggle() {
  const [active, setActive] = useState<ThroughLine>("ai-product-lead");
  const [preview, setPreview] = useState<ThroughLine | null>(null);
  const setThroughLine = useSignalStore((state) => state.setThroughLine);
  const current = useMemo(() => framings[preview ?? active], [active, preview]);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(storageKey) as ThroughLine | null;

    if (stored && stored in framings) {
      setActive(stored);
      setThroughLine(stored);
    }
  }, [setThroughLine]);

  const commit = (value: ThroughLine) => {
    setActive(value);
    setPreview(null);
    setThroughLine(value);
    window.sessionStorage.setItem(storageKey, value);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-x-8 gap-y-3" role="tablist" aria-label="Career framing">
        {framingOrder.map((value) => {
          const isActive = value === active;

          return (
            <AppTabButton
              key={value}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`text-left text-h3 transition ${isActive ? "font-bold italic text-ink" : "text-muted hover:text-ink"}`}
              onMouseEnter={() => {
                if (!isActive) {
                  setPreview(value);
                }
              }}
              onMouseLeave={() => setPreview(null)}
              onFocus={() => {
                if (!isActive) {
                  setPreview(value);
                }
              }}
              onBlur={() => setPreview(null)}
              onClick={() => commit(value)}
            >
              {framings[value].label}
            </AppTabButton>
          );
        })}
      </div>

      <div className="mt-12 min-h-[420px] md:min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={preview ?? active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="max-w-[11ch] text-display-1">{current.display}</h1>
            <p className="mt-8 max-w-[42ch] text-body-lg italic">{current.subhead}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
