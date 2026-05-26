"use client";

import { FormEvent, useState } from "react";
import { AppButton, AppCard, AppInput, AppTextArea } from "@/components/ui";
import { useSignalStore } from "@/stores/signal-store";

export function EarnestlyCard() {
  const [email, setEmail] = useState("");
  const [context, setContext] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const recordEvent = useSignalStore((state) => state.recordEvent);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.includes("@")) {
      return;
    }

    recordEvent({ type: "click", target: "earnestly-signup-submit" });
    console.info("earnestly signup stub", { email, context });
    setSubmitted(true);
  };

  return (
    <AppCard padding="lg" className="max-w-5xl">
      <h2>Earnestly.</h2>
      <p className="mt-6 text-body-lg">
        UX coaching for builders shipping web apps with AI tools. The product is still forming, so this card only captures early interest.
      </p>
      <p className="mt-5 text-body italic text-muted">Make the thing usable before the demo becomes the product.</p>

      {submitted ? (
        <div className="mt-8 border border-hairline bg-surface p-5 text-llamita-body">
          Noted. Tiny clipboard, serious intent. Maicol will have the useful context when this is ready.
        </div>
      ) : (
        <form className="mt-8 grid gap-4" onSubmit={submit}>
          <label className="grid gap-2">
            <span className="text-mono-sm text-muted">EMAIL</span>
            <AppInput
              isRequired
              aria-label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-mono-sm text-muted">WHAT WOULD YOU MOST WANT FROM THIS?</span>
            <AppTextArea
              aria-label="What would you most want from this?"
              value={context}
              onChange={setContext}
              rows={4}
            />
          </label>
          <AppButton
            type="submit"
            intent="primary"
            size="md"
            className="w-fit px-5 py-3"
          >
            BE THE FIRST TO TRY IT
          </AppButton>
        </form>
      )}
    </AppCard>
  );
}
