"use client";

// Coming-soon surface only. The email signup from Spec 03 Section 7 is deferred
// past Milestone A (handoff 0009, Section 1); restore the form from git history
// when the scope decision lands.
import { FileText } from "lucide-react";
import { OpenChatButton } from "@/components/site/open-chat-button";
import { AppCard } from "@/components/ui";

export function EarnestlyCard() {
  return (
    <AppCard padding="lg" className="grid max-w-5xl gap-8 lg:grid-cols-[1fr_0.75fr]">
      <div>
        <h2>Earnestly.</h2>
        <p className="mt-6 text-body-lg">
          UX coaching for builders shipping web apps with AI tools. The product is still forming, so this stays smaller than the proof surfaces.
        </p>
        <p className="mt-5 text-body italic text-muted">A future product for people building before they feel ready.</p>
      </div>
      <div className="grid content-between gap-6 border-t border-hairline pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
        <div>
          <p className="text-mono-sm text-muted">STATUS</p>
          <p className="mt-2 text-body-sm">Coming soon. Interest capture lands in a later pass.</p>
        </div>
        <span className="hidden md:inline-flex">
          <OpenChatButton prompt="what is Earnestly?" className="inline-flex items-center gap-2 text-mono">
            ASK WHAT THIS IS
            <FileText aria-hidden="true" className="size-4" strokeWidth={1.5} />
          </OpenChatButton>
        </span>
      </div>
    </AppCard>
  );
}
