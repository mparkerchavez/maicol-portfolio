"use client";

import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { AppButton } from "@/components/ui";
import { useSignalStore } from "@/stores/signal-store";

type OpenChatButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
  prompt?: string;
  children: ReactNode;
};

export function OpenChatButton({ prompt, children, onClick, className = "", ...props }: OpenChatButtonProps) {
  const recordEvent = useSignalStore((state) => state.recordEvent);

  return (
    <AppButton
      {...props}
      type="button"
      intent="link"
      size="sm"
      className={className}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        recordEvent({ type: "click", target: prompt ? `open-chat:${prompt}` : "open-chat" });
        console.info("open chat", { prompt });
        onClick?.(event);
      }}
    >
      {children}
    </AppButton>
  );
}
