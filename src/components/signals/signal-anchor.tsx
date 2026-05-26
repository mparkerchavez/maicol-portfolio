"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useSignalStore } from "@/stores/signal-store";

type SignalAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  signalType: "click";
  targetId: string;
  children: ReactNode;
};

export function SignalAnchor({ signalType, targetId, children, onClick, className = "", ...props }: SignalAnchorProps) {
  const recordEvent = useSignalStore((state) => state.recordEvent);

  return (
    <a
      {...props}
      className={className}
      onClick={(event) => {
        recordEvent({ type: signalType, target: targetId });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
