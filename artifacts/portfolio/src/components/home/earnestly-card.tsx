"use client";

import { FormEvent, useState } from "react";
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
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border border-hairline bg-surface px-4 py-3 text-body outline-none focus:border-ink"
              placeholder="you@example.com"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-mono-sm text-muted">WHAT WOULD YOU MOST WANT FROM THIS?</span>
            <textarea
              value={context}
              onChange={(event) => setContext(event.target.value)}
              className="min-h-28 resize-y border border-hairline bg-surface px-4 py-3 text-body outline-none focus:border-ink"
            />
          </label>
          <button type="submit" className="w-fit border border-ink bg-ink px-5 py-3 text-mono text-paper transition hover:bg-paper hover:text-ink">
            BE THE FIRST TO TRY IT
          </button>
        </form>
      )}
    </div>
  );
}
