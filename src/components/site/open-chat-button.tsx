"use client";

import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { AppButton } from "@/components/ui";
import { useLlamitaBehaviorStore } from "@/stores/llamita-behavior-store";
import { useSignalStore } from "@/stores/signal-store";

type OpenChatButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
  prompt?: string;
  children: ReactNode;
};

export function OpenChatButton({ prompt, children, onClick, className = "", ...props }: OpenChatButtonProps) {
  const recordEvent = useSignalStore((state) => state.recordEvent);
  const openChat = useLlamitaBehaviorStore((state) => state.openChat);

  return (
    <AppButton
      {...props}
      type="button"
      intent="link"
      size="sm"
      className={className}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        recordEvent({ type: "click", target: prompt ? `open-chat:${prompt}` : "open-chat" });
        openChat({ prompt, source: "button" });
        onClick?.(event);
      }}
    >
      {children}
    </AppButton>
  );
}
