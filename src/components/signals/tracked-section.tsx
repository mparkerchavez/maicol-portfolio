"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useSignalStore } from "@/stores/signal-store";

type TrackedSectionProps = {
  id: string;
  title: string;
  className?: string;
  children: ReactNode;
};

export function TrackedSection({ id, title, className = "", children }: TrackedSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const setInView = useSignalStore((state) => state.setInView);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView({ sectionId: id, sectionTitle: title });
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: 0.2,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [id, setInView, title]);

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}
