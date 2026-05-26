"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
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
    <div className="hairline-card max-w-5xl p-8 md:p-10">
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
            <Input
              isRequired
              aria-label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              size="lg"
              wrapperClassName="rounded-none bg-surface shadow-none ring-hairline focus-within:ring-ink"
              inputClassName="text-body text-ink placeholder:text-muted"
              placeholder="you@example.com"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-mono-sm text-muted">WHAT WOULD YOU MOST WANT FROM THIS?</span>
            <TextArea
              aria-label="What would you most want from this?"
              value={context}
              onChange={setContext}
              rows={4}
              textAreaClassName="min-h-28 rounded-none bg-surface text-body text-ink shadow-none ring-hairline focus:ring-ink"
            />
          </label>
          <Button
            type="submit"
            color="primary"
            size="md"
            className="w-fit rounded-none border border-ink bg-ink px-5 py-3 text-mono text-paper shadow-none hover:bg-paper hover:text-ink"
          >
            BE THE FIRST TO TRY IT
          </Button>
        </form>
      )}
    </div>
  );
}
