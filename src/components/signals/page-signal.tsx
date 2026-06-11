"use client";

import { useEffect } from "react";
import { isSelectedPersona, personaStorageKey } from "@/data/personas";
import { useSignalStore } from "@/stores/signal-store";

type PageSignalProps = {
  slug: string;
  title: string;
};

export function PageSignal({ slug, title }: PageSignalProps) {
  const setPage = useSignalStore((state) => state.setPage);
  const hydrateSelectedPersona = useSignalStore((state) => state.hydrateSelectedPersona);

  useEffect(() => {
    setPage({ slug, title });
    (window as Window & { __MAICOL_SIGNALS__?: typeof useSignalStore }).__MAICOL_SIGNALS__ = useSignalStore;
  }, [setPage, slug, title]);

  // The declared persona survives hard navigations within the session; HomeHero only
  // mounts on the home page, so the store restore happens here on every page.
  useEffect(() => {
    const stored = window.sessionStorage.getItem(personaStorageKey);

    if (stored && isSelectedPersona(stored)) {
      hydrateSelectedPersona(stored);
    }
  }, [hydrateSelectedPersona]);

  return null;
}
