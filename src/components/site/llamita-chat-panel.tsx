"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Send, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { AppButton } from "@/components/ui";
import { LLAMITA_STATE_LABELS } from "@/lib/llamita-behavior";
import { useLlamitaBehaviorStore } from "@/stores/llamita-behavior-store";

const slideEase = [0.16, 1, 0.3, 1] as const;

export function LlamitaChatPanel() {
  const shouldReduceMotion = useReducedMotion();
  const chatOpen = useLlamitaBehaviorStore((state) => state.chatOpen);
  const llamitaState = useLlamitaBehaviorStore((state) => state.state);
  const messages = useLlamitaBehaviorStore((state) => state.chatMessages);
  const closeChat = useLlamitaBehaviorStore((state) => state.closeChat);
  const submitStubMessage = useLlamitaBehaviorStore((state) => state.submitStubMessage);
  const [draft, setDraft] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitStubMessage(draft);
    setDraft("");
  };

  return (
    <AnimatePresence>
      {chatOpen ? (
        <motion.aside
          aria-label="Llamita chat"
          className="fixed right-0 top-0 z-40 hidden h-screen w-[380px] max-w-[calc(100vw-24px)] border-l border-ink bg-paper shadow-[-8px_0_0_0_rgb(17_17_17_/_0.05)] md:flex md:flex-col"
          initial={shouldReduceMotion ? { opacity: 0 } : { x: "100%", opacity: 1 }}
          animate={shouldReduceMotion ? { opacity: 1, transition: { duration: 0.12 } } : { x: 0, opacity: 1, transition: { duration: 0.26, ease: slideEase } }}
          exit={shouldReduceMotion ? { opacity: 0, transition: { duration: 0.12 } } : { x: "100%", opacity: 1, transition: { duration: 0.2, ease: slideEase } }}
        >
          <div className="flex items-start justify-between gap-6 border-b border-hairline p-5 pr-24">
            <div>
              <p className="text-mono-sm text-muted">LLAMITA CHAT</p>
              <p className="mt-2 text-llamita-meta text-ink">{LLAMITA_STATE_LABELS[llamitaState]}</p>
            </div>
            <AppButton type="button" intent="plain" aria-label="Close Llamita chat" className="grid size-9 place-items-center border border-hairline" onClick={closeChat}>
              <X aria-hidden="true" className="size-4" strokeWidth={1.5} />
            </AppButton>
          </div>

          <div className="flex-1 overflow-y-auto p-5 pt-8">
            <div className="grid gap-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[30ch] border p-3 text-body-sm ${
                    message.role === "visitor" ? "ml-auto border-ink bg-ink text-paper" : "mr-auto border-hairline bg-surface text-ink"
                  }`}
                >
                  <p className="text-mono-sm opacity-65">{message.role === "visitor" ? "YOU" : "LLAMITA"}</p>
                  <p className="mt-2">{message.text}</p>
                </div>
              ))}
            </div>
          </div>

          <form className="border-t border-hairline p-5" onSubmit={handleSubmit}>
            <label className="text-mono-sm text-muted" htmlFor="llamita-chat-input">
              MESSAGE
            </label>
            <div className="mt-3 flex items-stretch gap-2">
              <input
                id="llamita-chat-input"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask Llamita"
                className="min-w-0 flex-1 border border-hairline bg-surface px-3 py-2 text-body-sm outline-none transition focus:border-ink"
              />
              <AppButton type="submit" intent="primary" aria-label="Send message" className="grid size-11 place-items-center p-0">
                <Send aria-hidden="true" className="size-4" strokeWidth={1.5} />
              </AppButton>
            </div>
          </form>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
