"use client";

import { useEffect } from "react";
import { useSignalStore } from "@/stores/signal-store";

type PageSignalProps = {
  slug: string;
  title: string;
};

export function PageSignal({ slug, title }: PageSignalProps) {
  const setPage = useSignalStore((state) => state.setPage);

  useEffect(() => {
    setPage({ slug, title });
    (window as Window & { __MAICOL_SIGNALS__?: typeof useSignalStore }).__MAICOL_SIGNALS__ = useSignalStore;
  }, [setPage, slug, title]);

  return null;
}
