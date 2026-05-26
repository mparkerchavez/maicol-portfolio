"use client";

import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { Button } from "@/components/base/buttons/button";
import { useSignalStore } from "@/stores/signal-store";

type OpenChatButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  prompt?: string;
  children: ReactNode;
};

export function OpenChatButton({ prompt, children, onClick, className = "", ...props }: OpenChatButtonProps) {
  const recordEvent = useSignalStore((state) => state.recordEvent);

  return (
    <Button
      {...props}
      type="button"
      color="link-gray"
      size="sm"
      className={className}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        recordEvent({ type: "click", target: prompt ? `open-chat:${prompt}` : "open-chat" });
        console.info("open chat", { prompt });
        onClick?.(event);
      }}
    >
      {children}
    </Button>
  );
}
