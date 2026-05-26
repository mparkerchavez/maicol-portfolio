"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { Button, type CommonProps } from "@/components/base/buttons/button";
import { useSignalStore } from "@/stores/signal-store";

type SignalAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  signalType: "click";
  targetId: string;
  children: ReactNode;
  uiColor?: CommonProps["color"];
  uiSize?: CommonProps["size"];
};

export function SignalAnchor({ signalType, targetId, children, onClick, className = "", uiColor = "link-gray", uiSize = "sm", ...props }: SignalAnchorProps) {
  const recordEvent = useSignalStore((state) => state.recordEvent);

  return (
    <Button
      {...props}
      color={uiColor}
      size={uiSize}
      className={className}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        recordEvent({ type: signalType, target: targetId });
        onClick?.(event);
      }}
    >
      {children}
    </Button>
  );
}
