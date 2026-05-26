"use client";

import type { AnchorHTMLAttributes, ComponentProps, MouseEvent, ReactNode } from "react";
import { AppButton, AppLink } from "@/components/ui";
import { useSignalStore } from "@/stores/signal-store";

type AppLinkProps = ComponentProps<typeof AppButton>;

type SignalAnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color" | "href"> & {
  href: string;
  signalType: "click";
  targetId: string;
  children: ReactNode;
  uiIntent?: AppLinkProps["intent"];
  uiSize?: AppLinkProps["size"];
};

export function SignalAnchor({ signalType, targetId, children, onClick, className = "", uiIntent = "link", uiSize = "sm", ...props }: SignalAnchorProps) {
  const recordEvent = useSignalStore((state) => state.recordEvent);

  return (
    <AppLink
      {...props}
      intent={uiIntent}
      size={uiSize}
      className={className}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        recordEvent({ type: signalType, target: targetId });
        onClick?.(event);
      }}
    >
      {children}
    </AppLink>
  );
}
