"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useSignalStore } from "@/stores/signal-store";

type OpenChatButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  prompt?: string;
  children: ReactNode;
};

export function OpenChatButton({ prompt, children, onClick, className = "", ...props }: OpenChatButtonProps) {
  const recordEvent = useSignalStore((state) => state.recordEvent);

  return (
    <button
      {...props}
      type="button"
      className={`cursor-pointer bg-transparent p-0 ${className}`}
      onClick={(event) => {
        recordEvent({ type: "click", target: prompt ? `open-chat:${prompt}` : "open-chat" });
        console.info("open chat", { prompt });
        onClick?.(event);
      }}
    >
      {children}
    </button>
  );
}
